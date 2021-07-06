import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getDataProviders } from "../reducers/serviceReducer";
import ProviderPlans from "./ProviderPlans";
import axios from "axios";

// const service_id = 1;
function Data(props) {
    const [providerSelected, setProviderSelected] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [planSelected, setPlanSelected] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isPaying, setIsPaying] = useState(false);
    const handleProviderSelected = (provider_id) => {
        setProviderSelected(true);
        setSelectedProvider(props.providers?.find((p) => p.id === provider_id));
        setPlanSelected(false);
    };
    const handlePlanSelected = (plan) => {
        // console.log(plan)
        setPlanSelected(true);
        setSelectedPlan(plan);
    };

    const handlePaymentClicked = (e) => {
        e.preventDefault();
        if (props.user.balance < selectedPlan.price) {
            console.log("insufficient balance");
            alert(
                "you do not have enough balance to payfor this plan, proceed to deposit!"
            );
            return;
        }
        setIsPaying(true);
        axios
            .post("/orders", { plan_id: selectedPlan.id })
            .then((res) => {
                console.log(res.data);
                setIsPaying(false);
                props.debitUserBalance(selectedPlan.price);
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
        <div className="card col-md-8 mx-auto">
            <div className="card-header">
                <h5>Select Data Provider</h5>
            </div>

            <div className="card-body">
                {providerSelected ? (
                    <ProviderPlans
                        provider={selectedProvider}
                        planSelected={handlePlanSelected}
                        changeProvider={() => {
                            setProviderSelected(false);
                            setPlanSelected(false);
                        }}
                    />
                ) : (
                    <DataContainer className="my-2">
                        {props.providers?.map((provider) => (
                            // provider.plans.length ?
                            <RadioFormGroup key={provider.id}>
                                <input
                                    className="provider-radio"
                                    name="data_id"
                                    id={"data" + provider.id}
                                    type="radio"
                                    value={provider.id}
                                    onChange={(e) =>
                                        handleProviderSelected(provider.id)
                                    }
                                />
                                <label htmlFor={"data" + provider.id}>
                                    {provider.title}
                                </label>
                            </RadioFormGroup>
                        ))}
                    </DataContainer>
                )}

                {planSelected && (
                    <div>
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
                                Pay #{selectedPlan.price}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

const DataContainer = styled.div`
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-gap: 20px;

    @media (max-width: 768px) {
        grid-gap: 10px;
        display: grid;
        grid-template-columns: auto auto;
    }
`;
const RadioFormGroup = styled.div`
    .provider-radio {
        display: none;
        &:checked {
            & ~ label {
                color: white;
                background: #854fff;
                border: 2px solid #854fff;
            }
        }
    }
    label {
        width: 120px;
        height: 150px;
        @media (max-width: 768px) {
            margin: auto;
        }
        /* padding: 10px; */
        font-weight: bold;
        font-size: 18px;
        color: #854fff;
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
        border-radius: 5px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        i {
            font-size: 40px;
        }
        margin-right: 30px;
        transition: 0.3s;
    }
    display: grid;
`;

const mapStateToProps = (state) => {
    return {
        services: state.serviceState.services,
        providers: getDataProviders(state.serviceState.services)?.providers,
        user: state.userState.user,
        // providers: state.providerState.providers
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
export default connect(mapStateToProps, mapDispatchToProps)(Data);
