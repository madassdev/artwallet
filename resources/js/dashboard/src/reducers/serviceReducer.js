import { serviceActions } from "../actions/actionType";

const INITIAL_STATE = {
    services: [],
    is_fetching: false,
    fetch_failed: undefined,
};

const serviceReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case serviceActions.SERVICES_FETCHING:
            return {
                ...state,
                is_fetching: true,
            };
        case serviceActions.SERVICES_FETCHED:
            return {
                ...state,
                services: action.payload,
                isFetching: false
            };
        case serviceActions.FETCH_FAILED:
            return {
                ...state,
                is_fetching: false,
                fetch_failed: action.payload
            };
        default:
            return state;
    }
};

export default serviceReducer;
