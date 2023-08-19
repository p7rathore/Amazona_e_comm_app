import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { logout, update } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import withRouter from "../HOC";
import PasswordChecks from "../components/PwdChecks";
import { logout, update } from "../actions/userActions";

function ProfileScreen(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, success, error } = userUpdate;

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
    props.navigate("/signin");
  };

  const validation = () => {
    let error = false;

    const emailRegx = new RegExp(
      "^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
    );
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
    }
    return error;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const hasError = validation();
    if (hasError) {
      return;
    }
    dispatch(update({ userId: userInfo._id, email, name, password }));
  };

  const myOrderList = useSelector((state) => state.myOrderList);
  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;
  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email);
      setName(userInfo.name);
      setPassword(userInfo.password);
    }
    dispatch(listMyOrders());
    return () => {};
  }, [userInfo]);

  return (
    <div className="profile">
      <div className="profile-info">
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>User Profile</h2>
              </li>

              <li>
                {loading && <div>Loading...</div>}
                {error && <div style={{ color: "red" }}>{error}</div>}
                {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}
                {success && <div>Profile Saved Successfully.</div>}
              </li>
              <li>
                <label htmlFor="name">Name</label>
                <input
                  value={name}
                  type="name"
                  name="name"
                  id="name"
                  onChange={(e) => {
                    setErrorMsg("");
                    setName(e.target.value);
                  }}
                ></input>
              </li>
              <li>
                <label htmlFor="email">Email</label>
                <input
                  value={email}
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => {
                    setErrorMsg("");
                    setEmail(e.target.value);
                  }}
                ></input>
              </li>
              <li>
                <label htmlFor="password">Password</label>
                <input
                  value={password}
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => {
                    setErrorMsg("");
                    setPassword(e.target.value);
                  }}
                ></input>
              </li>
              <PasswordChecks password={password} />
              <li>
                <button type="submit" className="button primary">
                  Update
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="button secondary full-width"
                >
                  Logout
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
      {orders && orders.length !== 0 && (
        <div className="profile-orders content-margined">
          {loadingOrders ? (
            <div>Loading...</div>
          ) : errorOrders ? (
            <div>{errorOrders} </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.isPaid}</td>
                    <td>
                      <Link to={"/order/" + order._id}>DETAILS</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default withRouter(ProfileScreen);
