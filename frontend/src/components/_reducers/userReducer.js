import {CREATE_PRODUCT, GET_PRODUCTS, PRODUCT_LOADING, UPDATE_PRODUCT} from "../_actions/types";

const initialState = {
  user: {},
  loading: false
};

export const userReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case "GET_USER": {
      return {
        ...state,
        user: action.payload,
        loading: false
      }
    }
    default:
      return { ...state };
  }
};