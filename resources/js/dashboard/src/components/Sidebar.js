import { NavLink } from "react-router-dom";
import { nav_items } from "../data/NavItems";

function Sidebar() {
    return (
        <div
            className="nk-sidebar nk-sidebar-fixed is-light "
            data-content="sidebarMenu"
        >
            <div className="nk-sidebar-element nk-sidebar-head">
                <div className="nk-sidebar-brand">
                    <NavLink to="/" className="logo-link nk-sidebar-logo">
                        <img
                            className="logo-light logo-img"
                            src={`${ASSET_PATH}images/logo.png`}
                            srcSet="images/logo2x.png 2x"
                            alt="logo"
                        />
                        <img
                            className="logo-dark logo-img"
                            src={`${ASSET_PATH}images/logo-dark.png`}
                            srcSet="images/logo-dark2x.png 2x"
                            alt="logo-dark"
                        />
                        <img
                            className="logo-small logo-img logo-img-small"
                            src={`${ASSET_PATH}images/logo-small.png`}
                            srcSet="images/logo-small2x.png 2x"
                            alt="logo-small"
                        />
                    </NavLink>
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
                                        <NavLink
                                            to="/customers"
                                            className="nk-menu-link"
                                        >
                                            <span className="nk-menu-icon">
                                                <em className="mdi mdi-account-group"></em>
                                            </span>
                                            <span className="nk-menu-text">
                                                Customer Management
                                            </span>
                                        </NavLink>
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
                                                <NavLink
                                                    to="/products/data"
                                                    className="nk-menu-link"
                                                    data-original-title=""
                                                    title=""
                                                >
                                                    <span className="nk-menu-text">
                                                        Data Plans
                                                    </span>
                                                </NavLink>
                                            </li>
                                            <li className="nk-menu-item">
                                                <NavLink
                                                    to="/products/airtime"
                                                    className="nk-menu-link"
                                                    data-original-title=""
                                                    title=""
                                                >
                                                    <span className="nk-menu-text">
                                                        Airtime
                                                    </span>
                                                </NavLink>
                                            </li>
                                            <li className="nk-menu-item">
                                                <NavLink
                                                    to="/products/cable-tv"
                                                    className="nk-menu-link"
                                                    data-original-title=""
                                                    title=""
                                                >
                                                    <span className="nk-menu-text">
                                                        Cable Tv Plans
                                                    </span>
                                                </NavLink>
                                            </li>
                                            <li className="nk-menu-item">
                                                <NavLink
                                                    to="/products/electricity"
                                                    className="nk-menu-link"
                                                    data-original-title=""
                                                    title=""
                                                >
                                                    <span className="nk-menu-text">
                                                        Electricity Plans
                                                    </span>
                                                </NavLink>
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
                                                <NavLink
                                                    to="/sales/data"
                                                    className="nk-menu-link"
                                                    data-original-title=""
                                                    title=""
                                                >
                                                    <span className="nk-menu-text">
                                                        Data Sales
                                                    </span>
                                                </NavLink>
                                            </li>
                                            <li className="nk-menu-item">
                                                <NavLink
                                                    to="/sales/airtime"
                                                    className="nk-menu-link"
                                                    data-original-title=""
                                                    title=""
                                                >
                                                    <span className="nk-menu-text">
                                                        Airtime Sales
                                                    </span>
                                                </NavLink>
                                            </li>
                                            <li className="nk-menu-item">
                                                <NavLink
                                                    to="/sales/cable-tv"
                                                    className="nk-menu-link"
                                                    data-original-title=""
                                                    title=""
                                                >
                                                    <span className="nk-menu-text">
                                                        Cable Tv Sales
                                                    </span>
                                                </NavLink>
                                            </li>
                                            <li className="nk-menu-item">
                                                <NavLink
                                                    to="/sales/electricity"
                                                    className="nk-menu-link"
                                                    data-original-title=""
                                                    title=""
                                                >
                                                    <span className="nk-menu-text">
                                                        ELectricity Sales
                                                    </span>
                                                </NavLink>
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
                                                <NavLink
                                                    to="/activities/profiles"
                                                    className="nk-menu-link"
                                                    data-original-title=""
                                                    title=""
                                                >
                                                    <span className="nk-menu-text">
                                                        Customer Profiles
                                                    </span>
                                                </NavLink>
                                            </li>
                                            <li className="nk-menu-item">
                                                <NavLink
                                                    to="/activities/credit-user"
                                                    className="nk-menu-link"
                                                    data-original-title=""
                                                    title=""
                                                >
                                                    <span className="nk-menu-text">
                                                        Credit a User
                                                    </span>
                                                </NavLink>
                                            </li>
                                            <li className="nk-menu-item">
                                                <NavLink
                                                    to="/activities/report"
                                                    className="nk-menu-link"
                                                    data-original-title=""
                                                    title=""
                                                >
                                                    <span className="nk-menu-text">
                                                        User Log report
                                                    </span>
                                                </NavLink>
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
                                                    <NavLink
                                                        to="/admin/add"
                                                        className="nk-menu-link"
                                                        data-original-title=""
                                                        title=""
                                                    >
                                                        <span className="nk-menu-text">
                                                            Manage Admin
                                                        </span>
                                                    </NavLink>
                                                </li>
                                                <li className="nk-menu-item">
                                                    <NavLink
                                                        to="/admin/report"
                                                        className="nk-menu-link"
                                                        data-original-title=""
                                                        title=""
                                                    >
                                                        <span className="nk-menu-text">
                                                            Admin Transactions
                                                        </span>
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </li>
                                    )}
                                    <li className="nk-menu-item">
                                        <NavLink
                                            to="/providers"
                                            className="nk-menu-link"
                                        >
                                            <span className="nk-menu-icon">
                                                <em className="icon ni ni-cart-fill"></em>
                                            </span>
                                            <span className="nk-menu-text">
                                                Providers
                                            </span>
                                        </NavLink>
                                    </li>
                                </>
                            )}

                            <li className="nk-menu-heading">
                                <h6 className="overline-title text-primary-alt">
                                    User Menu
                                </h6>
                            </li>
                            <li className="nk-menu-item">
                                <NavLink
                                    to={"/"}
                                    activeClassName="nav-active"
                                    className="nk-menu-link"
                                >
                                    <span className="nk-menu-icon">
                                        <i className="mdi mdi-speedometer"></i>{" "}
                                    </span>
                                    <span className="nk-menu-text">
                                        Dashboard
                                    </span>
                                </NavLink>
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
                                        <NavLink
                                            to="/payments/deposit"
                                            className="nk-menu-link"
                                            data-original-title=""
                                            title=""
                                        >
                                            <span className="nk-menu-text">
                                                Fund wallet
                                            </span>
                                        </NavLink>
                                    </li>
                                    <li className="nk-menu-item">
                                        <NavLink
                                            to="/payments/report"
                                            className="nk-menu-link"
                                            data-original-title=""
                                            title=""
                                        >
                                            <span className="nk-menu-text">
                                                Report payment
                                            </span>
                                        </NavLink>
                                    </li>
                                    <li className="nk-menu-item">
                                        <NavLink
                                            to="/payments/transfer"
                                            className="nk-menu-link"
                                            data-original-title=""
                                            title=""
                                        >
                                            <span className="nk-menu-text">
                                                Transfer to others
                                            </span>
                                        </NavLink>
                                    </li>
                                    <li className="nk-menu-item">
                                        <NavLink
                                            to="/payments/history"
                                            className="nk-menu-link"
                                            data-original-title=""
                                            title=""
                                        >
                                            <span className="nk-menu-text">
                                                Payment history
                                            </span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            <li className="nk-menu-item">
                                <NavLink
                                    to={"/buy/airtime"}
                                    activeClassName="nav-active"
                                    className="nk-menu-link"
                                >
                                    <span className="nk-menu-icon">
                                        <i className="mdi mdi-phone"></i>{" "}
                                    </span>
                                    <span className="nk-menu-text">
                                        Airtime
                                    </span>
                                </NavLink>
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
                                        <NavLink
                                            to="/buy/data"
                                            className="nk-menu-link"
                                            data-original-title=""
                                            title=""
                                        >
                                            <span className="nk-menu-text">
                                                Data
                                            </span>
                                        </NavLink>
                                    </li>
                                    {/* <li className="nk-menu-item">
                                        <NavLink
                                            to="/buy/cable-tv"
                                            className="nk-menu-link"
                                            data-original-title=""
                                            title=""
                                        >
                                            <span className="nk-menu-text">
                                                Cable TV
                                            </span>
                                        </NavLink>
                                    </li> */}
                                    <li className="nk-menu-item">
                                        <NavLink
                                            to="/buy/electricity"
                                            className="nk-menu-link"
                                            data-original-title=""
                                            title=""
                                        >
                                            <span className="nk-menu-text">
                                                Electricity bill
                                            </span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li className="nk-menu-item">
                                <NavLink
                                    to={"/transactions"}
                                    activeClassName="nav-active"
                                    className="nk-menu-link"
                                >
                                    <span className="nk-menu-icon">
                                        <i className="mdi mdi-history"></i>{" "}
                                    </span>
                                    <span className="nk-menu-text">
                                        Transactions
                                    </span>
                                </NavLink>
                            </li>
                            <li className="nk-menu-item">
                                <NavLink
                                    to={"/settings"}
                                    activeClassName="nav-active"
                                    className="nk-menu-link"
                                >
                                    <span className="nk-menu-icon">
                                        <i className="mdi mdi-cogs"></i>{" "}
                                    </span>
                                    <span className="nk-menu-text">
                                        Settings
                                    </span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
