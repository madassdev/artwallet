// redux/product/product.actions.js
import { serviceActions } from "./actionType";
import axios from "axios";

const url = "/services";

export const setServicesIsFetching = () => ({
    type: serviceActions.SERVICES_FETCHING,
});

export const setServices = (services) => ({
    type: "SET_SERVICES",
    services: services,
});


export const setProviders = (providers) => ({
  type: "SET_PROVIDERS",
  providers: providers,
});

export const setPlans = (plans) => ({
  type: "SET_PLANS",
  plans: plans,
});

export const setFetchFailed = (error) => ({
    type: serviceActions.FETCH_FAILED,
    payload: error,
});

export const fetchServices = () => {
    //   console.log("Fetching services...")
    return (dispatch) => {
        dispatch(setServicesIsFetching());
        axios
            .get(url)
            //   .then(response => console.log(response.data))
            .then((response) =>{

              dispatch(setServices(response.data.data.services))
              dispatch(setProviders(response.data.data.providers))
              dispatch(setPlans(response.data.data.plans))
            }
            )
            .catch((error) => dispatch(setFetchFailed(error)));
    };
};
