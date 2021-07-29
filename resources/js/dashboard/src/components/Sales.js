import React, { useEffect } from "react";
import Spinner from "./Spinner";
import { connect } from "react-redux";
import { fetchTransactions } from "../reducers/transactionReducer";

import { Pagination } from "react-laravel-paginex";
function Sales(props) {
    useEffect(() => {
        props.fetchTransactions(1, props.type);
    }, []);

    const getData = (data) => {
        // console.log(data)
        props.fetchTransactions(data.page);
    };
    return (
        <div>
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
    )
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
        fetchTransactions: (page, type) => {
            dispatch(fetchTransactions(page, type));
        },
    };
};
export default connect(mapState, mapDispatch)(Sales);
