import React from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import styled from "styled-components";

function Airtime(props) {
    return (
        <div>
            <h2>Select Airtime Provider</h2>

            <Container>
               Airtime providers
            </Container>
        </div>
    );
}

const Container = styled.div`
    display: flex;
`;
const mapStateToProps = (state) => {
    return {
        providers: state.serviceState.services,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Airtime);
