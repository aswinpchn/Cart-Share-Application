import { SET_PROFILE_DATA, UPDATE_PROFILE_DATA } from "../_actions/types";

const initialState = {
  user: {},
};

export const profileReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case SET_PROFILE_DATA:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return { ...state };
  }
};
