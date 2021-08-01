import { useAppState } from '.';

export type SpinnerState = {
  waiting: boolean;
};

export type SpinnerAction = {
  type: string;
  waiting: boolean;
};

export const SpinnerActions = {
  SET_WAITING: 'set-waiting',
};

export const initialSpinnerState = {
  waiting: false,
};

export const SpinnerReducer = (
  state: SpinnerState,
  action: SpinnerAction
): any => {
  switch (action.type) {
    case SpinnerActions.SET_WAITING: {
      return {
        ...state,
        waiting: action.waiting,
      };
    }
    default:
      return state;
  }
};

export const useSpinner = (): any => {
  const { spinner } = useAppState();

  return spinner;
};
