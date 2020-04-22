import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, verifyAuthSaga } from './auth';

export function* watchAuth() {
  yield takeEvery(actionTypes.INITIATE_LOGOUT_AUTH, logoutSaga);
  yield takeEvery(actionTypes.SAGA_INIT_VERIFY_AUTH, verifyAuthSaga);
}
