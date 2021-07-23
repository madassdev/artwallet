import axios from "axios";

const INITIAL_STATE = {
    transactions: [],
    isFetching: false,
    fetch_failed: undefined,
};

// selectors

export const fetchTransactions = (page = 1, type=null) => {
    return (dispatch) => {
        dispatch({
            type: "SET_FETCHING",
            status: true,
        });
        axios
            .get(`/transactions?page=${page}${type&&"&type="+type}`)
            .then((response) => {
                dispatch({
                    type: "SET_TRANSACTIONS",
                    transactions: response.data.data.transactions,
                });
                dispatch({
                    type: "SET_FETCHING",
                    status: false,
                });
            })
            .catch((error) => {
                console.log(error.response);
                dispatch({
                    type: "SET_FETCHING",
                    status: true,
                });
            });
    };
};

const transactionReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_TRANSACTIONS":
            console.log(action.transactions);
            return {
                ...state,
                transactions: action.transactions,
                isFetching: false,
            };
        case "ADD_TRANSACTION":
            console.log("settingTransaction", action.transaction);
            return {
                ...state,
                transactions: [action.transaction, ...state.transactions],
                isFetching: false,
            };
        case "SET_FETCHING":
            return {
                ...state,
                isFetching: action.status,
            };

        default:
            return state;
    }
};

export default transactionReducer;
