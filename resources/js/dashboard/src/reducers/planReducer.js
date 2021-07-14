import axios from "axios";

const INITIAL_STATE = {
    plans: [],
    airtimePlans: [],
    is_fetching: false,
    is_creating: false,
    fetch_failed: undefined,
};

export const getElectricityPlans = (plans) => {
    const airtime_plans = plans?.filter(
        (p) => p.provider.service.slug === "electricity"
    );
    // console.log(airtime_plans)
    return airtime_plans;
};

export const getAirtimePlans = (plans) => {
    const airtime_plans = plans?.filter(
        (p) => p.provider.service.slug === "airtime"
    );
    // console.log(airtime_plans)
    return airtime_plans;
};

export const createPlan = (plan) => {
    console.log("creating plan...", plan);
    return (dispatch) => {
        dispatch({
            type: "PLAN_CREATING",
        });
        axios
            .post("/plans", plan)
            .then((response) => {
                console.log(response.data.data.provider);
                dispatch({
                    type: "PLAN_CREATED",
                });
                dispatch({
                    type: "SET_NEW_PROVIDER",
                    payload: response.data.data.provider,
                });
                dispatch({
                    type: "CLOSE_MODAL",
                });
            })
            .catch((error) => {
                dispatch({
                    type: "PLAN_CREATED",
                });
                dispatch(setFetchFailed(error));
            });
    };
};


export const deletePlan = (provider) => {
    return (dispatch) => {
        axios
            .delete(`${url}/${provider.id}`)
            .then((response) => {
                // console.log(response.data.data)
                dispatch({
                    type: "DELETE_PROVIDER",
                    payload: provider,
                });
                dispatch({
                    type: "CLOSE_MODAL",
                });
            })
            .catch((error) => dispatch(setFetchFailed(error)));
    };
};

const planReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_PLANS":
            return {
                ...state,
                plans: action.plans,
                isFetching: false,
            };
        case "SET_AIRTIME_PLANS":
            const airtimePlans = state.plans?.filter(
                (p) => p.provider.service.slug === "airtime"
            );
            console.log(airtimePlans);
            return {
                ...state,
                airtimePlans,
            };

        case "DELETE_PLAN":
            const index = state.plans.findIndex(
                (plan) => plan.id === action.payload.id
            );
            let newPlans = [...state.plans];
            if (index >= 0) {
                newplans.splice(index, 1);
            } else {
                console.warn("Not found in basket");
            }
            return { ...state, plans: newPlans };
        case "PLAN_CREATING":
            return {
                ...state,
                is_creating: true,
            };
        case "PLAN_CREATED":
            return {
                ...state,
                is_creating: false,
            };
        case "SET_NEW_PLAN":
            return {
                ...state,
                plans: [action.plan, ...state.plans],
            };

        default:
            return state;
    }
};

export default planReducer;
