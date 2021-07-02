import { Link } from "react-router-dom";
import { nav_items } from "../data/NavItems";


function Sidebar() {
    console.log(AUTH_USER)
    return (
        <div
            className="nk-sidebar nk-sidebar-fixed is-light "
            data-content="sidebarMenu"
        >
            <div className="nk-sidebar-element nk-sidebar-head">
                <div className="nk-sidebar-brand">
                    <Link
                        to='/'
                        className="logo-link nk-sidebar-logo"
                    >
                        <img
                            className="logo-light logo-img"
                            src="./images/logo.png"
                            srcSet="./images/logo2x.png 2x"
                            alt="logo"
                        />
                        <img
                            className="logo-dark logo-img"
                            src="./images/logo-dark.png"
                            srcSet="./images/logo-dark2x.png 2x"
                            alt="logo-dark"
                        />
                        <img
                            className="logo-small logo-img logo-img-small"
                            src="./images/logo-small.png"
                            srcSet="./images/logo-small2x.png 2x"
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
                            {/* <li className="nk-menu-item">
                                <a
                                    href="html/ecommerce/index.html"
                                    className="nk-menu-link"
                                >
                                    <span className="nk-menu-icon">
                                        <em className="icon ni ni-bag"></em>
                                    </span>
                                    <span className="nk-menu-text">
                                        E-Commerce Panel
                                    </span>
                                    <span className="nk-menu-badge">HOT</span>
                                </a>
                            </li> */}
                            <li className="nk-menu-heading">
                                <h6 className="overline-title text-primary-alt">
                                    Dashboards
                                </h6>
                            </li>
                            {
                                nav_items.map(item=>(

                            <li className="nk-menu-item" key={item.id}>
                                <Link to={item.link} activeClassName="active current-link"
                                    href="html/index.html"
                                    className="nk-menu-link"
                                >
                                    <span className="nk-menu-icon">
                                        <em className={item.icon}></em>
                                    </span>
                                    <span className="nk-menu-text">
                                        {item.title}
                                    </span>
                                </Link>
                            </li>
                                ))
                            }
                           </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
