import React, { Dispatch } from 'react';
import { NoteListReducer, NOTE_LIST_SET_NOTES } from './noteListReducer';
import {
  CurrentNoteReducer,
  CURRENT_NOTE_SET,
  CURRENT_NOTE_UPDATE,
} from './currentNoteReducer';
import { SpinnerReducer, SPINNER_SET_WAITING } from './spinnerReducer';
import { StatusReducer, STATUS_SET_STATUS } from './statusReducer';
import { Note, NoteListEntry, NoteStatus, Status } from '../types';
import { EditorReducer, EDITOR_SET_EDITOR } from './editorReducer';
import { Editor } from '@tiptap/react';
import { NoteStatusReducer, NOTE_STATUS_SET } from './noteStatusReducer';

export type State = {
  waiting: number;
  noteList: Array<NoteListEntry>;
  currentNote: Note | undefined;
  status: Status;
  editor: Editor | null;
  noteStatus: NoteStatus;
};

export type Action = {
  type: string;
  [x: string]: any;
};

export type AppDispatch = Dispatch<Action>;

const initialState: State = {
  waiting: 0,
  noteList: [],
  currentNote: undefined,
  status: Status.OK,
  editor: null,
  noteStatus: NoteStatus.UPTODATE,
};

export const AppContext = React.createContext<{
  state: State;
  dispatch: AppDispatch;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export const ContextProvider = ({
  children,
}: {
  children: React.ReactElement;
}): React.ReactElement => {
  const actionReducerMapping = React.useMemo(
    () => ({
      [NOTE_LIST_SET_NOTES]: NoteListReducer,
      [SPINNER_SET_WAITING]: SpinnerReducer,
      [CURRENT_NOTE_SET]: CurrentNoteReducer,
      [CURRENT_NOTE_UPDATE]: CurrentNoteReducer,
      [STATUS_SET_STATUS]: StatusReducer,
      [EDITOR_SET_EDITOR]: EditorReducer,
      [NOTE_STATUS_SET]: NoteStatusReducer,
    }),
    []
  );

  const [state, dispatch] = React.useReducer((state: State, action: Action) => {
    if (action.type in actionReducerMapping) {
      // @ts-ignore
      const reducer = actionReducerMapping[action.type];

      return reducer(state, action);
    }

    return state;
  }, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = (): State => {
  const { state } = React.useContext(AppContext);
  return state;
};

export const useAppDispatch = (): AppDispatch => {
  const { dispatch } = React.useContext(AppContext);
  return dispatch;
};
