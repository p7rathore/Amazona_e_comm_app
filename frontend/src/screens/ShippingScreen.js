import React, { useState } from "react";
import { useDispatch } from "react-redux";
import withRouter from "../HOC";
import { saveShipping } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingScreen(props) {
  const { navigate } = props;
  const dispatch = useDispatch();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const validation = () => {
    let error = false;
    if (!address) {
      setErrorMsg("Please enter address");
      error = true;
    } else if (!city) {
      setErrorMsg("Please enter city");
      error = true;
    } else if (!postalCode) {
      setErrorMsg("Please enter city");
      error = true;
    } else if (!country) {
      setErrorMsg("Please enter city");
      error = true;
    }
    return error;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const hasError = validation();
    if (hasError) {
      return;
    }
    dispatch(saveShipping({ address, city, postalCode, country }));
    navigate("/payment");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 />
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Shipping</h2>
            </li>
            <li>
              {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}
            </li>
            <li>
              <label htmlFor="address">
                Address<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="address"
                id="address"
                onChange={(e) => {
                  setErrorMsg("");
                  setAddress(e.target.value);
                }}
              />
            </li>
            <li>
              <label htmlFor="city">
                City<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="city"
                id="city"
                onChange={(e) => {
                  setErrorMsg("");
                  setCity(e.target.value);
                }}
              />
            </li>
            <li>
              <label htmlFor="postalCode">
                Postal Code<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="postalCode"
                id="postalCode"
                onChange={(e) => {
                  setErrorMsg("");
                  setPostalCode(e.target.value);
                }}
              />
            </li>
            <li>
              <label htmlFor="country">
                Country<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="country"
                id="country"
                onChange={(e) => {
                  setErrorMsg("");
                  setCountry(e.target.value);
                }}
              />
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

export default withRouter(ShippingScreen);
