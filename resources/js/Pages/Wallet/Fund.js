import { usePage } from "@inertiajs/inertia-react";
import Modal from "../Components/Modal";
import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import MainLayout from "../Layouts/MainLayout";
import SpinButton from "../Components/SpinButton";
import { Inertia } from "@inertiajs/inertia";
import toast from "react-hot-toast";

function Fund() {
    const [modal, setModal] = useState({
        show: false,
        header: "Fund Wallet",
        content: <ManualDeposit />,
    });
    const closeModal = () => {
        setModal({ ...modal, show: false });
    };
    const { auth } = usePage().props;
    // const publicKey = PUBLIC_CONFIG.paystack_public_key_live;
    const publicKey = "pk_test_deca92ff9fd72063fce8ed64c97007ed4e0d34e8";
    const reference = "AR-" + Date.now();
    const [amount, setAmount] = useState(100);
    const [charges, setCharges] = useState(1.5);
    const [paymentAmount, setPaymentAmount] = useState(
        (amount + charges) * 100
    );
    const [email, setEmail] = useState(auth.user.email);
    const [name, setName] = useState(auth.user.full_name);
    const [mobile, setMobile] = useState(auth.user.mobile);
    const [isVerifying, setIsVerifying] = useState(false);
    const componentProps = {
        email,
        amount: paymentAmount,
        reference,
        text: (
            <span className="flex items-center justify-between ">
                <span className="w-1/3"></span>
                {"Pay " + naira(paymentAmount / 100)}
                <i className="mdi mdi-chevron-right text-4xl text-white text-right"></i>
            </span>
        ),
        metadata: {
            name,
            mobile,
        },
        publicKey,
        onSuccess: (data) => {
            console.log(data);
            setIsVerifying(true);
            // axios
            //     .post("/payments", { reference: reference, amount })
            //     .then((response) => {
            //         handlePaymentSuccess(response.data);
            //     })
            //     .catch((err) => console.log(err));
            Inertia.post(
                route("wallet.fund.verify.paystack"),
                { reference: reference, amount },
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
    function calculateCharges(value) {
        const flatRate = parseFloat(0.015 * value);
        let total = flatRate;
        if (value > 2500) {
            total = flatRate + 100;
        }

        return Math.min(total, 2000);
    }
    function handleAmount(p) {
        const amt = parseFloat(isNaN(p) || !p || p === "" ? 0 : p);
        const ch = parseFloat(calculateCharges(amt));
        const tot = (amt + ch) * 100;

        setAmount(amt);
        setCharges(ch);
        setPaymentAmount(tot);
    }

    function openManualModal() {
        console.log();
        setModal((modal) => ({
            ...modal,
            show: true,
            header: "Fund Wallet",
            content: <ManualDeposit />,
        }));
    }

    return (
        <MainLayout>
            <div className="w-full md:w-1/2 mx-auto">
                <div className="text-gray-600 p-5 rounded-lg bg-white mb-8">
                    <div className="my-2">
                        <p className="text-lg text-primary text-center">
                            <i className="mdi mdi-wallet-plus mr-2"></i>
                            Fund wallet
                        </p>
                        <p className="text-xs">
                            How much would you like to fund your wallet with?
                        </p>
                    </div>
                    <div className="my-4">
                        <input
                            autoFocus
                            value={amount}
                            onChange={(e) => {
                                handleAmount(e.target.value);
                            }}
                            className="w-full p-3 rounded border border-gray-300 text-2xl focus:outline-none"
                        />

                        <p className="font-bold text-gray-400 text-xs my-2">
                            Total Service charge: {naira(charges)}
                        </p>
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
                                <PaystackButton
                                    {...componentProps}
                                    className="btn btn-block bg-purple-700 text-white shadow"
                                />
                            </div>
                        ) : (
                            <>
                                <button className="btn btn-block btn-light text-gray-600">
                                    Minimum amount is {naira(100)}
                                </button>
                            </>
                        )}
                    </>
                )}

                <p
                    className="text-xs text-center text-primary cursor-pointer my-4"
                    onClick={openManualModal}
                >
                    Pay manually?
                </p>
            </div>
            <Modal modal={modal} closeModal={closeModal} />
        </MainLayout>
    );
}

function ManualDeposit() {
    return (
        <div className="w-full md:w-1/2 mx-auto">
            <h2 className="text-lg font-bold text-center text-gray-600">
                Fund wallet manually
            </h2>
            <div className="my-4">
                <p className="text-center text-xs text-gray-600">
                    Please make payment to the following account details,
                    payment will be confirmed and your wallet will be funded
                    within 24 hours.
                </p>
            </div>
            <div className="text-center p-3 bg-primary rounded my-8">
                <p className="text-white">
                    {PUBLIC_CONFIG.deposit_account_name}
                </p>
                <span className="text-2xl text-white">
                    {PUBLIC_CONFIG.deposit_account_number}{" "}
                    <i className="text-white text-sm mdi mdi-content-copy ml-2"></i>
                </span>
                <p className="font-bold text-white">
                    {PUBLIC_CONFIG.deposit_account_bank}
                </p>
            </div>
        </div>
    );
}

export default Fund;
