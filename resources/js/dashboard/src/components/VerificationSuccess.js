import React from "react";
import { Link } from "react-router-dom";

function VerificationSuccess() {
    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <div>
                <div className="bg-green-200 h-16 w-16 rounded-full text-green-700 mx-auto flex items-center justify-center ">
                    <i className="mdi mdi-check text-lg"></i>
                </div>
            </div>
            <p className="text-green-500 font-bold text-2x; text-center">Account verification successful!</p>
            <p className="text-gray-600">Your account has been verified successfully!</p>
            <div>
                <Link
                    to="/"
                    className="text-center text-gray-400 hover:text-gray-600"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}

export default VerificationSuccess;
