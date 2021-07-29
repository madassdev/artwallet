import Header from "@/dashboard/src/components/Header";
import Sidebar from "@/dashboard/src/components/Sidebar";
import React from "react";
function Admin(props) {
    return (
        <div className="nk-main">
            <Sidebar />
            {/* <Header/> */}
            <div className="nk-wrap">
                <Header />
                <div className="nk-content">
                    <div className="container-fluid">
                        <div className="nk-content-inner">
                            <div className="nk-content-body">
                                <div className="nk-block-head nk-block-head-sm">
                                    <div className="nk-block-between"></div>
                                       {props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
