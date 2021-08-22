import React from "react";
import { connect } from "react-redux";
import { getInternetProviders } from "../reducers/providerReducer";
import CreatePlan from "./CreatePlan";
import DeletePlan from "./DeletePlan";
import EditPlan from "./EditPlan";
import {
    Link,
    useRouteMatch,
    Switch,
    Route,
    useParams,
} from "react-router-dom";

function InternetManagement(props) {
    return (
        <div className="w-full p-5 bg-white">
            <h2 className="font-bold text-lg text-primary text-center">
                Internet Service Management
            </h2>

            <div className="w-full flex items-center my-2">
                <div className="w-1/6">
                    <h2 className="font-bold text-lg text-center text-gray-600">
                        Providers
                    </h2>
                </div>
                <div className="w-5/6 px-5">
                    <h2 className="font-bold text-lg text-center text-gray-600">
                        Plans
                    </h2>
                </div>
            </div>
            {props.providers?.map((provider) => (
                <div
                    className="w-full flex items-center my-4 px-3 rounded shadow-sm border-gray-200"
                    key={provider.id}
                >
                    <div className="w-1/6">
                        <div className="p-3 rounded flex items-center justify-center">
                            <p className="font-bold text-primary">
                                {provider.title}
                            </p>
                        </div>
                    </div>
                    <div className="w-5/6 px-5">
                        <div className="grid grid-cols-4 w-full">
                            {provider.plans.map((plan) => (
                                <div className="mx-auto py-2" key={plan.id}>
                                    <div className="w-24 h-24 shadow-sm rounded flex items-center justify-center flex-col">
                                        <p className="text-center text-sm uppercase">
                                            {plan.title}
                                        </p>
                                        <p className="font-bold text-primary">
                                            {naira(plan.price)}
                                        </p>
                                        <div className="dropdown">
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
                                                        <a
                                                            href="#"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                props.editPlan(
                                                                    plan
                                                                );
                                                            }}
                                                        >
                                                            Edit
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                props.deletePlan(
                                                                    plan
                                                                );
                                                            }}
                                                        >
                                                            Delete
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="mx-auto py-2">
                                <div
                                    className="flex flex-col items-center cursor-pointer"
                                    onClick={() =>
                                        props.openCreateModal(provider)
                                    }
                                >
                                    <span className="h-12 w-12 flex items-center justify-center rounded-full bg-purple-100 text-purple-700">
                                        <i className="mdi mdi-plus text-2xl"></i>
                                    </span>
                                    <p className="text-center text-xs text-gray-400 mt-1">
                                        Add plan
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

const mapState = (state) => {
    return {
        services: state.serviceState.services,
        plans: state.planState.plans,
        providers: getInternetProviders(state.providerState.providers),
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
                    header: <h3>Create Plan</h3>,
                },
            });
        },
        editPlan: (plan) => {
            dispatch({
                type: "OPEN_MODAL",
                modal: {
                    show: 1,
                    content: <EditPlan plan={plan} />,
                    header: <h3>Edit Plan</h3>,
                },
            });
        },
        deletePlan: (plan) => {
            dispatch({
                type: "OPEN_MODAL",
                modal: {
                    show: 1,
                    content: <DeletePlan plan={plan} />,
                    header: <h3>Delete Provider</h3>,
                },
            });
        },
    };
};

export default connect(mapState, mapDispatch)(InternetManagement);
