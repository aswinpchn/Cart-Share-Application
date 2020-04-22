import { ON_SIGNUP } from "./types";

export const onSignup = (userData) => {
  return (dispatch) => {
    dispatch({ type: ON_SIGNUP, payload: userData });
  };
};
