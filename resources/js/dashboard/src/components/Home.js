import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect, useLocation } from "react-router-dom";
import { fetchTransactions } from "../reducers/transactionReducer";
import Transactions from "./Transactions";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
function Home(props) {
    return (
        <div>
            <div className="my-4 cards">
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-x-4">
                    <div className="bg-purple-700 shadow-md rounded p-3 w-full md:w-60 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg text-white m-0 p-0">
                                Balance
                            </h2>
                            <p className="text-2xl text-white font-bold m-0 p-0">
                                {naira(props.user?.balance)}
                            </p>
                        </div>
                        <div>
                            <Link to={"/payments/deposit"}>
                                <div className="flex flex-col items-center cursor-pointer">
                                    <span className="h-12 w-12 flex items-center justify-center rounded-full bg-purple-100 text-purple-700">
                                        <i className="mdi mdi-wallet-plus text-2xl"></i>
                                    </span>
                                    <p className="text-center text-xs text-white mt-1">
                                        Fund wallet
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    {/* <div className="bg-white shadow-md rounded p-3 w-full md:w-60">
                        User ID: {props.user?.uniqid}
                    </div> */}
                </div>
            </div>
            <div className="my-8 bg-grays-100 rounded w-full shadows p-2 md:p-3">
                <p className="text-primary text-lg font-bold">
                    <i className="mdi mdi-link mr-1"></i>
                    Quick Links
                </p>
                <div className="flex flex-wrap w-full my-2">
                    <Link to="/buy/airtime" className="m-2">
                        <div className="p-3 w-24 rounded-lg shadow bg-white flex items-center justify-center flex-col">
                            <span className="flex items-center justify-center h-8 w-8 bg-primary rounded-full text-white">
                                <i className="mdi mdi-cellphone"></i>
                            </span>
                            <p className="font-bold text-gray-600 mt-1 text-center">
                                Airtime
                            </p>
                        </div>
                    </Link>
                    <Link to="/buy/data" className="m-2">
                        <div className="p-3 w-24 rounded-lg shadow bg-white flex items-center justify-center flex-col">
                            <span className="flex items-center justify-center h-8 w-8 bg-primary rounded-full text-white">
                                <i className="mdi mdi-wifi"></i>
                            </span>
                            <p className="font-bold text-gray-600 mt-1 text-center">
                                Data
                            </p>
                        </div>
                    </Link>
                    <Link to="/buy/cable-tv" className="m-2">
                        <div className="p-3 w-24 rounded-lg shadow bg-white flex items-center justify-center flex-col">
                            <span className="flex items-center justify-center h-8 w-8 bg-primary rounded-full text-white">
                                <i className="mdi mdi-television-classic"></i>
                            </span>
                            <p className="font-bold text-gray-600 mt-1 text-center">
                                Cable Tv
                            </p>
                        </div>
                    </Link>
                    <Link to="/buy/electricity" className="m-2">
                        <div className="p-3 w-24 rounded-lg shadow bg-white flex items-center justify-center flex-col">
                            <span className="flex items-center justify-center h-8 w-8 bg-primary rounded-full text-white">
                                <i className="mdi mdi-lightning-bolt"></i>
                            </span>
                            <p className="font-bold text-gray-600 mt-1 text-center">
                                Electricity
                            </p>
                        </div>
                    </Link>
                    <Link to="/buy/internet" className="m-2">
                        <div className="p-3 w-24 rounded-lg shadow bg-white flex items-center justify-center flex-col">
                            <span className="flex items-center justify-center h-8 w-8 bg-primary rounded-full text-white">
                                <i className="mdi mdi-satellite-uplink"></i>
                            </span>
                            <p className="font-bold text-gray-600 mt-1 text-center">
                                Internet
                            </p>
                        </div>
                    </Link>
                    <Link to="/buy/recharge-print" className="m-2">
                        <div className="p-3 w-24 rounded-lg shadow bg-white flex items-center justify-center flex-col">
                            <span className="flex items-center justify-center h-8 w-8 bg-primary rounded-full text-white">
                                <i className="mdi mdi-printer"></i>
                            </span>
                            <p className="font-bold text-gray-600 mt-1 text-center">
                                Print Recharge
                            </p>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="my-2">
                <h5 className="text-lg font-bold text-gray-600">
                    Transactions
                </h5>
            </div>
            <Transactions type="all" />
        </div>
    );
}
const mapState = (state) => {
    return {
        user: state.userState.user,
        transactions: state.transactionState.transactions,
        isLoading: state.transactionState.isFetching,
    };
};

const mapDispatch = (dispatch) => {
    return {
        addTransaction: (transaction) =>
            // console.log('t', transaction)
            dispatch({
                type: "ADD_TRANSACTION",
                transaction: transaction,
            }),
        fetchTransactions: (page) => {
            dispatch(fetchTransactions(page));
        },
    };
};
export default connect(mapState, mapDispatch)(Home);
