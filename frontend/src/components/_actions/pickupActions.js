import { GET_PICKUPORDERS, MARK_PICKEDUP, LOADING, GET_ERRORS } from "./types";
import axios from "axios";
import swal from "sweetalert";
import { properties } from "../../properties";
const backendurl = properties.backendhost;

// Set loading state
export const setLoading = () => {
  return {
    type: LOADING,
  };
};

export const getPickupOrders = () => (dispatch) => {
  let userId = localStorage.getItem("userId");
  // axios post call, with delivery pooler id to get all the orders mapping with status assigned.
  axios
    .get(backendurl + "pickuporders/" + userId)
    .then((response) => {
      console.log(response);
      if (response.status == 200) {
        dispatch({
          type: GET_PICKUPORDERS,
          payload: response.data,
        });
      }
    })
    .catch((error) => {
      console.log("Error in getting orders", error, error.response);
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    });
};

export const markPickedUp = (groupId) => (dispatch) => {
  dispatch(setLoading());
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  axios
    .post(backendurl + `pickuporders/markpickedup/${groupId}`, config)
    .then((response) => {
      if (response.status === 200) {
        swal("Status Updated");
        dispatch({
          type: MARK_PICKEDUP,
          payload: response.data,
        });
      }
      dispatch(getPickupOrders());
    })
    .catch((error) => {
      swal("Status Update Failed.Please try again");
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    });
};
