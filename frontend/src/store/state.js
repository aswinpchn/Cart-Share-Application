import { combineReducers } from "redux";
import { authReducer } from "../components/_reducers/authReducer";
import { storeReducer } from "../components/_reducers/storeReducer";
import { errorReducer } from "../components/_reducers/errorReducer";
import { productReducer } from "../components/_reducers/productReducer";
import { userReducer } from "../components/_reducers/userReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  storeState: storeReducer,
  errorState: errorReducer,
  productState: productReducer,
  userState: userReducer
});
