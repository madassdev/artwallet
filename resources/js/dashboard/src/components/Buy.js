import React from "react";
import { connect } from "react-redux";
import Data from "./Data";
import Airtime from "./Airtime";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";

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
                        <Link to={`/buy/cable`}>
                            <Card>
                                <h5>Cable-Tv</h5>
                            </Card>
                        </Link>
                    </BuyContainer>
                </Route>
                <Route path={`${path}/data`}>
                    <Data />
                </Route>
                <Route path={`${path}/airtime`}>
                    <Airtime />
                </Route>
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
