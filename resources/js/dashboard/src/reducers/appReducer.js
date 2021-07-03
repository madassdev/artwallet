import { providerActions } from "../actions/actionType";
import CreateProvider from "../components/CreateProvider";

const INITIAL_STATE = {
    modal: {
        show: false,
        header: "",
        content: "",
    },
    is_fetching: false,
    fetch_failed: undefined,
};

const AppReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "OPEN_MODAL":
            return {
                ...state,
                modal: action.modal,
            };
        case "CLOSE_MODAL":
            return {
                ...state,
                modal: { show: 0, content: "", header: "" },
            };
        default:
            return state;
    }
};

export default AppReducer;
