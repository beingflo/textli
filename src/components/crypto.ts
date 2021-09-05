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
): Promise<string> => {
  const dec = new TextDecoder();
  const cypher = await window.crypto.subtle.wrapKey(
    'raw',
    noteKey,
    mainKey,
    'AES-KW'
  );

  return dec.decode(cypher);
};
