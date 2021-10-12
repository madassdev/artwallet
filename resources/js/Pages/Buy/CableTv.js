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
import OrderSummary from "./OrderSummary";
import axios from "axios";
import { discountValue, getDiscountValue } from "@/util/functions";
import InsufficientBalance from "../Components/InsufficientBalance";

function CableTv() {
    const { auth, providers, discount, charges } = usePage().props;
    console.log(charges);

    const [modal, setModal] = useState({
        show: false,
        header: "Header",
        content: "Content",
    });

    const defaultErrors = {
        recipient: false,
        plan: false,
        provider: false,
    };
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState(defaultErrors);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [cableDetails, setCableDetails] = useState();
    const [pin, setPin] = useState("");
    const [recipient, setRecipient] = useState("");
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
        if (!selectedProvider) {
            handleError("provider", "Select a provider");
            c++;
        }
        if (!selectedPlan) {
            handleError("plan", "Select a valid plan");
            c++;
        }

        return !c;
    }

    const handlePlanSelected = (planId) => {
        const plan = selectedProvider.plans.find((p) => p.id === planId);
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
            parseFloat(selectedPlan.price) +
            parseFloat(charges) -
            parseFloat(discountValue(discount, selectedPlan.price, auth.user));
        console.log(totalAmt);

        if (totalAmt > auth.user.balance) {
            openInsufficientModal(totalAmt);
            return;
        }
        setSubmitting(true);
        axios
            .post("/orders/cable-tv/verify", {
                plan_id: selectedPlan.id,
                type: "cable-tv",
                recipient,
            })
            .then((res) => {
                console.log(res.data);
                setCableDetails(res.data.recipient);
                setSubmitting(false);
                setModal((modal) => ({
                    ...modal,
                    show: true,
                    header: "Checkout",
                    content: (
                        <OrderSummary
                            handleSubmit={handleModalAction}
                            amount={totalAmt}
                            cancelAction={closeModal}
                        >
                            <Summary
                                summary={{
                                    amount: selectedPlan.price,
                                    recipient,
                                    cableDetails: res.data.recipient,
                                    selectedPlan,
                                    charges,
                                    discount: getDiscountValue(
                                        discount,
                                        auth.user
                                    ),
                                    total: totalAmt,
                                }}
                            />
                        </OrderSummary>
                    ),
                }));
                // setIsReady(true);
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
                setSubmitting(false);
            });
        // setModal((modal) => ({
        //     ...modal,
        //     show: true,
        //     noClose: true,
        //     header: "Checkout",
        //     content: (
        //         <OrderSummary
        //             handleSubmit={handleModalAction}
        //             amount={selectedPlan.price + charges}
        //             cancelAction={closeModal}
        //         >
        //             {/* <Summary
        //                 summary={{
        //                     amount: selectedPlan.price,
        //                     recipient,
        //                     selectedPlan,
        //                     charges,
        //                 }}
        //             /> */}
        //         </OrderSummary>
        //     ),
        // }));
    };

    function handleModalAction(pin) {
        closeModal();
        setPin(pin);
        setSubmitting(true);

        Inertia.post(
            route("orders.cable-tv.buy"),
            {
                plan_id: selectedPlan.id,
                type: "cable-tv",
                pin,
                recipient,
            },
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
        <MainLayout>
            <CardWrapper>
                <h2 className="text-primary font-bold uppercase text-center">
                    Buy Cable Tv
                </h2>

                <div className="flex flex-col space-y-8 my-2 md:my-8 w-full md:w-2/3 mx-auto">
                    <div className="form-group flex flex-col space-y-1">
                        <p className="text-xs text-gray-600 m-2">
                            Recipient Device Number
                        </p>

                        <div className="form-control-wrap">
                            <input
                                type="text"
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
                            Select Data Provider
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
                                            value={p?.id}
                                            onChange={() => {
                                                handleProviderSelected(p);
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
                    <div>
                        <p className="text-xs text-gray-600 m-2">Select Plan</p>
                        <SelectSearch
                            options={planOptions}
                            search={true}
                            filterOptions={fuzzySearch}
                            emptyMessage={"Plan Not Found"}
                            placeholder={"Select plan"}
                            onChange={handlePlanSelected}
                            value={optionValue}
                        />
                        {errors.plan && (
                            <div className="text-red-400 text-xs font-bold">
                                {errors.plan}
                            </div>
                        )}
                    </div>
                    <div>
                        {submitting ? (
                            <SpinButton />
                        ) : (
                            <button
                                className="btn btn-primary btn-block"
                                onClick={handleProceed}
                            >
                                Proceed
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
    const {
        recipient,
        selectedPlan,
        amount,
        charges,
        discount,
        total,
        cableDetails,
    } = summary;
    console.log(summary);

    return (
        <div>
            <div>
                <div className="flex flex-col space-y-4">
                    <h2 className="text-center font-bold mb-0">
                        Order Summary
                    </h2>

                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-gray-600  m-0">Recipient</h2>
                            <p className="text-primary font-bold">
                                {recipient}
                            </p>
                            <p className="text-primary text-xs">
                                {cableDetails}
                            </p>
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
                            <p className="text-gray-400 text-xs">
                                ({discount}%)
                            </p>
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
        </div>
    );
}

export default CableTv;
