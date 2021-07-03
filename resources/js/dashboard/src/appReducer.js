
const modalReducer = (state, action) => {
    switch (action.type) {
        case "OPEN_MODAL":
            console.log(state)
            return {
                ...state,
                modal: action.modal,
            };
            case "CLOSE_MODAL":
                return {
                    ...state,
                    modal: {show: 0, content: "", header: ""},
                    showModal: 'close'
                };

        default:
            return state;
    }
};

export default modalReducer;
