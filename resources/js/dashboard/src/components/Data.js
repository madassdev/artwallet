import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getDataProviders } from "../reducers/serviceReducer";
import ProviderPlans from "./ProviderPlans";

// const service_id = 1;
function Data(props) {
    const [providerSelected, setProviderSelected] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [planSelected, setPlanSelected] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const handleProviderSelected = (provider_id) => {
        setProviderSelected(true);
        setSelectedProvider(props.providers?.find((p) => p.id === provider_id));
        setPlanSelected(false);
    };
    const handlePlanSelected = (plan) => {
        // console.log(plan)
        setPlanSelected(true);
        setSelectedPlan(plan);
        console.log('selected plan is', plan)
    };

    return (
        <div>
            <h5>Select Data Provider</h5>

            <DataContainer className="my-2">
                {props.providers?.map(
                    (provider) =>
                        provider.plans.length ? (
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
                        ) : ("")
                )}
            </DataContainer>
            {providerSelected && (
                <ProviderPlans
                    provider={selectedProvider}
                    planSelected={handlePlanSelected}
                />
            )}

            {planSelected && <div>{"plan is" + selectedPlan.title}</div>}
        </div>
    );
}

const DataContainer = styled.div`
    display: flex;

    @media (max-width: 768px) {
        display: grid;
        grid-template-columns: auto auto;
        grid-gap: 20px;
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
        height: 60px;
        width: 150px;
        @media (max-width: 768px) {
            margin: auto;
        }
        /* pointer-events: none; */
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
`;

const mapStateToProps = (state) => {
    return {
        services: state.serviceState.services,
        providers: getDataProviders(state.serviceState.services)?.providers,
        // providers: state.providerState.providers
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Data);
