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
                                    <li className="nk-menu-item">
                                        <NavLink
                                            to="/services"
                                            className="nk-menu-link"
                                        >
                                            <span className="nk-menu-icon">
                                                <em className="icon ni ni-cart-fill"></em>
                                            </span>
                                            <span className="nk-menu-text">
                                                Services
                                            </span>
                                        </NavLink>
                                    </li>
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
                            {/* <li className="nk-menu-heading">
                                <h6 className="overline-title text-primary-alt">
                                    Dashboards
                                </h6>
                            </li> */}
                            
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
                            <li className="nk-menu-item">
                                <NavLink
                                    to={"/deposit"}
                                    activeClassName="nav-active"
                                    className="nk-menu-link"
                                >
                                    <span className="nk-menu-icon">
                                        <i className="mdi mdi-wallet"></i>{" "}
                                    </span>
                                    <span className="nk-menu-text">
                                        Deposit
                                    </span>
                                </NavLink>
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
                                        Buy Airtime
                                    </span>
                                </NavLink>
                            </li>
                            <li className="nk-menu-item">
                                <NavLink
                                    to={"/buy/data"}
                                    activeClassName="nav-active"
                                    className="nk-menu-link"
                                >
                                    <span className="nk-menu-icon">
                                        <i className="mdi mdi-wifi"></i>{" "}
                                    </span>
                                    <span className="nk-menu-text">
                                        Buy Data
                                    </span>
                                </NavLink>
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
