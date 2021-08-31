import { State, useAppState, AppDispatch } from '.';
import { Share } from '../types';

export type SharesAction = {
  type: string;
  shares: Array<Share>;
};

export const SHARES_SET_SHARES = 'set-shares';

export const SharesReducer = (state: State, action: SharesAction): any => {
  switch (action.type) {
    case SHARES_SET_SHARES: {
      return {
        ...state,
        shares: action.shares,
      };
    }
    default:
      return state;
  }
};

export const useShares = (): Array<Share> => {
  const { shares } = useAppState();
  return shares;
};

export const setShares = (
  shares: Array<Share>,
  dispatch: AppDispatch
): void => {
  dispatch({ type: SHARES_SET_SHARES, shares });
};
