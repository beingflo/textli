import { State, useAppState, AppDispatch } from '.';
import { NoteListItem } from '../types';

export type NoteListAction = {
  type: string;
  noteList: Array<NoteListItem>;
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

export const useNoteList = (): Array<NoteListItem> => {
  const { noteList } = useAppState();
  return noteList;
};

export const setNoteList = (
  noteList: Array<NoteListItem>,
  dispatch: AppDispatch
): void => {
  dispatch({ type: NOTE_LIST_SET_NOTES, noteList });
};
