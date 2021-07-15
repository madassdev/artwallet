import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import BalanceCard from "./BalanceCard";

function Transfer(props) {
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [isPaying, setIsPaying] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [transactionComplete, setTransactionComplete] = useState(false);
    const [pin, setPin] = useState("");

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

        if (pin.length !== 4) {
            alert("Please enter 4 digit PIN");
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
                pin,
                amount,
            })
            .then((res) => {
                setIsPaying(false);
                props.debitUserBalance(amount);
                props.addTransaction(res.data.data.transaction);
                toast.success(res.data.message, {
                    position: "bottom-center",
                });
                setTransactionComplete(true);
            })
            .catch((err) => {
                if (err.response.status === 403) {
                    console.log(err.response.data);
                    toast.error(err.response.data.message, {
                        position: "bottom-center",
                    });
                }
                setIsPaying(false);
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
                    <BalanceCard />

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
                                <form autoComplete="off">
                                    <div className="form-group flex flex-col space-y-1">
                                        <p className="font-bold">PIN</p>

                                        <div className="form-control-wrap">
                                            <a
                                                className="form-icon form-icon-right passcode-switch lg"
                                                data-target="pin"
                                            >
                                                <em className="passcode-icon icon-show icon ni ni-eye"></em>
                                                <em className="passcode-icon icon-hide icon ni ni-eye-off"></em>
                                            </a>
                                            <input
                                                type="password"
                                                name="pin"
                                                className="w-full rounded border-gray-300"
                                                value={pin}
                                                onChange={(e) =>
                                                    setPin(e.target.value)
                                                }
                                                id="pin"
                                                maxLength="4"
                                                placeholder="Enter 4 digit PIN"
                                            />
                                        </div>
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
                                </form>
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
