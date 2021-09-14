import React, { useState } from "react";
import { connect } from "react-redux";
import { updatePlan } from "../reducers/planReducer";

function EditPlan(props) {
    const [titleError, setTitleError] = useState(null);
    const [title, setTitle] = useState(props.plan.title);
    const [validity, setValidity] = useState(props.plan.validity ?? "");
    const [price, setPrice] = useState(props.plan.price);
    const [selectedApiProvider, setSelectedApiProvider] = useState("CLUBKONNECT");
    const [apiRef, setApiRef] = useState(props.plan.api_ref || props.plan.meta[0].plan_ref|| "sss");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (apiRef === "") {
            alert("please enter plan api reference");
            return;
        }
        if (title === "") {
            setTitleError("error");
            return;
        } else {
            props.updatePlan({
                id: props.plan.id,
                title,
                price,
                validity,
                meta:{
                    api_provider: selectedApiProvider,
                    api_ref: apiRef,
                }
            });
        }

        // console.log(title);
    };

    const changeApiProvider = (e) => {
        setSelectedApiProvider(e.target.value);
    };

    return (
        <div className="w-full md:w-1/2 mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <div className="form-group">
                    <h5 className="text-center font-bold text-lg">
                        {props.plan.title}
                    </h5>
                </div>
                <div className="w-full">
                    <p className="text-gray-600 mb-1 font-bold">Title</p>

                    <input
                        type="text"
                        className={
                            "form-control w-full rounded border " +
                                titleError || "border-red-300"
                        }
                        value={title}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter title eg 1GB"
                    />
                </div>
                <div className="w-full">
                    <p className="text-gray-600 mb-1 font-bold">Price</p>

                    <input
                        type="number"
                        className={
                            "form-control w-full rounded border " +
                                titleError || "border-red-300"
                        }
                        value={price}
                        required
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter plan price"
                    />
                </div>
                <div className="w-full">
                    <p className="text-gray-600 mb-1 font-bold">Validity</p>

                    <input
                        type="text"
                        className={
                            "form-control w-full rounded border " +
                                titleError || "border-red-300"
                        }
                        value={validity}
                        onChange={(e) => setValidity(e.target.value)}
                        placeholder="Enter validity eg 14 days"
                    />
                </div>
                {/* <div className="w-full">
                    <p className="text-gray-600 mb-1 font-bold">API Provider</p>
                    <select
                        className="w-full rounded border-gray-300"
                        value={selectedApiProvider}
                        onChange={changeApiProvider}
                    >
                        <option value="clubKonnect">ClubKonnect</option>
                    </select>
                </div> */}
                <div className="w-full">
                    <p className="text-gray-600 mb-1 font-bold">
                        Plan API reference
                    </p>

                    <input
                        type="text"
                        className={"form-control w-full rounded border "}
                        value={apiRef}
                        onChange={(e) => setApiRef(e.target.value)}
                        placeholder="Enter the API ref for this plan eg 'mtn-900-mb'"
                    />
                </div>
                <div className="w-full mt-2">
                    {props.is_updating ? (
                        <button
                            className="btn btn-light float-right"
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
                        <button className="btn btn-primary float-right">
                            Update
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        is_updating: state.planState.is_updating,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updatePlan: (plan) => dispatch(updatePlan(plan)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPlan);
