import axios from "axios";
import React, { useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import Modal from "../Components/Modal";
import SpinButton from "../Components/SpinButton";

function Verify() {
    const [modal, setModal] = useState({
        show: true,
        header: "Verify your email",
        content: <VerifyContent />,
        noClose: true,
    });
    const closeModal = () => {
        setModal({ ...modal, show: false });
    };

    return (
        <MainLayout>
            <Modal modal={modal} closeModal={closeModal} />
        </MainLayout>
    );
}

function VerifyContent() {
    const [isLoading, setIsLoading] = useState(false);
    const [hasRequested, setHasRequested] = useState(false);
    const resendMail = () => {
        setIsLoading(true);
        axios
            .get("/verification/resend")
            .then((res) => {
                setIsLoading(false);
                setHasRequested(true);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    };
    return (
        <div className="w-full md:w-1/2 mx-auto">
            <div className="mb-4 text-sm text-gray-600">
                Thanks for signing up! Before getting started, could you verify
                your email address by clicking on the link we just emailed to
                you? If you didn't receive the email, we will gladly send you
                another.
            </div>

            {hasRequested && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    A new verification link has been sent to the email address
                    you provided during registration.
                </div>
            )}
            {isLoading ? (
                <SpinButton />
            ) : (
                <button
                    className="btn btn-primary btn-block font-bold"
                    onClick={resendMail}
                >
                    Resend verification mail
                </button>
            )}
            <p className="float-right my-2">
                <a href="/logout" className="text-primary font-bold">
                    Logout
                </a>
            </p>
        </div>
    );
}

export default Verify;
