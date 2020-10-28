import { fork } from 'redux-saga/effects';
import { watchGetAllUsers } from './user/getAllUsers';
import { watchGetUserByLogin } from './user/getUserByLogin';

export function* rootSaga() {
  yield fork(watchGetAllUsers);
  yield fork(watchGetUserByLogin);
}
