import axios from "axios";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import { connect } from "react-redux";
import AutoDeposit from "./AutoDeposit";

function Deposit(props) {
    const [methodTab, setMethodTab] = useState("auto");
    const [redirect, setRedirect] = useState(null);
    return (
        <div className="bg-white p-3 md:p-5">
            {redirect && <Redirect to={redirect} />}
            <div>
                <h2 className="text-purple-500 text-center font-bold text-lg capitalize m-0 p-0">
                    Fund your account
                </h2>
                <p className="text-gray-400 text-center">
                    Select a payment method
                </p>
            </div>

            <div className="flex my-8 items-center justify-center md:w-1/2 mx-auto space-x-4 md:space-x-8 text-gray-600">
                <div
                    onClick={() => setMethodTab("auto")}
                    className={`text-center cursor-pointer rounded shadow-sm p-5 ${
                        methodTab == "auto" && "text-purple-500 bg-purple-100"
                    }`}
                >
                    <i className="mdi mdi-credit-card mr-1"></i>Cards Deposit
                </div>{" "}
                <div
                    onClick={() => setMethodTab("manual")}
                    className={`text-center cursor-pointer rounded shadow-sm p-5 ${
                        methodTab == "manual" && "text-purple-500 bg-purple-100"
                    }`}
                >
                    <i className="mdi mdi-lock mr-1"></i>Manual Deposit
                </div>
            </div>

            {(methodTab == "auto" && <AutoDeposit />) ||
                (methodTab == "manual" && (
                    <div className="w-full md:w-1/2 mx-auto">
                        <h2 className="text-lg font-bold text-center">
                            Manual Deposit
                        </h2>
                        <div className="my-4">
                            <p className="text-center">
                                Please make payment to the following account
                                details, your payment will be confirmed and your balance will be credited within 24 hours.
                            </p>
                            <div className="text-center p-3 bg-gray-100 rounded my-2">
                                <p>{PUBLIC_CONFIG.deposit_account_name}</p>
                                <span className="text-2xl text-gray-600">
                                    {PUBLIC_CONFIG.deposit_account_number}{" "}
                                    <i className="text-primary text-sm mdi mdi-content-copy ml-2"></i>
                                </span>
                                <p className="font-bold">{PUBLIC_CONFIG.deposit_account_bank}</p>
                            </div>
                        </div>
                    </div>
                ))}
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
        creditUserBalance: (amount) =>
            dispatch({
                type: "CREDIT_USER",
                amount,
            }),
        addTransaction: (transaction) =>
            dispatch({
                type: "ADD_TRANSACTION",
                transaction: transaction,
            }),
    };
};
export default connect(mapState, mapDispatch)(Deposit);
