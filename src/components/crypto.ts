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
): Promise<CryptoKey> => {
  const mainKey = (await get('workspaces'))[0];

  if (!mainKey) {
    return Promise.reject();
  }

  return window.crypto.subtle.unwrapKey(
    'raw',
    wrapped_key,
    mainKey,
    'AES-KW',
    'AES-GCM',
    true,
    ['encrypt', 'decrypt']
  );
};

export const exportKey = async (key: CryptoKey): Promise<string> => {
  const rawKey = await window.crypto.subtle.exportKey('raw', key);

  return arrayBuffer2string(rawKey);
};

export const encrypt_note = async (
  content: string,
  metadata: string
): Promise<EncryptionResult> => {
  const enc = new TextEncoder();

  const key = await generate_note_key();
  const main_key = (await get('workspaces'))[0];

  const encoded_content = enc.encode(content);
  const encoded_metadata = enc.encode(metadata);

  const iv_content = window.crypto.getRandomValues(new Uint8Array(12));
  const iv_metadata = window.crypto.getRandomValues(new Uint8Array(12));

  const cypher_content = window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv_content,
    },
    key,
    encoded_content
  );

  const cypher_metadata = window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv_metadata,
    },
    key,
    encoded_metadata
  );

  const wrapped_key = await wrap_note_key(main_key, key);

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
      note_key,
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
      note_key,
      string2arrayBuffer(encrypted_content)
    );
  }

  return {
    content: content ? dec.decode(content) : '',
    metadata: metadata ? dec.decode(metadata) : '',
  };
};
