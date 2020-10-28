import { call, put, takeLatest } from 'redux-saga/effects';
import { GetUserByLoginStart, getUserByLoginFail, getUserByLoginSuccess } from '../../actions/userActions';
import { UserConstants } from '../../actions';
import octokit from '../Octokit';

const getUserByUsername = (username: string) => {
  return octokit.users
    .getByUsername({ username })
    .then((response) => {
      console.warn(response);
      return response.data;
    })
    .catch((err) => {
      console.warn(err);
      return { error: "Can't get all users" };
    });
};

function* prepareSaga(actions: GetUserByLoginStart) {
  const result = yield call(getUserByUsername, actions.payload);
  console.warn(result);
  const { error } = result;
  if (error) yield put(getUserByLoginFail(error));
  else yield put(getUserByLoginSuccess(result));
}

export function* watchGetUserByLogin() {
  yield takeLatest(UserConstants.USER_GET_BY_LOGIN_START, prepareSaga);
}
