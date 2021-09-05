import { get } from 'idb-keyval';

export type EncryptionResult = {
  encrypted_content: string;
  encrypted_metadata: string;
  key: { wrapped_key: string; iv_content: string; iv_metadata: string };
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

export const encrypt_note = async (
  content: string,
  metadata: string
): Promise<EncryptionResult> => {
  const enc = new TextEncoder();
  const dec = new TextDecoder();

  const key = await generate_note_key();
  const main_key = await get('personal');

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
    encrypted_content: dec.decode(await cypher_content),
    encrypted_metadata: dec.decode(await cypher_metadata),
    key: {
      wrapped_key: dec.decode(wrapped_key),
      iv_content: dec.decode(iv_content),
      iv_metadata: dec.decode(iv_metadata),
    },
  };
};
