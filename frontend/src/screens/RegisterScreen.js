import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import withRouter from "../HOC";

import { register } from "../actions/userActions";
import PasswordChecks from "../components/PwdChecks";

function RegisterScreen(props) {
  const { location, navigate } = props;
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate("/" + (redirect === "/" ? "" : redirect));
    }
  }, [userInfo]);

  const validation = () => {
    let error = false;

    const emailRegx = new RegExp("^[a-zA-Zd.-]+@[a-zA-Zd.-]+.[a-zA-Z]{2,}$");
    const passwordRegx = new RegExp(
      "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$"
    );
    if (!name) {
      setErrorMsg("Please enter name");
      error = true;
    } else if (!email) {
      setErrorMsg("Please enter email");
      error = true;
    } else if (email && !emailRegx.test(email)) {
      setErrorMsg("Please enter valid email");
      error = true;
    } else if (!password) {
      setErrorMsg("Please enter password");
      error = true;
    } else if (password && !passwordRegx.test(password)) {
      setErrorMsg("Please enter valid password");
      error = true;
    } else if (password !== rePassword) {
      setErrorMsg("Please enter same password");
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
    dispatch(register(name, email, password));
  };
  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Create Account</h2>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div style={{ color: "red" }}>{error}</div>}
            {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}
          </li>
          <li>
            <label htmlFor="name">
              Name<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="email">
              Email<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="password">
              Password<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <PasswordChecks password={password} />

          <li>
            <label htmlFor="rePassword">
              Re-Enter Password<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="password"
              name="repassword"
              id="rePassword"
              onChange={(e) => setRePassword(e.target.value)}
            />
          </li>
          <li>
            <button type="submit" className="button primary">
              {" "}
              Register
            </button>
          </li>
          <li>
            Already Have an account?
            <Link
              to={redirect === "/" ? "/signin" : "/signin?redirect=" + redirect}
            >
              Sign-in
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default withRouter(RegisterScreen);
