import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, Redirect, useLocation, useParams } from "react-router-dom";
import Modal from "./Modal";
import PinInput from "./PinInput";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function SetPin() {
    const [isComplete, setIsComplete] = useState(false);
    const [pin, setPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");
    const [isSavingPin, setIsSavingPin] = useState(false);
    let redirect = APP_URL + '/' +ROUTE_BASENAME + useQuery().get("redirect");
    console.log(redirect);
    const savePin = () => {
        if (pin !== confirmPin) {
            alert("PINs do not match!");
            return;
        }
        if (pin.length !== 4 || confirmPin.length !== 4) {
            alert("PINs must be 4 exactly digits");
            return;
        }

        setIsSavingPin(true);
        axios
            .post("/auth/set-pin", { pin })
            .then((res) => {
                toast.success(res.data.message, {
                    position: "bottom-center",
                });
                setIsComplete(true)
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

    return (
        <Modal
            show={true}
            header={<h2>Set your PIN</h2>}
            closeModal={() => {
              window.location.replace(APP_URL + '/' +ROUTE_BASENAME);
            }}
        >
            <>
                {isComplete ? (
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div>
                            <div className="bg-green-200 h-16 w-16 rounded-full text-green-700 mx-auto flex items-center justify-center ">
                                <i className="mdi mdi-check text-lg"></i>
                            </div>
                        </div>
                        <p className="text-gray-600 text-center">
                            Your PIN has been created successfully
                        </p>
                        <div>
                            <a
                                href={redirect}
                                className="text-center text-gray-400 hover:text-gray-600"
                            >
                                Done
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="w-full md:w-1/2 mx-auto p-3">
                        <p className="text-center font-bold text-primary text-lg mb-2">
                            <i className="mdi mdi-key mr-3"></i>Secure Your
                            Transactions!
                        </p>
                        <p className="text-gray-400 text-xs">
                            Before you continue, please set a 4 secure digit PIN
                            for your account transactions
                        </p>

                        <div className="flex flex-col space-y-4 text-gray-600 p-3 md:w-full mx-auto">
                            <h2 className="font-bold text-center">
                                Create 4 digit PIN
                            </h2>
                            <form
                                autoComplete="off"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                }}
                            >
                                <div className="w-full space-y-1 form-group">
                                    <p className="font-bold">PIN</p>
                                    <PinInput
                                        pin={pin}
                                        setPinValue={(value) => setPin(value)}
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
                                        <button
                                            onClick={() =>
                                                setIsSavingPin(false)
                                            }
                                            className="btn btn-light btn-block"
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
                    </div>
                )}
            </>
        </Modal>
    );
}

export default SetPin;
