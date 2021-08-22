import { Link } from "@inertiajs/inertia-react";

function Header() {
    return (
        <div className="nk-header nk-header-fixed is-light">
            <div className="container-fluid">
                <div className="nk-header-wrap">
                    <div className="nk-menu-trigger d-xl-none ml-n1">
                        <a
                            href="#"
                            className="nk-nav-toggle nk-quick-nav-icon"
                            data-target="sidebarMenu"
                        >
                            <em className="icon ni ni-menu"></em>
                        </a>
                    </div>
                    <div className="nk-header-brand d-xl-none">
                        <a href="#" className="logo-link">
                            <img
                                className="logo-light logo-img"
                                src={`${ASSET_PATH}images/artwallet.png`}
                                srcSet={`${ASSET_PATH}images/artwallet.png 2x`}
                                alt="logo"
                            />
                            <img
                                className="logo-dark logo-img"
                                src={`${ASSET_PATH}images/artwallet.png`}
                                srcSet={`${ASSET_PATH}images/artwallet.png 2x`}
                                alt="logo-dark"
                            />
                        </a>
                    </div>
                    {/* <div className="nk-header-search ml-3 ml-xl-0">
                        <em className="icon ni ni-search"></em>
                        <input
                            type="text"
                            className="form-control border-transparent form-focus-none"
                            placeholder="Search anything"
                        />
                    </div> */}
                    <div className="nk-header-tools">
                        <ul className="nk-quick-nav">
                            {/* <li className="dropdown chats-dropdown hide-mb-xs">
                                <a
                                    href="#"
                                    className="dropdown-toggle nk-quick-nav-icon"
                                    data-toggle="dropdown"
                                >
                                    <div className="icon-status icon-status-na">
                                        <em className="icon ni ni-comments"></em>
                                    </div>
                                </a>
                            </li> */}
                            <li className="dropdown user-dropdown">
                                <a
                                    href="#"
                                    className="dropdown-toggle mr-n1"
                                    data-toggle="dropdown"
                                >
                                    <div className="user-toggle">
                                        <div className="user-avatar sm">
                                            <em className="icon ni ni-user-alt"></em>
                                        </div>
                                        <div className="user-info d-none d-xl-block capitalize">
                                            <div className="user-status user-status-unverified font-bold">
                                                ID: {AUTH_USER.uniqid}
                                            </div>
                                            <div className="user-name dropdown-indicator">{`${AUTH_USER.name} ${AUTH_USER.last_name}`}</div>
                                        </div>
                                    </div>
                                </a>
                                <div className="dropdown-menu dropdown-menu-md dropdown-menu-right">
                                    <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                                        <div className="user-card">
                                            <div className="user-avatar">
                                                <span>AB</span>
                                            </div>
                                            <div className="user-info">
                                                <span className="lead-text capitalize">
                                                    {AUTH_USER.name}
                                                </span>
                                                <span className="sub-text">
                                                    {AUTH_USER.email}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dropdown-inner">
                                        <ul className="link-list">
                                            <li>
                                                <Link href="/settings">
                                                    <em className="icon ni ni-user-alt"></em>
                                                    <span>View Profile</span>
                                                </Link>
                                            </li>
                                            {/* <li><a href="html/user-profile-setting.html"><em className="icon ni ni-setting-alt"></em><span>Account Setting</span></a></li>
                                        <li><a href="html/user-profile-activity.html"><em className="icon ni ni-activity-alt"></em><span>Login Activity</span></a></li>
                                        <li><a className="dark-switch" href="#"><em className="icon ni ni-moon"></em><span>Dark Mode</span></a></li> */}
                                        </ul>
                                    </div>
                                    <div className="dropdown-inner">
                                        <ul className="link-list">
                                            <li>
                                                <a href={APP_URL + "/logout"}>
                                                    <em className="icon ni ni-signout"></em>
                                                    <span>Sign out</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
