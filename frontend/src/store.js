// import {
//   legacy_createStore as createStore,
//   combineReducers,
//   compose,
//   applyMiddleware,
// } from "redux";
// import thunk from "redux-thunk";
// import Cookie from "js-cookie";

// import {
//   productDeleteReducer,
//   productDetailsReducer,
//   productListReducer,
//   productSaveReducer,
// } from "./reducers/productReducers";
// import { cartReducer } from "./reducers/cartReducers";
// import {
//   userRegisterReducer,
//   userSigninReducer,
// } from "./reducers/userReducers";

// const cartItems = Cookie.get("cartItems")
//   ? JSON.parse(Cookie.get("cartItems"))
//   : [];
// const userInfo = Cookie.get("userInfo")
//   ? JSON.parse(Cookie.get("userInfo"))
//   : null;

// const initialState = {
//   cart: { cartItems, shipping: {}, payment: {} },
//   userSignin: { userInfo },
// };
// const reducers = combineReducers({
//   productList: productListReducer,
//   productDetails: productDetailsReducer,
//   cart: cartReducer,
//   userSignin: userSigninReducer,
//   userRegister: userRegisterReducer,
//   productSave: productSaveReducer,
//   productDelete: productDeleteReducer,
// });

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENTIONS_COMPOSE__ || compose;
// const store = createStore(
//   reducers,
//   initialState,
//   composeEnhancer(applyMiddleware(thunk))
// );

// export default store;
// -----------------------------------------------------

import {
  legacy_createStore as createStore,
  combineReducers,
  compose,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import Cookie from "js-cookie";

import {
  productListReducer,
  productDetailsReducer,
  productSaveReducer,
  productDeleteReducer,
  productReviewSaveReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userSigninReducer,
  userRegisterReducer,
  userUpdateReducer,
  usersListReducer,
} from "./reducers/userReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  myOrderListReducer,
  orderListReducer,
  orderDeleteReducer,
} from "./reducers/orderReducers";

const cartItems = Cookie.get("cartItems")
  ? JSON.parse(Cookie.get("cartItems"))
  : [];
const userInfo = Cookie.get("userInfo")
  ? JSON.parse(Cookie.get("userInfo"))
  : null;
const users = Cookie.get("usersList")
  ? JSON.parse(Cookie.get("usersList"))
  : null;

const initialState = {
  cart: { cartItems, shipping: {}, payment: {} },
  userSignin: { userInfo },
  usersList: { users },
};
const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  productSave: productSaveReducer,
  productDelete: productDeleteReducer,
  productReviewSave: productReviewSaveReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  userUpdate: userUpdateReducer,
  myOrderList: myOrderListReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  usersList: usersListReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
