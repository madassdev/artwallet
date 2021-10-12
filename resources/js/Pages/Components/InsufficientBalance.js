import { Link } from "@inertiajs/inertia-react";
import React from "react";

function InsufficientBalance({ expected, balance }) {
    return (
        <div>
            <p className="text-center flex justify-center">
                <span className="flex items-center h-12 w-12 justify-center rounded-full bg-red-200">
                    <i className="mdi mdi-alert-circle text-red-600"></i>
                </span>
            </p>
            <p className="text-center font-bold text-gray-600 mt-2">
                Insufficient Balance
            </p>
            <p className="text-xs text-gray-400 text-center">
                You do not have sufficient amount in your Artwallet balance to
                make that transaction.
            </p>
            <div className="my-8 px-5 flex flex-col space-y-4">
                <div className="text-gray-600">
                    <p className="text-xs ">Amount Expected</p>
                    <p className="font-bold text-primary">{naira(expected)}</p>
                </div>
                <div className="text-gray-600">
                    <p className="text-xs ">Wallet Balance</p>
                    <p className="font-bold text-primary">{naira(balance)}</p>
                </div>
                <div className="text-right text-gray-600">
                    <p className="text-xs ">Remaining</p>
                    <p className="font-bold text-primary text-2xl">
                        {naira(expected - balance)}
                    </p>
                </div>
            </div>

            <Link
                href={route("wallet.fund")}
                className="btn btn-primary flex items-center justify-between text-white mt-4"
            >
                <div>
                    <i className="mdi mdi-wallet-plus mr-2"></i>
                    Fund wallet
                </div>
                <i className="mdi mdi-chevron-right text-4xl text-white text-right"></i>
            </Link>
        </div>
    );
}

export default InsufficientBalance;
