import { usePage } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import CardWrapper from "../Layouts/Partials/CardWrapper";
import { PaystackButton } from "react-paystack";
import SpinButton from "../Components/SpinButton";
import { Inertia } from "@inertiajs/inertia";
import toast from "react-hot-toast";

function Show() {
    const { auth } = usePage().props;
    const agent = auth.user.agent;
    const publicKey = "pk_test_deca92ff9fd72063fce8ed64c97007ed4e0d34e8";
    // const publicKey = PUBLIC_CONFIG.paystack_public_key_live;
    const reference = "AR-AGF-" + Date.now();
    const amount = 10000 * 100;
    const [charges, setCharges] = useState(1.5);
    const [paymentAmount, setPaymentAmount] = useState(
        (amount + charges) * 100
    );
    const [email, setEmail] = useState(AUTH_USER.email);
    const [name, setName] = useState(AUTH_USER.full_name);
    const [mobile, setMobile] = useState(AUTH_USER.mobile);
    const [isVerifying, setIsVerifying] = useState(false);
    const componentProps = {
        email,
        amount,
        reference,
        // text: "Pay with Paystack",
        metadata: {
            name,
            mobile,
        },
        publicKey,
        text: "Pay " + naira(amount / 100),
        onSuccess: (data) => {
            setIsVerifying(true);
            Inertia.post(
                route("agent.pay"),
                { reference: reference, amount, intent:'agent-activation' },
                {
                    onError: (error) => {
                        setIsVerifying(false);
                        console.log(error);
                        toast.error(error.message, {
                            position: "top-center",
                        });
                    },
                }
            );
        },
        onClose: () => alert("Transaction cancelled"),
    };

    const calculateCharges = (value) => {
        const flatRate = parseFloat(0.015 * value);
        let total = flatRate;
        if (value > 2500) {
            total = flatRate + 100;
        }

        return Math.min(total, 2000);
    };
    const handleAmount = (p) => {
        const amt = parseFloat(isNaN(p) || !p || p === "" ? 0 : p);
        const ch = parseFloat(calculateCharges(amt));
        const tot = (amt + ch) * 100;

        setAmount(amt);
        setCharges(ch);
        setPaymentAmount(tot);
    };

    const handlePaymentSuccess = (data) => {
        window.location.reload();
    };

    function viewCac() {
        console.log("view");
    }
    return (
        <MainLayout>
            <CardWrapper>
                <div>
                    <div className="my-4">
                        <h2 className="font-bold text-lg text-gray-600 m-0">
                            Agent Information
                        </h2>

                        {agent.status == "pending" && (
                            <>
                                <div className="p-5 my-4 w-full bg-gray-200 text-gray-600 text-xs rounded">
                                    Your application is currently being
                                    reviewed.
                                </div>
                            </>
                        )}

                        {(agent.status == "success" ||
                            agent.status == "approved") && (
                            <>
                                {isVerifying ? (
                                    <SpinButton />
                                ) : (
                                    <div className="p-3 my-4 bg-gray-200 text-gray-600 flex flex-col items-center justify-center space-y-4">
                                        {/* <p className="">
                                            Your Application was approved!
                                        </p> */}
                                        {!agent.has_paid && (
                                            <>
                                                <p>
                                                    You need to make a payment
                                                    of{" "}
                                                    <span className="font-bold text-primary">
                                                        {naira(10000)}
                                                    </span>{" "}
                                                    to complete your agent
                                                    application!
                                                </p>
                                                <PaystackButton
                                                    {...componentProps}
                                                    className="btn btn-primary"
                                                />
                                            </>
                                        )}
                                    </div>
                                )}
                            </>
                        )}

                        <div className="flex flex-wrap">
                            <div className="p-3">
                                <h2 className="font-bold m-0">Name</h2>
                                <p className="text-primary text-sm">
                                    {agent.name} {agent.last_name}
                                </p>
                            </div>

                            <div className="p-3">
                                <h2 className="font-bold m-0">Email</h2>
                                <p className="text-primary text-sm">
                                    {agent.email}
                                </p>
                            </div>
                            <div className="p-3">
                                <h2 className="font-bold m-0">Mobile</h2>
                                <p className="text-primary text-sm">
                                    {agent.mobile}
                                </p>
                            </div>

                            <div className="p-3">
                                <h2 className="font-bold m-0">Address</h2>
                                <p className="text-primary text-sm">
                                    {agent.address}
                                </p>
                            </div>

                            <div className="p-3">
                                <h2 className="font-bold m-0">State</h2>
                                <p className="text-primary text-sm">
                                    {agent.state}
                                </p>
                            </div>

                            <div className="p-3">
                                <h2 className="font-bold m-0">LGA</h2>
                                <p className="text-primary text-sm">
                                    {agent.lga}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="my-4">
                        <h2 className="font-bold text-lg text-gray-600 m-0">
                            Business Information
                        </h2>

                        <div className="flex flex-wrap">
                            <div className="p-3">
                                <h2 className="font-bold m-0">Business Name</h2>
                                <p className="text-primary text-sm">
                                    {agent.business_name}
                                </p>
                            </div>

                            <div className="p-3">
                                <h2 className="font-bold m-0">
                                    Business Email
                                </h2>
                                <p className="text-primary text-sm">
                                    {agent.business_email}
                                </p>
                            </div>
                            <div className="p-3">
                                <h2 className="font-bold m-0">
                                    Business Mobile
                                </h2>
                                <p className="text-primary text-sm">
                                    {agent.business_mobile}
                                </p>
                            </div>

                            <div className="p-3">
                                <h2 className="font-bold m-0">
                                    Business Address
                                </h2>
                                <p className="text-primary text-sm">
                                    {agent.business_address}
                                </p>
                            </div>

                            <div className="p-3">
                                <h2 className="font-bold m-0">BVN</h2>
                                <p className="text-primary text-sm">
                                    {agent.business_bvn}
                                </p>
                            </div>

                            <div className="p-3">
                                <h2 className="font-bold m-0">NIN</h2>
                                <p className="text-primary text-sm">
                                    {agent.business_nin}
                                </p>
                            </div>

                            <div className="p-3">
                                <h2 className="font-bold m-0">
                                    Business Offering
                                </h2>
                                <p className="text-primary text-sm">
                                    {agent.business_offering}
                                </p>
                            </div>
                        </div>
                        {/* <div className="flex justify-center items-center">
                            <button
                                className="btn btn-info text-white"
                                onClick={viewCac}
                            >
                                View CAC
                            </button>
                        </div> */}
                    </div>
                </div>
            </CardWrapper>
        </MainLayout>
    );
}

export default Show;
