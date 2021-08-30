import { State, useAppState, AppDispatch } from '.';
import { UserInfo } from '../types';

export type UserInfoAction = {
  type: string;
  info: UserInfo;
};

export const USER_INFO_SET_INFO = 'set-info';

export const UserInfoReducer = (state: State, action: UserInfoAction): any => {
  switch (action.type) {
    case USER_INFO_SET_INFO: {
      return {
        ...state,
        userInfo: action.info,
      };
    }
    default:
      return state;
  }
};

export const useUserInfo = (): UserInfo | undefined => {
  const { userInfo } = useAppState();
  return userInfo;
};

export const setUserInfo = (info: UserInfo, dispatch: AppDispatch): void => {
  dispatch({ type: USER_INFO_SET_INFO, info });
};
