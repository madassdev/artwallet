import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Modal from "../Components/Modal";
import PinInput from "../Components/PinInput";
import Transactions from "../Components/Transactions";
import MainLayout from "../Layouts/MainLayout";
import CardWrapper from "../Layouts/Partials/CardWrapper";

function Electricity() {
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
    const [isValidating, setIsValidating] = useState(false);
    const [meterDetails, setMeterDetails] = useState();
    const [meterType, setMeterType] = useState(0);
    const charges = parseInt(PUBLIC_CONFIG.electricity_fees);
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
            alert("Please enter a valid meter number");
            return;
        }
        if (!selectedPlan) {
            alert("Please select a provider first");
            return;
        }
        if (!meterType) {
            alert("Please select a meter type first");
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

        setIsValidating(true);
        axios
            .post("/orders/electricity/verify", {
                plan_id: selectedPlan.id,
                type: "electricity",
                recipient,
            })
            .then((res) => {
                console.log(res.data);
                setMeterDetails(res.data.recipient);
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

        if (!selectedPlan) {
            alert("Please select a provider first");
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
        if (!amount || amount === 0 || amount === "") {
            alert("Please Enter a valid amount");
            return;
        }

        if (amount + charges > auth.user.balance) {
            alert("Your balance is insufficient for the transaction.");
            return;
        }

        setIsPaying(true);
        Inertia.post(route("orders.electricity.buy"), {
            plan_id: selectedPlan.id,
            type: "electricity",
            pin,
            amount,
            meter_type: meterType,
            recipient,
        });
    };

    return (
        <MainLayout user={auth.user}>
            <Toaster />
            <CardWrapper>
                <h2 className="text-primary font-bold uppercase text-center">
                    Buy Electricity
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
                                    {meterDetails}
                                </p>
                            </div>
                            <div>
                                <h2 className="font-bold m-0">Provider</h2>
                                <p className="text-gray-600">
                                    {selectedPlan?.title}
                                </p>
                            </div>
                            <div>
                                <h2 className="font-bold m-0">Amount</h2>
                                <p className="text-gray-600">{naira(amount)}</p>
                            </div>
                            <div>
                                <h2 className="font-bold text-xs text-gray-400 m-0">
                                    Service charge
                                </h2>
                                <p className="text-gray-400 text-xs">
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
                                                Pay{naira(amount + charges)}
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
                                        className="flex items-center justify-center m-2"
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
                                        Recipient Meter Number
                                    </p>

                                    <div className="form-control-wrap">
                                        <input
                                            type="text"
                                            min="100"
                                            className="w-full rounded border-gray-300"
                                            value={recipient}
                                            onChange={(e) =>
                                                setRecipient(e.target.value)
                                            }
                                            placeholder="Enter recipient meter number"
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
                                                setAmount(
                                                    parseInt(e.target.value)
                                                )
                                            }
                                            placeholder="Enter amount"
                                        />
                                    </div>
                                </div>

                                <p className="font-bold mb-1">Meter type</p>
                                <div className="flex space-x-8">
                                    <div className="flex space-x-2">
                                        <input
                                            type="radio"
                                            name="meter_type"
                                            onChange={() =>
                                                setMeterType("prepaid")
                                            }
                                            value="prepaid"
                                        />
                                        <p className="font-bold">Prepaid</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <input
                                            type="radio"
                                            name="meter_type"
                                            onChange={() =>
                                                setMeterType("postpaid")
                                            }
                                            value="postpaid"
                                        />
                                        <p className="font-bold">Postpaid</p>
                                    </div>
                                </div>

                                <div className="form-group my-2">
                                    {isValidating ? (
                                        <button
                                            onClick={() => {
                                                setIsValidating(false);
                                            }}
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
                                            onClick={handleProceed}
                                        >
                                            Proceed {">>"}
                                        </button>
                                    )}
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

export default Electricity;
