import {
  CREATE_PRODUCT,
  PRODUCT_LOADING,
  GET_PRODUCTS,
  GET_ERRORS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT
} from "./types";
import axios from "axios";
import swal from "sweetalert";
import { properties } from "../../properties";
const backendurl = properties.backendhost;

// Set loading state
export const setProductLoading = () => {
  return {
    type: PRODUCT_LOADING,
  };
};

// Create Product
export const createProduct = (data) => (dispatch) => {
  console.log("data create product-->", data);
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  dispatch(setProductLoading());
  axios
    .post(backendurl + "product/add", data, config)
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: CREATE_PRODUCT,
          payload: response.status,
        });
        // dispatch(getProducts(response.data.storeId));
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    });
};

// Get all Products for a Store
export const getProducts = (storeId) => (dispatch) => {
  dispatch(setProductLoading());
  axios
    .get(backendurl + "product/" + storeId)
    .then((response) => {
      dispatch({
        type: GET_PRODUCTS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    });
};

// Edit Product
export const updateProduct = (data) => (dispatch) => {
  axios
    .post(backendurl + "product/edit/" + data.id, data)
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: UPDATE_PRODUCT,
          payload: response.status,
        });
        swal("Product Updated");
        dispatch(getProducts(response.data.store.id));
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    });
};

// Delete Product
export const deleteProduct = (productId) => (dispatch) => {
  axios
    .delete(backendurl + "product/" + productId)
    .then((response) => {
      console.log("response-->", response)
      if (response.status === 200) {
        dispatch({
          type: DELETE_PRODUCT,
          payload: response.status,
        });
        swal("Product Deleted");
        dispatch(getProducts(response.data.store.id));
      }
    })
    .catch((error) => {
      console.log("errorrr", error)
      if(error.message.includes("422")) {
        swal("Product cannot de deleted due to unfulfilled orders against it");
      } else if(error.message.includes("404")){
        swal("Product not found");
      } else {
        swal("Server Error. Refresh page and try deleting the product again");
      }
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    });
};
