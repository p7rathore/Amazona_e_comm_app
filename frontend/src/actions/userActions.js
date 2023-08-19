// import axios from "axios";
// import Cookie from "js-cookie";
// import {
//   USER_REGISTER_FAIL,
//   USER_REGISTER_REQUEST,
//   USER_REGISTER_SUCCESS,
//   USER_SIGNIN_FAIL,
//   USER_SIGNIN_REQUEST,
//   USER_SIGNIN_SUCCESS,
// } from "../constants/userConstants";

// export const signin = (email, password) => async (dispatch) => {
//   dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
//   try {
//     const { data } = await axios.post("/api/users/signin", { email, password });
//     dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
//     Cookie.set("userInfo", JSON.stringify(data));
//   } catch (error) {
//     dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
//   }
// };

// export const register = (name, email, password) => async (dispatch) => {
//   dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
//   try {
//     const { data } = await axios.post("/api/users/register", {
//       name,
//       email,
//       password,
//     });
//     dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
//     Cookie.set("userInfo", JSON.stringify(data));
//   } catch (error) {
//     dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
//   }
// };

// --------------------------

import axios from "axios";
import Cookie from "js-cookie";
import {
  GET_USERS_FAIL,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post("/api/users/signin", { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
  }
};

const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
  try {
    const { data } = await axios.post("/api/users/register", {
      name,
      email,
      password,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    window.location.reload();
    Cookie.set("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
};

// ------

const update =
  ({ userId, name, email, password }) =>
  async (dispatch, getState) => {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch({
      type: USER_UPDATE_REQUEST,
      payload: { userId, name, email, password },
    });
    try {
      const { data } = await axios.put(
        "/api/users/" + userId,
        { name, email, password },
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      );
      window.location.reload();
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
      Cookie.set("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
    }
  };

const logout = () => (dispatch) => {
  Cookie.remove("userInfo");
  dispatch({ type: USER_LOGOUT });
};
// ----My addition
const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USERS_REQUEST });
    const { data } = await axios.get("/api/users");
    if (data) {
      dispatch({ type: GET_USERS_SUCCESS, payload: data });
      Cookie.set("usersList", JSON.stringify(data));
    }
  } catch (error) {
    dispatch({ type: GET_USERS_FAIL, payload: error.message });
  }
};

const updatePassword =
  ({ userId, name, email, password }) =>
  async (dispatch) => {
    dispatch({
      type: USER_UPDATE_REQUEST,
      payload: { userId, name, email, password },
    });
    try {
      const { data } = await axios.put("/api/users/" + userId, {
        name,
        email,
        password,
      });
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
    }
  };

export { signin, register, logout, update, getUsers, updatePassword };
