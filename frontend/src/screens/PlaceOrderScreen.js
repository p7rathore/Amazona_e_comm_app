// import React, { useEffect } from "react";
// import withRouter from "../HOC";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import CheckoutSteps from "../components/CheckoutSteps";

// function PlaceOrderScreen(props) {
//   const { navigate } = props;
//   const cart = useSelector((state) => state.cart);
//   const { cartItems, shipping, payment } = cart;
//   if (!shipping.address) {
//     navigate("/shipping");
//   } else if (!payment.paymentMethod) {
//     navigate("/payment");
//   }

//   const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
//   const shippingPrice = itemsPrice > 100 ? 0 : 10;
//   const taxPrice = 0.15 * itemsPrice;
//   const totalPrice = itemsPrice + shippingPrice + taxPrice;
//   useEffect(() => {}, []);

//   const placeOrderHandler = () => {};
//   return (
//     <div>
//       <CheckoutSteps step1 step2 step3 step4 />
//       <div className="placeorder">
//         <div className="placeorder-info">
//           <div>
//             <h3>Shipping</h3>
//             <div>
//               {shipping?.address}, {shipping?.city},{shipping?.postalCode},
//               {shipping?.country}
//             </div>
//           </div>
//           <div>
//             <h3>Payment</h3>
//             <div>Payment Method: {payment?.paymentMethod}</div>
//           </div>
//           <div>
//             <ul className="cart-list-container">
//               <li>
//                 <h3>Shopping cart</h3>
//                 <div>Price</div>
//               </li>
//               {cartItems?.length === 0 ? (
//                 <div>cart is empty</div>
//               ) : (
//                 cartItems?.map((item) => (
//                   <li>
//                     <div className="cart-image">
//                       <img src={item.image} alt="product" />
//                     </div>
//                     <div className="cart-name">
//                       <Link to={"/product/" + item.product}>{item.name}</Link>
//                       <div>Qty:{item.qty}</div>
//                     </div>
//                     <div className="cart-price">${item.price}</div>
//                   </li>
//                 ))
//               )}
//             </ul>
//           </div>
//         </div>
//         <div className="placeorder-action">
//           <ul>
//             <li>
//               <button
//                 className="button primary full-width"
//                 onClick={placeOrderHandler}
//               >
//                 Place Order
//               </button>
//             </li>
//             <li>
//               <h3>Order Summary</h3>
//             </li>
//             <li>
//               <div>Items</div>
//               <div>${itemsPrice}</div>
//             </li>
//             <li>
//               <div>Shipping</div>
//               <div>${shippingPrice}</div>
//             </li>
//             <li>
//               <div>Tax</div>
//               <div>${taxPrice}</div>
//             </li>
//             <li>
//               <div>Order Total</div>
//               <div>${totalPrice}</div>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default withRouter(PlaceOrderScreen);

// ---------------------------------------

import React, { useEffect } from "react";
import withRouter from "../HOC";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";

function PlaceOrderScreen(props) {
  const { navigate } = props;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems, shipping, payment } = cart;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  if (!shipping.address) {
    navigate("/shipping");
  } else if (!payment.paymentMethod) {
    navigate("/payment");
  }

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  useEffect(() => {
    if (success) {
      navigate("/order/" + order._id);
    }
  }, [success]);

  const placeOrderHandler = () => {
    // create an order
    dispatch(
      createOrder({
        orderItems: cartItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>Shipping</h3>
            <div>
              {shipping?.address}, {shipping?.city},{shipping?.postalCode},
              {shipping?.country}
            </div>
          </div>
          <div>
            <h3>Payment</h3>
            <div>Payment Method: {payment?.paymentMethod}</div>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>Shopping cart</h3>
                <div>Price</div>
              </li>
              {cartItems?.length === 0 ? (
                <div>cart is empty</div>
              ) : (
                cartItems?.map((item) => (
                  <li>
                    <div className="cart-image">
                      <img src={item.image} alt="product" />
                    </div>
                    <div className="cart-name">
                      <Link to={"/product/" + item.product}>{item.name}</Link>
                      <div>Qty:{item.qty}</div>
                    </div>
                    <div className="cart-price">${item.price}</div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className="placeorder-action">
          <ul>
            <li>
              <button
                className="button primary full-width"
                onClick={placeOrderHandler}
              >
                Place Order
              </button>
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>${itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>${shippingPrice}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>${taxPrice}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>${totalPrice}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default withRouter(PlaceOrderScreen);
