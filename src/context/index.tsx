import React from 'react';
import combineReducers from 'react-combine-reducers';
import { initialSpinnerState, SpinnerReducer } from './spinnerReducer';
import { NoteListReducer, initialNoteListState } from './noteListReducer';

export const AppContext = React.createContext({
  state: undefined,
  dispatch: undefined,
});

export const AppStateProvider = ({
  children,
}: {
  children: React.ReactElement;
}): React.ReactElement => {
  const [rootReducer, initialStateCombined] = combineReducers({
    spinner: [SpinnerReducer, initialSpinnerState],
    noteList: [NoteListReducer, initialNoteListState],
  });

  const [state, dispatch] = React.useReducer(rootReducer, initialStateCombined);

  return (
    // @ts-ignore
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = (): any => {
  const { state } = React.useContext(AppContext);
  return state;
};
