import React from "react";
import { connect } from "react-redux";
import { getElectricityProviders } from "../reducers/providerReducer";
import CreateOnePlan from "./CreateOnePlan";
import DeletePlan from "./DeletePlan";
import EditOnePlan from "./EditOnePlan";

function ElectricityManagement(props) {
    return (
        <div className="w-full p-5 bg-white">
            <h2 className="font-bold text-lg text-primary text-center">
                Electricity Management
            </h2>

            <div className="grid grid-cols-4 w-full">
                {props.providers?.map((plan) => (
                    <div className="mx-auto py-2" key={plan.id}>
                        <div className="w-24 h-24 shadow-sm rounded flex items-center justify-center flex-col">
                            <p className="text-center text-sm uppercase">
                                {plan.title}
                            </p>
                            {/* <div className="dropdown">
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
                                                    props.editPlan(plan);
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
                                                    props.deletePlan(plan);
                                                }}
                                            >
                                                Delete
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div> */}
                        </div>
                    </div>
                ))}
                <div className="mx-auto py-2">
                    <div
                        className="flex flex-col items-center cursor-pointer"
                        onClick={() => props.openCreateModal(plan)}
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
    );
}
const mapState = (state) => {
    return {
        providers: getElectricityProviders(state.providerState.providers),
    };
};
const mapDispatch = (dispatch) => {
    return {
        openCreateModal: (provider) => {
            dispatch({
                type: "OPEN_MODAL",
                modal: {
                    show: 1,
                    content: <CreateOnePlan plan={plan} type="electricity"/>,
                    header: <h3>Create Plan</h3>,
                },
            });
        },
        editPlan: (plan) => {
            dispatch({
                type: "OPEN_MODAL",
                modal: {
                    show: 1,
                    content: <EditOnePlan plan={plan} type="electricity"/>,
                    header: <h3>Edit Plan</h3>,
                },
            });
        },
        deletePlan: (plan) => {
            dispatch({
                type: "OPEN_MODAL",
                modal: {
                    show: 1,
                    content: <DeletePlan plan={plan} type="electricity"/>,
                    header: <h3>Delete Plan</h3>,
                },
            });
        },
    };
};

export default connect(mapState, mapDispatch)(ElectricityManagement);
