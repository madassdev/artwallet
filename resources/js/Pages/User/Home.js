import { usePage } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import Modal from "../Components/Modal";
import Transactions from "../Components/Transactions";
import AppLayout from "../Layouts/AppLayout";

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
        <AppLayout user={auth.user}>
            <div className="my-4 cards">
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-x-4">
                    <div className="bg-purple-700 shadow-md rounded p-3 w-full md:w-60">
                        <h2 className="text-lg text-white m-0 p-0">Balance</h2>
                        <p className="text-2xl text-white font-bold m-0 p-0">
                            &#x20A6;
                            {parseFloat(auth.user.balance).toLocaleString()}
                        </p>
                    </div>
                    <div className="bg-white shadow-md rounded p-3 w-full md:w-60">
                        User ID: {auth.user.uniqid}
                    </div>
                </div>
            </div>

            <div className="my-2">
                <h5 className="text-lg font-bold">Transactions</h5>
            </div>
            <Transactions type="all" openModal={openModal} />
            <Modal modal={modal} closeModal={closeModal} />
        </AppLayout>
    );
}

export default Home;
