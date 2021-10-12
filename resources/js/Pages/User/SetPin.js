import { Inertia } from "@inertiajs/inertia";
import React, { useState } from "react";
import toast from "react-hot-toast";
import PinInput from "react-pin-input";
import SpinButton from "../Components/SpinButton";

function SetPin() {
    const defaultErrors = {
        pin: false,
        confirm_pin: false,
    };
    const [errors, setErrors] = useState(defaultErrors);
    const [pin, setPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");
    const [pinDone, setPinDone] = useState(false);
    const [confirmPinDone, setConfirmPinDone] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    function handleError(error, message) {
        setErrors((values) => ({
            ...values,
            [error]: message,
        }));
    }

    function validate() {
        let c = 0;

        if (!pin) {
            handleError("pin", "Please enter 4 digit PIN");
            c++;
        }
        if (pin !== confirmPin) {
            console.log([pin, confirmPin]);
            handleError("confirm_pin", "PINs do not match!");
            c++;
        }
        if (!confirmPin) {
            handleError("confirm_pin", "Please confirm 4 digit PIN");
            c++;
        }

        return !c;
    }

    function handleConfirmPinDone() {
        setIsReady(true);
    }

    function handleSubmit() {
        setErrors(defaultErrors);
        if (!validate()) {
            return;
        }

        setSubmitting(true);
        Inertia.post(
            route("auth.set-pin"),
            { pin },
            {
                onError: (error) => {
                    setSubmitting(false);
                    console.log(error);
                    toast.error(error.message, {
                        position: "top-center",
                    });
                },
            }
        );
    }
    return (
        <div className="w-full md:w-1/2 mx-auto p-3">
            <p className="text-center font-bold text-primary text-lg mb-2">
                <i className="mdi mdi-key mr-3"></i>Secure Your Transactions!
            </p>
            <p className="text-gray-400 text-xs">
                Before you continue, please set a secure 4 digit PIN for your
                account transactions
            </p>

            <div className="flex flex-col space-y-4 text-gray-600 p-3 md:w-full mx-auto">
                <h2 className="font-bold text-center">Create 4 digit PIN</h2>
                <form
                    autoComplete="off"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <div className="my-4">
                        <p className="text-gray-600 font-bold text-center">
                            PIN
                        </p>
                        <div className="flex justify-center items-center">
                            <PinInput
                                length={4}
                                focus
                                initialValue={pin}
                                secret
                                onChange={(value, index) => {
                                    setPin(value);
                                    handleError("pin", false);
                                }}
                                type="numeric"
                                inputMode="number"
                                style={{
                                    padding: "10px",
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "100%",
                                }}
                                inputStyle={{
                                    borderColor: "#999",
                                    borderRadius: "5px",
                                    margin: "0px 4px",
                                    height: "50px",
                                    width: "50px",
                                }}
                                inputFocusStyle={{ borderColor: "#854fff" }}
                                onComplete={(value, index) => {
                                    setPin(value);
                                    setPinDone(true);
                                }}
                                autoSelect={true}
                                regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                            />
                        </div>
                        {errors.pin && (
                            <div className="text-red-400 text-xs text-center capitalize">
                                {errors.pin}
                            </div>
                        )}
                    </div>
                    {pinDone && (
                        <div className="my-4">
                            <p className="text-gray-600 font-bold text-center">
                                PIN Confirmation
                            </p>
                            <div className="flex justify-center items-center">
                                <PinInput
                                    length={4}
                                    initialValue={confirmPin}
                                    focus
                                    secret
                                    onChange={(value, index) => {
                                        setConfirmPin((confirmPin) => value);
                                        handleError("confirm_pin", false);
                                    }}
                                    type="numeric"
                                    inputMode="number"
                                    style={{
                                        padding: "10px",
                                        display: "flex",
                                        justifyContent: "center",
                                        width: "100%",
                                    }}
                                    inputStyle={{
                                        borderColor: "#999",
                                        borderRadius: "5px",
                                        margin: "0px 4px",
                                        height: "50px",
                                        width: "50px",
                                    }}
                                    inputFocusStyle={{ borderColor: "#854fff" }}
                                    onComplete={(value, index) => {
                                        setConfirmPin((confirmPin) => value);
                                        handleConfirmPinDone(value);
                                    }}
                                    autoSelect={true}
                                    regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                                />
                            </div>
                            {errors.confirm_pin && (
                                <div className="text-red-400 text-xs text-center capitalize">
                                    {errors.confirm_pin}
                                </div>
                            )}
                        </div>
                    )}

                    <div>
                        {isReady ? (
                            <>
                                {submitting ? (
                                    <SpinButton />
                                ) : (
                                    <>
                                        <button
                                            className="btn btn-primary btn-block font-bold"
                                            // onClick={()=>setIsPaying(true)}
                                        >
                                            Save PIN
                                        </button>
                                    </>
                                )}
                            </>
                        ) : (
                            <button
                                className="btn btn-block btn-light"
                                type="button"
                                onClick={() => {
                                    // setPinError("Enter your 4 digit PIN");
                                    console.log("Do what ya told");
                                }}
                            >
                                Save
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SetPin;
