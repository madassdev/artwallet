import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BalanceCard from "./BalanceCard";
import axios from "axios";
import { getRechargeProviders } from "../reducers/providerReducer";
import toast from "react-hot-toast";

function RechargePrint(props) {
    const [selectedProvider, setSelectedProvider] = useState(-1);
    const [selectedPlan, setSelectedPlan] = useState(0);
    const [providerPlans, setProviderPlans] = useState([]);
    const [amount, setAmount] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isPaying, setIsPaying] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [plan, setPlan] = useState();
    const [transactionComplete, setTransactionComplete] = useState(false);
    const [isValidating, setIsValidating] = useState(false);
    const [pin, setPin] = useState("");
    const charges = parseInt(PUBLIC_CONFIG.internet_fees || 50);
    const handlePlanSelected = (e) => {
        const plan_id = e.target.value;
        const plan_object = props.plans.find((p) => p.id == plan_id);
        setPlan(plan_object);
        setSelectedPlan(plan_object.id);
        setAmount(parseInt(plan_object.price));
        // console.log(amt);
    };
    const handleProviderSelected = (e) => {
        setSelectedProvider(e.target.value);
        const provider_plans = props.providers[e.target.value];
        setProviderPlans(provider_plans?.plans);
    };

    const handleProceed = (e) => {
        if (!selectedProvider) {
            alert("Please select a Provider first");
            return;
        }
        if (!selectedPlan) {
            alert("Please select a Recharge Card Type first");
            return;
        }
        if (!quantity || quantity < 1) {
            alert("Please a minimum quantity of 1");
            return;
        }

        setAmount(parseFloat(plan.price) * quantity);
        // setIsValidating(true);
        setIsReady(true);

        // return;
    };

    const handlePaymentClicked = (e) => {
        e.preventDefault();
        if (pin.length !== 4) {
            alert("Please enter 4 digit PIN");
            return;
        }

        if (!selectedProvider) {
            alert("Please select a Provider first");
            return;
        }
        if (!selectedPlan) {
            alert("Please select a Plan first");
            return;
        }

        if (amount + charges > props.user.balance) {
            alert("Your balance is insufficient for the transaction.");
            return;
        }

        setIsPaying(true);
        axios
            .post("/orders/recharge-print", {
                plan_id: selectedPlan,
                type: "recharge-print",
                pin,
                quantity,
            })
            .then((res) => {
                setIsPaying(false);
                if (res.data.order_success) {
                    props.debitUserBalance(amount + charges);
                }
                toast.success(res.data.message, {
                    position: "bottom-center",
                });
                setTransactionComplete(true);
                // props.paymentSuccess();
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
                        <div className="bg-primary text-white h-16 w-16 rounded-full mx-auto flex items-center justify-center ">
                            <i className="mdi mdi-check text-lg"></i>
                        </div>
                        <p className="text-gray-600 font-bold text-lg uppercase text-center mt-4">
                            Order request submitted
                        </p>
                        <p className="text-center text-xs text-gray-400">
                            Your request is being processed
                        </p>
                    </div>
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
                        Print Recharge Card
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
                                    <h2 className="font-bold m-0">
                                        Recharge Card Type
                                    </h2>
                                    <p className="text-gray-600">
                                        {plan?.title}
                                    </p>
                                </div>
                                <div>
                                    <h2 className="font-bold m-0">
                                        Quantity to print
                                    </h2>
                                    <p className="text-gray-600">{quantity}</p>
                                </div>
                                <div>
                                    <h2 className="font-bold m-0">Amount</h2>
                                    <p className="text-gray-600">
                                        {naira(amount)}
                                    </p>
                                </div>
                                <div>
                                    <h2 className="font-bold text-xs text-gray-400 m-0">
                                        Service charge
                                    </h2>
                                    <p className="text-gray-400 text-xs">
                                        {naira(charges)}
                                    </p>
                                </div>
                                <div>
                                    <h2 className="font-bold m-0">Total</h2>
                                    <p className="text-primary font-bold">
                                        {naira(amount + charges)}
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
                                                onClick={handlePaymentClicked}
                                            >
                                                Pay {naira(amount + charges)}
                                            </button>
                                        )}
                                        <p
                                            // onClick={() => setIsReady(false)}
                                            className="text-center mt-2 cursor-pointer text-gray-400 hover:text-purple-700 text-xs"
                                        >
                                            {"<<"} Go back
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <div className="my-4 w-full md:w-1/2 mx-auto">
                            <div className="form-group flex flex-col space-y-1">
                                <p className="font-bold">
                                    Select Recharge Card Provider
                                </p>
                                <select
                                    name="provider"
                                    className="w-full rounded border-gray-300"
                                    value={selectedProvider}
                                    onChange={handleProviderSelected}
                                >
                                    <option value="-1" disabled>
                                        SELECT PROVIDER
                                    </option>
                                    {props.providers?.map((provider, i) => (
                                        <option key={provider.id} value={i}>
                                            {provider.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group flex flex-col space-y-1">
                                <p className="font-bold">
                                    Select Recharge Card
                                </p>
                                <select
                                    className="w-full rounded border-gray-300"
                                    name="plan"
                                    value={selectedPlan}
                                    onChange={handlePlanSelected}
                                >
                                    <option value="0" disabled>
                                        SELECT RECHARGE CARD
                                    </option>
                                    {selectedProvider &&
                                        providerPlans?.map((plan) => (
                                            <option
                                                key={plan.id}
                                                value={plan.id}
                                                data-price={plan.price}
                                            >
                                                {plan.title} @ &#x20A6;
                                                {plan.price}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="form-group flex flex-col space-y-1">
                                <p className="font-bold">Quantity to print</p>

                                <div className="form-control-wrap">
                                    <input
                                        type="text"
                                        min="100"
                                        className="w-full rounded border-gray-300"
                                        value={quantity}
                                        min="1"
                                        onChange={(e) =>
                                            setQuantity(e.target.value)
                                        }
                                        placeholder="Enter number of card to print"
                                    />
                                </div>
                            </div>

                            <div className="form-group my-2">
                                {isValidating ? (
                                    <button
                                        onClick={() => {
                                            // setIsValidating(false);
                                        }}
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
                                        onClick={handleProceed}
                                    >
                                        Proceed {">>"}
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="my-4 w-full md:w-1/2 mx-auto text-center font-bold">
                        <Link
                            to="/buy/recharge-print/history"
                            className="text-primary hover:text-decoration:underline"
                        >
                            <i className="mdi mdi-history mr-2"></i>
                            View purchases
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        services: state.serviceState.services,
        plans: state.planState.plans,
        providers: getRechargeProviders(state.providerState.providers),
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
                    header: "PaymentSuccess",
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
                transaction,
            }),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(RechargePrint);
