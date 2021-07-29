import axios from "axios";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import { connect } from "react-redux";

function AutoDeposit(props) {
    const publicKey = PUBLIC_CONFIG.paystack_public_key_live;
    const reference = "AR-" + Date.now();
    const [amount, setAmount] = useState(100);
    const [paymentAmount, setPaymentAmount] = useState(amount * 100);
    const [email, setEmail] = useState(AUTH_USER.email);
    const [name, setName] = useState(AUTH_USER.full_name);
    const [mobile, setMobile] = useState(AUTH_USER.mobile);
    const [redirect, setRedirect] = useState(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const componentProps = {
        email,
        amount: paymentAmount,
        reference,
        text: "Pay with Paystack",
        metadata: {
            name,
            mobile,
        },
        publicKey,
        text: "Pay Now",
        onSuccess: (data) => {
            setIsVerifying(true);
            axios
                .post("/payments", { reference: reference })
                .then((response) => {
                    handlePaymentSuccess(response.data);
                })
                .catch((err) => console.log(err));
        },
        onClose: () => alert("Transaction cancelled"),
    };

    const handleAmount = (amount) => {
        setAmount(amount);
        setPaymentAmount(amount * 100);
    };

    const handlePaymentSuccess = (data) => {
        props.creditUserBalance(amount);
        setRedirect("/successPage/depositSuccess");
    };
    return (
        <div className="">
            {redirect && <Redirect to={redirect} />}
            <div className="card-body">
                {isVerifying ? (
                    <div className="flex flex-col items-center justify-center space-y-4 p-8">
                        <div
                            className="spinner-border text-success"
                            role="status"
                        >
                            {/* <span class="sr-only">Loading...</span> */}
                        </div>
                        <p className="text-gray-400">
                            Receiving transaction...
                        </p>
                    </div>
                ) : (
                    <div className="mt-2 w-full md:w-1/2 mx-auto">
                        <div className="form-group">
                            <label className="form-label" htmlFor="default-01">
                                Email
                            </label>

                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="w-full rounded border-gray-300 bg-gray-200"
                                    id="default-01"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="default-01">
                                Amount
                            </label>

                            <div className="form-control-wrap">
                                <input
                                    type="number"
                                    min="100"
                                    className="w-full rounded border-gray-300"
                                    value={amount}
                                    onChange={(e) =>
                                        handleAmount(e.target.value)
                                    }
                                    placeholder="Enter your phone number"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <PaystackButton
                                {...componentProps}
                                className="btn btn-block btn-primary"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

const mapState = (state) => {
    return {
        user: state.userState.user,
    };
};

const mapDispatch = (dispatch) => {
    return {
        creditUserBalance: (amount) =>
            dispatch({
                type: "CREDIT_USER",
                amount,
            }),
        addTransaction: (transaction) =>
            dispatch({
                type: "ADD_TRANSACTION",
                transaction: transaction,
            }),
    };
};
export default connect(mapState, mapDispatch)(AutoDeposit);
