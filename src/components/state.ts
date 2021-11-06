import {
  AuthStatus,
  Note,
  NoteListItem,
  NoteStatus,
  Share,
  UserInfo,
} from '../types';
import { Editor } from '@tiptap/react';
import { atom } from 'jotai';
import { sortNotes } from './util';

export const userInfoState = atom<UserInfo | undefined>(undefined);
export const getUserInfoState = atom((get) => get(userInfoState))

export const sharesState = atom<Array<Share>>([]);
export const getSharesState = atom((get) => get(sharesState))

export const editorState = atom<Editor | null>(null);
export const getEditorState = atom((get) => get(editorState));

export const noteStatusState = atom<NoteStatus>(NoteStatus.SYNCED);
export const getNoteStatusState = atom((get) => get(noteStatusState))

export const showKeypromptState = atom<boolean>(false);
export const getShowKeypromptState = atom((get) => get(showKeypromptState))

const spinnerState = atom<number>(0);
export const getSpinnerState = atom((get) => get(spinnerState))
export const setSpinnerState = atom(null, (get, set, waiting) => 
  set(spinnerState, Math.max(get(spinnerState) + (waiting ? 1 : -1), 0) ));

export const authState = atom<AuthStatus>(AuthStatus.REATTEMPT);
export const getAuthState = atom((get) => get(authState))

export const currentNoteState = atom<Note | undefined>(undefined);
export const getCurrentNoteState = atom((get) => get(currentNoteState))

export const noteListState = atom<Array<NoteListItem>>([]);
export const getNoteListState = atom((get) => get(noteListState))
export const addToNoteListState = atom(null, (get, set, note: NoteListItem) => {
  const noteList = get(noteListState);

  const index = noteList.findIndex(
    (item: NoteListItem) => item?.id === note?.id
  );

  if (index > -1) {
    noteList.splice(index, 1);
  }

  noteList.push(note);

  const newList = sortNotes([...noteList]);

  set(noteListState, newList);
});
export const deleteFromNoteListState = atom(null, (get, set, id: string) => {
  const noteList = get(noteListState);

  const index = noteList.findIndex(
    (item: NoteListItem) => item?.id === id
  );

  if (index > -1) {
    noteList.splice(index, 1);
  }

  const newList = sortNotes([...noteList]);

  set(noteListState, newList);
});