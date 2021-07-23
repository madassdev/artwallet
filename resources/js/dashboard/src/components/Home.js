import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { fetchTransactions } from "../reducers/transactionReducer";
import Transactions from "./Transactions";


function useQuery() {
    return new URLSearchParams(useLocation().search);
}
function Home(props) {
    let query = useQuery();
    

    return (
        <div>
            <div className="my-4 cards">
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-x-4">
                    <div className="bg-purple-700 shadow-md rounded p-3 w-full md:w-60">
                        <h2 className="text-lg text-white m-0 p-0">Balance</h2>
                        <p className="text-2xl text-white font-bold m-0 p-0">
                            &#x20A6;
                            {parseFloat(props.user?.balance).toLocaleString()}
                        </p>
                    </div>
                    <div className="bg-white shadow-md rounded p-3 w-full md:w-60">
                        User ID: {props.user?.uniqid}
                    </div>
                </div>
            </div>

            <div className="my-2">
                <h5 className="text-lg font-bold">Transactions</h5>
            </div>
           <Transactions/>
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
