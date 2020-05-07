import {
  CREATE_PRODUCT,
  PRODUCT_LOADING,
  GET_PRODUCTS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../_actions/types";

const initialState = {
  product: {},
  products: [],
  loading: false,
};

export const productReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      return {
        ...state,
        responseStatus: action.payload,
        loading: false,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        responseStatus: action.payload,
      };
    case PRODUCT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: action.payload,
        loading: true,
      };
    default:
      return { ...state };
  }
};
