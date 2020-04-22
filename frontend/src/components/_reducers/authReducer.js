import { ON_SIGNUP } from "../_actions/types";

const initialState = {
  user: {},
};

export const authReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case ON_SIGNUP:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
