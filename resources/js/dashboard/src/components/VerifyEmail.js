import axios from "axios";
import React, { useState } from "react";

function VerifyEmail() {
    const [isLoading, setIsLoading] = useState(false);
    const [hasRequested, setHasRequested] = useState(false)
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
                <button
                    onClick={() => {
                        setIsLoading(false);
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
                    onClick={resendMail}
                >
                    Resend verification mail
                </button>
            )}
        </div>
    );
}

export default VerifyEmail;
