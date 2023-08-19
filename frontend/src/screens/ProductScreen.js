// import React, { useEffect, useState } from "react";
// import withRouter from "../HOC";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { detailsProduct } from "../actions/productActions";

// function ProductScreen(props) {
//   const dispatch = useDispatch();
//   const productDetails = useSelector((state) => state.productDetails);
//   const { product, loading, error } = productDetails;
//   console.log(props);
//   const [qty, setQty] = useState(1);
//   useEffect(() => {
//     dispatch(detailsProduct(props.params.id));
//   }, []);

//   const handleAddToCart = () => {
//     props.navigate("/cart/" + props.params.id + "?qty=" + qty);
//   };
//   return (
//     <div>
//       <div className="back-to-result">
//         <Link to="/">back to result</Link>
//       </div>
//       {loading ? (
//         <div>Loading...</div>
//       ) : error ? (
//         <div>{error}</div>
//       ) : (
//         <div className="details">
//           <div className="details-image">
//             <img src={product.image} alt="img" />
//           </div>
//           <div className="details-info">
//             <ul>
//               <li>
//                 <h4>{product.name}</h4>
//               </li>
//               <li>
//                 {product.rating} Stars ({product.reviews} Reviews)
//               </li>
//               <li>
//                 Price: <b>${product.price}</b>
//               </li>
//               <li>
//                 Description:<div>{product.description}</div>
//               </li>
//             </ul>
//           </div>

//           <div className="details-action">
//             <ul>
//               <li>Price: ${product.price}</li>
//               <li>
//                 Status:
//                 {product.countInStock > 0 ? " In Stock" : " Out of Stock"}
//               </li>
//               {product.countInStock > 0 && (
//                 <li>
//                   Qty:
//                   <select value={qty} onChange={(e) => setQty(e.target.value)}>
//                     {[...Array(product.countInStock).keys()].map((x) => (
//                       <option key={x} value={x + 1}>
//                         {x + 1}
//                       </option>
//                     ))}
//                   </select>
//                 </li>
//               )}
//               <li>
//                 {product.countInStock > 0 && (
//                   <button onClick={handleAddToCart} className="button primary">
//                     Add to cart
//                   </button>
//                 )}
//               </li>
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default withRouter(ProductScreen);

// ------------------------------------------
import React, { useEffect, useState } from "react";
import withRouter from "../HOC";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct, saveProductReview } from "../actions/productActions";
import Rating from "../components/Rating";
import { PRODUCT_REVIEW_SAVE_RESET } from "../constants/productsConstants";

function ProductScreen(props) {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (productSaveSuccess) {
      alert("Review submitted successfully.");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(props.params.id));
  }, [productSaveSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    dispatch(
      saveProductReview(props.params.id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };
  const handleAddToCart = () => {
    props.navigate("/cart/" + props.params.id + "?qty=" + qty);
  };
  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Back to result</Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className="details">
            <div className="details-image">
              <img src={product.image} alt="product" />
            </div>
            <div className="details-info">
              <ul>
                <li>
                  <h4>{product.name}</h4>
                </li>
                <li>
                  <a href="#reviews">
                    <Rating
                      value={product.rating}
                      text={product.numReviews + " reviews"}
                    />
                  </a>
                </li>
                <li>
                  Price: <b>${product.price}</b>
                </li>
                <li>
                  Description:<div>{product.description}</div>
                </li>
              </ul>
            </div>

            <div className="details-action">
              <ul>
                <li>Price: ${product.price}</li>
                <li>
                  Status:
                  {product.countInStock > 0 ? " In Stock" : " Out of Stock"}
                </li>
                {product.countInStock > 0 && (
                  <li>
                    Qty:
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </li>
                )}
                <li>
                  {product.countInStock > 0 && (
                    <button
                      onClick={handleAddToCart}
                      className="button primary"
                    >
                      Add to cart
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div className="content-margined">
            <h2>Reviews</h2>
            {!product?.reviews?.length && <div>There is no review</div>}
            <ul className="review" id="reviews">
              {product?.reviews &&
                product?.reviews?.map((review) => (
                  <li key={review._id}>
                    <div>{review.name}</div>
                    <div>
                      <Rating value={review.rating}></Rating>
                    </div>
                    <div>{review.createdAt.substring(0, 10)}</div>
                    <div>{review.comment}</div>
                  </li>
                ))}
              <li>
                <h3>Write a customer review</h3>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <ul className="form-container">
                      <li>
                        <label htmlFor="rating">Rating</label>
                        <select
                          name="rating"
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="1">1- Poor</option>
                          <option value="2">2- Fair</option>
                          <option value="3">3- Good</option>
                          <option value="4">4- Very Good</option>
                          <option value="5">5- Excelent</option>
                        </select>
                      </li>
                      <li>
                        <label htmlFor="comment">Comment</label>
                        <textarea
                          name="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </li>
                      <li>
                        <button type="submit" className="button primary">
                          Submit
                        </button>
                      </li>
                    </ul>
                  </form>
                ) : (
                  <div>
                    Please <Link to="/signin">Sign-in</Link> to write a review.
                  </div>
                )}
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default withRouter(ProductScreen);
