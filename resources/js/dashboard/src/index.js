import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App";
import { initialState, combineReducers } from "./reducer";
import userReducer from "./userReducer";
import withdrawalReducer from "./withdrawalReducer";
import { StateProvider } from "./StateProvider";
// import { Provider } from "react-redux";
// import store from "./store";
const reducers = combineReducers({
    user: userReducer,
    withdrawal: withdrawalReducer,
  })
  
ReactDOM.render(
    <React.StrictMode>
        {/* <Provider store={store}> */}
        <StateProvider initialState={initialState} reducer={reducers}>
            <App />
        </StateProvider>
        {/* </Provider> */}
    </React.StrictMode>,
    document.getElementById("root")
);
