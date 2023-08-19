import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import withRouter from "../HOC";

import { signin } from "../actions/userActions";

function SigninScreen(props) {
  const { location, navigate } = props;
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    if (!email) {
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
    }
    return error;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // const hasError = validation();
    // if (hasError) {
    //   return;
    // }
    dispatch(signin(email, password));
  };
  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Sign-In</h2>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && (
              <div style={{ color: "red" }}>
                {error.includes("401") ? "Invaild Email or Password." : error}
              </div>
            )}
            {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={(e) => {
                setErrorMsg("");
                setEmail(e.target.value);
              }}
            />
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => {
                setErrorMsg("");
                setPassword(e.target.value);
              }}
            />
            <div>
              <Link to={"/forget-password/" + email}>Forget Password</Link>
            </div>
          </li>
          <li>
            <button type="submit" className="button primary">
              {" "}
              Sign in
            </button>
          </li>
          <li>New to amazona?</li>
          <li>
            <Link
              to={
                redirect === "/"
                  ? "/register"
                  : "/register?redirect=" + redirect
              }
              className="button secondary text-center"
            >
              Create your amazona account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default withRouter(SigninScreen);
