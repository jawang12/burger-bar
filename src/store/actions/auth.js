import { FIREBASE_KEY } from '../../keys';
import * as actionTypes from './actionTypes';
import axios from 'axios';

const initAuth = () => ({
  type: actionTypes.INIT_AUTH
});

const failedAuth = err => ({
  type: actionTypes.FAILED_AUTH,
  err
});

const verifiedAuth = (idToken, userId) => ({
  type: actionTypes.VERIFIED_AUTH,
  idToken,
  userId
});

export const thunkVerifyAuth = (
  email,
  password,
  hasAccount
) => async dispatch => {
  dispatch(initAuth());
  try {
    const body = {
      email,
      password
    };

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_KEY}`;
    if (!hasAccount) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_KEY}`;
    }

    const data = await axios.post(url, body);
    console.log(data);
    dispatch(verifiedAuth(data.data.idToken, data.data.localId));
  } catch (err) {
    dispatch(failedAuth(err.response.data.error));
  }
};
