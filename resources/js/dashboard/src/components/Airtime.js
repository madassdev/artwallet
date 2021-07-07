import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getAirtimePlans } from "../reducers/planReducer";
import ProviderPlans from "./ProviderPlans";
import axios from "axios";

function Airtime(props) {
    const [selectedPlan, setSelectedPlan] = useState(0);
    const [amount, setAmount] = useState("");
    const [destination, setDestination] = useState("");
    const [isPaying, setIsPaying] = useState(false);

    const handlePlanSelected = (e) => {
        setSelectedPlan(e.target.value);
    };

    const handlePaymentClicked = (e) => {
        e.preventDefault();
        if (props.user.balance < amount) {
            console.log("insufficient balance");
        }

        if (!selectedPlan) {
            alert("Please select a plan first");
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
            .post("/orders", {
                plan_id: selectedPlan,
                type: "airtime",
                amount,
                destination,
            })
            .then((res) => {
                console.log(res.data);
                setIsPaying(false);
                props.debitUserBalance(amount);
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
                Select Airtime Provider
            </h5>

            <div className="form-group flex flex-col space-y-1">
                <p className="font-bold">Select Provider</p>
                <select
                    className="w-full rounded border-gray-300"
                    value={selectedPlan}
                    onChange={handlePlanSelected}
                >
                    <option value="0" disabled>
                        SELECT PLAN
                    </option>
                    {props.plans?.map((plan) => (
                        <option key={plan.id} value={plan.id}>
                            {plan.title}
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
            <div className="form-group flex flex-col space-y-1">
                <p className="font-bold">Amount</p>

                <div className="form-control-wrap">
                    <input
                        type="number"
                        min="100"
                        className="w-full rounded border-gray-300"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
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

const Container = styled.div`
    display: flex;

    @media (max-width: 768px) {
        display: grid;
        grid-template-columns: auto auto;
        grid-gap: 20px;
    }
`;

const RadioFormGroup = styled.div`
    .plan-radio {
        display: none;
        &:checked {
            & ~ label {
                color: white;
                /* background: #854fff; */
                border: 2px solid #854fff;
            }
        }
    }
    label {
        height: 100px;
        width: 120px;
        font-weight: bold;
        p {
            color: #333;
            font-size: 14px;
        }
        span {
            color: #854fff;
        }
        @media (max-width: 768px) {
            margin: auto;
        }
        color: #8091a7;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: white;
        border-radius: 5px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        i {
            font-size: 40px;
        }
        margin-right: 30px;
        /* transition: 0.3s; */
    }
`;
const mapStateToProps = (state) => {
    return {
        services: state.serviceState.services,
        plans: getAirtimePlans(state.planState.plans),
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
        debitUserBalance: (amount) => {
            dispatch({
                type: "DEBIT_USER",
                amount,
            });
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Airtime);
