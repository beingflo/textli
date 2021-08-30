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

export type DeletedNote = Note & {
  deleted_at: string;
};

export type NoteListEntry = {
  id: string;
  created_at: string;
  modified_at: string;
  metainfo: string;
  encrypted_key: string;
};

export type UserCredentials = {
  name: string;
  password: string;
};

export type UserCredentialsPasswordChange = {
  name: string;
  password: string;
  password_new: string;
};

export type CreateShareRequest = {
  note: string;
};

export type UserInfo = {
  balance: string;
  remaining_days: string;
};

export enum Status {
  OK = 'OK',
  REDIRECT = 'REDIRECT',
}

export enum NoteStatus {
  CHANGED = 'CHANGED',
  INPROGRESS = 'INPROGRESS',
  SYNCED = 'SYNCED',
}
