import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
// import { connect, useDispatch } from "react-redux";

import DataTable from "react-data-table-component";
import axios from "axios";

export const OrderTransactionSummary = ({ transaction }) => {
    return (
        <div className="flex flex-col space-y-8 my-4">
            <h2 className="text-center font-bold mb-0">Transaction Summary</h2>

            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-bold m-0">Transaction ID</h2>
                    <p className="text-primary font-bold text-xs uppercase">
                        {transaction.reference}
                    </p>
                </div>

                <div>
                    <h2 className="font-bold m-0 text-right">Type</h2>
                    <p className="text-primary text-md capitalize font-bold text-right">
                        {transaction.type}
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-bold m-0">Provider</h2>
                    <p className="text-primary text-sm">
                        {transaction?.credit_data?.order_data?.plan?.provider
                            ?.title ?? "PROVIDER"}
                    </p>
                </div>
                <div>
                    <h2 className="font-bold m-0 text-right">Plan</h2>
                    <p className="text-primary text-right text-sm">
                        {transaction?.credit_data?.order_data?.plan?.title ??
                            "PLAN"}
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-bold m-0">Amount</h2>
                    <p className="text-primary font-bold">
                        {naira(transaction.amount)}
                    </p>
                </div>
                <div>
                    <h2 className="font-bold m-0 text-right">Status</h2>
                    <p
                        className={`text-xs capitalize m-0 text-right ${
                            transaction.status === "complete"
                                ? "text-success"
                                : transaction.status === "failed"
                                ? "text-danger"
                                : "text-warning"
                        }`}
                    >
                        {transaction.status}
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-bold m-0">Recipient</h2>
                    <p className="text-primary font-bold">
                        {transaction.recipient}
                    </p>
                </div>
                <div>
                    <h2 className="font-bold m-0 text-right">Date</h2>
                    <p className="text-xs text-gray-400 text-right">
                        {transaction.date}
                    </p>
                </div>
            </div>

            {AUTH_USER.is_admin && (
                <>
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="font-bold m-0">API Code</h2>
                                <p className="text-gray-600 text-xs">
                                    {
                                        transaction?.credit_data?.order_data
                                            ?.api_data?.code
                                    }
                                </p>
                            </div>
                            <div>
                                <h2 className="font-bold m-0 text-right">
                                    API Message
                                </h2>
                                <p className={`text-${transaction.status === "complete" ? "success" : "danger"} text-xs font-bold text-right`}>
                                    {
                                        transaction?.credit_data?.order_data
                                            ?.api_data?.message
                                    }
                                </p>
                            </div>
                        </div>
                </>
            )}
            <h2 className="text-center font-bold mb-0">User Summary</h2>

            <div className="flex justify-between">
                <div>
                    <h2 className="font-bold m-0">Name</h2>
                    <p className="text-primary font-bold capitalize">
                        {transaction.user.full_name}
                    </p>
                </div>
                <div>
                    <h2 className="font-bold m-0 text-right">Balance</h2>
                    <p className="text-primary font-bold text-right">
                        {naira(transaction.user.balance)}
                    </p>
                </div>
            </div>
            <div className="flex justify-between">
                <div>
                    <h2 className="font-bold m-0">Email</h2>
                    <p className="text-primary font-bold">
                        {transaction.user.email}
                    </p>
                </div>
                <div>
                    <h2 className="font-bold m-0 text-right">Phone No.</h2>
                    <p className="text-primary font-bold text-right">
                        {transaction.user.mobile}
                    </p>
                </div>
            </div>
        </div>
    );
};

export const DepositTransactionSummary = ({ transaction }) => {
    return <div>{transaction.reference}</div>;
};

export const makeTransactionComponent = (transaction) => {
    var transactionComponent = (
        <OrderTransactionSummary transaction={transaction} />
    );
    switch (transaction.type.toLowerCase()) {
        case "airtime":
            transactionComponent = (
                <OrderTransactionSummary transaction={transaction} />
            );
            break;

        case "data":
            transactionComponent = (
                <OrderTransactionSummary transaction={transaction} />
            );
            break;
        case "electricity":
            transactionComponent = (
                <OrderTransactionSummary transaction={transaction} />
            );
            break;
        case "cable-tv":
            transactionComponent = (
                <OrderTransactionSummary transaction={transaction} />
            );
            break;
        case "deposit":
            transactionComponent = (
                <DepositTransactionSummary transaction={transaction} />
            );
            break;
        default:
            break;
    }
    return transactionComponent;
};
function Transactions(props) {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(20);
    const [perPage, setPerPage] = useState(20);
    // const dispatch = useDispatch();
    const type =
        props.type === undefined ||
        props.type.toLowerCase() === "all" ||
        props.type === ""
            ? null
            : props.type;

    const handleRowClicked = (transaction) => {
        props.openModal({
            show: true,
            header: (
                <h3 className="font-bold uppercase">{transaction.reference}</h3>
            ),
            content: (
                <div className="w-full md:w-1/2 mx-auto">
                    {makeTransactionComponent(transaction)}
                </div>
            ),
        });
    };
    const fetchT = async (page) => {
        setLoading(true);
        const response = await axios.get(
            `/transactions?page=${page}&per_page=${perPage}&delay=1${
                type ? "&type=" + type : ""
            }`
        );
        setTransactions(response.data.data.transactions.data);
        setTotalRows(response.data.data.transactions.total);

        setLoading(false);
    };

    const handlePageChange = (page) => {
        fetchT(page);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        setLoading(true);

        const response = await axios.get(
            `/transactions?page=${page}&per_page=${newPerPage}&delay=1`
        );

        setTransactions(response.data.data.transactions.data);
        setPerPage(newPerPage);
        setLoading(false);
    };

    useEffect(() => {
        fetchT(1);
    }, []);

    const columns = [
        {
            name: "User",
            selector: (t) => t.user?.email,
            sortable: true,
        },
        {
            name: "Type",
            selector: (t) => t.type,
            sortable: true,
            cell: (t) => (
                <p
                    onClick={() => handleRowClicked(t)}
                    className="text-purple-500 font-bold uppercase"
                >
                    <span className="text-primary">{t.type}</span>
                    <span className="block text-xs font-bold text-gray-400">
                        {t.recipient}
                    </span>
                </p>
            ),
        },
        {
            name: "Amount",
            selector: (t) => t.amount,
            sortable: true,
            cell: (t) => (
                <div onClick={() => handleRowClicked(t)} className="tb-ord-id">
                    <p
                        className={`font-bold ${
                            t.status === "complete" || t.status === "success"
                                ? "text-green-400"
                                : t.status === "failed"
                                ? "text-red-500"
                                : "text-yellow-400"
                        }`}
                    >
                        {naira(t.amount)}
                    </p>
                    <span
                        className={`badge badge-dot capitalize text-xs text-gray-300`}
                    >
                        {t.status}
                    </span>
                </div>
            ),
        },
        {
            name: "Date",
            selector: (t) => t.created_at,
            sortable: true,
            right: true,
            cell: (t) => (
                <p
                    onClick={() => handleRowClicked(t)}
                    className="text-xs text-gray-400"
                >
                    {t.date}
                </p>
            ),
        },
    ];
    return (
        <div>
            {props.isLoading ? (
                <Spinner text="Loading..." />
            ) : (
                <>
                    <div>
                        <DataTable
                            columns={columns}
                            data={transactions}
                            progressPending={loading}
                            pagination
                            paginationServer
                            paginationTotalRows={totalRows}
                            onChangeRowsPerPage={handlePerRowsChange}
                            onChangePage={handlePageChange}
                            paginationPerPage={perPage}
                            paginationRowsPerPageOptions={[
                                10, 20, 50, 100, 200, 500,
                            ]}
                            highlightOnHover={true}
                            pointerOnHover={true}
                            onRowClicked={(row) => handleRowClicked(row)}
                            progressComponent={
                                <Spinner text="Loading transactions" />
                            }
                        />
                    </div>
                    {/* <table className="table table-orders bg-white">
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
                                            <br />
                                            <p className="text-gray-400 uppercase">
                                                {t.recipient}
                                            </p>
                                        </span>
                                        <span className="tb-odr-status">
                                            <span
                                                className={`badge badge-dot capitalize ${
                                                    t.status === "complete"
                                                        ? "badge-success"
                                                        : t.status === "failed"
                                                        ? "badge-danger"
                                                        : "badge-warning"
                                                }`}
                                            >
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
                    </table> */}
                </>
            )}
            {/* <div className="my-8 flex items-center justify-center w-full">
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
            </div> */}
        </div>
    );
}

export default Transactions;
