import { State, useAppState, AppDispatch } from '.';
import { NoteStatus } from '../types';

export type SetNoteStatusAction = {
  type: string;
  noteStatus: NoteStatus;
};

export const NOTE_STATUS_SET = 'set-note-status';

export const NoteStatusReducer = (
  state: State,
  action: SetNoteStatusAction
): any => {
  switch (action.type) {
    case NOTE_STATUS_SET: {
      return {
        ...state,
        noteStatus: action.noteStatus,
      };
    }
    default:
      return state;
  }
};

export const useNoteStatus = (): NoteStatus => {
  const { noteStatus } = useAppState();
  return noteStatus;
};

export const setNoteStatus = (
  noteStatus: NoteStatus,
  dispatch: AppDispatch
): void => {
  dispatch({ type: NOTE_STATUS_SET, noteStatus });
};
