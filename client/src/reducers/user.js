import * as types from '../constants/ActionTypes';

const initialState = {
  isLogined: false,
  userInfo: {},
  isFetching: false
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_USER:
      return Object.assign({}, state, {
        isFetching: true
      });
    case types.USER_LOGIN:
      return Object.assign({}, state, {
        isLogined: true,
        isFetching: false,
        userInfo: action.payload
      });
    case types.USER_LOGIN_FAIL:
      return { ...initialState };
    case types.USER_LOGOUT:
      return { ...initialState };
      break;
    default:
      return state;
  }
}
