import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import withRouter from "../HOC";

import { getUsers, update, updatePassword } from "../actions/userActions";
import PasswordChecks from "../components/PwdChecks";

function ForgetPasswordScreen(props) {
  const { location, navigate, params } = props;
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const usersList = useSelector((state) => state.usersList);
  const { users, loading, error } = usersList;
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    } else {
      dispatch(getUsers());
    }
  }, []);

  const validation = () => {
    let error = false;
    const passwordRegx = new RegExp(
      "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$"
    );
    if (!password) {
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
    const userDetail = users.filter((user) => user.email === params.emailId);
    if (userDetail.length) {
      dispatch(
        updatePassword({
          userId: userDetail[0]._id,
          email: userDetail[0].email,
          name: userDetail[0].name,
          password: password,
        })
      );
      navigate("/signin");
    } else {
      alert("User not exsist");
    }
  };
  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Set New Password</h2>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div style={{ color: "red" }}>{error}</div>}
            {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}
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
          </li>
          <PasswordChecks password={password} />
          <li>
            <label htmlFor="rePassword">Re-Enter Password</label>
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
              Set Password
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => navigate("/signin")}
              className="button secondary"
            >
              Back
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default withRouter(ForgetPasswordScreen);
