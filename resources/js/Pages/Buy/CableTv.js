import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Modal from "../Components/Modal";
import PinInput from "../Components/PinInput";
import Transactions from "../Components/Transactions";
import MainLayout from "../Layouts/MainLayout";
import CardWrapper from "../Layouts/Partials/CardWrapper";

function CableTv() {
    const [modal, setModal] = useState({
        show: false,
        header: "Header",
        content: "Content",
    });
    const [providerSelected, setProviderSelected] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [isReady, setIsReady] = useState(false);
    const [isValidating, setIsValidating] = useState(false);
    const [recipient, setRecipient] = useState("");
    const [isPaying, setIsPaying] = useState(false);
    const [pin, setPin] = useState("");
    const [planSelected, setPlanSelected] = useState(false);
    const [cableDetails, setCableDetails] = useState();
    const [amount, setAmount] = useState(0);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const charges = parseInt(PUBLIC_CONFIG.cable_tv_fees);

    const { auth, providers } = usePage().props;

    const handleProviderSelected = (provider) => {
        setProviderSelected(true);
        setPlanSelected(false);
        setSelectedProvider(provider);
    };

    const handlePlanSelected = (plan) => {
        setAmount(parseInt(plan.price));
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
        if (!selectedProvider) {
            alert("Please select a Provider first");
            return;
        }
        if (!selectedPlan) {
            alert("Please select a Plan first");
            return;
        }
        if (
            !recipient ||
            recipient.length.length < 11 ||
            recipient.length === ""
        ) {
            alert("Please Enter a valid number");
            return;
        }

        setIsValidating(true);

        console.log("valiadting");
        // return;
        axios
            .post("/orders/cable-tv/verify", {
                plan_id: selectedPlan.id,
                type: "cable-tv",
                recipient,
            })
            .then((res) => {
                console.log(res.data);
                setCableDetails(res.data.recipient);
                setIsValidating(false);
                setIsReady(true);
            })
            .catch((err) => {
                if (err.response.status === 403) {
                    console.log(err.response.data);
                    toast.error(err.response.data.message, {
                        position: "top-center",
                        style: {
                            background: "rgba(185, 16, 16,1)",
                            color: "#fff",
                            padding: "20px",
                        },
                    });
                }
                setIsValidating(false);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isPaying) {
            alert("Please wait...");
            return;
        }

        if (pin.length !== 4) {
            alert("Please enter 4 digit PIN");
            return;
        }

        if (!selectedProvider) {
            alert("Please select a Provider first");
            return;
        }
        if (!selectedPlan) {
            alert("Please select a Plan first");
            return;
        }

        // if (
        //     !recipient ||
        //     recipient.length.length < 11 ||
        //     recipient.length === ""
        // ) {
        //     alert("Please Enter a valid number");
        //     return;
        // }
        
        if (amount + charges > auth.user.balance) {
            alert("Your balance is insufficient for the transaction.");
            return;
        }

        setIsPaying(true);

        Inertia.post(route("orders.cable-tv.buy"), {
            plan_id: selectedPlan.id,
            type: "cable-tv",
            pin,
            recipient,
        });
    };

    return (
        <MainLayout user={auth.user}>
            <Toaster/>
            <CardWrapper>
                <h2 className="text-primary font-bold uppercase text-center">
                    Buy Cable Tv
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
                                    <p className="text-primary text-xs">
                                        {cableDetails}
                                    </p>
                                </div>
                                <div>
                                    <h2 className="font-bold m-0">Plan</h2>
                                    <p className="text-gray-600">
                                        {selectedPlan.title}
                                    </p>
                                </div>
                                <div>
                                    <h2 className="font-bold m-0">Amount</h2>
                                    <p className="text-gray-600">
                                        {naira(amount)}
                                    </p>
                                </div>
                                <div>
                                    <h2 className="font-bold text-xs text-gray-400 m-0">
                                        Service charge
                                    </h2>
                                    <p className="text-warning text-xs">
                                        {naira(charges)}
                                    </p>
                                </div>
                                <div>
                                    <h2 className="font-bold m-0">Total</h2>
                                    <p className="text-primary font-bold">
                                        {naira(amount + charges)}
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
                                                Pay {naira(amount + charges)}
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
                            <h2 className="font-bold">Select Data Provider</h2>
                            <div className="flex flex-wrap items-center">
                                {providers.map((p) => (
                                    <div
                                        className="w-1/2 md:w-1/4 flex items-center justify-center"
                                        key={p.id}
                                    >
                                        <label className="labl" key={p?.id}>
                                            <input
                                                className=""
                                                name="data_provider"
                                                id={"data_provider" + p?.id}
                                                type="radio"
                                                value={p?.id}
                                                onChange={() =>
                                                    handleProviderSelected(p)
                                                }
                                            />
                                            <div className="rounded shadow-md hover:shadow-xl flex items-center justify-center p-3 m-2 w-full text-gray-600">
                                                {p.title}
                                            </div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {providerSelected && (
                            <>
                                {planSelected ? (
                                    <div className="flex flex-col space-y-4 w-full md:w-2/3 mx-auto">
                                        <h2 className="font-bold text-center mt-4">
                                            Selected Plan
                                        </h2>
                                        <div className="rounded shadow-md hover:shadow-xl p-1 w-full md:w-1/2 mx-auto bg-gradient-to-b from-green-400 to-green-500 text-xs m-1 text-gray-600">
                                            <p className="font-bold text-center text-white">
                                                {selectedPlan.title}
                                            </p>
                                            <p className="font-bold text-center text-white">
                                                {naira(selectedPlan.price)}
                                            </p>
                                            {/* <p className="text-center text-white">
                                                {selectedPlan.validity}
                                            </p> */}
                                        </div>
                                        <div>
                                            <div className="form-group flex flex-col space-y-1">
                                                <p className="font-bold">
                                                    Recipient Device Number
                                                </p>

                                                <div className="form-control-wrap">
                                                    <input
                                                        type="text"
                                                        min="100"
                                                        className="w-full rounded border-gray-300"
                                                        value={recipient}
                                                        autoFocus
                                                        onChange={(e) =>
                                                            setRecipient(
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Enter Recipient Device Number"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group my-2">
                                                {isValidating ? (
                                                    <button
                                                        onClick={() => {
                                                            // setIsValidating(false);
                                                        }}
                                                        className="btn btn-light btn-block"
                                                        type="button"
                                                    >
                                                        <div
                                                            className="spinner-border-sm spinner-border text-primary"
                                                            role="status"
                                                        ></div>
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="btn btn-primary btn-block font-bold"
                                                        onClick={handleProceed}
                                                    >
                                                        Proceed {">>"}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <p
                                            onClick={() => {
                                                setPlanSelected(false);
                                                setSelectedPlan(null);
                                            }}
                                            className="text-xs text-gray-400 cursor-pointer text-center"
                                        >
                                            Change Plan
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col space-y-4">
                                        <h2 className="font-bold text-center mt-4">
                                            Select Plan
                                        </h2>
                                        <div className="flex flex-wrap items-center">
                                            {selectedProvider?.plans.map(
                                                (plan) => (
                                                    <div
                                                        className="md:w-1/8 flex items-center justify-center m-2"
                                                        key={plan.id}
                                                    >
                                                        <label
                                                            className="labl"
                                                            key={plan?.id}
                                                        >
                                                            <input
                                                                className=""
                                                                name="data_plan"
                                                                id={
                                                                    "data_plan" +
                                                                    plan?.id
                                                                }
                                                                type="radio"
                                                                value={plan?.id}
                                                                onChange={() =>
                                                                    handlePlanSelected(
                                                                        plan
                                                                    )
                                                                }
                                                            />
                                                            <div className="rounded shadow-md hover:shadow-xl p-2 text-xs m-1 w-full text-gray-600">
                                                                <p className="font-bold text-center">
                                                                    {plan.title}
                                                                </p>
                                                                <p className="font-bold text-center text-primary">
                                                                    {naira(
                                                                        plan.price
                                                                    )}
                                                                </p>
                                                                {/* <p className="text-center text-gray-400">
                                                                    {
                                                                        plan.validity
                                                                    }
                                                                </p> */}
                                                            </div>
                                                        </label>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}
            </CardWrapper>
            <Modal modal={modal} closeModal={closeModal} />
        </MainLayout>
    );
}

export default CableTv;
