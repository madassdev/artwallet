import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function ProviderPlans(props) {
    let { providerId } = useParams();
    useEffect(() => {
        console.log(props.providers);

        // fetchPlans(providerId);
    }, []);
    // console.log("provider", providerId);
    return <div className="my-3">Plans</div>;
}

const mapState = (state) => {
    return {
        providers: state.providerState.providers,
    };
};

const mapDispatch = (dispatch) => {
    return {
        fetchProvider: () => dispatch(fetchProvider(providerId)),
    };
};

export default connect(mapState, mapDispatch)(ProviderPlans);
