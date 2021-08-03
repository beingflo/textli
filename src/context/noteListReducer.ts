import { State, useAppState, AppDispatch } from '.';

export type Note = {
  encrypted_key: string;
  id: string;
  metainfo: string;
  modified_at: string;
};

export type NoteListAction = {
  type: string;
  noteList: boolean;
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

export const useNoteList = (): Array<Note> => {
  const { noteList } = useAppState();
  return noteList;
};

export const setNoteList = (
  noteList: Array<Note>,
  dispatch: AppDispatch
): void => {
  dispatch({ type: NOTE_LIST_SET_NOTES, noteList });
};
