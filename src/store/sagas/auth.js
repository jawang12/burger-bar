import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions';
import { storeAuthInLS } from '../actions/auth';
import { FIREBASE_KEY } from '../../keys';

export function* logoutSaga(action) {
  yield localStorage.clear();
  //put just dispatches a new action
  yield put({
    type: actionTypes.LOGOUT_AUTH
  });
}

export function* verifyAuthSaga({ email, password, hasAccount }) {
  yield put(actions.initAuth());
  const body = {
    email,
    password,
    returnSecureToken: true
  };

  let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_KEY}`;
  if (!hasAccount) {
    url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_KEY}`;
  }
  try {
    const data = yield axios.post(url, body);
    storeAuthInLS(data.data.expiresIn, data.data.refreshToken);
    yield put(actions.verifiedAuth(data.data.idToken, data.data.localId));
    yield put(actions.thunkCheckAuthTimeout(data.data.expiresIn));
  } catch (err) {
    yield put(actions.failedAuth(err.response.data.error));
  }
}
