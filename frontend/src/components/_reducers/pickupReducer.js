import { GET_PICKUPORDERS, MARK_PICKEDUP, LOADING } from "../_actions/types";

const initialState = {
  orders: [],
  loading: false,
};

export const pickupReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case GET_PICKUPORDERS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    case MARK_PICKEDUP:
      return {
        ...state,
        responseStatus: action.payload,
        loading: false,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return { ...state };
  }
};
