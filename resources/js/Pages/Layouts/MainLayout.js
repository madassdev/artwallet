import { Link, usePage } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function MainLayout(props) {
    const [openNav, setOpenNav] = useState(true);
    const [showModal, setShowModal] = useState(props.modal?.show);
    const toggleNav = () => {
        setOpenNav(!openNav);
    };
    const page = usePage();
    const prefix = "/demo";
    const { auth, flash } = page.props;
    const url = page.url;
    const showError = (flashMessage) => {
        toast.error(flashMessage, {
            position: "top-center",
            style: {
                background: "rgba(185, 16, 16,1)",
                color: "#fff",
                padding: "20px",
            },
        });
    };
    const showSuccess = (flashMessage) => {
        toast.success(flashMessage, {
            position: "top-center",
            style: {
                background: "rgba(16, 185, 129,1)",
                color: "#fff",
                padding: "20px",
            },
        });
    };
    return (
        <>
            <Toaster />
            {flash.success && showSuccess(flash.success)}
            {flash.err && showError(flash.err)}
            <div
                className="relative min-h-screen
             md:flex"
            >
                {/* <!-- mobile menu bar --> */}
                <div className="bg-primary text-gray-100 flex items-center justify-between md:hidden">
                    <div className="flex items-center">
                        <button
                            onClick={toggleNav}
                            className="mobile-menu-button p-4 mr-4 focus:outline-none focus:bg-gray-700"
                        >
                            {openNav && (
                                <i className="mdi mdi-menu text-2xl"></i>
                            )}
                        </button>
                        <a
                            href="#"
                            className="flex items-center space-x-2 px-2 text-white font-bold"
                        >
                            <p>Artwallet</p>
                        </a>
                    </div>
                    <button
                        onClick={toggleNav}
                        className="mobile-menu-button p-4 focus:outline-none"
                    >
                        {!openNav && <i className="mdi mdi-close"></i>}
                    </button>

                    {/* <!-- mobile menu button --> */}
                </div>

                {/* <!-- sidebar --> */}
                <div
                    className={`shadow sidebar z-10 bg-primary text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
                        openNav && " -translate-x-full"
                    } md:relative md:translate-x-0 transition duration-200 ease-in-out`}
                >
                    {/* <!-- logo --> */}
                    <a href="#" className="flex items-center space-x-2 px-4">
                        <span className="text-2xl font-extrabold">
                            Artwallet
                        </span>
                    </a>

                    {/* <!-- nav --> */}
                    <nav className="" onClick={() => setOpenNav(true)}>
                        {/* <Link href="/users" className={url.startsWith('/users') === '/users' ? 'active' : ''}>Users</Link> */}
                        <Link
                            href={route("dashboard.index")}
                            className={`nav-link ${
                                url === prefix + "/dashboard"
                                    ? "nav-active"
                                    : ""
                            }`}
                        >
                            <i className="mdi mdi-speedometer mr-2"></i>
                            Home
                        </Link>
                        <Link
                            href={route("buy.index")}
                            className={`nav-link ${
                                url.startsWith(prefix + "/buy")
                                    ? "nav-active"
                                    : ""
                            }`}
                        >
                            <i className="mdi mdi-cellphone mr-2"></i>
                            Buy Airtime and Data
                        </Link>
                        <Link
                            href={route("bills.index")}
                            className={`nav-link ${
                                url.startsWith(prefix + "/bills")
                                    ? "nav-active"
                                    : ""
                            }`}
                        >
                            <i className="mdi mdi-receipt mr-2"></i>
                            Pay Bills
                        </Link>
                        <Link
                            href={route("wallet.index")}
                            className={`nav-link ${
                                url.startsWith(prefix + "/wallet")
                                    ? "nav-active"
                                    : ""
                            }`}
                        >
                            <i className="mdi mdi-wallet mr-2"></i>
                            Wallet
                        </Link>
                        <Link
                            href={route("auth.settings.index")}
                            className={`nav-link ${
                                url.startsWith(prefix + "/settings")
                                    ? "nav-active"
                                    : ""
                            }`}
                        >
                            <i className="mdi mdi-account-cog mr-2"></i>
                            Account Settings
                        </Link>
                        {auth.user.is_admin && (
                            <Link
                                href={route("dashboard.index")}
                                className="nav-link"
                            >
                                <i className="mdi mdi-shield mr-2"></i>
                                Admin Dashboard
                            </Link>
                        )}
                    </nav>
                </div>

                {/* <!-- content --> */}
                <div className="flex-1 flex relative bg-gray-200">
                    <div className="flex-1 min-h-screen">
                        <div className="h-16 px-8 bg-white shadow hidden md:flex items-center justify-between mb-2">
                            <div className="w-2/3">{/* Search */}</div>
                            <div className="font-bold text-gray-600">
                                <i className="mdi mdi-wallet mr-2"></i>
                                {naira(auth.user.balance)}
                            </div>
                            {auth.user.is_admin && (
                                <Link
                                    className="text-xs p-1 rounded bg-red-600 text-white"
                                    href={route("dashboard.index")}
                                >
                                    Admin
                                </Link>
                            )}
                        </div>
                        <div className="w-full">
                            <div className="p-5">{props.children}</div>
                        </div>
                    </div>
                    {/* <div className="w-80 bg-white p-3 hidden md:flex md:flex-col md:space-y-8">
                    <div className="bg-red-200 text-white rounded-lg shadow p-3 flex flex-col space-y-4">
                        <p className="text-sm">Total Used</p>
                        <div>
                            <p className="text-4xl">80%</p>
                        </div>
                    </div>
                </div> */}
                </div>
            </div>

            {/* {showModal && (
                <Modal show={props.modal?.show} header={props.modal?.header} closeModal={()=>setShowModal(false)}>
                    {props.modal?.content}
                </Modal>
            )} */}
        </>
    );
}

export default MainLayout;
