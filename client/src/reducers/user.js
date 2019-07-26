import * as types from '../constants/ActionTypes';

const initialState = {
  isLogined: false,
  userInfo: {}
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case types.USER_INFO:
      alert(true);
      return Object.assign({}, state, {
        isLogined: true,
        userInfo: {
          ...action.palyoad
        }
      });
    case types.USER_LOGIN: {
      return { ...state };
    }
    case types.USER_LOGOUT:
      return { ...initialState };
      break;
    default:
      return state;
  }
}
