import React from "react";
import { connect } from "react-redux";
import DataManagement from "./DataManagement";
import CableTvManagement from "./CableTvManagement";
import AirtimeManagement from "./AirtimeManagement";
import {
    Link,
    useRouteMatch,
    Switch,
    Route,
    useParams,
} from "react-router-dom";

function ProductDashboard(props) {
    let { path, url } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={path}>
                Product Dashboard
            </Route>
            <Route path={`${path}/data`}>
                <DataManagement />
            </Route>
            <Route path={`${path}/cable-tv`}>
                <CableTvManagement />
            </Route>
            <Route path={`${path}/airtime`}>
                <AirtimeManagement />
            </Route>
        </Switch>
    );
}

const mapState = (state) => {
    return {};
};

const mapDispatch = (dispatch) => {
    return {};
};

export default connect(mapState, mapDispatch)(ProductDashboard);
