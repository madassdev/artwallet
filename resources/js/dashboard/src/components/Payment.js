import React from "react";
import { connect } from "react-redux";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import Deposit from "./Deposit";
import Transactions from "./Transactions";
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
            <Route path={`${path}/history`}>
                <div>
                    <h2 className="text-center font-bold text-lg text-primary">Payment Transactions</h2>
                    <Transactions type="deposit" />
                </div>
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
