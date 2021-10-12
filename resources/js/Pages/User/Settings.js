import React, { useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import Modal from "../Components/Modal";
import { usePage } from "@inertiajs/inertia-react";
import axios from "axios";
import PinInput from "@/dashboard/src/components/PinInput";
import toast from "react-hot-toast";
import SpinButton from "../Components/SpinButton";

function Settings() {
    const { auth } = usePage().props;

    const [settingsTab, setSettingsTab] = useState("profile");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [oldPin, setOldPin] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [pin, setPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");
    const [isSavingPin, setIsSavingPin] = useState(false);
    const [isSavingPassword, setIsSavingPassword] = useState(false);

    const savePin = () => {
        if (pin !== confirmPin) {
            alert("PINs do not match!");
            return;
        }
        if (
            pin.length !== 4 ||
            oldPin.length !== 4 ||
            confirmPin.length !== 4
        ) {
            alert("PINs must be 4 exactly digits");
            return;
        }

        setIsSavingPin(true);
        axios
            .post("/auth/update-pin", { pin, old_pin: oldPin })
            .then((res) => {
                toast.success(res.data.message, {
                    position: "bottom-center",
                });
                window.location.reload();
                setIsSavingPin(false);
            })
            .catch((err) => {
                if (err.response.status === 403) {
                    console.log(err.response.data);
                    toast.error(err.response.data.message, {
                        position: "bottom-center",
                    });
                }
                setIsSavingPin(false);
            });
    };
    const savePassword = () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        if (
            password.length < 4 ||
            oldPassword.length < 4 ||
            confirmPassword.length < 4
        ) {
            alert("Passwords must be at least 4 characters");
            return;
        }

        setIsSavingPassword(true);
        axios
            .post("/auth/update-password", {
                password,
                old_password: oldPassword,
            })
            .then((res) => {
                toast.success(res.data.message, {
                    position: "bottom-center",
                });
                window.location.reload();
                setIsSavingPassword(false);
            })
            .catch((err) => {
                if (err.response.status === 403) {
                    console.log(err.response.data);
                    toast.error(err.response.data.message, {
                        position: "bottom-center",
                    });
                }
                setIsSavingPassword(false);
            });
    };
    return (
        <MainLayout>
            <div className="bg-white p-3 md:p-5">
                <h2 className="text-purple-500 text-center font-bold text-lg capitalize">
                    Account Settings
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
                    {/* <div
                    onClick={() => setSettingsTab("edit")}
                    className={`text-center cursor-pointer rounded p-1 px-2 ${
                        settingsTab == "edit" && "text-purple-500 bg-purple-100"
                    }`}
                >
                    <i className="mdi mdi-pencil mr-1"></i>Edit
                </div> */}
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
                            <p>{auth.user?.full_name}</p>
                        </div>

                        <div className="w-full">
                            <p className="font-bold">Email</p>
                            <p>{auth.user?.email}</p>
                        </div>
                        <div className="w-full">
                            <p className="font-bold">Phone number</p>
                            <p>{auth.user?.mobile}</p>
                        </div>
                        {/* <div className="w-full">
                        <p className="font-bold">Email</p>
                        <p>{props.user?.email}</p>
                    </div> */}

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
                                    value={auth.user?.full_name}
                                />
                            </div>
                            <div className="w-full space-y-1 form-group">
                                <p className="font-bold">Phone number</p>
                                <input
                                    className="w-full p-1 px-2 border rounded border-gray-600"
                                    type="number"
                                    placeholder="Enter name"
                                    value={auth.user?.mobile}
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
                    )) ||
                    (settingsTab === "security" && (
                        <div className="flex-col space-y-8">
                            <div className="flex flex-col space-y-4 text-gray-600 p-3 md:w-1/2 mx-auto">
                                <h2 className="font-bold text-center">
                                    Update PIN
                                </h2>
                                <form
                                    autoComplete="off"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                    }}
                                >
                                    <div className="w-full space-y-1 form-group">
                                        <p className="font-bold">Old PIN</p>
                                        <PinInput
                                            pin={oldPin}
                                            setPinValue={(value) =>
                                                setOldPin(value)
                                            }
                                            placeholder="Enter old PIN"
                                            eid="settings_old_pin"
                                        />
                                    </div>
                                    <div className="w-full space-y-1 form-group">
                                        <p className="font-bold">New PIN</p>
                                        <PinInput
                                            pin={pin}
                                            setPinValue={(value) =>
                                                setPin(value)
                                            }
                                            placeholder="Enter new 4 digit PIN"
                                            eid="settings_pin"
                                        />
                                    </div>
                                    <div className="w-full space-y-1 form-group">
                                        <p className="font-bold">Confirm PIN</p>
                                        <PinInput
                                            pin={confirmPin}
                                            setPinValue={(value) =>
                                                setConfirmPin(value)
                                            }
                                            placeholder="Enter PIN again"
                                            eid="settings_confirm_pin"
                                        />
                                    </div>
                                    <div className="w-full flex justify-between items-center mt-8">
                                        {isSavingPin ? (
                                            <SpinButton />
                                        ) : (
                                            <button
                                                className="btn btn-primary btn-block font-bold"
                                                onClick={savePin}
                                                type=""
                                            >
                                                Save PIN
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                            <div className="flex flex-col space-y-4 text-gray-600 p-3 md:w-1/2 mx-auto">
                                <h2 className="font-bold text-center">
                                    Update Password
                                </h2>
                                <form
                                    autoComplete="off"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                    }}
                                >
                                    <div className="w-full space-y-1 form-group">
                                        <p className="font-bold">
                                            Old Password
                                        </p>
                                        <PinInput
                                            pin={oldPassword}
                                            setPinValue={(value) =>
                                                setOldPassword(value)
                                            }
                                            placeholder="Enter old Password"
                                            eid="settings_old_password"
                                            type="password"
                                        />
                                    </div>
                                    <div className="w-full space-y-1 form-group">
                                        <p className="font-bold">
                                            New Password
                                        </p>
                                        <PinInput
                                            pin={password}
                                            setPinValue={(value) =>
                                                setPassword(value)
                                            }
                                            placeholder="Enter new Password"
                                            eid="settings_password"
                                            type="password"
                                        />
                                    </div>
                                    <div className="w-full space-y-1 form-group">
                                        <p className="font-bold">
                                            Confirm Password
                                        </p>
                                        <PinInput
                                            pin={confirmPassword}
                                            setPinValue={(value) =>
                                                setConfirmPassword(value)
                                            }
                                            placeholder="Enter Password again"
                                            eid="settings_confirm_password"
                                            type="password"
                                        />
                                    </div>
                                    <div className="w-full flex justify-between items-center mt-8">
                                        {isSavingPassword ? (
                                            <SpinButton />
                                        ) : (
                                            <button
                                                className="btn btn-primary btn-block font-bold"
                                                onClick={savePassword}
                                                type=""
                                            >
                                                Save Password
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    ))}
            </div>
        </MainLayout>
    );
}

function ChangePassword() {
    return (
        <div>
            <p>Change your password</p>
        </div>
    );
}
export default Settings;
