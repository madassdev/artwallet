import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import Modal from "../Components/Modal";
import PinInput from "../Components/PinInput";
import Transactions from "../Components/Transactions";
import AppLayout from "../Layouts/AppLayout";
import MainLayout from "../Layouts/MainLayout";
import CardWrapper from "../Layouts/Partials/CardWrapper";

function Airtime() {
    const [modal, setModal] = useState({
        show: false,
        header: "Header",
        content: "Content",
    });
    const [isReady, setIsReady] = useState(false);
    const [amount, setAmount] = useState("");
    const [recipient, setRecipient] = useState("");
    const [isPaying, setIsPaying] = useState(false);
    const [pin, setPin] = useState("");
    const [planSelected, setPlanSelected] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(true);

    const { auth, providers } = usePage().props;
    const handlePlanSelected = (plan) => {
        setPlanSelected(true);
        setSelectedPlan(plan);
        console.log(plan);
    };
    const openModal = (modal) => {
        setModal({ ...modal, show: true });
    };

    const closeModal = () => {
        setModal({ ...modal, show: false });
    };

    const handleProceed = (e) => {
        if (recipient === "") {
            alert("Please enter a valid recipient phone number");
            return;
        }
        if (!selectedPlan) {
            alert("Please select a provider first");
            return;
        }

        if (amount === "") {
            alert("Please enter an amount");
            return;
        }

        if (parseInt(amount) < 50) {
            alert("Please enter a minimum amount of ₦50");
            return;
        }
        if (amount > auth.user.balance) {
            alert("Your balance is insufficient for the transaction.");
            return;
        }

        setIsReady(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isPaying) {
            alert("Please wait...");
            return;
        }
        setIsPaying(true);
        Inertia.post(route("orders.airtime.buy"), {
            plan_id: selectedPlan.id,
            type: "airtime",
            pin,
            amount,
            recipient,
        });
    };

    return (
        <MainLayout user={auth.user}>
            <CardWrapper>
                <h2 className="text-primary font-bold uppercase text-center">
                    Buy Airtime
                </h2>
                {isReady ? (
                    /* Summary */

                    <div className="my-4 w-full md:w-2/3 mx-auto shadow p-5">
                        <div className="flex flex-col space-y-4">
                            <h2 className="text-center font-bold mb-0">
                                Transaction Summary
                            </h2>

                            <div>
                                <h2 className="font-bold m-0">Recipient</h2>
                                <p className="text-gray-600">{recipient}</p>
                            </div>
                            <div>
                                <h2 className="font-bold m-0">Provider</h2>
                                <p className="text-gray-600">
                                    {selectedPlan.title}
                                </p>
                            </div>
                            <div>
                                <h2 className="font-bold m-0">Amount</h2>
                                <p className="text-gray-600">
                                    &#x20A6;
                                    {parseFloat(amount).toLocaleString()}
                                </p>
                            </div>
                            <form autoComplete="off" onSubmit={handleSubmit}>
                                <div className="form-group flex flex-col space-y-1">
                                    <p className="font-bold">PIN</p>

                                    <div className="form-control-wrap">
                                        <a
                                            className="form-icon form-icon-right passcode-switch lg"
                                            data-target="pin"
                                        >
                                            <em className="passcode-icon icon-show icon ni ni-eye"></em>
                                            <em className="passcode-icon icon-hide icon ni ni-eye-off"></em>
                                        </a>
                                        <PinInput
                                            pin={pin}
                                            setPinValue={(value) =>
                                                setPin(value)
                                            }
                                            placeholder="Enter PIN"
                                            eid="airtime_pin"
                                        />
                                    </div>
                                </div>
                                <div className="w-full">
                                    {isPaying ? (
                                        <button
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
                                        <>
                                            <button
                                                className="btn btn-primary btn-block font-bold"
                                                // onClick={()=>setIsPaying(true)}
                                            >
                                                Pay {naira(amount)}
                                            </button>
                                            <p
                                                onClick={() =>
                                                    setIsReady(false)
                                                }
                                                className="text-center mt-2 cursor-pointer text-gray-400 hover:text-purple-700 text-xs"
                                            >
                                                {"<<"} Go back
                                            </p>
                                        </>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col space-y-4">
                        <div>
                            <h2 className="font-bold">
                                Select Airtime Provider
                            </h2>
                            <div className="flex flex-wrap items-center">
                                {providers.map((p) => (
                                    <div
                                        className="w-1/2 md:w-1/4 flex items-center justify-center"
                                        key={p.id}
                                    >
                                        <label
                                            className="labl"
                                            key={p?.plans[0]?.id}
                                        >
                                            <input
                                                className=""
                                                name="airtime_plan"
                                                id={
                                                    "airtime_plan" +
                                                    p?.plans[0]?.id
                                                }
                                                type="radio"
                                                value={p?.plans[0]?.id}
                                                onChange={() =>
                                                    handlePlanSelected(
                                                        p?.plans[0]
                                                    )
                                                }
                                            />
                                            <div className="rounded shadow-md hover:shadow-xl p-2 py-3 font-bold text-xs m-1 w-full text-gray-600">
                                                {p.title}
                                            </div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {planSelected && (
                            <div className="flex flex-col space-y-4 w-full md:w-2/3 mx-auto">
                                <h2 className="mt-8 text-primary font-bold uppercase text-center">
                                    {selectedPlan.title}
                                </h2>
                                <div className="form-group flex flex-col space-y-1">
                                    <p className="font-bold">
                                        Recipient Phone Number
                                    </p>

                                    <div className="form-control-wrap">
                                        <input
                                            type="number"
                                            min="100"
                                            className="w-full rounded border-gray-300"
                                            value={recipient}
                                            onChange={(e) =>
                                                setRecipient(e.target.value)
                                            }
                                            placeholder="Enter recipient phone number"
                                        />
                                    </div>
                                </div>
                                <div className="form-group flex flex-col space-y-1">
                                    <p className="font-bold">Amount</p>

                                    <div className="form-control-wrap">
                                        <input
                                            type="number"
                                            min="100"
                                            className="w-full rounded border-gray-300"
                                            value={amount}
                                            onChange={(e) =>
                                                setAmount(e.target.value)
                                            }
                                            placeholder="Enter amount"
                                        />
                                    </div>
                                </div>

                                <div className="form-group my-4">
                                    <button
                                        className="btn btn-primary btn-block font-bold"
                                        onClick={handleProceed}
                                    >
                                        Proceed {">>"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </CardWrapper>
            <Modal modal={modal} closeModal={closeModal} />
        </MainLayout>
    );
}

export default Airtime;
