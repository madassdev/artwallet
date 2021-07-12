import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import BalanceCard from './BalanceCard'

function Transfer(props) {
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [isPaying, setIsPaying] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [transactionComplete, setTransactionComplete] = useState(false);

    const handleProceed = (e) => {
        if (recipient === "") {
            alert("Please enter a valid recipient phone number");
            return;
        }
        if (amount === "") {
            alert("Please enter an amount");
            return;
        }
        if (amount > props.user.balance) {
            alert("Your balance is insufficient for the transfer.");
            return;
        }

        setIsReady(true);
    };

    const handleTransfer = (e) => {
        e.preventDefault();
        if (props.user.balance < amount) {
            console.log("insufficient balance");
            alert("Insufficient balance");
            return;
        }

        if (!recipient) {
            alert("Please select a Provider first");
            return;
        }

        if (!recipient || recipient.length !== 11 || recipient === "") {
            alert("Please Enter a valid number");
            return;
        }

        setIsPaying(true);
        // return;
        axios
            .post("/orders/transfer", {
                type: "transfer",
                recipient,
                amount,
            })
            .then((res) => {
                setIsPaying(false);
                props.debitUserBalance(amount);
                props.addTransaction(res.data.data.transaction);
                setTransactionComplete(true)
            })
            .catch((err) => {
                console.log(err);
                setIsPaying(false);
                console.log(err.response);
            });
    };

    const paymentDone = (e) => {
        e.preventDefault();
        setIsPaying(false);
    };

    return (
        <div className="md:w-3/4 mx-auto p-3 md:p-5 bg-white">
            {transactionComplete ? (
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div>
                        <div className="bg-green-200 h-16 w-16 rounded-full text-green-700 mx-auto flex items-center justify-center ">
                            <i className="mdi mdi-check text-lg"></i>
                        </div>
                    </div>
                    <p className="text-gray-600 text-center">
                        Transfer successful
                    </p>
                    <div>
                        <Link
                            to="/"
                            className="text-center text-gray-400 hover:text-gray-600"
                        >
                            Done
                        </Link>
                    </div>
                </div>
            ) : (
                <>
                    <h2 className="text-purple-500 text-center font-bold text-lg capitalize m-0 p-0">
                        Transfer to others
                    </h2>
                    <BalanceCard/>

                    {!isReady ? (
                        <div className="my-4 w-full md:w-1/2 mx-auto">
                            <div className="form-group">
                                <label
                                    className="form-label font-bold"
                                    htmlFor="default-01"
                                >
                                    Recipient Phone Number
                                </label>

                                <div className="form-control-wrap">
                                    <input
                                        type="number"
                                        className="w-full rounded border-gray-300"
                                        id="default-01"
                                        value={recipient}
                                        onChange={(e) =>
                                            setRecipient(e.target.value)
                                        }
                                        placeholder="Enter recipient phone number"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label
                                    className="form-label font-bold"
                                    htmlFor="default-01"
                                >
                                    Amount
                                </label>

                                <div className="form-control-wrap">
                                    <input
                                        type="number"
                                        className="w-full rounded border-gray-300"
                                        id="default-01"
                                        value={amount}
                                        onChange={(e) =>
                                            setAmount(e.target.value)
                                        }
                                        placeholder="Enter amount"
                                    />
                                </div>
                            </div>
                            <div className="form-group my-2">
                                <button
                                    className="btn btn-primary btn-block font-bold"
                                    onClick={handleProceed}
                                >
                                    Proceed {">>"}
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* Summary */

                        <div className="my-4 w-full md:w-1/2 mx-auto shadow p-5">
                            <div className="flex flex-col space-y-4">
                                <h2 className="text-center font-bold mb-0">
                                    Transfer funds
                                </h2>

                                <div>
                                    <h2 className="font-bold m-0">Recipient</h2>
                                    <p className="text-gray-600">{recipient}</p>
                                </div>
                                <div>
                                    <h2 className="font-bold m-0">Amount</h2>
                                    <p className="text-gray-600">
                                        &#x20A6;
                                        {parseFloat(amount).toLocaleString()}
                                    </p>
                                </div>
                                <div className="w-full">
                                    {isPaying ? (
                                        <button
                                            onClick={paymentDone}
                                            className="btn btn-light btn-block"
                                            type="button"
                                        >
                                            <div
                                                className="spinner-border-sm spinner-border text-primary"
                                                role="status"
                                            >
                                                {/* <span class="sr-only">Loading...</span> */}
                                            </div>
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-primary btn-block font-bold"
                                            onClick={handleTransfer}
                                        >
                                            Transfer &#x20A6;
                                            {parseFloat(
                                                amount
                                            ).toLocaleString()}
                                        </button>
                                    )}
                                    <p
                                        onClick={() => setIsReady(false)}
                                        className="text-center mt-2 cursor-pointer text-gray-400 hover:text-purple-700 text-xs"
                                    >
                                        {"<<"} Go back
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

const mapState = (state) => {
    return {
        user: state.userState.user,
    };
};

const mapDispatch = (dispatch) => {
    return {
        debitUserBalance: (amount) =>
            dispatch({
                type: "DEBIT_USER",
                amount,
            }),
        addTransaction: (transaction) =>
            dispatch({
                type: "ADD_TRANSACTION",
                transaction,
            }),
    };
};

export default connect(mapState, mapDispatch)(Transfer);
