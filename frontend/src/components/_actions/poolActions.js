import {
  LOADING,
  REFERRER_APPROVE_REQUEST,
  REFERRER_REJECT_REQUEST,
  GET_REFERRER_REQUESTS,
  GET_LEADER_REQUESTS,
  LEADER_APPROVE_REQUEST,
  LEADER_REJECT_REQUEST,
  GET_ERRORS,
} from "./types";
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

// Get requests for referrer
export const getReferrerRequests = () => (dispatch) => {
  let referrerScreenName = localStorage.getItem("screenName");
  dispatch(setLoading());
  axios
    .get(backendurl + `pool/joinrequest/${referrerScreenName}`)
    .then((response) => {
      console.log("the pool request data is" + response.data);
      dispatch({
        type: GET_REFERRER_REQUESTS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    });
};

//Referrer Approve Request
export const referrerApproveRequest = (poolRequestId) => (dispatch) => {
  dispatch(setLoading());
  axios
    .post(backendurl + `pool/referral/approvejoinrequest/${poolRequestId}`)
    .then((response) => {
      console.log("the approval data is" + response.data);
      dispatch({
        type: REFERRER_APPROVE_REQUEST,
        payload: response.status,
      });
      swal(response.data);
      dispatch(getReferrerRequests());
    })
    .catch((error) => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
      if (error.response.status === 422) {
        swal("User is already part of a pool", "failure");
      } else {
        swal("Approval Failed -" + error);
      }
    });
};

// Referrer Reject Request
export const referrerRejectRequest = (poolRequestId) => (dispatch) => {
  dispatch(setLoading());
  axios
    .post(backendurl + `pool/rejectjoinrequest/${poolRequestId}`)
    .then((response) => {
      console.log("the rejection data is" + response.data);
      dispatch({
        type: REFERRER_REJECT_REQUEST,
        payload: response.status,
      });
      swal(response.data);
      dispatch(getReferrerRequests());
    })
    .catch((error) => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });

      swal("Rejection Failed -" + error);
    });
};

// Get requests for Leader
export const getLeaderRequests = () => (dispatch) => {
  let leaderScreenName = localStorage.getItem("screenName");
  dispatch(setLoading());
  axios
    .get(backendurl + `pool/leader/joinrequest/${leaderScreenName}`)
    .then((response) => {
      console.log("the pool request data is" + response.data);
      dispatch({
        type: GET_LEADER_REQUESTS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    });
};

//Leader Approve Request
export const leaderApproveRequest = (poolRequestId) => (dispatch) => {
  dispatch(setLoading());
  axios
    .post(backendurl + `pool/leader/approvejoinrequest/${poolRequestId}`)
    .then((response) => {
      console.log("the approval data is" + response.data);
      dispatch({
        type: LEADER_APPROVE_REQUEST,
        payload: response.status,
      });
      swal(response.data);
      dispatch(getLeaderRequests());
    })
    .catch((error) => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
      if (error.response.status == 422) {
        swal("User is already part of a pool", "failure");
      } else {
        swal("Approval Failed -" + error);
      }
    });
};

// Leader Reject Request
export const leaderRejectRequest = (poolRequestId) => (dispatch) => {
  dispatch(setLoading());
  axios
    .post(backendurl + `pool/rejectjoinrequest/${poolRequestId}`)
    .then((response) => {
      console.log("the rejection data is" + response.data);
      dispatch({
        type: LEADER_REJECT_REQUEST,
        payload: response.status,
      });
      swal(response.data);
      dispatch(getLeaderRequests());
    })
    .catch((error) => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });

      swal("Rejection Failed -" + error);
    });
};
