import React from "react";
import { connect } from "react-redux";

function Page(props) {
    return (
        <div>
            <h2>{props.title}</h2>
        </div>
    );
}

const mapState = (state) => {
    return {};
};

const mapDispatch = (dispatch) => {
    return {};
};

export default connect(mapState, mapDispatch)(Page);
