export type NoteSaveRequest = {
  metadata: string;
  content: string;
  key: string;
  public: boolean;
};

export type Note = {
  id: string;
  created_at: string;
  modified_at: string;
  metadata: string;
  content: string;
  key: string;
  public: boolean;
};

export type DeletedNote = Note & {
  deleted_at: string;
};

export type NoteListEntry = {
  id: string;
  created_at: string;
  modified_at: string;
  metadata: string;
  key: string;
  public: boolean;
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
