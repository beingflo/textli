export type Metainfo = {
  title: string;
  tags: string;
};

export const getMetainfo = (content: string | undefined): string => {
  const title = new DOMParser().parseFromString(content ?? '', 'text/html');
  const trimmedTitle = title.body.firstElementChild?.textContent ?? '';

  return JSON.stringify({ title: trimmedTitle, tags: '' });
};
