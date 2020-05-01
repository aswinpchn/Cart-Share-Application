import axios from "axios";
import {GET_ERRORS, GET_STORES, UPDATE_PRODUCT} from "./types";
import swal from "sweetalert";
import {getProducts} from "./productActions";
import {setStoreLoading} from "./storeActions";
import {properties} from "../../properties";
const backendurl = properties.backendhost;

// Get User
export const getUser = () => (dispatch) => {
  dispatch(setStoreLoading());
  axios
    .get(backendurl + "user/?email=" + localStorage.getItem("email"))
    .then((response) => {
      console.log('dispatching get user........');
      dispatch({
        type: "GET_USER",
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