import React from "react";
import { connect } from "react-redux";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import Deposit from "./Deposit";
import Transfer from "./Transfer";

function Payment(props) {
    let { path, url } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path}>
                Select option
            </Route>
            <Route path={`${path}/deposit`}>
                <Deposit />
            </Route>
            <Route path={`${path}/transfer`}>
                <Transfer />
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

export default connect(mapState, mapDispatch)(Payment);
