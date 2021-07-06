// redux/product/product.actions.js
import { providerActions } from "./actionType";
import axios from "axios";

const url = "/providers";

export const setProvidersIsFetching = () => ({
    type: providerActions.PROVIDERS_FETCHING,
});

export const setProviders = (providers) => ({
    type: providerActions.PROVIDERS_FETCHED,
    payload: providers,
});

export const setFetchFailed = (error) => ({
    type: providerActions.FETCH_FAILED,
    payload: error,
});

export const fetchProviders = () => {
    return (dispatch) => {
        dispatch(setProvidersIsFetching());
        axios
            .get(url)
            .then((response) => dispatch(setProviders(response.data.data)))
            .catch((error) => dispatch(setFetchFailed(error)));
    };
};
export const createProvider = (provider) => {
    console.log("creating providers...");
    return (dispatch) => {
        dispatch({
            type: providerActions.PROVIDERS_CREATING,
        });
        axios
            .post(url, provider)
            .then((response) => {
                // console.log(response.data.data)
                dispatch({
                    type: providerActions.PROVIDERS_CREATED,
                    payload: response.data.data,
                });

                dispatch({
                    type: providerActions.SET_NEW_PROVIDER,
                    payload: response.data.data,
                });
                dispatch({
                    type: "CLOSE_MODAL",
                });
            })
            .catch((error) => dispatch(setFetchFailed(error)));
    };
};

export const deleteProvider = (provider) => {
    return (dispatch) => {
        axios
            .delete(`${url}/${provider.id}`)
            .then((response) => {
                // console.log(response.data.data)
                dispatch({
                    type: "DELETE_PROVIDER",
                    payload: provider,
                });
                dispatch({
                    type: "CLOSE_MODAL",
                });
            })
            .catch((error) => dispatch(setFetchFailed(error)));
    };
};
