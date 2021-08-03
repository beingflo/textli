export type NoteSaveRequest = {
  metainfo: string;
  content: string;
  encrypted_key: string;
};

export type Note = {
  id: string;
  created_at: string;
  modified_at: string;
  metainfo: string;
  content: string;
  encrypted_key: string;
};

export type NoteListEntry = {
  id: string;
  created_at: string;
  modified_at: string;
  metainfo: string;
  encrypted_key: string;
};
