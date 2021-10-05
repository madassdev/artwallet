import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import PinInput from "react-pin-input";
import SpinButton from "../Components/SpinButton";

function OrderSummary({ handleSubmit, amount, children, cancelAction }) {
    const [pin, setPin] = useState("");
    const [pinError, setPinError] = useState(false);
    const [pinDone, setPinDone] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    function handleFormSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        setPinError(false);
        axios
            .post(route("check-pin"), { pin })
            .then((data) => {
                handleSubmit(pin);
                // cancelAction();
            })
            .catch((error) => {
                console.log(error);
                setPinError(error?.response?.data?.message);
                toast.error(error?.response?.data?.message, {
                    position: "bottom-right",
                });

                setSubmitting(false);
            });
    }
    return (
        <div className="w-full md:w-1/2 mx-auto">
            <div>{children}</div>
            <form autoComplete="off" onSubmit={handleFormSubmit}>
                <div className="w-full text-center my-4">
                    <p className="text-sm text-primary">
                        <i className="mdi mdi-shield-lock mr-2"></i>
                        Enter 4 digit PIN
                    </p>
                </div>
                <div className="my-4">
                    <div className="flex justify-center items-center">
                        <PinInput
                            length={4}
                            initialValue={pin}
                            secret
                            onChange={(value, index) => {
                                setPin(value);
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
                                console.log("done", { value, index });
                                setPinDone(true);
                                setPin(value);
                            }}
                            autoSelect={true}
                            regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                        />
                    </div>
                    {pinError && (
                        <div className="text-red-400 text-xs text-center capitalize">
                            {pinError}
                        </div>
                    )}
                </div>
                <div>
                    {pinDone ? (
                        <>
                            {submitting ? (
                                <SpinButton />
                            ) : (
                                <>
                                    <button
                                        className="btn btn-primary btn-block font-bold"
                                        // onClick={()=>setIsPaying(true)}
                                    >
                                        Pay {naira(amount)}
                                    </button>
                                </>
                            )}
                        </>
                    ) : (
                        <button
                            className="btn btn-block btn-light"
                            type="button"
                        >
                            Pay {naira(amount)}
                        </button>
                    )}
                </div>
                {!submitting && (
                    <div
                        className="mt-12 cursor-pointer"
                        onClick={cancelAction}
                    >
                        <p className="h-8 w-8 rounded-full text-sm shadow mx-auto flex items-center justify-center bg-red-300 text-red-600">
                            <i className="mdi mdi-close"></i>
                        </p>
                        <p className="text-xs text-gray-600 text-center">
                            Cancel
                        </p>
                    </div>
                )}
            </form>
        </div>
    );
}

export default OrderSummary;
