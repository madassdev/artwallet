import React from "react";
import { connect } from "react-redux";
import Data from "./Data";
import CableTv from "./CableTv";
import Airtime from "./Airtime";
import Electricity from "./Electricity";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import PinRoute from "../PinRoute";
import Internet from "./Internet";

function Buy(props) {
    let { path, url } = useRouteMatch();
    return (
        <div>
            <Switch>
                <Route exact path={path}>
                    <h2>Buy</h2>
                    <BuyContainer>
                        <Link to={`/buy/data`}>
                            <Card>
                                <h5>Data</h5>
                            </Card>
                        </Link>
                        <Link to={`/buy/airtime`}>
                            <Card>
                                <h5>Airtime</h5>
                            </Card>
                        </Link>
                        <Link to={`/buy/cable-tv`}>
                            <Card>
                                <h5>Cable-Tv</h5>
                            </Card>
                        </Link>
                        <Link to={`/buy/electricity`}>
                            <Card>
                                <h5>Electricity</h5>
                            </Card>
                        </Link>
                        <Link to={`/buy/internet`}>
                            <Card>
                                <h5>Internet</h5>
                            </Card>
                        </Link>
                    </BuyContainer>
                </Route>
                <PinRoute path={`${path}/data`}>
                    <Data />
                </PinRoute>
                <PinRoute path={`${path}/airtime`}>
                    <Airtime />
                </PinRoute>
                <PinRoute path={`${path}/cable-tv`}>
                    <CableTv />
                </PinRoute>
                <PinRoute path={`${path}/electricity`}>
                    <Electricity />
                </PinRoute>
                <PinRoute path={`${path}/internet`}>
                    <Internet />
                </PinRoute>
            </Switch>
        </div>
    );
}

const BuyContainer = styled.div`
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-gap: 30px;
`;
const CommonCard = styled.div`
    padding: 20px;
    background: white;
    border-radius: 5px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const Card = styled(CommonCard)``;
const mapStateToProps = (state) => {
    return {
        services: state.serviceState.services,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Buy);
