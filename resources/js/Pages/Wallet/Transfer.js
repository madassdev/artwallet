import { usePage } from "@inertiajs/inertia-react";
import Modal from "../Components/Modal";
import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import MainLayout from "../Layouts/MainLayout";
import SpinButton from "../Components/SpinButton";
import { Inertia } from "@inertiajs/inertia";
import toast from "react-hot-toast";
import axios from "axios";
import OrderSummary from "../Buy/OrderSummary";

function Transfer() {
    const minTransferValue = 100;

    const [modal, setModal] = useState({
        show: false,
        header: "Fund Wallet",
        content: "",
    });
    const closeModal = () => {
        setModal({ ...modal, show: false });
    };
    const { auth } = usePage().props;
    const [amount, setAmount] = useState(100);
    const [pin, setPin] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);

    const [recipient, setRecipient] = useState("");
    const [recipientDetails, setRecipientDetails] = useState("");

    const defaultErrors = {
        recipient: false,
        amount: false,
    };
    const [errors, setErrors] = useState(defaultErrors);

    function validate() {
        let c = 0;

        if (!recipient) {
            handleError("recipient", "Please enter valid number");
            c++;
        }

        if (amount < minTransferValue) {
            handleError("amount", "Please enter amount greater than 200");
            c++;
        }

        return !c;
    }

    function handleError(error, message) {
        setErrors((values) => ({
            ...values,
            [error]: message,
        }));
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        setErrors(defaultErrors);
        if (!validate()) {
            // toast.error("Please fill all Fields appropriately", {
            //     position: "top-right",
            // });
            return;
        }
        setIsVerifying(true);
        axios
            .post(route("validation.user.mobile"), {
                mobile: recipient,
            })
            .then((res) => {
                console.log(res.data);
                setRecipientDetails(res.data.data.user);
                setIsVerifying(false);
                setModal((modal) => ({
                    ...modal,
                    show: true,
                    header: "Checkout",
                    content: (
                        <OrderSummary
                            handleSubmit={handleModalAction}
                            amount={parseInt(amount)}
                            cancelAction={closeModal}
                        >
                            <Summary
                                summary={{
                                    amount,
                                    recipient,
                                    recipientDetails: res.data.data.user,
                                }}
                            />
                        </OrderSummary>
                    ),
                }));
                // setIsReady(true);
            })
            .catch((err) => {
                if (
                    err.response.status === 403 ||
                    err.response.status === 404
                ) {
                    toast.error(err.response.data.message, {
                        position: "top-center",
                        style: {
                            background: "rgba(185, 16, 16,1)",
                            color: "#fff",
                            padding: "20px",
                        },
                    });
                    handleError("recipient", "Recipient not found!");
                }
                setIsVerifying(false);
            });
        console.log("About to....");
    }

    function handleModalAction(pin) {
        closeModal();
        setPin(pin);
        setIsVerifying(true);

        Inertia.post(
            route("orders.transfer"),
            {
                type: "transfer",
                recipient,
                pin,
                amount,
            },
            {
                onError: (error) => {
                    console.log(error);
                    setIsVerifying(false);
                    if (error.message) {
                        toast.error(error.message, {
                            position: "top-center",
                        });
                    } else {
                        console.log(error);
                        toast.error("An error has occured", {
                            position: "top-center",
                        });
                    }
                },
            }
        );
        console.log("Oh My God");
    }

    return (
        <MainLayout>
            <div className="w-full md:w-1/2 mx-auto">
                <div className="text-gray-600 p-5 rounded-lg bg-white mb-8">
                    <div className="my-2">
                        <p className="text-lg text-primary text-center">
                            <i className="mdi mdi-account-cash mr-2"></i>
                            Transfer to others
                        </p>
                    </div>
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group flex flex-col space-y-1 mb-4">
                            <p className="text-xs text-gray-600 m-2">
                                How much would you like to transfer?
                            </p>
                            <div className="form-control-wrap">
                                <input
                                    type="number"
                                    className={`w-full rounded focus:outline-none border-gray-300 ${
                                        errors.amount && "error"
                                    }`}
                                    value={amount}
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                        if (e.target.value < minTransferValue) {
                                            handleError(
                                                "amount",
                                                "You cannot transfer less than " +
                                                    naira(minTransferValue)
                                            );
                                            return;
                                        }
                                        if (e.target.value) {
                                            handleError("amount", false);
                                        }
                                    }}
                                    placeholder={naira(1000)}
                                />
                                {errors.amount && (
                                    <div className="text-red-400 text-xs font-bold">
                                        {errors.amount}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="form-group flex flex-col space-y-1 mb-4">
                            <p className="text-xs text-gray-600 m-2">
                                Recipient phone number
                            </p>

                            <div className="form-control-wrap">
                                <input
                                    type="number"
                                    className={`w-full rounded focus:outline-none border-gray-300 ${
                                        errors.recipient && "error"
                                    }`}
                                    value={recipient}
                                    onChange={(e) => {
                                        setRecipient(e.target.value);
                                        if (
                                            e.target.value == auth.user.mobile
                                        ) {
                                            handleError(
                                                "recipient",
                                                "You cannot transfer to yourself!"
                                            );
                                            return;
                                        }
                                        if (e.target.value) {
                                            handleError("recipient", false);
                                        }
                                    }}
                                    placeholder="08123456789"
                                />
                                {errors.recipient && (
                                    <div className="text-red-400 text-xs font-bold">
                                        {errors.recipient}
                                    </div>
                                )}
                            </div>
                        </div>
                        {isVerifying ? (
                            <>
                                <SpinButton />
                            </>
                        ) : (
                            <>
                                {amount > 99 ? (
                                    <div className="form-group">
                                        <button className="btn btn-block bg-purple-700 text-white shadow">
                                            <span className="flex items-center justify-between ">
                                                <span className="w-1/3"></span>
                                                {"Transfer " + naira(amount)}
                                                <i className="mdi mdi-chevron-right text-4xl text-white text-right"></i>
                                            </span>
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <button
                                            className="btn btn-block btn-light text-gray-600"
                                            type="button"
                                        >
                                            Minimum amount is{" "}
                                            {naira(minTransferValue)}
                                        </button>
                                    </>
                                )}
                            </>
                        )}
                    </form>
                </div>

                {/* <p
                    className="text-xs text-center text-primary cursor-pointer my-4"
                    onClick={openManualModal}
                >
                    Pay manually?
                </p> */}
            </div>
            <Modal modal={modal} closeModal={closeModal} />
        </MainLayout>
    );
}

function Summary({ summary, handleSubmit }) {
    const { recipient, recipientDetails, amount } = summary;
    console.log(summary);

    return (
        <div>
            <div className="flex flex-col space-y-4">
                <h2 className="text-center font-bold mb-0">
                    Transaction Summary
                </h2>

                <div>
                    <h2 className="font-bold m-0">Recipient</h2>
                    <p className="text-gray-600">{recipient}</p>
                    <p className="text-primary text-xs capitalize">
                        {recipientDetails.full_name}
                    </p>
                </div>

                <div>
                    <h2 className="font-bold m-0">Amount</h2>
                    <p className="text-gray-600">{naira(amount)}</p>
                </div>
            </div>
        </div>
    );
}

export default Transfer;
