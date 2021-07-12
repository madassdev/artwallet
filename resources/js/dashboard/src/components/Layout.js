import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Spinner from "./Spinner";
import styled from "styled-components";
import { connect } from "react-redux";

function Layout(props) {
    return (
        <div className="nk-main">
            <Sidebar />
            {/* <Header/> */}
            <div className="nk-wrap">
                <Header />
                <div className="nk-content">
                    <div className="container-fluid">
                        <div className="nk-content-inner">
                            <div className="nk-content-body">
                                <div className="nk-block-head nk-block-head-sm">
                                    <div className="nk-block-between"></div>
                                    {props.isLoading ? (
                                        <Spinner />
                                    ) : (
                                        <>{props.children}</>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const S = (state) => {
    return {
        isLoading: state.appState.isLoading,
    }
}

const D = (dispatch) => {
    return {}
}

export default connect(S, D)(Layout);
