import React from "react";
import { connect } from "react-redux";
import Data from "./Data";
import Airtime from "./Airtime";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";

function SuccessPage(props) {
    let { path, url } = useRouteMatch();
    return (
        <Switch>
            <div className="col-md-6 mx-auto card">
                <Route exact path={path}>
                    Here you go...
                </Route>
                <Route path={`${path}/depositSuccess`}>
                    <Container className='p-3 text-center'>
                        <h5>Congrats, your deposit was successful</h5>
                        <span className="my-5 bg-success">
                            <i className="mdi mdi-check text-white"></i>
                        </span>
                        <Link to="/" className="text-gray-400 my-3">
                            Go Home
                        </Link>
                    </Container>
                </Route>
                <Route path={`${path}/airtime`}>
                    <Airtime />
                </Route>
            </div>
        </Switch>
    );
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-left: auto; 
    margin-right: auto; 
    span{
        width: 120px;
        height: 120px;
        border-radius: 1000px;
        display: flex;
        align-items: center;
        justify-content: center;
        i{
            font-size: 36px;
        }
    }
`;

const mapStateToProps = (state) => {
    return {
        services: state.serviceState.services,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(SuccessPage);
