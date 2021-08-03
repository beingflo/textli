import React, { Dispatch } from 'react';
import {
  NoteListEntry,
  NoteListReducer,
  NOTE_LIST_SET_NOTES,
} from './noteListReducer';
import {
  CurrentNoteReducer,
  CURRENT_NOTE_SET,
  Note,
} from './currentNoteReducer';
import { SpinnerReducer, SPINNER_SET_WAITING } from './spinnerReducer';

export type State = {
  waiting: number;
  noteList: Array<NoteListEntry>;
  currentNote: Note | undefined;
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
