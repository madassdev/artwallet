const INITIAL_STATE = {
    transactions: [],
    is_fetching: false,
    fetch_failed: undefined,
};

// selectors

const transactionReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_TRANSACTIONS":
            return {
                ...state,
                transactions: action.transactions,
                isFetching: false,
            };
        case "ADD_TRANSACTION":
            return {
                ...state,
                transactions: [...state.transactions, action.transaction],
                isFetching: false,
            };

        default:
            return state;
    }
};

export default transactionReducer;
