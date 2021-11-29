import { del, get, set } from 'idb-keyval';

const KEY_DERIVATION_ITERATIONS = 1000000;

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

export const persistMainKey = async (
  key: CryptoKey,
  username: string
): Promise<void> => {
  return await set(`${username}-mainKey`, key);
};

export const removeMainKey = async (username: string): Promise<void> => {
  return await del(`${username}-mainKey`);
};

export const retrieveMainKey = async (
  username: string
): Promise<CryptoKey | undefined> => {
  return await get(`${username}-mainKey`);
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
      iterations: KEY_DERIVATION_ITERATIONS,
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

export const string2arrayBuffer = (str: string): Uint8Array => {
  return Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
};

export const unwrap_note_key = async (
  wrapped_key: ArrayBuffer,
  username: string
): Promise<CryptoKey> => {
  const mainKey: CryptoKey | undefined = await retrieveMainKey(username);

  if (!mainKey) {
    return Promise.reject();
  }

  try {
    const unwrapped_key = await window.crypto.subtle.unwrapKey(
      'raw',
      wrapped_key,
      mainKey,
      'AES-KW',
      'AES-GCM',
      true,
      ['encrypt', 'decrypt']
    );

    return unwrapped_key;
  } catch (error) {
    return Promise.reject();
  }
};

export const exportKey = async (key: CryptoKey): Promise<string> => {
  const rawKey = await window.crypto.subtle.exportKey('raw', key);

  return arrayBuffer2string(rawKey);
};

export const encrypt_note = async (
  mainKey: CryptoKey,
  username: string,
  content: string,
  metadata: string,
  wrapped_note_key?: string
): Promise<EncryptionResult> => {
  const enc = new TextEncoder();

  let noteKey;
  if (wrapped_note_key) {
    const unwrapped_key = await unwrap_note_key(
      string2arrayBuffer(wrapped_note_key),
      username
    );
    noteKey = unwrapped_key;
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
  username: string,
  encrypted_metadata?: string,
  encrypted_content?: string
): Promise<DecryptionResult | null> => {
  const dec = new TextDecoder();

  const note_key = await unwrap_note_key(
    string2arrayBuffer(key.wrapped_key),
    username
  );

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
