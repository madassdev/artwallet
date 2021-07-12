import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

function BalanceCard(props) {
    return (
        <div className="bg-grays-100 shadow-md rounded p-3 w-full md:w-1/2 mx-auto my-4 flex justify-between items-center">
            <div>
                <h2 className="text-lg text-gray-600 m-0 p-0">Balance</h2>
                <p className="text-2xl text-purple-700 font-bold m-0 p-0">
                    &#x20A6;
                    {parseFloat(props.user?.balance).toLocaleString()}
                </p>
            </div>
            <Link to={"/payments/deposit"}>
                <div className="flex flex-col items-center cursor-pointer">
                    <span className="h-12 w-12 flex items-center justify-center rounded-full bg-purple-100 text-purple-700">
                        <i className="mdi mdi-plus text-2xl"></i>
                    </span>
                    <p className="text-center text-xs text-gray-400 mt-1">
                        Fund wallet
                    </p>
                </div>
            </Link>
        </div>
    );
}
const S = (state) => {
    return {
        user: state.userState.user,
    };
};

const D = (dispatch) => {
    return {};
};
export default connect(S, D)(BalanceCard);
