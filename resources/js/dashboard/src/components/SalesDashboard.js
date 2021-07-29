import React from "react";
import { connect } from "react-redux";
import Sales from "./Sales";
import CableTvManagement from "./CableTvManagement";
import AirtimeManagement from "./AirtimeManagement";
import {
    Link,
    useRouteMatch,
    Switch,
    Route,
    useParams,
} from "react-router-dom";
import DataSales from "./DataSales";
import AirtimeSales from "./AirtimeSales";

function SalesDashboard(props) {
    let { path, url } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={path}>
                Sales Dashboard
            </Route>
            <Route path={`${path}/data`}>
                <DataSales/>
            </Route>
            <Route path={`${path}/airtime`}>
                <AirtimeSales/>
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

export default connect(mapState, mapDispatch)(SalesDashboard);
