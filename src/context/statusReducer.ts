import { State, useAppState, AppDispatch } from '.';
import { Status } from '../types';

export type StatusAction = {
  type: string;
  status: Status;
};

export const STATUS_SET_STATUS = 'set-status';

export const StatusReducer = (state: State, action: StatusAction): any => {
  switch (action.type) {
    case STATUS_SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    default:
      return state;
  }
};

export const useStatus = (): Status => {
  const { status } = useAppState();
  return status;
};

export const setStatus = (status: Status, dispatch: AppDispatch): void => {
  dispatch({ type: STATUS_SET_STATUS, status });
};
