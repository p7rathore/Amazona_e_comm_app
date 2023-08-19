import React, { useEffect } from "react";
import withRouter from "../HOC";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeToCart } from "../actions/cartActions";
import { Link } from "react-router-dom";

function CartScreen(props) {
  const { params, location, navigate } = props;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const productId = params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = () => {
      if (productId) {
        dispatch(addToCart(productId, qty));
      }
    };
    fetchProduct();
  }, []);

  const removeFromCartHandler = (prodId) => {
    dispatch(removeToCart(prodId));
  };

  const checkoutHandler = () => {
    console.log("cartscreen");
    navigate("/signin?redirect=shipping");
  };
  return (
    <div className="cart">
      <div className="cart-list">
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
                  <div>
                    Qty:
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, +e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="cart-price">${item.price}</div>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="cart-action">
        <h3>
          Subtotal({cartItems?.reduce((a, c) => a + c.qty, 0)} items) : ${" "}
          {cartItems?.reduce((a, c) => a + c.price * c.qty, 0)}
        </h3>
        <button
          className="button primary full-width"
          disabled={cartItems?.length === 0}
          onClick={checkoutHandler}
        >
          {" "}
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default withRouter(CartScreen);
