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
            console.log('settingTransaction', action.transaction)
            return {
                ...state,
                transactions: [action.transaction, ...state.transactions],
                isFetching: false,
            };

        default:
            return state;
    }
};

export default transactionReducer;
