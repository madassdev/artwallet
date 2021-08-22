import { Link } from "@inertiajs/inertia-react";

function Sidebar() {
    return (
        <div
            className="nk-sidebar nk-sidebar-fixed is-light "
            data-content="sidebarMenu"
        >
            <div className="nk-sidebar-element nk-sidebar-head">
                <div className="nk-sidebar-brand">
                    <Link href="/" className="logo-link nk-sidebar-logo">
                        <img
                            className="logo-light logo-img"
                            src={`${ASSET_PATH}images/artwallet.png`}
                            srcSet="images/artwallet.png 2x"
                            alt="logo"
                        />
                        <img
                            className="logo-dark logo-img"
                            src={`${ASSET_PATH}images/artwallet.png`}
                            srcSet="images/artwallet.png 2x"
                            alt="logo-dark"
                        />
                        <img
                            className="logo-small logo-img logo-img-small"
                            src={`${ASSET_PATH}images/artwallet.png`}
                            srcSet="images/artwallet.png 2x"
                            alt="logo-small"
                        />
                    </Link>
                </div>
                <div className="nk-menu-trigger mr-n2">
                    <a
                        href="#"
                        className="nk-nav-toggle nk-quick-nav-icon d-xl-none"
                        data-target="sidebarMenu"
                    >
                        <em className="icon ni ni-arrow-left"></em>
                    </a>
                    <a
                        href="#"
                        className="nk-nav-compact nk-quick-nav-icon d-none d-xl-inline-flex"
                        data-target="sidebarMenu"
                    >
                        <em className="icon ni ni-menu"></em>
                    </a>
                </div>
            </div>
            <div className="nk-sidebar-element">
                <div className="nk-sidebar-content">
                    <div className="nk-sidebar-menu" data-simplebar>
                        <ul className="nk-menu">
                            {AUTH_USER.is_admin && (
                                <>
                                    <li className="nk-menu-heading">
                                        <h6 className="overline-title text-primary-alt">
                                            Admin Menu
                                        </h6>
                                    </li>
                                    <li className="nk-menu-item">
                                        <Link
                                            href="/customers"
                                            className="nk-menu-link"
                                        >
                                            <span className="nk-menu-icon">
                                                <em className="mdi mdi-account-group"></em>
                                            </span>
                                            <span className="nk-menu-text">
                                                Customer Management
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="nk-menu-item has-sub">
                                        <a
                                            href="#"
                                            className="nk-menu-link nk-menu-toggle"
                                            data-original-title=""
                                            title=""
                                        >
                                            <span className="nk-menu-icon">
                                                <em className="icon mdi mdi-shield-home"></em>
                                            </span>
                                            <span className="nk-menu-text">
                                                Product Management
                                            </span>
                                        </a>
                                        <ul className="nk-menu-sub">
                                            <li className="nk-menu-item">
                                                <Link
                                                    href="/products/data"
                                                    className="nk-menu-link"
                                                    data-original-title=""
                                                    title=""
                                                >
                                                    <span className="nk-menu-text">
                                                        Data Plans
                                                    </span>
                                                </Link>
                                            </li>
                                            <li className="nk-menu-item">
                                                <Link
                                                    href="/products/airtime"
                                                    className="nk-menu-link"
                                                    data-original-title=""
                                                    title=""
                                                >
                                                    <span className="nk-menu-text">
                                                        Airtime
                                                    </span>
                                                </Link>
                                            </li>
                                            <li className="nk-menu-item">
                                                <Link
                                                    href="/products/cable-tv"
                                                    className="nk-menu-link"
                                                    data-original-title=""
                                                    title=""
                                                >
                                                    <span className="nk-menu-text">
                                                        Cable Tv Plans
                                                    </span>
                                                </Link>
                                            </li>
                                            <li className="nk-menu-item">
                                                <Link
                                                    href="/products/electricity"
                                                    className="nk-menu-link"
                                                    data-original-title=""
                                                    title=""
                                                >
                                                    <span className="nk-menu-text">
                                                        Electricity Plans
                                                    </span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nk-menu-item has-sub">
                                        <a
                                            href="#"
                                            className="nk-menu-link nk-menu-toggle"
                                            data-original-title=""
                                            title=""
                                        >
                                            <span className="nk-menu-icon">
                                                <em className="mdi mdi-cash-multiple"></em>
                                            </span>
                                            <span className="nk-menu-text">
                                                Sales Management
                                            </span>
                                        </a>
                                        <ul className="nk-menu-sub">
                                            <li className="nk-menu-item">
                                                <Link
                                                    href="/sales"
                                                    className="nk-menu-link"
                                                    data-original-title=""
                                                    title=""
                                                >
                                                    <span className="nk-menu-text">
                                                        Sales dashboard
                                                    </span>
                                                </Link>
                                            </li>
                                            <li className="nk-menu-item">
                                                <Link
                                                    href="/sales/data"
                                                    className="nk-menu-link"
                                                    data-original-title=""
                                                    title=""
                                                >
                                                    <span className="nk-menu-text">
                                                        Data Sales
                                                    </span>
                                                </Link>
                                            </li>
                                            <li className="nk-menu-item">
                                                <Link
                                                    href="/sales/airtime"
                                                    className="nk-menu-link"
                                                    data-original-title=""
                                                    title=""
                                                >
                                                    <span className="nk-menu-text">
                                                        Airtime Sales
                                                    </span>
                                                </Link>
                                            </li>
                                            <li className="nk-menu-item">
                                                <Link
                                                    href="/sales/cable-tv"
                                                    className="nk-menu-link"
                                                    data-original-title=""
                                                    title=""
                                                >
                                                    <span className="nk-menu-text">
                                                        Cable Tv Sales
                                                    </span>
                                                </Link>
                                            </li>
                                            <li className="nk-menu-item">
                                                <Link
                                                    href="/sales/electricity"
                                                    className="nk-menu-link"
                                                    data-original-title=""
                                                    title=""
                                                >
                                                    <span className="nk-menu-text">
                                                        Electricity Sales
                                                    </span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nk-menu-item has-sub">
                                        <a
                                            href="#"
                                            className="nk-menu-link nk-menu-toggle"
                                            data-original-title=""
                                            title=""
                                        >
                                            <span className="nk-menu-icon">
                                                <em className="mdi mdi-chart-gantt"></em>
                                            </span>
                                            <span className="nk-menu-text">
                                                Activities and Transactions
                                            </span>
                                        </a>
                                        <ul className="nk-menu-sub">
                                            <li className="nk-menu-item">
                                                <Link
                                                    href="/activities/profiles"
                                                    className="nk-menu-link"
                                                    data-original-title=""
                                                    title=""
                                                >
                                                    <span className="nk-menu-text">
                                                        Customer Profiles
                                                    </span>
                                                </Link>
                                            </li>
                                            <li className="nk-menu-item">
                                                <Link
                                                    href="/activities/credit-user"
                                                    className="nk-menu-link"
                                                    data-original-title=""
                                                    title=""
                                                >
                                                    <span className="nk-menu-text">
                                                        Credit a User
                                                    </span>
                                                </Link>
                                            </li>
                                            <li className="nk-menu-item">
                                                <Link
                                                    href="/activities/report"
                                                    className="nk-menu-link"
                                                    data-original-title=""
                                                    title=""
                                                >
                                                    <span className="nk-menu-text">
                                                        User Log report
                                                    </span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    {AUTH_USER.is_super_admin && (
                                        <li className="nk-menu-item has-sub">
                                            <a
                                                href="#"
                                                className="nk-menu-link nk-menu-toggle"
                                                data-original-title=""
                                                title=""
                                            >
                                                <span className="nk-menu-icon">
                                                    <em className="mdi mdi-shield-account"></em>
                                                </span>
                                                <span className="nk-menu-text">
                                                    Admin Management
                                                </span>
                                            </a>
                                            <ul className="nk-menu-sub">
                                                <li className="nk-menu-item">
                                                    <Link
                                                        href="/admin/add"
                                                        className="nk-menu-link"
                                                        data-original-title=""
                                                        title=""
                                                    >
                                                        <span className="nk-menu-text">
                                                            Manage Admin
                                                        </span>
                                                    </Link>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <Link
                                                        href="/admin/report"
                                                        className="nk-menu-link"
                                                        data-original-title=""
                                                        title=""
                                                    >
                                                        <span className="nk-menu-text">
                                                            Admin Transactions
                                                        </span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                    )}
                                    {/* <li className="nk-menu-item">
                                        <Link
                                            href="/providers"
                                            className="nk-menu-link"
                                        >
                                            <span className="nk-menu-icon">
                                                <em className="icon ni ni-cart-fill"></em>
                                            </span>
                                            <span className="nk-menu-text">
                                                Providers
                                            </span>
                                        </Link>
                                    </li> */}
                                </>
                            )}

                            <li className="nk-menu-heading">
                                <h6 className="overline-title text-primary-alt">
                                    User Menu
                                </h6>
                            </li>
                            <li className="nk-menu-item">
                                <Link href={route('dashboard.index')} className="nk-menu-link">
                                    <span className="nk-menu-icon">
                                        <i className="mdi mdi-speedometer"></i>{" "}
                                    </span>
                                    <span className="nk-menu-text">
                                        Dashboard
                                    </span>
                                </Link>
                            </li>
                            <li className="nk-menu-item has-sub">
                                <a
                                    href="#"
                                    className="nk-menu-link nk-menu-toggle"
                                    data-original-title=""
                                    title=""
                                >
                                    <span className="nk-menu-icon">
                                        <em className="mdi mdi-credit-card-outline"></em>
                                    </span>
                                    <span className="nk-menu-text">
                                        Payment
                                    </span>
                                </a>
                                <ul className="nk-menu-sub">
                                    <li className="nk-menu-item">
                                        <Link
                                            href="/payments/deposit"
                                            className="nk-menu-link"
                                            data-original-title=""
                                            title=""
                                        >
                                            <span className="nk-menu-text">
                                                Fund wallet
                                            </span>
                                        </Link>
                                    </li>
                                    {/* <li className="nk-menu-item">
                                        <Link
                                            href="/payments/report"
                                            className="nk-menu-link"
                                            data-original-title=""
                                            title=""
                                        >
                                            <span className="nk-menu-text">
                                                Report payment
                                            </span>
                                        </Link>
                                    </li> */}
                                    <li className="nk-menu-item">
                                        <Link
                                            href="/payments/transfer"
                                            className="nk-menu-link"
                                            data-original-title=""
                                            title=""
                                        >
                                            <span className="nk-menu-text">
                                                Transfer to others
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="nk-menu-item">
                                        <Link
                                            href="/payments/history"
                                            className="nk-menu-link"
                                            data-original-title=""
                                            title=""
                                        >
                                            <span className="nk-menu-text">
                                                Payment history
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nk-menu-item">
                                <Link
                                    href={route('buy.airtime')}
                                    className="nk-menu-link"
                                >
                                    <span className="nk-menu-icon">
                                        <i className="mdi mdi-phone"></i>{" "}
                                    </span>
                                    <span className="nk-menu-text">
                                        Airtime
                                    </span>
                                </Link>
                            </li>
                            <li className="nk-menu-item has-sub">
                                <a
                                    href="#"
                                    className="nk-menu-link nk-menu-toggle"
                                    data-original-title=""
                                    title=""
                                >
                                    <span className="nk-menu-icon">
                                        <em className="mdi mdi-wallet"></em>
                                    </span>
                                    <span className="nk-menu-text">
                                        Pay Bills
                                    </span>
                                </a>
                                <ul className="nk-menu-sub">
                                    <li className="nk-menu-item">
                                        <Link
                                            href={route('buy.data')}
                                            className="nk-menu-link"
                                            data-original-title=""
                                            title=""
                                        >
                                            <span className="nk-menu-text">
                                                Data
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="nk-menu-item">
                                        <Link
                                            href={route('buy.cable-tv')}
                                            className="nk-menu-link"
                                            data-original-title=""
                                            title=""
                                        >
                                            <span className="nk-menu-text">
                                                Cable TV
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="nk-menu-item">
                                        <Link
                                            href={route('buy.electricity')}
                                            className="nk-menu-link"
                                            data-original-title=""
                                            title=""
                                        >
                                            <span className="nk-menu-text">
                                                Electricity bill
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nk-menu-item">
                                <Link
                                    href={"/transactions"}
                                    className="nk-menu-link"
                                >
                                    <span className="nk-menu-icon">
                                        <i className="mdi mdi-history"></i>{" "}
                                    </span>
                                    <span className="nk-menu-text">
                                        Transactions
                                    </span>
                                </Link>
                            </li>
                            <li className="nk-menu-item">
                                <Link
                                    href={"/settings"}
                                    className="nk-menu-link"
                                >
                                    <span className="nk-menu-icon">
                                        <i className="mdi mdi-cogs"></i>{" "}
                                    </span>
                                    <span className="nk-menu-text">
                                        Settings
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
