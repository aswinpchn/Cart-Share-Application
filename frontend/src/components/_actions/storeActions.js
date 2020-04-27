import {
  CREATE_STORE,
  STORE_LOADING,
  GET_ERRORS,
  GET_STORES,
  UPDATE_STORE,
} from "./types";
import axios from "axios";
import { properties } from "../../properties";
const backendurl = properties.backendhost;

// Set loading state
export const setStoreLoading = () => {
  return {
    type: STORE_LOADING,
  };
};

export const createStore = (data) => (dispatch) => {
  axios
    .post(backendurl + "store/create", data)
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: CREATE_STORE,
          payload: response.status,
        });
        dispatch(getStores());
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    });
};

export const getStores = () => (dispatch) => {
  dispatch(setStoreLoading());
  axios
    .get(backendurl + "store/all")
    .then((response) => {
      dispatch({
        type: GET_STORES,
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

export const updateStore = (data) => (dispatch) => {
  axios
    .post(backendurl + "/store/updateStore", data)
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: UPDATE_STORE,
          payload: response.status,
        });
        dispatch(getStores());
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    });
};
