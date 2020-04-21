import { FIREBASE_KEY } from '../../keys';
import * as actionTypes from './actionTypes';
import axios from 'axios';

const initAuth = () => ({
  type: actionTypes.INIT_AUTH
});

const failedAuth = (err) => ({
  type: actionTypes.FAILED_AUTH,
  err
});

const verifiedAuth = (idToken, userId) => ({
  type: actionTypes.VERIFIED_AUTH,
  idToken,
  userId
});

let timer = null;

export const logout = () => {
  clearTimeout(timer);
  return {
    type: actionTypes.INITIATE_LOGOUT_AUTH
  };
};
export const thunkCheckAuthTimeout = (expTime) => (dispatch) => {
  timer = setTimeout(() => {
    dispatch(logout());
  }, +expTime * 1000);
};

export const thunkVerifyAuth = (email, password, hasAccount) => async (
  dispatch
) => {
  dispatch(initAuth());
  try {
    const body = {
      email,
      password,
      returnSecureToken: true
    };

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_KEY}`;
    if (!hasAccount) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_KEY}`;
    }

    const data = await axios.post(url, body);
    console.log(data);
    storeAuthInLS(data.data.expiresIn, data.data.refreshToken);
    dispatch(verifiedAuth(data.data.idToken, data.data.localId));
    dispatch(thunkCheckAuthTimeout(data.data.expiresIn));
  } catch (err) {
    dispatch(failedAuth(err.response.data.error));
  }
};

export const thunkCheckRefreshToken = () => async (dispatch) => {
  const token = localStorage.getItem('refreshToken');
  if (!token) return;
  const currentTime = new Date();
  //returns from local storage as a string
  const expirationTime = new Date(localStorage.getItem('expirationTime'));
  if (expirationTime < currentTime) {
    return dispatch(logout());
  }
  try {
    const body = {
      grant_type: 'refresh_token',
      refresh_token: localStorage.getItem('refreshToken')
    };
    const data = await axios.post(
      `https://securetoken.googleapis.com/v1/token?key=${FIREBASE_KEY}`,
      body
    );
    storeAuthInLS(data.data.expires_in, data.data.refresh_token);
    dispatch(verifiedAuth(data.data.id_token, data.data.user_id));
    dispatch(thunkCheckAuthTimeout(data.data.expires_in));
  } catch (err) {
    console.error(err);
  }
};

function storeAuthInLS(expTime, refreshToken) {
  const expirationTime = new Date(Date.now() + +expTime * 1000);
  localStorage.setItem('expirationTime', expirationTime);
  localStorage.setItem('refreshToken', refreshToken);
}
