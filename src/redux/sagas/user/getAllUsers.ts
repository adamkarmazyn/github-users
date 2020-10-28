import { call, put, takeLatest } from 'redux-saga/effects';
import { getAllUsersFail, getAllUsersSuccess, Params, GetAllUsersStart } from '../../actions/userActions';
import { UserConstants } from '../../actions';
import octokit from '../Octokit';

const getAllUsers = (params?: Params) => {
  return octokit.users
    .list(params)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      return { error: "Can't get all users" };
    });
};

function* prepareSaga(actions: GetAllUsersStart) {
  const result = yield call(getAllUsers, actions.payload);
  const { error } = result;
  if (error) yield put(getAllUsersFail(error));
  else yield put(getAllUsersSuccess(result));
}

export function* watchGetAllUsers(): Generator {
  yield takeLatest(UserConstants.USER_GET_ALL_START, prepareSaga);
}
