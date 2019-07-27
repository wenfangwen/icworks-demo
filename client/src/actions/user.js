import { USER_INFO, USER_LOGIN, USER_LOGOUT, FETCH_USER, USER_LOGIN_FAIL } from '../constants/ActionTypes';
import fetch from 'cross-fetch';
import { Message } from '@alifd/next';

/**
 * 登录成功
 * @param {*} payload
 */
const loginSuccess = payload => ({
  type: USER_LOGIN,
  payload: {
    ...payload
  }
});

/**
 * 用户登录
 * @param {*} payload
 */
const loginBefore = payload => ({
  type: FETCH_USER
});

/**
 * 登录失败
 * @param {*} payload
 */
const loginFail = payload => ({
  type: USER_LOGIN_FAIL
});

export const fetchLogin = payload => {
  return dispatch => {
    dispatch(loginBefore());
    return fetch(`https://api.github.com/users/${payload.username}`)
      .then(response => response.json())
      .then(json => {
        if (json.login === 'wenfangwen') {
          Message.success('登录成功');
          dispatch(loginSuccess(json));
        } else {
          dispatch(loginFail());
          Message.error('登录失败');
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
};

/**
 * 退出登录
 * @param {*} payload
 */
export const dispatchLogout = payload => ({
  type: USER_LOGOUT
});
