import { usersInitialState, UserState } from './reducers/users';

export interface State {
  users: UserState;
}

export const initialState: State = {
  users: usersInitialState,
};
