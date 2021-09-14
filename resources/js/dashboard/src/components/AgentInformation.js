import axios from "axios";
import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import { useDispatch } from "react-redux";

function AgentInformation({ saved, agent, source }) {
    console.log(agent.status);
    let admin = false;
    if (source == "admin") {
        admin = true
    }
    const dispatch = useDispatch();
    let imgSrc = null;
    if (saved) {
        imgSrc = agent.business_cac;
    } else {
        // imgSrc = URL.createObjectURL(agent.business_cac);
    }
    function viewCac() {
        dispatch({
            type: "OPEN_MODAL",
            modal: {
                show: 1,
                content: (
                    <div className="w-5/6 mx-auto h-40 flex items-center justify-center">
                        <img src={imgSrc} className="w-40 h-40 object-cover" />
                    </div>
                ),
                header: <h3 className="font-bold uppercase">CAC</h3>,
            },
        });
    }

    // const publicKey = "pk_test_deca92ff9fd72063fce8ed64c97007ed4e0d34e8";
    const publicKey = PUBLIC_CONFIG.paystack_public_key_live;
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
            axios
                .post("/payments/agent", {
                    reference: reference,
                    amount,
                    intent: "agent-fee",
                })
                .then((response) => {
                    handlePaymentSuccess(response.data);
                })
                .catch((err) => console.log(err));
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

    return (
        <div className="flex flex-col">
            {!admin && (
                <>
                    {saved && (
                        <>
                            {agent.status == "pending" && (
                                <>
                                    <div className="p-2 w-full alert alert-warning rounded">
                                        Your application is currently being
                                        reviewed.
                                    </div>
                                </>
                            )}
                            {(agent.status == "disapproved" ||
                                agent.status == "canceled") && (
                                <>
                                    <div className="p-2 w-full alert alert-danger rounded">
                                        Your application was not approved.
                                    </div>
                                </>
                            )}
                            {(agent.status == "success" ||
                                agent.status == "approved") && (
                                <>
                                    {isVerifying ? (
                                        <div className="flex flex-col items-center justify-center space-y-4 p-8">
                                            <div
                                                className="spinner-border text-success"
                                                role="status"
                                            ></div>
                                            <p className="text-gray-400">
                                                Receiving transaction...
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="p-3 alert alert-success flex flex-col items-center justify-center space-y-4">
                                            <p className="">
                                                Your Application was approved!
                                            </p>
                                            {!agent.has_paid && (
                                                <>
                                                    <p>
                                                        You need to make a
                                                        payment of{" "}
                                                        <span className="font-bold">
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
                        </>
                    )}
                </>
            )}
            <div className="my-4">
                <h2 className="font-bold text-lg text-gray-600 m-0">
                    Agent Information
                </h2>

                <div className="flex flex-wrap">
                    <div className="p-3">
                        <h2 className="font-bold m-0">Name</h2>
                        <p className="text-primary text-sm">
                            {agent.name} {agent.last_name}
                        </p>
                    </div>

                    <div className="p-3">
                        <h2 className="font-bold m-0">Email</h2>
                        <p className="text-primary text-sm">{agent.email}</p>
                    </div>
                    <div className="p-3">
                        <h2 className="font-bold m-0">Mobile</h2>
                        <p className="text-primary text-sm">{agent.mobile}</p>
                    </div>

                    <div className="p-3">
                        <h2 className="font-bold m-0">Address</h2>
                        <p className="text-primary text-sm">{agent.address}</p>
                    </div>

                    <div className="p-3">
                        <h2 className="font-bold m-0">State</h2>
                        <p className="text-primary text-sm">{agent.state}</p>
                    </div>

                    <div className="p-3">
                        <h2 className="font-bold m-0">LGA</h2>
                        <p className="text-primary text-sm">{agent.lga}</p>
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
                        <h2 className="font-bold m-0">Business Email</h2>
                        <p className="text-primary text-sm">
                            {agent.business_email}
                        </p>
                    </div>
                    <div className="p-3">
                        <h2 className="font-bold m-0">Business Mobile</h2>
                        <p className="text-primary text-sm">
                            {agent.business_mobile}
                        </p>
                    </div>

                    <div className="p-3">
                        <h2 className="font-bold m-0">Business Address</h2>
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
                        <h2 className="font-bold m-0">Business Offering</h2>
                        <p className="text-primary text-sm">
                            {agent.business_offering}
                        </p>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <button
                        className="btn btn-info text-white"
                        onClick={viewCac}
                    >
                        View CAC
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AgentInformation;
