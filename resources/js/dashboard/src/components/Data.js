import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { getDataProviders } from "../reducers/providerReducer";

function Data(props) {
    const [selectedProvider, setSelectedProvider] = useState(-1);
    const [selectedPlan, setSelectedPlan] = useState(0);
    const [providerPlans, setProviderPlans] = useState([]);
    const [amount, setAmount] = useState("");
    const [destination, setDestination] = useState("");
    const [isPaying, setIsPaying] = useState(false);

    const handlePlanSelected = (e) => {
        setSelectedPlan(e.target.value);
    };
    const handleProviderSelected = (e) => {
        setSelectedProvider(e.target.value);
        const provider_plans = props.providers[e.target.value];
        // console.log('s',selectedProvider)
        // console.log(provider_plans);

        setProviderPlans(provider_plans?.plans);
    };

    const handlePaymentClicked = (e) => {
        e.preventDefault();
        if (props.user.balance < amount) {
            console.log("insufficient balance");
            alert("Insufficient balance");
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
        if (
            !destination ||
            destination.length.length < 11 ||
            destination.length === ""
        ) {
            alert("Please Enter a valid number");
            return;
        }

        setIsPaying(true);
        // return;
        axios
            .post("/orders", {
                plan_id: selectedPlan,
                type: "data",
                destination,
            })
            .then((res) => {
                setIsPaying(false);
                props.debitUserBalance(amount);
                props.addTransaction(res.data.data.transaction)
                props.paymentSuccess();
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
        <div className="w-full md:w-1/2 mx-auto bg-white p-3 my-20 shadow-lg flex flex-col">
            <h5 className="text-center my-2 text-lg font-bold mb-4">
                Buy Data
            </h5>

            <div className="form-group flex flex-col space-y-1">
                <p className="font-bold">Select Provider</p>
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
                <p className="font-bold">Select Provider</p>
                <select
                    className="w-full rounded border-gray-300"
                    name="plan"
                    value={selectedPlan}
                    onChange={handlePlanSelected}
                >
                    <option value="0" disabled>
                        SELECT PLAN
                    </option>
                    {selectedProvider &&
                        providerPlans?.map((plan) => (
                            <option key={plan.id} value={plan.id}>
                                {plan.title} @ &#x20A6;{plan.price}
                            </option>
                        ))}
                </select>
            </div>
            <div className="form-group flex flex-col space-y-1">
                <p className="font-bold">Destination Phone Number</p>

                <div className="form-control-wrap">
                    <input
                        type="number"
                        min="100"
                        className="w-full rounded border-gray-300"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="Enter destination phone number"
                    />
                </div>
            </div>

            <div className="form-group my-2">
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
                        className="btn btn-primary btn-block"
                        onClick={handlePaymentClicked}
                    >
                        Pay
                    </button>
                )}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        services: state.serviceState.services,
        providers: getDataProviders(state.providerState.providers),
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
                transaction
            }),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Data);
