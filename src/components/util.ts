import React from 'react';

export type Metadata = {
  title: string;
  tags: string;
};

export const getMetadata = (content: string | undefined): string => {
  const title = new DOMParser().parseFromString(content ?? '', 'text/html');
  const trimmedTitle = title.body.firstElementChild?.textContent ?? '';

  return JSON.stringify({ title: trimmedTitle, tags: '' });
};

export const useFocus = (): any => {
  const htmlElRef = React.useRef(null);
  const setFocus = () => {
    //@ts-ignore
    htmlElRef?.current && htmlElRef?.current?.focus();
  };

  return [htmlElRef, setFocus];
};

export const generate_key = async (
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
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );

  return key;
};
