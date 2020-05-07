import {
  LOADING,
  REFERRER_APPROVE_REQUEST,
  REFERRER_REJECT_REQUEST,
  GET_REFERRER_REQUESTS,
  GET_LEADER_REQUESTS,
  LEADER_APPROVE_REQUEST,
  LEADER_REJECT_REQUEST,
} from "../_actions/types";

const initialState = {
  referrerpoolRequests: [],
  leaderpoolRequests: [],
  loading: false,
};

export const poolReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case REFERRER_APPROVE_REQUEST:
      return {
        ...state,
        responseStatus: action.payload,
        loading: false,
      };
    case REFERRER_REJECT_REQUEST:
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
    case GET_REFERRER_REQUESTS:
      return {
        ...state,
        referrerpoolRequests: action.payload,
        loading: false,
      };
    case LEADER_APPROVE_REQUEST:
      return {
        ...state,
        responseStatus: action.payload,
        loading: false,
      };
    case LEADER_REJECT_REQUEST:
      return {
        ...state,
        responseStatus: action.payload,
        loading: false,
      };
    case GET_LEADER_REQUESTS:
      return {
        ...state,
        leaderpoolRequests: action.payload,
        loading: false,
      };
    default:
      return { ...state };
  }
};
