import React from 'react'
import Header from './Partials/Header'
import Sidebar from './Partials/Sidebar'

function AppLayout(props) {
    return (
        <div className="nk-main">
            <Sidebar />
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
    )
}

export default AppLayout
