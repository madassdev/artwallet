import React from "react";
import { connect } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const tx = {
    id: 6,
    user_id: 1,
    debitable_id: 1,
    debitable_type: "App\\Models\\User",
    creditable_id: 5,
    creditable_type: "App\\Models\\Order",
    amount: "820.00",
    type: "data",
    status: "complete",
    created_at: "2021-07-08T08:45:27.000000Z",
    updated_at: "2021-07-08T08:45:27.000000Z",
    deleted_at: null,
    date: "08 Jul 2021, 8:45am",
};
function Home(props) {
    let query = useQuery();
    console.log(props.transactions);
    return (
        <div>
            <div className="my-4 cards">
                <div className="flex items-center space-x-4">
                    <div className="bg-purple-700 shadow-md rounded p-3 md:w-60">
                        <h2 className="text-lg text-white m-0 p-0">Balance</h2>
                        <p className="text-2xl text-white font-bold m-0 p-0">
                            &#x20A6;{props.user?.balance}
                        </p>
                    </div>
                    <div onClick={()=>props.addTransaction(tx)} className="bg-white shadow-md rounded p-3 md:w-60">
                        Balance: {props.user?.balance}
                    </div>
                </div>
            </div>

            <div className="my-2">
                <h5 className="text-lg font-bold">Transactions</h5>
            </div>
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
                        <th className="tb-odr-action">&nbsp;</th>
                    </tr>
                </thead>
                <tbody className="tb-odr-body">
                    {props.transactions?.map((t) => (
                        <tr className="tb-odr-item" key={t.id}>
                            <td className="tb-odr-info">
                                <span className="tb-odr-id font-bold text-purple-500 uppercase">
                                    <a href="#" className="font-bold">
                                        {t.type}
                                    </a>
                                </span>
                                <span className="tb-odr-date">{t.date}</span>
                            </td>
                            <td className="tb-odr-amount">
                                <span className="tb-odr-total">
                                    <span className="amount font-bold text-lg text-gray-600">
                                        &#x20A6;{t.amount}
                                    </span>
                                </span>
                                <span className="tb-odr-status">
                                    <span className="badge badge-dot badge-success capitalize">
                                        {t.status}
                                    </span>
                                </span>
                            </td>
                            <td className="tb-odr-action">
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
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
const mapState = (state) => {
    return {
        user: state.userState.user,
        transactions: state.transactionState.transactions,
    };
};

const mapDispatch = (dispatch) => {
    return {
        addTransaction: (transaction) =>
        console.log('t', transaction)
        //     dispatch({
        //         type: "ADD_TRANSACTION",
        //         transaction: transaction,
        //     }),
    };
};
export default connect(mapState, mapDispatch)(Home);
