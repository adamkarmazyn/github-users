import { call, put, takeLatest } from 'redux-saga/effects';
import { GetUserByLoginStart, getUserByLoginFail, getUserByLoginSuccess } from '../../actions/userActions';
import { UserConstants } from '../../actions';
import octokit from '../Octokit';

const getUserByUsername = (username: string) => {
  return octokit.users
    .getByUsername({ username })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      return { error: "Can't get a user" };
    });
};

function* prepareSaga(actions: GetUserByLoginStart) {
  const result = yield call(getUserByUsername, actions.payload);
  const { error } = result;
  if (error) yield put(getUserByLoginFail(error));
  else yield put(getUserByLoginSuccess(result));
}

export function* watchGetUserByLogin(): Generator {
  yield takeLatest(UserConstants.USER_GET_BY_LOGIN_START, prepareSaga);
}
