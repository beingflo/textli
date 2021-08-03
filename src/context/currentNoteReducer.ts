import { State, useAppState, AppDispatch } from '.';
import { Note } from '../types';

export type SetCurrentNoteAction = {
  type: string;
  note: Note;
};

export const CURRENT_NOTE_SET = 'set-current-note';

export const CurrentNoteReducer = (
  state: State,
  action: SetCurrentNoteAction
): any => {
  switch (action.type) {
    case CURRENT_NOTE_SET: {
      return {
        ...state,
        currentNote: action.note,
      };
    }
    default:
      return state;
  }
};

export const useCurrentNote = (): Note | undefined => {
  const { currentNote } = useAppState();
  return currentNote;
};

export const setCurrentNote = (note: Note, dispatch: AppDispatch): void => {
  dispatch({ type: CURRENT_NOTE_SET, note });
};
