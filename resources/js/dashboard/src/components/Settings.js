import React, { useState } from "react";
import { connect } from "react-redux";

function Settings(props) {
    const [settingsTab, setSettingsTab] = useState("profile");
    return (
        <div className="bg-white p-5">
            <h2 className="text-purple-500 text-center font-bold text-lg capitalize">
                Accont Settings
            </h2>
            <div className="flex w-full items-center justify-center mb-8">
                <i className="mdi mdi-account-circle text-8xl text-gray-300"></i>
            </div>
            <div className="flex my-8 items-center justify-center md:w-1/2 mx-auto space-x-4 md:space-x-8 text-gray-600">
                <div
                    onClick={() => setSettingsTab("profile")}
                    className={`text-center cursor-pointer rounded p-1 px-2 ${
                        settingsTab == "profile" &&
                        "text-purple-500 bg-purple-100"
                    }`}
                >
                    <i className="mdi mdi-account mr-1"></i>Profile
                </div>
                <div
                    onClick={() => setSettingsTab("edit")}
                    className={`text-center cursor-pointer rounded p-1 px-2 ${
                        settingsTab == "edit" && "text-purple-500 bg-purple-100"
                    }`}
                >
                    <i className="mdi mdi-pencil mr-1"></i>Edit
                </div>
                <div
                    onClick={() => setSettingsTab("security")}
                    className={`text-center cursor-pointer rounded p-1 px-2 ${
                        settingsTab == "security" &&
                        "text-purple-500 bg-purple-100"
                    }`}
                >
                    <i className="mdi mdi-lock mr-1"></i>Security
                </div>
            </div>
            {(settingsTab === "profile" && (
                <div className="my-2 flex flex-col space-y-8 text-gray-600 p-3  md:w-1/2 mx-auto">
                    <div className="w-full">
                        <p className="font-bold">Full Name</p>
                        <p>{props.user?.full_name}</p>
                    </div>

                    <div className="w-full">
                        <p className="font-bold">Email</p>
                        <p>{props.user?.email}</p>
                    </div>
                    <div className="w-full">
                        <p className="font-bold">Phone number</p>
                        <p>{props.user?.mobile}</p>
                    </div>
                    <div className="w-full">
                        <p className="font-bold">Email</p>
                        <p>{props.user?.email}</p>
                    </div>

                    <div className="w-full mt-8">
                        <button
                            onClick={() => setSettingsTab("edit")}
                            className="border border-purple-500 w-full text-center rounded text-purple-500 py-1"
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
            )) ||
                (settingsTab === "edit" && (
                    <div className="flex flex-col space-y-4 text-gray-600 p-3 md:w-1/2 mx-auto">
                        <div className="w-full space-y-1 form-group">
                            <p className="font-bold">Name</p>
                            <input
                                className="w-full p-1 px-2 border rounded border-gray-600"
                                type="text"
                                placeholder="Enter name"
                                value={props.user?.full_name}
                            />
                        </div>
                        <div className="w-full space-y-1 form-group">
                            <p className="font-bold">Phone number</p>
                            <input
                                className="w-full p-1 px-2 border rounded border-gray-600"
                                type="number"
                                placeholder="Enter name"
                                value={props.user?.mobile}
                            />
                        </div>
                        <div className="w-full flex justify-between items-center mt-8">
                            <button
                                onClick={() => setSettingsTab("profile")}
                                className="bg-gray-300 text-center rounded text-gray-500 py-1 px-3"
                            >
                                Cancel
                            </button>
                            <button className="bg-purple-500 text-center rounded text-white py-1 px-3">
                                Save
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    );
}

const mapState = (state) => {
    return {
        user: state.userState.user,
    };
};

const mapDispatch = (dispatch) => {
    return {};
};

export default connect(mapState, mapDispatch)(Settings);
