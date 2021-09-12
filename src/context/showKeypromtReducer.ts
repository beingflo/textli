import { State, useAppState, AppDispatch } from '.';

export type ShowKeypromtAction = {
  type: string;
  showKeyprompt: boolean;
};

export const KEYPROMPT_SET_SHOW_KEYPROMPT = 'set-show-keyprompt';

export const ShowKeypromptReducer = (
  state: State,
  action: ShowKeypromtAction
): any => {
  switch (action.type) {
    case KEYPROMPT_SET_SHOW_KEYPROMPT: {
      return {
        ...state,
        showKeyprompt: action.showKeyprompt,
      };
    }
    default:
      return state;
  }
};

export const useShowKeypromt = (): boolean => {
  const { showKeyprompt } = useAppState();
  return showKeyprompt;
};

export const setShowKeyprompt = (
  showKeyprompt: boolean,
  dispatch: AppDispatch
): void => {
  dispatch({ type: KEYPROMPT_SET_SHOW_KEYPROMPT, showKeyprompt });
};
