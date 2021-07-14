import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getElectricityPlans } from "../reducers/planReducer";
import ProviderPlans from "./ProviderPlans";
import BalanceCard from "./BalanceCard";
import axios from "axios";

function Electricity(props) {
    const [selectedPlan, setSelectedPlan] = useState(0);
    const [amount, setAmount] = useState("");
    const [destination, setDestination] = useState("");
    const [isPaying, setIsPaying] = useState(false);
    const [plan, setPlan] = useState()
    const [isReady, setIsReady] = useState(false);
    const [transactionComplete, setTransactionComplete] = useState(false);

    const handlePlanSelected = (e) => {
        setSelectedPlan(e.target.value);
        const plan_id = e.target.value;
        const plan_object = props.plans.find((p) => p.id == plan_id);
        setPlan(plan_object)
    };

    const handleProceed = (e) => {
        if (destination === "") {
            alert("Please enter a valid recipient number");
            return;
        }
        if (!selectedPlan) {
            alert("Please select a provider first");
            return;
        }

        if (amount === "") {
            alert("Please enter an amount");
            return;
        }
        if (amount > props.user.balance) {
            alert("Your balance is insufficient for the transaction.");
            return;
        }
        

        setIsReady(true);
    };

    const handlePaymentClicked = (e) => {
        e.preventDefault();
        if (props.user.balance < amount) {
            console.log("insufficient balance");
        }

        if (!selectedPlan) {
            alert("Please select a provider first");
            return;
        }
        if (
            !destination ||
            destination.length.length < 11 ||
            destination.length === ""
        ) {
            alert("Please Enter a valid number");
            return;
        }
        if (!amount || amount === 0 || amount === "") {
            alert("Please Enter a valid amount");
            return;
        }

        setIsPaying(true);
        // return;
        axios
            .post("/orders/electricity", {
                plan_id: selectedPlan,
                type: "electricity",
                amount,
                destination,
            })
            .then((res) => {
                console.log(res.data);
                setIsPaying(false);
                props.debitUserBalance(amount);
                props.addTransaction(res.data.data.transaction);
                setTransactionComplete(true)
            })
            .catch((err) => {
                console.log(err);
                setIsPaying(false);
                console.log(err.message);
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
                        Transaction successful!
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
                        Buy Electricity
                    </h2>
                    <BalanceCard />
                    {isReady ? (
                        /* Summary */

                        <div className="my-4 w-full md:w-1/2 mx-auto shadow p-5">
                            <div className="flex flex-col space-y-4">
                                <h2 className="text-center font-bold mb-0">
                                    Transaction Summary
                                </h2>

                                <div>
                                    <h2 className="font-bold m-0">Recipient</h2>
                                    <p className="text-gray-600">
                                        {destination}
                                    </p>
                                </div>
                                <div>
                                    <h2 className="font-bold m-0">Provider</h2>
                                    <p className="text-gray-600">
                                        {plan.title}
                                    </p>
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
                                            onClick={handlePaymentClicked}
                                        >
                                            Pay &#x20A6;
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
                    ) : (
                        <div className="my-4 w-full md:w-1/2 mx-auto">
                            <div className="form-group flex flex-col space-y-1">
                                <p className="font-bold">Select Electricity Provider</p>
                                <select
                                    className="w-full rounded border-gray-300"
                                    value={selectedPlan}
                                    onChange={handlePlanSelected}
                                >
                                    <option value="0" disabled>
                                        SELECT PROVIDER
                                    </option>
                                    {props.plans?.map((plan) => (
                                        <option key={plan.id} value={plan.id}>
                                            {plan.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group flex flex-col space-y-1">
                                <p className="font-bold">
                                    Destination Meter Number
                                </p>

                                <div className="form-control-wrap">
                                    <input
                                        type="number"
                                        min="100"
                                        className="w-full rounded border-gray-300"
                                        value={destination}
                                        onChange={(e) =>
                                            setDestination(e.target.value)
                                        }
                                        placeholder="Enter destination meter number"
                                    />
                                </div>
                            </div>
                            <div className="form-group flex flex-col space-y-1">
                                <p className="font-bold">Amount</p>

                                <div className="form-control-wrap">
                                    <input
                                        type="number"
                                        min="100"
                                        className="w-full rounded border-gray-300"
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
                    )}
                </>
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        services: state.serviceState.services,
        plans: getElectricityPlans(state.planState.plans),
        user: state.userState.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        paymentSuccess: () =>
            dispatch({
                type: "OPEN_MODAL",
                modal: {
                    show: 1,
                    header: "Payment Success",
                    content: <h1>Payment success</h1>,
                },
            }),
        debitUserBalance: (amount) =>
            dispatch({
                type: "DEBIT_USER",
                amount,
            }),
        addTransaction: (transaction) =>
            dispatch({
                type: "ADD_TRANSACTION",
                transaction: transaction,
            }),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Electricity);
