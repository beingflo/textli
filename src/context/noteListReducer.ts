import { useAppState } from '.';

export type Note = {
  encrypted_key: string;
  id: string;
  metainfo: string;
  modified_at: string;
};

export type NoteListState = {
  notes: Array<Note>;
};

export type NoteListAction = {
  type: string;
  notes: boolean;
};

export const NoteListActions = {
  SET_NOTES: 'set-notes',
};

export const initialNoteListState = {
  notes: [],
};

export const NoteListReducer = (
  state: NoteListState,
  action: NoteListAction
): any => {
  switch (action.type) {
    case NoteListActions.SET_NOTES: {
      return {
        ...state,
        notes: action.notes,
      };
    }
    default:
      return state;
  }
};

export const useNoteList = (): any => {
  const { noteList } = useAppState();

  return noteList;
};
