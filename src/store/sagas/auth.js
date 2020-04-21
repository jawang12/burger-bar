import { put } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

export function* logoutSaga(action) {
  yield localStorage.clear();
  //put just dispatches a new action
  yield put({
    type: actionTypes.LOGOUT_AUTH
  });
}
