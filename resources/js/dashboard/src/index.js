import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
  
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
        {/* <StateProvider initialState={initialState} reducer={reducers}> */}
            <App />
        {/* </StateProvider> */}
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
