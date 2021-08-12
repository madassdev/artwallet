import React, { useEffect } from "react";
import Spinner from "./Spinner";
import { connect } from "react-redux";
import { fetchAdminTransactions } from "../reducers/transactionReducer";

import Transactions from "./Transactions";
function AirtimeSales(props) {
    return (
        <Transactions type="airtime"/>
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
        fetchAdminTransactions: (page, type) => {
            dispatch(fetchAdminTransactions(page, type));
        },
    };
};
export default connect(mapState, mapDispatch)(AirtimeSales);
