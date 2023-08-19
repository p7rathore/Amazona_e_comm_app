// import {
//   USER_REGISTER_FAIL,
//   USER_REGISTER_REQUEST,
//   USER_REGISTER_SUCCESS,
//   USER_SIGNIN_FAIL,
//   USER_SIGNIN_REQUEST,
//   USER_SIGNIN_SUCCESS,
// } from "../constants/userConstants";

// const userSigninReducer = (state = {}, action) => {
//   const { type, payload } = action;
//   switch (type) {
//     case USER_SIGNIN_REQUEST:
//       return { loading: true };
//     case USER_SIGNIN_SUCCESS:
//       return { loading: false, userInfo: payload };
//     case USER_SIGNIN_FAIL:
//       return { loading: false, error: payload };
//     default:
//       return state;
//   }
// };

// const userRegisterReducer = (state = {}, action) => {
//   const { type, payload } = action;
//   switch (type) {
//     case USER_REGISTER_REQUEST:
//       return { loading: true };
//     case USER_REGISTER_SUCCESS:
//       return { loading: false, userInfo: payload };
//     case USER_REGISTER_FAIL:
//       return { loading: false, error: payload };
//     default:
//       return state;
//   }
// };

// export { userSigninReducer, userRegisterReducer };

// ------------------------

import {
  GET_USERS_FAIL,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
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

const userSigninReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

const userRegisterReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

// ----------

function userUpdateReducer(state = {}, action) {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function usersListReducer(state = {}, action) {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return { loading: true };
    case GET_USERS_SUCCESS:
      return { loading: false, users: action.payload };
    case GET_USERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export {
  userSigninReducer,
  userRegisterReducer,
  userUpdateReducer,
  usersListReducer,
};
