import { providerActions } from "../actions/actionType";

const INITIAL_STATE = {
    providers: [],
    is_fetching: false,
    is_creating: false,
    fetch_failed: undefined,
};

export const getDataProviders = (providers) => {
    const dataProviders = providers?.filter((p) => p.service.slug === "data");
    return dataProviders;
};

export const getAirtimeProviders = (providers) => {
    const airtimeProviders = providers?.filter((p) => p.service.slug === "airtime");
    return airtimeProviders;
};

export const getCableTvProviders = (providers) => {
    const dataProviders = providers?.filter(
        (p) => p.service.slug === "cable-tv"
    );
    return dataProviders;
};

export const getProviderById = (id, providers) => {
    const provider = providers?.find((p) => {
        return p.id == id;
    });
    return provider;
};

const providerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case providerActions.PROVIDERS_FETCHING:
            return {
                ...state,
                is_fetching: true,
            };
        case "SET_PROVIDERS":
            return {
                ...state,
                providers: action.providers,
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
            let nnewProviders = [...state.providers];
            if (index >= 0) {
                nnewProviders.splice(index, 1);
            } else {
                console.warn("Not found in basket");
            }

            return { ...state, providers: [action.payload, ...newProviders] };
        case "UPDATE_PROVIDER":
            const i = state.providers.findIndex(
                (provider) => provider.id === action.payload.id
            );

            const np = [...state.providers];
            np[i] = action.payload;

            return { ...state, providers: np };
        default:
            return state;
    }
};

export default providerReducer;
