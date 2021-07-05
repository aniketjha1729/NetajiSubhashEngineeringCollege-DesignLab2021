import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  CURRENT_USER,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../actions/types";

const initialState = {
  userAuthToken: localStorage.getItem("usertoken"),
  isAuthenticated: false,
  user: null,
  errors: null,
  signupStatus: null,
};

function userAuthReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        userAuthToken: null,
        isAuthenticated: false,
        user: null,
        errors: payload,
      };
    case USER_LOGOUT:
      return {
        ...state,
        userAuthToken: null,
        isAuthenticated: false,
        user: null,
        errors: null,
        signupStatus: null,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        userAuthToken: null,
        isAuthenticated: false,
        user: null,
        signupStatus: payload.success[0].msg,
      };
    case USER_REGISTER_FAIL: {
      return {
        ...state,
        userAuthToken: null,
        isAuthenticated: false,
        user: null,
        signupStatus: null,
        errors: payload,
      };
    }
    default:
      return state;
  }
}

export default userAuthReducer;
