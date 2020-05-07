import { combineReducers } from "redux";
import { authReducer } from "../components/_reducers/authReducer";
import { storeReducer } from "../components/_reducers/storeReducer";
import { errorReducer } from "../components/_reducers/errorReducer";
import { productReducer } from "../components/_reducers/productReducer";
import { userReducer } from "../components/_reducers/userReducer";
import { profileReducer } from "../components/_reducers/profileReducer";
import { poolReducer } from "../components/_reducers/poolReducer";
import { pickupReducer } from "../components/_reducers/pickupReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  storeState: storeReducer,
  errorState: errorReducer,
  productState: productReducer,
  userState: userReducer,
  profileState: profileReducer,
  poolState: poolReducer,
  pickupState: pickupReducer,
});
