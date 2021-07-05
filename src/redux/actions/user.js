import axios from "../../api/axios";

import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  CURRENT_USER,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "./types";

export const userRegister =
  (name, email, password,) =>
  async (dispatch) => {
    const body = { name, email, password, };
    try {
      const res = await axios.post("/user/signup", body);
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      let errors = "Network error";
      if (err.response) {
        errors = err.response.data.errors[0].msg;
      }
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: errors,
      });
    }
  };

export const loadUserData = () => async (dispatch) => {
  try {
    const res = await axios.get("/user/currentUser");
    dispatch({
      type: CURRENT_USER,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const userLogin = (email, password) => async (dispatch) => {
  const body = { email, password };
  try {
    const res = await axios.post("/user/signin", body);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUserData());
  } catch (err) {
    let errors = "Network error";
    if (err.response) {
      errors = err.response.data.errors[0].msg;
    }
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: errors,
    });
  }
};

export const logout = () => ({ type: USER_LOGOUT });
