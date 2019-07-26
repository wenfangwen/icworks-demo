import { USER_INFO, USER_LOGIN, USER_LOGOUT } from '../constants/ActionTypes';

/**
 * 用户登录
 * @param {*} payload
 */
export const dispatchLogin = payload => ({
  type: USER_LOGIN,
  payload: {
    ...payload
  }
});
