import { serviceActions } from "../actions/actionType";

const INITIAL_STATE = {
    services: [],
    is_fetching: false,
    fetch_failed: undefined,
};

// selectors

export const getAirtimeProviders = async (service) => {
    var airtimePlans = [];
    await axios.get("/plans/airtime").then((res) => {
        airtimePlans = res.data.data;
    });
    return airtimePlans;
};

const serviceReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case serviceActions.SERVICES_FETCHING:
            return {
                ...state,
                is_fetching: true,
            };
        case "SET_SERVICES":
            return {
                ...state,
                services: action.services,
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
