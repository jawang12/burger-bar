import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga } from './auth';

export function* watchAuth() {
  yield takeEvery(actionTypes.INITIATE_LOGOUT_AUTH, logoutSaga);
}
