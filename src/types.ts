import { KeyMaterial } from './components/crypto';

export type NoteListItemDto = {
  id: string;
  created_at: string;
  modified_at: string;
  metadata: string;
  key: string;
  public: boolean;
};

export type DeletedNoteListItemDto = NoteListItemDto & {
  deleted_at: string;
};

export type NoteDto = NoteListItemDto & {
  content: string;
};

export type Metadata = {
  title: string;
  tags: string;
};

export type NoteListItem = {
  id: string;
  created_at: string;
  modified_at: string;
  metadata: Metadata;
  key: KeyMaterial;
  public: boolean;
};

export type DeletedNoteListItem = NoteListItem & {
  deleted_at: string;
};

export type Note = NoteListItem & {
  content: string;
};

export type NoteSaveResponse = {
  id: string;
  modified_at: string;
  created_at: string;
};

export type NoteUpdateResponse = {
  id: string;
  modified_at: string;
};

export type NoteSaveRequest = {
  metadata: string;
  content: string;
  key: string;
  public: boolean;
};

export type DeletedNote = NoteDto & {
  deleted_at: string;
};

export type ParsedNoteListEntry = {
  id: string;
  created_at: string;
  modified_at: string;
  metadata: { title: string; tags: string };
  key: string;
  public: boolean;
};

export type Share = {
  token: string;
  note: string;
  created_at: string;
  expires_at: string;
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
  expires_in?: number;
};

export type UserInfo = {
  balance: string;
  salt: string;
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
