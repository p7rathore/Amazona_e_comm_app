// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { listProducts } from "../actions/productActions";
// import withRouter from "../HOC";

// function HomeScreen(props) {
//   console.log(props);
//   const productList = useSelector((state) => state.productList);
//   const { products, loading, error } = productList;
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchProducts = () => {
//       dispatch(listProducts());
//     };
//     fetchProducts();
//   }, []);

//   return (
//     <main className="main">
//       {loading ? (
//         <div>Loading...</div>
//       ) : error ? (
//         <div>{error}</div>
//       ) : (
//         <div className="content">
//           <ul className="products">
//             {products.map((product) => (
//               <li key={product._id}>
//                 <div className="product">
//                   <Link to={`/product/${product._id}`}>
//                     <img
//                       src={product.image}
//                       className="product-img"
//                       alt="Product"
//                     />
//                   </Link>
//                   <div className="product-name">
//                     <Link to={`/product/${product._id}`}>{product.name}</Link>
//                   </div>
//                   <div className="product-brand">{product.brand}</div>
//                   <div className="product-price">${product.price}</div>
//                   <div className="product-rating">
//                     {" "}
//                     {product.rating} Stars ({product.reviews} reviews)
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </main>
//   );
// }

// export default withRouter(HomeScreen);

// -------------------------------------------------

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

import withRouter from "../HOC";
import Rating from "../components/Rating";

function HomeScreen(props) {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  // ------------

  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  let category = props.params.id ? props.params.id.toLowerCase() : "";
  useEffect(() => {
    dispatch(listProducts(category));
  }, [category]);

  // --------------
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   setSearchKeyword(value);
  //   dispatch(listProducts(category, value, sortOrder));
  // };

  // const debounce = (handleChange) => {
  //   let timeout;
  //   return function (e) {
  //     if (timeout) clearTimeout(timeout);
  //     timeout = setTimeout(() => handleChange(e), 1000);
  //   };
  // };

  // const optimizeFun = useCallback(debounce(handleChange), []);
  return (
    // <main className="main">
    //   {loading ? (
    //     <div>Loading...</div>
    //   ) : error ? (
    //     <div>{error}</div>
    //   ) : (
    //     <div className="content">
    //       <ul className="products">
    //         {products.map((product) => (
    //           <li key={product._id}>
    //             <div className="product">
    //               <Link to={`/product/${product._id}`}>
    //                 <img
    //                   src={product.image}
    //                   className="product-img"
    //                   alt="Product"
    //                 />
    //               </Link>
    //               <div className="product-name">
    //                 <Link to={`/product/${product._id}`}>{product.name}</Link>
    //               </div>
    //               <div className="product-brand">{product.brand}</div>
    //               <div className="product-price">${product.price}</div>
    //               <div className="product-rating">
    //                 {" "}
    //                 {product.rating} Stars ({product.reviews} reviews)
    //               </div>
    //             </div>
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   )}
    // </main>

    // -----------

    <div>
      {category && <h2 style={{ textTransform: "capitalize" }}>{category}</h2>}

      <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input
              placeholder="Search product..."
              name="searchKeyword"
              // onChange={(e) => optimizeFun(e)}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </li>
        <li>
          Sort By{" "}
          <select name="sortOrder" onChange={sortHandler}>
            <option value="">Newest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </li>
      </ul>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ul className="products">
          {products.map((product) => (
            <li key={product._id}>
              <div className="product">
                <Link to={"/product/" + product._id}>
                  <img
                    className="product-image"
                    src={product.image}
                    alt="product"
                  />
                </Link>
                <div className="product-name">
                  <Link to={"/product/" + product._id}>{product.name}</Link>
                </div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">${product.price}</div>
                <div className="product-rating">
                  <Rating
                    value={product.rating}
                    text={product.numReviews + " reviews"}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default withRouter(HomeScreen);
