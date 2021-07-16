import React, { useState } from "react";
import { connect } from "react-redux";
import { createPlan } from "../reducers/planReducer";

function CreatePlan(props) {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (title === "") {
            setTitleError("error");
            return;
        } else {
            setTitleError();
            props.createPlan({
                title: title,
                provider_id,
                price,
                validity
            });
        }

        // console.log(title);
    };
    const [titleError, setTitleError] = useState(null);
    const [title, setTitle] = useState("");
    const [validity, setValidity] = useState("");
    const [price, setPrice] = useState("");
    const [provider_id, setProviderId] = useState(props.provider.id);
    return (
        <div className="w-full md:w-1/2 mx-auto">
            <form onSubmit={handleSubmit} className="flrx flex-col space-y-4">
                <div className="form-group">
                    <h5 className="text-center font-bold text-lg">
                        {props.provider.title}
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

                <div className="w-full mt-2">
                    {props.is_creating ? (
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
                            Create
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        is_creating: state.planState.is_creating,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createPlan: (plan) => dispatch(createPlan(plan)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlan);
