import React from "react";
import { connect } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
function Home(props) {
    let query = useQuery();
    console.log(props.user);
    return (
        <div>
            Balance: {props.user?.balance}
        </div>
    );
}
const mapState = (state) => {
    return {
        user: state.userState.user,
    };
};

const mapDispatch = (dispatch) => {
    return {};
};
export default connect(mapState, mapDispatch)(Home);
