import { State, useAppState, AppDispatch } from '.';
import { sortNotes } from '../components/util';
import { NoteListItem } from '../types';

export type NoteListSetAction = {
  type: string;
  noteList: Array<NoteListItem>;
};

export type NoteListAddAction = {
  type: string;
  note: NoteListItem;
};

export type NoteListDeleteAction = {
  type: string;
  id: string;
};

export const NOTE_LIST_SET_NOTES = 'set-notes';
export const NOTE_LIST_ADD_NOTE = 'add-note';
export const NOTE_LIST_DELETE_NOTE = 'delete-note';

export const NoteListReducer = (
  state: State,
  action: NoteListSetAction & NoteListAddAction & NoteListDeleteAction
): any => {
  switch (action.type) {
    case NOTE_LIST_SET_NOTES: {
      return {
        ...state,
        noteList: action.noteList,
      };
    }
    case NOTE_LIST_ADD_NOTE: {
      const noteList = state?.noteList;
      const note = action?.note;

      const index = noteList.findIndex(
        (item: NoteListItem) => item?.id === note?.id
      );

      if (index > -1) {
        noteList.splice(index, 1);
      }

      noteList.push(note);

      return {
        ...state,
        noteList: sortNotes(noteList),
      };
    }
    case NOTE_LIST_DELETE_NOTE: {
      const noteList = state?.noteList;

      const index = noteList.findIndex(
        (item: NoteListItem) => item?.id === action?.id
      );

      if (index > -1) {
        noteList.splice(index, 1);
      }

      return {
        ...state,
        noteList: sortNotes(noteList),
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

export const addToNoteList = (
  note: NoteListItem,
  dispatch: AppDispatch
): void => {
  dispatch({ type: NOTE_LIST_ADD_NOTE, note });
};

export const deleteFromNoteList = (id: string, dispatch: AppDispatch): void => {
  dispatch({ type: NOTE_LIST_DELETE_NOTE, id });
};
