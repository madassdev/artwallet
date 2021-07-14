import React, { useState } from "react";
import { connect } from "react-redux";
import { createProvider } from "../actions/providerActions";

function CreateProvider(props) {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e)
        if (title === "") {
            setTitleError("error");
            return;
        } else {
            setTitleError();
            props.createProvider({
                title: title,
                service_id: 1,
            });
        }

        // console.log(title);
    };
    const [titleError, setTitleError] = useState("");
    const [title, setTitle] = useState("");
    return (
        <div className="w-full md:w-1/2 mx-auto">
            <form onSubmit={handleSubmit}>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label className="form-label" htmlFor="default-06">
                            <h5>Select Service</h5>
                        </label>
                        <div className="form-control-wrap ">
                            <div className="form-control-select">
                                <select
                                    className="form-control"
                                    id="default-06"
                                >
                                    <option
                                        value="default_option"
                                        defaultValue
                                        disabled
                                    >
                                        Default Option
                                    </option>
                                    {props.services.map((service) => (
                                        <option
                                            value={service.id}
                                            key={service.id}
                                        >
                                            {service.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 mt-2">
                    <div className="form-group">
                        <label className="form-label" htmlFor="default-01">
                            Title
                        </label>

                        <div className="form-control-wrap">
                            <input
                                type="text"
                                className={"form-control " + titleError}
                                id="default-01"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter title eg MTN Data"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 mt-2">
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
                        <button
                            className="btn btn-primary float-right"
                        >
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
        services: state.serviceState.services,
        is_creating: state.providerState.is_creating,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createProvider: (provider) => dispatch(createProvider(provider))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProvider);
