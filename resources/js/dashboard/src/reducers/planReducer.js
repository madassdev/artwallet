import axios from "axios";
import toast from "react-hot-toast";

const INITIAL_STATE = {
    plans: [],
    airtimePlans: [],
    is_fetching: false,
    is_creating: false,
    is_updating: false,
    fetch_failed: undefined,
};

export const getElectricityPlans = (plans) => {
    const airtime_plans = plans?.filter(
        (p) => p?.provider?.service?.slug === "electricity"
    );
    // console.log(airtime_plans)
    return airtime_plans;
};

export const getAirtimePlans = (plans) => {
    // console.log(plans)
    const airtime_plans = plans?.filter(
        (p) => p?.provider?.service?.slug === "airtime"
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
                toast.success(response.data.message, {
                    position: "bottom-center",
                });
                dispatch({
                    type: "PLAN_CREATED",
                });
                dispatch({
                    type: "UPDATE_PROVIDER",
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

export const deletePlan = (plan) => {
    return (dispatch) => {
        axios
            .delete(`/plans/${plan.id}`)
            .then((response) => {
                toast.success(response.data.message, {
                    position: "bottom-center",
                });
                dispatch({
                    type: "UPDATE_PROVIDER",
                    payload: response.data.data.provider,
                });
                dispatch({
                    type: "CLOSE_MODAL",
                });
            })
            .catch((error) => console.log(error));
    };
};

export const updatePlan = (plan) => {
    console.log(plan);
    return (dispatch) => {
        dispatch({
            type: "PLAN_UPDATING",
        });
        axios
            .put(`/plans/${plan.id}`, plan)
            .then((response) => {
                toast.success(response.data.message, {
                    position: "bottom-center",
                });
                dispatch({
                    type: "UPDATE_PROVIDER",
                    payload: response.data.data.provider,
                });
                dispatch({
                    type: "PLAN_UPDATED",
                });
                dispatch({
                    type: "CLOSE_MODAL",
                });
            })
            .catch((error) => console.log(error));
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
        case "PLAN_UPDATING":
            return {
                ...state,
                is_updating: true,
            };
        case "PLAN_UPDATED":
            return {
                ...state,
                is_updating: false,
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
