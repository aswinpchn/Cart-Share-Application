import {
  CREATE_STORE,
  STORE_LOADING,
  GET_STORES,
  UPDATE_STORE,
} from "../_actions/types";

const initialState = {
  store: {},
  stores: [],
  loading: false,
};

export const storeReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case CREATE_STORE:
      return {
        ...state,
        responseStatus: action.payload,
      };
    case UPDATE_STORE:
      return {
        ...state,
        responseStatus: action.payload,
      };
    case STORE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_STORES:
      return {
        ...state,
        stores: action.payload,
        loading: false,
      };
    default:
      return { ...state };
  }
};
