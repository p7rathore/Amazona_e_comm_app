import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT,
  CART_SAVE_SHIPPING,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shipping: {}, payment: {} },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ADD_ITEM:
      const item = payload;
      const product = state.cartItems.find((x) => x.product === item.product);
      if (product) {
        return {
          cartItems: state.cartItems.map((x) =>
            x.product === product.product ? item : x
          ),
        };
      }
      // if (product) {
      //   return {
      //     cartItems: state.cartItems.map((x) =>
      //       x.product === product.product ? product : x
      //     ),
      //   };
      // }
      return { cartItems: [...state.cartItems, item] };
    case CART_REMOVE_ITEM:
      return {
        cartItems: state.cartItems.filter((item) => item.product !== payload),
      };
    case CART_SAVE_SHIPPING:
      return {
        ...state,
        shipping: payload,
      };
    case CART_SAVE_PAYMENT:
      return {
        ...state,
        payment: payload,
      };
    default:
      return state;
  }
};
