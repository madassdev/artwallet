import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import SelectSearch, { fuzzySearch } from "react-select-search";
import Modal from "../Components/Modal";
import PinInput from "../Components/PinInput";
import SearchSelect from "../Components/SearchSelect";
import Transactions from "../Components/Transactions";
import MainLayout from "../Layouts/MainLayout";
import CardWrapper from "../Layouts/Partials/CardWrapper";
import SpinButton from "../Components/SpinButton";
import InsufficientBalance from "../Components/InsufficientBalance";
import OrderSummary from "./OrderSummary";
import { discountValue, getDiscountValue, naira } from "@/util/functions";

function Airtime() {
    const { auth, providers, discount, charges, minimum_value } =
        usePage().props;
    console.log(charges);
    const minAirtimeValue = minimum_value;

    const [modal, setModal] = useState({
        show: false,
        header: "Header",
        content: null,
    });

    const defaultErrors = {
        recipient: false,
        plan: false,
        amount: false,
    };
    const [submitting, setSubmitting] = useState(false);
    const [amount, setAmount] = useState(minAirtimeValue);
    const [errors, setErrors] = useState(defaultErrors);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [pin, setPin] = useState("");
    // const [recipient, setRecipient] = useState("");
    const [recipient, setRecipient] = useState("08136051712");
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [planOptions, setPlanOptions] = useState([]);
    const [optionValue, setOptionValue] = useState(null);

    const handleProviderSelected = (provider) => {
        setSelectedProvider(provider);
        const opt = provider?.plans?.map((plan) => {
            return {
                name: `${plan.title} @ ${naira(plan.price)}`,
                value: plan.id,
            };
        });
        setOptionValue(opt[0].value);
        setPlanOptions(opt);
    };
    

    function handleError(error, message) {
        setErrors((values) => ({
            ...values,
            [error]: message,
        }));
    }

    function validate() {
        let c = 0;

        if (!recipient) {
            handleError("recipient", "Please enter valid number");
            c++;
        }
        if (!selectedPlan) {
            handleError("provider", "Select a provider");
            c++;
        }
        if (amount < minAirtimeValue) {
            handleError(
                "amount",
                "Please enter amount greater than " + naira(minAirtimeValue)
            );
            c++;
        }

        return !c;
    }

    const handlePlanSelected = (plan) => {
        setSelectedPlan(plan);
        handleError("plan", false);
    };
    const openModal = (modal) => {
        setModal({ ...modal, show: true });
    };

    const closeModal = () => {
        setModal({ ...modal, show: false });
    };

    function openInsufficientModal(totalAmt) {
        setModal((modal) => ({
            ...modal,
            show: true,
            header: "Insufficient Balance",
            content: (
                <InsufficientBalance
                    expected={totalAmt}
                    balance={auth.user.balance}
                />
            ),
        }));
    }

    const handleProceed = (e) => {
        setErrors(defaultErrors);
        if (!validate()) {
            // toast.error("Please fill all Fields appropriately", {
            //     position: "top-right",
            // });
            return;
        }

        let totalAmt =
            parseFloat(amount) +
            parseFloat(charges) -
            parseFloat(discountValue(discount, amount, auth.user));
        console.log(totalAmt);

        if (totalAmt > auth.user.balance) {
            openInsufficientModal(totalAmt);
            return;
        }

        setModal((modal) => ({
            ...modal,
            show: true,
            noClose: true,
            header: "Checkout",
            content: (
                <OrderSummary
                    handleSubmit={handleModalAction}
                    amount={totalAmt}
                    cancelAction={closeModal}
                >
                    <Summary
                        summary={{
                            amount,
                            recipient,
                            selectedPlan,
                            charges,
                            discount: getDiscountValue(discount, auth.user),
                            total: totalAmt,
                        }}
                    />
                </OrderSummary>
            ),
        }));
    };

    function handleModalAction(pin) {
        closeModal();
        setPin(pin);
        setSubmitting(true);

        Inertia.post(
            route("orders.airtime.buy"),
            {
                plan_id: selectedPlan.id,
                type: "airtime",
                pin,
                amount,
                recipient,
            },
            {
                onError: (error) => {
                    setSubmitting(false);
                    toast.error(error.message, {
                        position: "bottom-center",
                        style: {
                            background: "rgba(185, 16, 16,1)",
                            color: "#fff",
                            padding: "20px",
                        },
                    });
                },
            }
        );
    }
    return (
        <MainLayout>
            <CardWrapper>
                <h2 className="text-primary font-bold uppercase text-center">
                    Buy Airtime
                </h2>

                <div className="flex flex-col space-y-8 my-2 md:my-8 w-full md:w-2/3 mx-auto">
                    <div className="form-group flex flex-col space-y-1">
                        <p className="text-xs text-gray-600 m-2">
                            Recipient Phone Number
                        </p>

                        <div className="form-control-wrap">
                            <input
                                type="number"
                                className={`w-full rounded border-gray-300 ${
                                    errors.recipient && "error"
                                }`}
                                value={recipient}
                                autoFocus
                                onChange={(e) => {
                                    setRecipient(e.target.value);
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
                    <div>
                        <p className="text-xs text-gray-600 m-2">
                            Select Airtime Provider
                        </p>
                        <div className="grid grid-cols-4 md:gap-4 gap-3">
                            {providers.map((p) => (
                                <div
                                    className="w-full md:p-3 h-16 md:h-20 flex items-center justify-center"
                                    key={p.id}
                                >
                                    <label className="labl" key={p?.id}>
                                        <input
                                            className=""
                                            name="data_provider"
                                            id={"data_provider" + p?.id}
                                            type="radio"
                                            value={p?.plans[0]?.id}
                                            onChange={() => {
                                                handlePlanSelected(p?.plans[0]);
                                                handleError("provider", false);
                                            }}
                                        />
                                        <div className="rounded shadow-md hover:shadow-xl p-1 md:p-2 md:py-3 font-bold text-xs w-full text-gray-600 h-12 md:h-20">
                                            <img
                                                src={p.logo_image}
                                                className="object-cover w-full h-full rounded"
                                            />
                                        </div>
                                    </label>
                                </div>
                            ))}
                        </div>
                        {errors.provider && (
                            <div className="text-red-400 text-xs font-bold">
                                {errors.provider}
                            </div>
                        )}
                    </div>
                    <div className="form-group flex flex-col space-y-1">
                        <p className="text-xs text-gray-600 m-2">Amount</p>
                        <div className="form-control-wrap">
                            <input
                                type="number"
                                min={minAirtimeValue}
                                className={`w-full rounded border-gray-300 ${
                                    errors.amount && "error"
                                }`}
                                value={amount}
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                    if (e.target.value >= minAirtimeValue) {
                                        handleError("amount", false);
                                    }
                                }}
                                placeholder="Enter amount"
                            />
                            {errors.amount && (
                                <div className="text-red-400 text-xs font-bold">
                                    {errors.amount}
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        {submitting ? (
                            <SpinButton />
                        ) : (
                            <button
                                className="btn btn-primary btn-block"
                                onClick={handleProceed}
                            >
                                Pay
                            </button>
                        )}
                    </div>
                </div>
            </CardWrapper>
            <Modal modal={modal} closeModal={closeModal} />
        </MainLayout>
    );
}

function Summary({ summary, handleSubmit }) {
    const { recipient, selectedPlan, amount, charges, discount, total } =
        summary;
    console.log(summary);

    return (
        <div>
            <div className="flex flex-col space-y-4">
                <h2 className="text-center font-bold mb-0">Order Summary</h2>

                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-gray-600  m-0">Recipient</h2>
                        <p className="text-primary font-bold">{recipient}</p>
                    </div>

                    <div className="text-right">
                        <h2 className="text-gray-600  m-0">Plan</h2>
                        <p className="text-primary font-bold">
                            {selectedPlan.title}
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-gray-600 font-bold text-xs text-gray-400 m-0">
                            Service charge
                        </h2>
                        <p className="text-red-600 font-bold text-xs">
                            {naira(charges)}
                        </p>
                    </div>

                    <div className="text-right">
                        <h2 className="text-gray-600 text-xs text-gray-400 m-0">
                            Discount
                        </h2>
                        <p className="text-blue-400 text-xs font-bold">
                            {naira((discount * amount) / 100)}
                        </p>
                        <p className="text-gray-400 text-xs">({discount}%)</p>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-gray-600 font-bold text-xs text-gray-400 m-0">
                            Order amount
                        </h2>
                        <p className="text-primary">{naira(amount)}</p>
                    </div>

                    <div className="text-right">
                        <h2 className="text-gray-600 text-xs text-gray-400 m-0">
                            Total
                        </h2>
                        <p className="text-primary text-xl font-bold">
                            {naira(total)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Airtime;
