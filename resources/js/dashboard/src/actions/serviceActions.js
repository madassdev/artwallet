// redux/product/product.actions.js
import { serviceActions } from "./actionType";
import axios from "axios";

const url = "/services";

export const setServicesIsFetching = () => ({
  type: serviceActions.SERVICES_FETCHING
});

export const setServices = services => ({
  type: serviceActions.SERVICES_FETCHED,
  payload: services
});

export const setFetchFailed = error => ({
  type: serviceActions.FETCH_FAILED,
  payload: error
});

export const fetchServices = () => {
//   console.log("Fetching services...")
  return dispatch => {
    dispatch(setServicesIsFetching());
    axios
      .get(url)
    //   .then(response => console.log(response.data))
      .then(response => dispatch(setServices(response.data.data)))
      .catch(error => dispatch(setFetchFailed(error)));
  };
};