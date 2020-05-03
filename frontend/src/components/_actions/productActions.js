import {
    CREATE_PRODUCT,
    PRODUCT_LOADING,
    GET_PRODUCTS,
    GET_ERRORS,
    UPDATE_PRODUCT
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
    console.log("data create product-->", data)
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
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
