// import { Route, Routes, Link, Navigate } from "react-router-dom";
// import "./App.css";
// import HomeScreen from "./screens/HomeScreen";
// import ProductScreen from "./screens/ProductScreen";
// import CartScreen from "./screens/CartScreen";
// import SigninScreen from "./screens/SignInScreen";
// import { useSelector } from "react-redux";
// import RegisterScreen from "./screens/RegisterScreen";
// import ProductsScreen from "./screens/ProductsScreen";
// import ShippingScreen from "./screens/ShippingScreen";
// import PaymentScreen from "./screens/PaymentScreen";
// import PlaceOrderScreen from "./screens/PlaceOrderScreen";

// function App() {
//   const userSignin = useSelector((state) => state.userSignin);
//   const { userInfo } = userSignin;

//   const openMenu = () => {
//     document.querySelector(".sidebar").classList.add("open");
//   };
//   const closeMenu = () => {
//     document.querySelector(".sidebar").classList.remove("open");
//   };
//   return (
//     <div className="">
//       <header className="header">
//         <div className="brand">
//           <button onClick={openMenu}>&#9776;</button>
//           <Link to="/">amazona</Link>
//         </div>
//         <div className="header-links">
//           <a href="cart.html">Cart</a>
//           {userInfo ? (
//             <Link to="/profile">{userInfo.name}</Link>
//           ) : (
//             <Link to="/signin">Sign In</Link>
//           )}
//         </div>
//       </header>
//       <aside className="sidebar">
//         <h3>shoping Category</h3>
//         <button className="sidebar-close-button" onClick={closeMenu}>
//           x
//         </button>
//         <ul>
//           <li>
//             <a href="">Pants</a>
//           </li>
//           <li>
//             <a href="">Shirts</a>
//           </li>
//         </ul>
//       </aside>
//       <Routes>
//         <Route path="/" element={<HomeScreen />} />
//         <Route path="/product/:id" element={<ProductScreen />} />
//         <Route path="/cart/:id?" element={<CartScreen />} />
//         <Route path="/signin" element={<SigninScreen />} />
//         <Route path="/register" element={<RegisterScreen />} />
//         <Route path="/products" element={<ProductsScreen />} />
//         <Route path="/shipping" element={<ShippingScreen />} />
//         <Route path="/payment" element={<PaymentScreen />} />
//         <Route path="/placeorder" element={<PlaceOrderScreen />} />

//         {/* <Route path="*" element={<Navigate to="/" />} /> */}
//       </Routes>
//       <footer className="footer">All right reserved.</footer>
//     </div>
//   );
// }

// export default App;

// -----------------------------------------

import { Route, Routes, Link, Navigate } from "react-router-dom";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SignInScreen";
import { useSelector } from "react-redux";
import RegisterScreen from "./screens/RegisterScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrdersScreen from "./screens/OrdersScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrderScreen from "./screens/OrderScreen";
import ForgetPasswordScreen from "./screens/ForgetPasswordScreen";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };
  return (
    <div className="grid-container">
      <header className="header">
        <div className="brand">
          <button onClick={openMenu}>&#9776;</button>
          <Link to="/">amazona</Link>
        </div>
        <div className="header-links">
          <a href="cart.html">Cart</a>
          {userInfo ? (
            <Link to="/profile">{userInfo.name}</Link>
          ) : (
            <Link to="/signin">Sign In</Link>
          )}
          {userInfo && userInfo.isAdmin && (
            <div className="dropdown">
              <a href="#">Admin</a>
              <ul className="dropdown-content">
                <li>
                  <Link to="/orders">Orders</Link>
                  <Link to="/products">Products</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
      <aside className="sidebar">
        <h3>Shopping Categories</h3>
        <button className="sidebar-close-button" onClick={closeMenu}>
          x
        </button>
        <ul className="categories">
          <li>
            <Link to="/category/shirts">Shirts</Link>
          </li>
          <li>
            <Link to="/category/pants">Pants</Link>
          </li>
          <li>
            <Link to="/category/Suits">Suits</Link>
          </li>
          <li>
            <Link to="/category/jackets">Jackets</Link>
          </li>
        </ul>
      </aside>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/cart/:id?" element={<CartScreen />} />
        <Route path="/signin" element={<SigninScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/products" element={<ProductsScreen />} />
        <Route
          path="/shipping"
          element={
            <ProtectedRoute userInfo={userInfo}>
              <ShippingScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute userInfo={userInfo}>
              <PaymentScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/placeorder"
          element={
            <ProtectedRoute userInfo={userInfo}>
              <PlaceOrderScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute userInfo={userInfo}>
              <OrdersScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute userInfo={userInfo}>
              <ProfileScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute userInfo={userInfo}>
              <OrderScreen />
            </ProtectedRoute>
          }
        />
        <Route path="/category/:id" element={<HomeScreen />} />
        <Route
          path="/forget-password/:emailId"
          element={<ForgetPasswordScreen />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <footer className="footer">All right reserved.</footer>
    </div>
  );
}

export default App;
