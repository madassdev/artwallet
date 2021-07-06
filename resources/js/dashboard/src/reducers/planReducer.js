
const INITIAL_STATE = {
    plans: [],
    is_fetching: false,
    is_creating: false,
    fetch_failed: undefined,
};


export const getAirtimePlans = (plans) =>{
    const airtime_plans = plans?.filter((p) => p.provider.service.slug === 'airtime');
    // console.log(airtime_plans)
    return airtime_plans;
}

const planReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        
        case "SET_PLANS":
            return {
                ...state,
                plans: action.plans,
                isFetching: false,
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
        default:
            return state;
    }
};

export default planReducer;
