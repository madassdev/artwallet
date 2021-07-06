import { SET_USER } from "../actions/actionType";

const INITIAL_STATE = {
    user: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_USER":
            console.log(action.user);
            return {
                ...state,
                user: action.user,
            };
        case "CREDIT_USER":
            return {
                ...state,
                user: {
                    ...state.user,
                    balance:
                        parseFloat(state.user.balance) +
                        parseFloat(action.amount),
                },
            };
        case "DEBIT_USER":
            return {
                ...state,
                user: {
                    ...state.user,
                    balance:
                        parseFloat(state.user.balance) -
                        parseFloat(action.amount),
                },
            };
        default:
            return state;
    }
};

export default userReducer;
