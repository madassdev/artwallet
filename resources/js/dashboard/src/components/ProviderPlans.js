import React, { useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchProviders } from "../actions/providerActions";
import { getProviderById } from "../reducers/providerReducer";
import CreatePlan from "./CreatePlan";

function ProviderPlans(props) {
    let { providerId } = useParams();
    const providers = useSelector((state) => state.providerState.providers);
    const provider = getProviderById(providerId, providers);
    const handleRemove = (e, plan) => {
        e.preventDefault();
        console.log(e);
        console.log(plan);
        // props.removeProvider(provider);
    };
    return (
        <div className="my-3">
            <div className="flex items-center justify-between w-full my-3">
                <h2 className="font-bold">Plans</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => props.openCreateModal(provider)}
                >
                    <i className="mdi mdi-plus mr-1"></i>Create Plan
                </button>
            </div>
            {provider?.plans.map((plan) => (
                <div
                    className="w-full shadow flex  items-center justify-between p-3 my-1"
                    key={plan.id}
                >
                    <div>
                        <p>{plan.title}</p>
                        <p className="text-primary font-bold">
                            {naira(plan.price)}
                        </p>
                    </div>
                    <div className="">
                        <a
                            className="text-soft dropdown-toggle btn btn-icon btn-trigger"
                            data-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <em className="icon ni ni-more-h"></em>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-xs">
                            <ul className="link-list-plain">
                                <li>
                                    <a href="#">View</a>
                                </li>
                                <li>
                                    <a href="#">Edit</a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        onClick={(e) => handleRemove(e, plan)}
                                    >
                                        Delete
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

const mapState = (state) => {
    return {
        providers: state.providerState.providers,
        // provider: getProviderById(providerId, state.providerState.providers)
    };
};

const mapDispatch = (dispatch) => {
    return {
        openCreateModal: (provider) => {
            dispatch({
                type: "OPEN_MODAL",
                modal: {
                    show: 1,
                    content: <CreatePlan provider={provider} />,
                    header: <h3>Create Provider</h3>,
                },
            });
        },
        removePlan: (plan) => {
            dispatch({
                type: "OPEN_MODAL",
                modal: {
                    show: 1,
                    content: <DeletePlan plan={plan} />,
                    header: <h3>Delete Plan</h3>,
                },
            });
        },
    };
};

export default connect(mapState, mapDispatch)(ProviderPlans);
