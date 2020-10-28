import { UserConstants } from './userConstants';
import { User } from '../../models';

export type Params = { since: string };

export interface GetAllUsersStart {
  type: typeof UserConstants.USER_GET_ALL_START;
  payload?: Params;
}

export const getAllUsersStart = (params?: Params): GetAllUsersStart => ({
  type: UserConstants.USER_GET_ALL_START,
  payload: params,
});

export interface GetAllUsersFail {
  type: typeof UserConstants.USER_GET_ALL_FAIL;
  payload: string;
}

export const getAllUsersFail = (error: string): GetAllUsersFail => ({
  type: UserConstants.USER_GET_ALL_FAIL,
  payload: error,
});

export interface GetAllUsersSuccess {
  type: typeof UserConstants.USER_GET_ALL_SUCCESS;
  payload: User[];
}

export const getAllUsersSuccess = (users: User[]): GetAllUsersSuccess => ({
  type: UserConstants.USER_GET_ALL_SUCCESS,
  payload: users,
});

// by login
export interface GetUserByLoginStart {
  type: typeof UserConstants.USER_GET_BY_LOGIN_START;
  payload: string;
}

export const getUserByLoginStart = (login: string): GetUserByLoginStart => ({
  type: UserConstants.USER_GET_BY_LOGIN_START,
  payload: login,
});

export interface GetUserByLoginFail {
  type: typeof UserConstants.USER_GET_BY_LOGIN_FAIL;
  payload: string;
}

export const getUserByLoginFail = (error: string): GetUserByLoginFail => ({
  type: UserConstants.USER_GET_BY_LOGIN_FAIL,
  payload: error,
});

export interface GetUserByLoginSuccess {
  type: typeof UserConstants.USER_GET_BY_LOGIN_SUCCESS;
  payload: User | null;
}

export const getUserByLoginSuccess = (user: User | null): GetUserByLoginSuccess => ({
  type: UserConstants.USER_GET_BY_LOGIN_SUCCESS,
  payload: user,
});

export type UserActions =
  | GetAllUsersStart
  | GetAllUsersFail
  | GetAllUsersSuccess
  | GetUserByLoginStart
  | GetUserByLoginSuccess
  | GetUserByLoginFail;
