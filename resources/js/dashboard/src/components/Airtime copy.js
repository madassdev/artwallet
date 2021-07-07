import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getAirtimePlans } from "../reducers/planReducer";
import ProviderPlans from "./ProviderPlans";
import axios from "axios";

function Airtime(props) {
    const [planSelected, setPlanSelected] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(true);
    const [amount, setAmount] = useState(0);
    const [isPaying, setIsPaying] = useState(false);

    const handlePlanSelected = (plan) => {
        setPlanSelected(true);
        setSelectedPlan(plan);
    };

    const handlePaymentClicked = (e) => {
        e.preventDefault();
        if (props.user.balance < amount) {
            console.log("insufficient balance");
            alert(
                "you do not have enough balance to payfor this plan, proceed to deposit!"
            );
            return;
        }
        setIsPaying(true);
        axios
            .post("/orders", {
                plan_id: selectedPlan.id,
                type: "airtime",
                amount,
            })
            .then((res) => {
                console.log(res.data);
                setIsPaying(false);
                props.debitUserBalance(amount);
                props.paymentSuccess();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const paymentDone = (e) => {
        e.preventDefault();
        setIsPaying(false);
    };
    return (
        <div>
            <h5>Select Airtime Provider</h5>

            <div className="card-body">
                <h5>Select Plan</h5>
                <Container className="my-2">
                    {props.plans?.map((plan) => (
                        <RadioFormGroup key={plan.id}>
                            <input
                                className="plan-radio"
                                name="plan_id"
                                id={"plan" + plan.id}
                                type="radio"
                                value={plan.id}
                                onChange={() => handlePlanSelected(plan)}
                            />
                            <label htmlFor={"plan" + plan.id}>
                                <p>{plan.title}</p>
                            </label>
                        </RadioFormGroup>
                    ))}
                </Container>
                {planSelected && (
                    <div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="default-01">
                                Amount
                            </label>

                            <div className="form-control-wrap">
                                <input
                                    type="number"
                                    min="100"
                                    className={"form-control "}
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="Enter your phone number"
                                />
                            </div>
                        </div>

                        <div className="form-group">
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
                                    Pay #{amount}
                                </button>
                            )}
                        </div>
                    </div>
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
