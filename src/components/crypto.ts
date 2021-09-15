import { get } from 'idb-keyval';

export type KeyMaterial = {
  wrapped_key: string;
  iv_content: string;
  iv_metadata: string;
};

export type EncryptionResult = {
  encrypted_content: string;
  encrypted_metadata: string;
  key: KeyMaterial;
};

export type DecryptionResult = {
  workspace: string;
  content: string;
  metadata: string;
};

export const generate_main_key = async (
  password: string,
  salt: Uint8Array
): Promise<CryptoKey> => {
  const enc = new TextEncoder();

  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );

  const key = window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-KW', length: 256 },
    false,
    ['wrapKey', 'unwrapKey']
  );

  return key;
};

export const generate_note_key = async (): Promise<CryptoKey> => {
  const key = window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt']
  );

  return key;
};

export const wrap_note_key = async (
  mainKey: CryptoKey,
  noteKey: CryptoKey
): Promise<ArrayBuffer> => {
  return window.crypto.subtle.wrapKey('raw', noteKey, mainKey, 'AES-KW');
};

export const arrayBuffer2string = (
  buffer: ArrayBuffer | Uint8Array
): string => {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
};

export const string2arrayBuffer = (str: string): ArrayBuffer => {
  return Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
};

export const unwrap_note_key = async (
  wrapped_key: ArrayBuffer
): Promise<{ key: CryptoKey; workspace: string }> => {
  const mainKeys:
    | [{ name: string; key: CryptoKey; default: boolean }]
    | undefined = await get('workspaces');

  if (!mainKeys) {
    return Promise.reject();
  }

  for (const mainKey of mainKeys) {
    if (!mainKey) {
      return Promise.reject();
    }

    try {
      const unwrapped_key = await window.crypto.subtle.unwrapKey(
        'raw',
        wrapped_key,
        mainKey?.key,
        'AES-KW',
        'AES-GCM',
        true,
        ['encrypt', 'decrypt']
      );

      return { key: unwrapped_key, workspace: mainKey?.name };
    } catch (error) {}
  }
  return Promise.reject();
};

export const exportKey = async (key: CryptoKey): Promise<string> => {
  const rawKey = await window.crypto.subtle.exportKey('raw', key);

  return arrayBuffer2string(rawKey);
};

export const encrypt_note = async (
  mainKey: CryptoKey,
  content: string,
  metadata: string,
  wrapped_note_key?: string
): Promise<EncryptionResult> => {
  const enc = new TextEncoder();

  let noteKey;
  if (wrapped_note_key) {
    const unwrapped_keymaterial = await unwrap_note_key(
      string2arrayBuffer(wrapped_note_key)
    );
    noteKey = unwrapped_keymaterial?.key;
  } else {
    noteKey = await generate_note_key();
  }

  const encoded_content = enc.encode(content);
  const encoded_metadata = enc.encode(metadata);

  const iv_content = window.crypto.getRandomValues(new Uint8Array(12));
  const iv_metadata = window.crypto.getRandomValues(new Uint8Array(12));

  const cypher_content = window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv_content,
    },
    noteKey,
    encoded_content
  );

  const cypher_metadata = window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv_metadata,
    },
    noteKey,
    encoded_metadata
  );

  const wrapped_key = await wrap_note_key(mainKey, noteKey);

  return {
    encrypted_content: arrayBuffer2string(await cypher_content),
    encrypted_metadata: arrayBuffer2string(await cypher_metadata),
    key: {
      wrapped_key: arrayBuffer2string(wrapped_key),
      iv_content: arrayBuffer2string(iv_content),
      iv_metadata: arrayBuffer2string(iv_metadata),
    },
  };
};

export const decrypt_note = async (
  key: KeyMaterial,
  encrypted_metadata?: string,
  encrypted_content?: string
): Promise<DecryptionResult | null> => {
  const dec = new TextDecoder();

  const note_key = await unwrap_note_key(string2arrayBuffer(key.wrapped_key));

  let metadata = null;
  if (encrypted_metadata) {
    const iv_metadata = string2arrayBuffer(key.iv_metadata);

    metadata = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv_metadata,
      },
      note_key?.key,
      string2arrayBuffer(encrypted_metadata)
    );
  }

  let content = null;
  if (encrypted_content) {
    const iv_content = string2arrayBuffer(key.iv_content);

    content = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv_content,
      },
      note_key?.key,
      string2arrayBuffer(encrypted_content)
    );
  }

  return {
    workspace: note_key?.workspace,
    content: content ? dec.decode(content) : '',
    metadata: metadata ? dec.decode(metadata) : '',
  };
};
