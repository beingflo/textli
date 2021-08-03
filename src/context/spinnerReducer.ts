import { State, useAppState, AppDispatch } from '.';

export type SpinnerAction = {
  type: string;
  waiting: boolean;
};

export const SPINNER_SET_WAITING = 'set-waiting';

export const SpinnerReducer = (state: State, action: SpinnerAction): any => {
  switch (action.type) {
    case SPINNER_SET_WAITING: {
      return {
        ...state,
        waiting: Math.max(state.waiting + (action.waiting ? 1 : -1), 0),
      };
    }
    default:
      return state;
  }
};

export const useSpinner = (): boolean => {
  const { waiting } = useAppState();
  console.log(waiting);
  return waiting > 0;
};

export const setSpinner = (waiting: boolean, dispatch: AppDispatch): void => {
  dispatch({ type: SPINNER_SET_WAITING, waiting });
};
