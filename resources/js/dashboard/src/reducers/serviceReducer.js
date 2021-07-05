import { serviceActions } from "../actions/actionType";

const INITIAL_STATE = {
    services: [],
    is_fetching: false,
    fetch_failed: undefined,
};

// selectors
export const getDataProviders = (service) =>
    (service?.find(
        (s) => s.id === 1 || s.title.toLowerCase() === "data"
    ));


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
                isFetching: false,
            };
        case serviceActions.FETCH_FAILED:
            return {
                ...state,
                is_fetching: false,
                fetch_failed: action.payload,
            };
        default:
            return state;
    }
};

export default serviceReducer;
