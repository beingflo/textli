import { State, useAppState, AppDispatch } from '.';

export type NoteListEntry = {
  id: string;
  created_at: string;
  modified_at: string;
  metainfo: string;
  encrypted_key: string;
};

export type NoteListAction = {
  type: string;
  noteList: Array<NoteListEntry>;
};

export const NOTE_LIST_SET_NOTES = 'set-notes';

export const NoteListReducer = (state: State, action: NoteListAction): any => {
  switch (action.type) {
    case NOTE_LIST_SET_NOTES: {
      return {
        ...state,
        noteList: action.noteList,
      };
    }
    default:
      return state;
  }
};

export const useNoteList = (): Array<NoteListEntry> => {
  const { noteList } = useAppState();
  return noteList;
};

export const setNoteList = (
  noteList: Array<NoteListEntry>,
  dispatch: AppDispatch
): void => {
  dispatch({ type: NOTE_LIST_SET_NOTES, noteList });
};
