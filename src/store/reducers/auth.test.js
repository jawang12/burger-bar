import authReducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('Auth Reducer', () => {
  it('should return an initial state if no args are passed', () => {
    const output = authReducer(undefined, {});
    expect(output).toEqual({
      idToken: '',
      userId: '',
      loading: false,
      error: null
    });
  });

  it('should return an object with a idToken and userId if authenticated', () => {
    expect(
      authReducer(undefined, {
        type: actionTypes.VERIFIED_AUTH,
        userId: 'jim',
        idToken: '123'
      })
    ).toEqual({
      idToken: '123',
      userId: 'jim',
      loading: false,
      error: null
    });
  });
});
