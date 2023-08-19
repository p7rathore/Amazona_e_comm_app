import React, { useState } from "react";
import { useDispatch } from "react-redux";
import withRouter from "../HOC";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePayment } from "../actions/cartActions";

function PaymentScreen(props) {
  const { navigate } = props;
  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      setErrorMsg("Please select the payment method.");
      return;
    }
    dispatch(savePayment({ paymentMethod }));
    navigate("/placeorder");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Payment</h2>
            </li>
            <li>
              {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}
            </li>
            <li>
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paymentMethod"
                  value="paypal"
                  onChange={(e) => {
                    setErrorMsg("");
                    setPaymentMethod(e.target.value);
                  }}
                />
                <label htmlFor="paymentMethod">Paypal</label>
              </div>
            </li>
            <li>
              <button type="submit" className="button primary">
                {" "}
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}

export default withRouter(PaymentScreen);
