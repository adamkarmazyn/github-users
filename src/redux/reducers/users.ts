import { User } from '../../models';
import { UserActions } from '../actions/userActions';
import { UserConstants } from '../actions';

export interface UserState {
  users: User[];
  user: User | null;
  isLoading: boolean;
  error: string | undefined;
}

export const usersInitialState: UserState = {
  users: [],
  user: null,
  isLoading: false,
  error: undefined,
};

export const users = (state: UserState = usersInitialState, action: UserActions): UserState => {
  switch (action.type) {
    case UserConstants.USER_GET_ALL_START:
    case UserConstants.USER_GET_BY_LOGIN_START:
      return { ...state, isLoading: true, error: undefined };
    case UserConstants.USER_GET_ALL_SUCCESS:
      return { ...state, users: [...state.users, ...action.payload], isLoading: false, error: undefined };
    case UserConstants.USER_GET_BY_LOGIN_SUCCESS:
      return { ...state, user: action.payload, isLoading: false, error: undefined };
    case UserConstants.USER_GET_ALL_FAIL:
    case UserConstants.USER_GET_BY_LOGIN_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
