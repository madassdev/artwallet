import React, { useState } from "react";
import { connect } from "react-redux";
import { updatePlan } from "../reducers/planReducer";

function EditOnePlan(props) {
    const [titleError, setTitleError] = useState(null);
    const [title, setTitle] = useState(props.plan.title);
    const [price, setPrice] = useState(props.plan.price);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (title === "") {
            setTitleError("error");
            return;
        } else {
            props.updatePlan({
                id: props.plan.id,
                title,
                price,
                // validity,
                type:props.planType
            });
        }

        // console.log(title);
    };
    return (
        <div className="w-full md:w-1/2 mx-auto">
            <form onSubmit={handleSubmit} className="flrx flex-col space-y-4">
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
                {/* <div className="w-full">
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
                </div> */}

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

export default connect(mapStateToProps, mapDispatchToProps)(EditOnePlan);
