// redux/product/product.actions.js
import { itemActions } from "./actionType";
import axios from "axios";

const url = "https://madassdev-laravel.dv/api/dir";

export const setItemsIsFetching = () => ({
  type: itemActions.ITEMS_FETCHING
});

export const setItems = products => ({
  type: itemActions.ITEMS_FETCHED,
  payload: products
});

export const setFetchFailed = error => ({
  type: itemActions.FETCH_FAILED,
  payload: error
});

export const fetchItems = () => {
  console.log("Fetching...")
  return dispatch => {
    dispatch(setItemsIsFetching());
    axios
      .get(url)
      // .then(response => console.log(response.data))
      .then(response => dispatch(setItems(response.data.data.items)))
      .catch(error => dispatch(setFetchFailed(error)));
  };
};