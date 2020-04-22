import { combineReducers } from "redux";
import { authReducer } from "../components/_reducers/authReducer";
export const rootReducer = combineReducers({
  auth: authReducer,
});
