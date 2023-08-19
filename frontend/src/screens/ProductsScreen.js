// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import withRouter from "../HOC";
// import {
//   listProducts,
//   saveProduct,
//   deleteProduct,
// } from "../actions/productActions";

// function ProductsScreen(props) {
//   const dispatch = useDispatch();

//   const productList = useSelector((state) => state.productList);
//   const productSave = useSelector((state) => state.productSave);
//   const {
//     success: successSave,
//     loading: loadingSave,
//     error: errorSave,
//   } = productSave;

//   const productDelete = useSelector((state) => state.productDelete);
//   const {
//     success: successDelete,
//     loading: loadingDelete,
//     error: errorDelete,
//   } = productDelete;

//   const { loading, error, products } = productList;

//   const [id, setId] = useState("");
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [image, setImage] = useState("");
//   const [brand, setBrand] = useState("");
//   const [category, setCategory] = useState("");
//   const [countInStock, setCountInStock] = useState("");
//   const [description, setDescription] = useState("");
//   const [modalVisible, setModalVisible] = useState(false);

//   const openModal = (product) => {
//     setId(product._id);
//     setName(product.name);
//     setPrice(product.price);
//     setImage(product.image);
//     setBrand(product.brand);
//     setCategory(product.category);
//     setCountInStock(product.countInStock);
//     setDescription(product.description);
//     setModalVisible(true);
//   };

//   useEffect(() => {
//     if (successSave) {
//       setModalVisible(false);
//     }
//     dispatch(listProducts());
//   }, [successSave, successDelete]);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(
//       saveProduct({
//         _id: id,
//         name,
//         price,
//         image,
//         brand,
//         category,
//         countInStock,
//         description,
//       })
//     );
//   };

//   const deleteHandler = (product) => {
//     dispatch(deleteProduct(product._id));
//   };
//   return (
//     <div className="content content-margined">
//       <div className="product-header">
//         <h3>Products</h3>
//         <button className="button primary" onClick={() => openModal({})}>
//           Create Product
//         </button>
//       </div>
//       {modalVisible && (
//         <div className="form">
//           <form onSubmit={submitHandler}>
//             <ul className="form-container">
//               <li>
//                 <h2>Create Product</h2>
//               </li>
//               <li>
//                 {loadingSave && <div>Loading...</div>}
//                 {errorSave && <div>{errorSave}</div>}
//               </li>
//               <li>
//                 <label htmlFor="name">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={name}
//                   id="name"
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </li>
//               <li>
//                 <label htmlFor="price">Price</label>
//                 <input
//                   type="text"
//                   name="price"
//                   value={price}
//                   id="price"
//                   onChange={(e) => setPrice(e.target.value)}
//                 />
//               </li>
//               <li>
//                 <label htmlFor="image">Image</label>
//                 <input
//                   type="text"
//                   name="image"
//                   value={image}
//                   id="image"
//                   onChange={(e) => setImage(e.target.value)}
//                 />
//               </li>
//               <li>
//                 <label htmlFor="brand">Brand</label>
//                 <input
//                   type="text"
//                   name="brand"
//                   value={brand}
//                   id="brand"
//                   onChange={(e) => setBrand(e.target.value)}
//                 />
//               </li>
//               <li>
//                 <label htmlFor="countInStock">Count In Stock</label>
//                 <input
//                   type="text"
//                   name="countInStock"
//                   value={countInStock}
//                   id="countInStock"
//                   onChange={(e) => setCountInStock(e.target.value)}
//                 />
//               </li>
//               <li>
//                 <label htmlFor="category">Category</label>
//                 <input
//                   type="text"
//                   name="category"
//                   value={category}
//                   id="category"
//                   onChange={(e) => setCategory(e.target.value)}
//                 />
//               </li>
//               <li>
//                 <label htmlFor="description">Description</label>
//                 <textarea
//                   name="description"
//                   value={description}
//                   id="description"
//                   onChange={(e) => setDescription(e.target.value)}
//                 />
//               </li>

//               <li>
//                 <button type="submit" className="button primary">
//                   {" "}
//                   {id ? "Update" : "Create"}
//                 </button>
//               </li>
//               <li>
//                 <button
//                   type="button"
//                   onClick={() => setModalVisible(false)}
//                   className="button secondary"
//                 >
//                   {" "}
//                   Back
//                 </button>
//               </li>
//             </ul>
//           </form>
//         </div>
//       )}
//       <div className="product-list">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Price</th>
//               <th>Category</th>
//               <th>Brand</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product._id}>
//                 <td>{product._id}</td>
//                 <td>{product.name}</td>
//                 <td>{product.price}</td>
//                 <td>{product.category}</td>
//                 <td>{product.brand}</td>
//                 <td>
//                   <button className="button" onClick={() => openModal(product)}>
//                     Edit
//                   </button>{" "}
//                   <button
//                     className="button"
//                     onClick={() => deleteHandler(product)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default withRouter(ProductsScreen);

// --------------------

import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  saveProduct,
  listProducts,
  deleteProduct,
} from "../actions/productActions";
import withRouter from "../HOC";
import { Cancel } from "@material-ui/icons";

function ProductsScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("shirts");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [lastUploadedImg, setLastUploadedImg] = useState(null);

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  const uploadFileRef = useRef();

  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo.isAdmin) {
      props.navigate("/");
    }
    if (successSave) {
      setModalVisible(false);
    }

    dispatch(listProducts());
    return () => {
      //
    };
  }, [successSave, successDelete]);

  const validation = () => {
    let error = false;
    if (!name) {
      setErrorMsg("Please enter product name");
      error = true;
    } else if (!price) {
      setErrorMsg("Please enter product price");
      error = true;
    } else if (!image) {
      setErrorMsg("Please upload product image");
      error = true;
    } else if (!brand) {
      setErrorMsg("Please enter product brand");
      error = true;
    } else if (!category) {
      setErrorMsg("Please select product category");
      error = true;
    } else if (!countInStock) {
      setErrorMsg("Please enter product count in stock");
      error = true;
    } else if (!description) {
      setErrorMsg("Please enter product description");
      error = true;
    }
    return error;
  };
  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setErrorMsg("");
    setLastUploadedImg(product.image);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const hasError = validation();
    if (hasError) {
      return;
    }
    (async function () {
      const file = uploadFileRef.current.files[0];
      deleteImg();

      const bodyFormData = new FormData();
      bodyFormData.append("image", file);
      setUploading(true);
      await axios
        .post("/api/uploads", bodyFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setImage(response.data);
          dispatch(
            saveProduct({
              _id: id,
              name,
              price,
              image: response.data || "",
              brand,
              category,
              countInStock,
              description,
            })
          );
          setUploading(false);
        })
        .catch((err) => {
          console.log(err);
          setUploading(false);
        });
    })();
  };

  const deleteHandler = (product) => {
    setErrorMsg("");
    const isConfirmTODelete = window.confirm("Are you sure to delete?");
    if (isConfirmTODelete) {
      dispatch(deleteProduct(product._id));
    }
  };
  const uploadFileHandler = (e) => {
    // if (image === lastUploadedImg) {
    //   deleteImg();
    // }
    if (e.target.files.length) {
      const file = e.target.files[0];
      const imgUrl = URL.createObjectURL(file);
      setImage(imgUrl);
      // // setErrorMsg("");
      // const bodyFormData = new FormData();
      // bodyFormData.append("image", file);
      // setUploading(true);
      // axios
      //   .post("/api/uploads", bodyFormData, {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   })
      //   .then(async (response) => {
      //     setImage(response.data);
      //     setUploading(false);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     setUploading(false);
      //   });
    }
  };

  // const handleLastUploadImg = () => {
  //   axios
  //     .post("/api/uploads", lastUploadedImg, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const deleteImg = () => {
    axios
      .delete("/api" + lastUploadedImg)
      .then((response) => {
        setImage(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancelImg = () => {
    // debugger;
    // if (image === lastUploadedImg) {
    //   deleteImg();
    // } else {
    setImage(null);
    // }
  };
  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>
          {products && products.length !== 0 ? "Products" : "Products is empty"}
        </h3>
        <button className="button primary" onClick={() => openModal({})}>
          Create Product
        </button>
      </div>
      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>{id ? "Edit Product" : "Create Product"}</h2>
              </li>

              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div style={{ color: "red" }}>{errorSave}</div>}
                {errorDelete && (
                  <div style={{ color: "red" }}>{errorDelete}</div>
                )}
                {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}
              </li>

              <li>
                <label htmlFor="name">
                  Name<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  id="name"
                  onChange={(e) => {
                    setErrorMsg("");
                    setName(e.target.value);
                  }}
                ></input>
              </li>
              <li>
                <label htmlFor="price">
                  Price<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="price"
                  value={price}
                  id="price"
                  onChange={(e) => {
                    setErrorMsg("");
                    setPrice(e.target.value);
                  }}
                ></input>
              </li>
              <li style={{ position: "relative" }}>
                <label>
                  Image<span style={{ color: "red" }}>*</span>
                </label>
                {/* <input
                  type="text"
                  name="image"
                  value={image}
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                ></input> */}
                {image && (
                  <>
                    <Cancel
                      style={{
                        position: "absolute",
                        top: "2rem",
                        right: "0",
                        fontSize: "2.5rem",
                        cursor: "pointer",
                      }}
                      onClick={handleCancelImg}
                    />
                    <img src={image} alt="ProductImg" />
                  </>
                )}
                <label htmlFor="image" className="uploadImg">
                  Upload Image
                </label>
                <input
                  hidden
                  id="image"
                  type="file"
                  ref={uploadFileRef}
                  accept="image/*"
                  onChange={uploadFileHandler}
                ></input>
                {/* <label htmlFor="image">Upload Image</label> */}
                {/* <input
                  // hidden
                  // id="image"
                  type="file"
                  accept="image/*"
                  onChange={uploadFileHandler}
                ></input> */}
                {/* {uploading && <div>Uploading...</div>} */}
              </li>
              <li>
                <label htmlFor="brand">
                  Brand<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="brand"
                  value={brand}
                  id="brand"
                  onChange={(e) => {
                    setErrorMsg("");
                    setBrand(e.target.value);
                  }}
                ></input>
              </li>
              <li>
                <label htmlFor="countInStock">
                  CountInStock<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="countInStock"
                  value={countInStock}
                  id="countInStock"
                  onChange={(e) => {
                    setErrorMsg("");
                    setCountInStock(e.target.value);
                  }}
                ></input>
              </li>
              <li>
                <label htmlFor="name">
                  Category<span style={{ color: "red" }}>*</span>
                </label>
                <select
                  value={category}
                  className="categorySelect"
                  onChange={(e) => {
                    setErrorMsg("");
                    setCategory(e.target.value);
                  }}
                >
                  <option value="shirts">Shirt</option>
                  <option value="pants">Pant</option>
                  <option value="suits">Suit</option>
                  <option value="jackets">Jacket</option>
                </select>
              </li>
              <li>
                <label htmlFor="description">
                  Description<span style={{ color: "red" }}>*</span>
                </label>
                <textarea
                  name="description"
                  value={description}
                  id="description"
                  onChange={(e) => {
                    setErrorMsg("");
                    setDescription(e.target.value);
                  }}
                ></textarea>
              </li>
              <li>
                <button type="submit" className="button primary">
                  {id ? "Update" : "Create"}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    // if (lastUploadedImg) {
                    //   handleLastUploadImg();
                    // }
                    setErrorMsg("");
                    setModalVisible(false);
                  }}
                  className="button secondary"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}

      {products && products.length !== 0 && (
        <div className="product-list">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <button
                      className="button"
                      onClick={() => openModal(product)}
                    >
                      Edit
                    </button>{" "}
                    <button
                      className="button"
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
export default withRouter(ProductsScreen);
