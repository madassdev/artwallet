import { Link, usePage } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import Modal from "../Components/Modal";
import Transactions from "../Components/Transactions";
import AppLayout from "../Layouts/AppLayout";
import MainLayout from "../Layouts/MainLayout";

function Home() {
    const [modal, setModal] = useState({
        show: false,
        header: "Header",
        content: "Content",
    });

    const { auth } = usePage().props;

    const openModal = (modal) => {
        setModal({ ...modal, show: true });
    };

    const closeModal = () => {
        setModal({ ...modal, show: false });
    };

    return (
        <MainLayout>
            <div className="w-full">
                <div className="my-4 cards">
                    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-x-4">
                        <div className="bg-purple-700 shadow-md rounded p-5 w-full md:w-60 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg text-white m-0 p-0">
                                    Balance
                                </h2>
                                <p className="text-2xl text-white font-bold m-0 p-0">
                                    {naira(auth.user?.balance)}
                                </p>
                            </div>
                            <div>
                                <Link href={"/payments/deposit"}>
                                    <div className="flex flex-col items-center cursor-pointer">
                                        <span className="h-12 w-12 flex items-center justify-center rounded-full bg-purple-100 text-purple-700">
                                            <i className="mdi mdi-wallet-plus text-2xl"></i>
                                        </span>
                                        <p className="text-center text-xs text-white mt-1">
                                            Fund wallet
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-8 bg-grays-100 rounded w-full shadows p-2 md:p-3">
                    <p className="text-primary text-lg font-bold">
                        <i className="mdi mdi-link mr-1"></i>
                        Quick Links
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 my-8">
                        <QuickLinkCard
                            icon="mdi mdi-phone-dial"
                            link={route("buy.airtime")}
                            title="Airtime"
                        />
                        <QuickLinkCard
                            icon="mdi mdi-wifi"
                            link={route("buy.data")}
                            title="Data"
                        />
                        <QuickLinkCard
                            icon="mdi mdi-television-classic"
                            link={route("bills.cable-tv")}
                            title="Cable Tv"
                        />
                        <QuickLinkCard
                            icon="mdi mdi-lightning-bolt"
                            link={route("bills.electricity")}
                            title="Electricity"
                        />
                        <QuickLinkCard
                            icon="mdi mdi-satellite-uplink"
                            link={route("bills.internet")}
                            title="Internet"
                        />
                        <QuickLinkCard
                            icon="mdi mdi-wifi"
                            link={route("buy.data")}
                            title="Data"
                        />
                    </div>
                </div>

                {/* <div className="my-2">
                    <h5 className="text-lg font-bold text-gray-600">
                        Transactions
                    </h5>
                </div>
                <Transactions type="all" openModal={openModal} />
                <Modal modal={modal} closeModal={closeModal} /> */}
            </div>
        </MainLayout>
    );
}

function QuickLinkCard({ icon, title, link }) {
    return (
        <Link href={link}>
            <div className="w-full h-28 p-3 rounded-lg shadow bg-white flex items-center justify-center flex-col">
                <span className="flex items-center justify-center h-12 w-12 bg-primary rounded-full text-white">
                    <i className={`${icon} text-2xl`}></i>
                </span>
                <p className="text-gray-600 mt-3 text-center">{title}</p>
            </div>
        </Link>
    );
}
export default Home;
