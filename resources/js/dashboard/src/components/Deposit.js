import axios from "axios";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import { connect } from "react-redux";
function Deposit(props) {
    const publicKey = "pk_test_ebd6435d808e02ac14eb40d514d9d13bba875309";
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
                    props.addTransaction(response.data.data.transaction);
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
        <div className="col-md-8 mx-auto">
            {redirect && <Redirect to={redirect} />}
            <div className="card">
                <div className="card-header text-center">Deposit now</div>
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
                        <div className="col-sm-6 mt-2 mx-auto">
                            <div className="form-group">
                                <label
                                    className="form-label"
                                    htmlFor="default-01"
                                >
                                    Email
                                </label>

                                <div className="form-control-wrap">
                                    <input
                                        type="text"
                                        className="w-full rounded border-gray-300"
                                        id="default-01"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label
                                    className="form-label"
                                    htmlFor="default-01"
                                >
                                    Name
                                </label>

                                <div className="form-control-wrap">
                                    <input
                                        type="text"
                                        className="w-full rounded border-gray-300"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        placeholder="Enter your name"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label
                                    className="form-label"
                                    htmlFor="default-01"
                                >
                                    Phone Number
                                </label>

                                <div className="form-control-wrap">
                                    <input
                                        type="text"
                                        className="w-full rounded border-gray-300"
                                        value={mobile}
                                        onChange={(e) =>
                                            setMobile(e.target.value)
                                        }
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label
                                    className="form-label"
                                    htmlFor="default-01"
                                >
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
export default connect(mapState, mapDispatch)(Deposit);
