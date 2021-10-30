import React, { Dispatch } from 'react';
import {
  NoteListReducer,
  NOTE_LIST_ADD_NOTE,
  NOTE_LIST_DELETE_NOTE,
  NOTE_LIST_SET_NOTES,
} from './noteListReducer';
import {
  CurrentNoteReducer,
  CURRENT_NOTE_SET,
  CURRENT_NOTE_UPDATE,
} from './currentNoteReducer';
import { SpinnerReducer, SPINNER_SET_WAITING } from './spinnerReducer';
import { StatusReducer, STATUS_SET_STATUS } from './statusReducer';
import {
  Note,
  NoteListItem,
  NoteStatus,
  Share,
  Status,
  UserInfo,
} from '../types';
import { Editor } from '@tiptap/react';
import { atom } from 'jotai';

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

export type State = {
  waiting: number;
  noteList: Array<NoteListItem>;
  currentNote: Note | undefined;
  status: Status;
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
      [NOTE_LIST_ADD_NOTE]: NoteListReducer,
      [NOTE_LIST_DELETE_NOTE]: NoteListReducer,
      [SPINNER_SET_WAITING]: SpinnerReducer,
      [CURRENT_NOTE_SET]: CurrentNoteReducer,
      [CURRENT_NOTE_UPDATE]: CurrentNoteReducer,
      [STATUS_SET_STATUS]: StatusReducer,
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
