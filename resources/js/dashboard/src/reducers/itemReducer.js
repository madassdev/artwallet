import { itemActions } from "../actions/actionType";

const INITIAL_STATE = {
    items: [],
    is_fetching: false,
    fetch_failed: undefined,
};

const itemReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case itemActions.ITEMS_FETCHING:
            return {
                ...state,
                is_fetching: true,
            };
        case itemActions.ITEMS_FETCHED:
            return {
                ...state,
                items: action.payload,
                isFetching: false
            };
        case itemActions.FETCH_FAILED:
            return {
                ...state,
                is_fetching: false,
                fetch_failed: action.payload
            };
        default:
            return state;
    }
};

export default itemReducer;
