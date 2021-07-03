import { providerActions } from "../actions/actionType";

const INITIAL_STATE = {
    providers: [],
    is_fetching: false,
    is_creating: false,
    fetch_failed: undefined,
};

const providerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case providerActions.PROVIDERS_FETCHING:
            return {
                ...state,
                is_fetching: true,
            };
        case providerActions.PROVIDERS_FETCHED:
            return {
                ...state,
                providers: action.payload,
                isFetching: false,
            };
        case providerActions.FETCH_FAILED:
            return {
                ...state,
                is_fetching: false,
                fetch_failed: action.payload,
            };
        case providerActions.SET_NEW_PROVIDER:
            return {
                ...state,
                providers: [action.payload, ...state.providers],
            };
        case providerActions.PROVIDERS_CREATING:
            return {
                ...state,
                is_creating: true,
            };
        case providerActions.PROVIDERS_CREATED:
            return {
                ...state,
                is_creating: false,
            };
        case "DELETE_PROVIDER":
            const index = state.providers.findIndex(
                (provider) => provider.id === action.payload.id
            );
            let newProviders = [...state.providers];
            if (index >= 0) {
                newProviders.splice(index, 1);
            } else {
                console.warn("Not found in basket");
            }

            return { ...state, providers: newProviders };
        default:
            return state;
    }
};

export default providerReducer;
