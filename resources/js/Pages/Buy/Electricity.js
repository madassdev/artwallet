import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import React, { useEffect, useState } from "react";
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

function Electricity() {
    const { auth, providers, discount, charges, minimum_value } =
        usePage().props;
    console.log(charges)
    const minElectricityValue = minimum_value;

    const [modal, setModal] = useState({
        show: false,
        header: "Header",
        content: "Content",
    });

    const defaultErrors = {
        recipient: false,
        plan: false,
        meterType: false,
        amount: false,
    };
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState(defaultErrors);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [meterDetails, setMeterDetails] = useState();
    const [amount, setAmount] = useState(minElectricityValue);
    const [pin, setPin] = useState("");
    const [recipient, setRecipient] = useState("");
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [planOptions, setPlanOptions] = useState([]);
    const [optionValue, setOptionValue] = useState(null);
    const [meterType, setMeterType] = useState(false);

    useEffect(() => {
        const sopt = providers.map((provider) => {
            return {
                name: provider.plans[0].title,
                value: provider.plans[0].id,
            };
        });
        // console.log(sopt);
        setOptionValue(sopt[0].value);
        setPlanOptions(sopt);
    }, []);

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
            handleError("plan", "Select a valid plan");
            c++;
        }
        if (!meterType) {
            handleError("meterType", "Please select meter type");
            c++;
        }
        if (amount < minElectricityValue) {
            handleError("amount", "Please enter amount greater than " +naira(minElectricityValue));
            c++;
        }

        return !c;
    }

    const handlePlanSelected = (planId) => {
        const plan = providers.find((p) => p.plans[0].id === planId).plans[0];
        console.log(plan);
        setSelectedPlan(plan);
        handleError("plan", false);
    };
    const openModal = (modal) => {
        setModal({ ...modal, show: true });
    };

    const closeModal = () => {
        setModal({ ...modal, show: false });
    };

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
        setSubmitting(true);
        axios
            .post("/orders/electricity/verify", {
                plan_id: selectedPlan.id,
                type: "electricity",
                recipient,
            })
            .then((res) => {
                console.log(res.data);
                setMeterDetails(res.data.recipient);
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
                                    amount,
                                    recipient,
                                    meterDetails: res.data.recipient,
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
            route("orders.electricity.buy"),
            {
                plan_id: selectedPlan.id,
                type: "electricity",
                pin,
                amount,
                meter_type: meterType,
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
                            Select Electricity Porvider
                        </p>
                        <SelectSearch
                            options={planOptions}
                            search={true}
                            filterOptions={fuzzySearch}
                            emptyMessage={"Plan Not Found"}
                            placeholder={"Select provider"}
                            onChange={handlePlanSelected}
                            value={optionValue}
                        />
                        {errors.plan && (
                            <div className="text-red-400 text-xs font-bold">
                                {errors.plan}
                            </div>
                        )}
                    </div>

                    <div className="form-group flex flex-col space-y-1">
                        <p className="text-xs text-gray-600 m-2">Amount</p>
                        <div className="form-control-wrap">
                            <input
                                type="number"
                                min={minElectricityValue}
                                className={`w-full rounded border-gray-300 ${
                                    errors.amount && "error"
                                }`}
                                value={amount}
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                    if (e.target.value >= minElectricityValue) {
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
                    <div className="form-group flex flex-col space-y-1">
                        <p className="text-xs text-gray-600 m-2">Meter type</p>
                        <div className="flex space-x-8">
                            <div className="flex space-x-2">
                                <input
                                    type="radio"
                                    name="meter_type"
                                    onChange={() => {
                                        setMeterType("prepaid");
                                        handleError("meterType", false);
                                    }}
                                    value="prepaid"
                                />
                                <p className="">Prepaid</p>
                            </div>
                            <div className="flex space-x-2">
                                <input
                                    type="radio"
                                    name="meter_type"
                                    onChange={() => {
                                        setMeterType("postpaid");
                                        handleError("meterType", false);
                                    }}
                                    value="postpaid"
                                />
                                <p className="">Postpaid</p>
                            </div>
                        </div>
                        {errors.meterType && (
                            <div className="text-red-400 text-xs font-bold">
                                {errors.meterType}
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
        meterDetails,
    } = summary;
    console.log(summary);

    return (
        <div>
            <div className="flex flex-col space-y-4">
                <h2 className="text-center font-bold mb-0">Order Summary</h2>

                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-gray-600  m-0">Recipient</h2>
                        <p className="text-primary font-bold">{recipient}</p>
                        <p className="text-primary text-xs">{meterDetails}</p>
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

export default Electricity;
