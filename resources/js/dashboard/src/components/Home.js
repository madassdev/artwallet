import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { fetchTransactions } from "../reducers/transactionReducer";
import Spinner from "./Spinner";
import { Pagination } from "react-laravel-paginex";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
function Home(props) {
    let query = useQuery();
    useEffect(() => {
        props.fetchTransactions(1);
    }, []);

    const getData = (data) => {
        // console.log(data)
        props.fetchTransactions(data.page);
    };

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
            {props.isLoading ? (
                <Spinner text="Loading..." />
            ) : (
                <table className="table table-orders bg-white">
                    <thead className="tb-odr-head">
                        <tr className="tb-odr-item">
                            <th className="tb-odr-info">
                                <span className="tb-odr-id">TYPE</span>
                                <span className="tb-odr-date d-none d-md-inline-block">
                                    Date
                                </span>
                            </th>
                            <th className="tb-odr-amount">
                                <span className="tb-odr-total">Amount</span>
                                <span className="tb-odr-status d-none d-md-inline-block">
                                    Status
                                </span>
                            </th>
                            {/* <th className="tb-odr-action">&nbsp;</th> */}
                        </tr>
                    </thead>
                    <tbody className="tb-odr-body">
                        {props.transactions?.data?.map((t) => (
                            <tr className="tb-odr-item" key={t.id}>
                                <td className="tb-odr-info">
                                    <span className="tb-odr-id font-bold text-purple-500 uppercase">
                                        <a href="#" className="font-bold">
                                            {t.type}
                                        </a>
                                        
                                    </span>
                                    <span className="tb-odr-date">
                                        {t.date}
                                    </span>
                                </td>
                                <td className="tb-odr-amount">
                                    <span className="tb-odr-total">
                                        <span className="amount font-bold text-gray-600">
                                            {naira(t.amount)}
                                        </span>
                                        <br/>
                                        <p className="text-gray-400 uppercase">{t.recipient}</p>
                                    </span>
                                    <span className="tb-odr-status">
                                        <span className={`badge badge-dot capitalize ${
                                            t.status === "complete"
                                            ? "badge-success"
                                            : t.status === "failed"
                                            ? "badge-danger"
                                            : "badge-warning"
                                        }`}>
                                            {t.status}
                                        </span>
                                    </span>
                                </td>
                                {/* <td className="tb-odr-action">
                                    <div className="tb-odr-btns d-none d-md-inline">
                                        <a
                                            href="#"
                                            className="btn btn-sm btn-primary"
                                        >
                                            View
                                        </a>
                                    </div>
                                    <div className="dropdown">
                                        <a
                                            className="text-soft dropdown-toggle btn btn-icon btn-trigger"
                                            data-toggle="dropdown"
                                            data-offset="-8,0"
                                            aria-expanded="false"
                                        >
                                            <em className="icon ni ni-more-h"></em>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-xs">
                                            <ul className="link-list-plain">
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="text-primary"
                                                    >
                                                        Edit
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="text-primary"
                                                    >
                                                        View
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="text-danger"
                                                    >
                                                        Remove
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <div className="my-8 flex items-center justify-center w-full">
                <Pagination
                    buttonIcons={true}
                    numberClass="bg-light rounded p-2 mx-1"
                    activeClass="active text-primary font-bold"
                    prevButtonIcon="mdi mdi-chevron-left"
                    nextButtonIcon="mdi mdi-chevron-right"
                    containerClass="flex items-center space-x-2"
                    changePage={getData}
                    data={props.transactions}
                />
            </div>
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
