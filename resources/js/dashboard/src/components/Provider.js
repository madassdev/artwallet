import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Page from "./Page";
import { connect } from "react-redux";
import CreateProvider from "./CreateProvider";
import DeleteProvider from "./DeleteProvider";

function Provider(props) {
    const handleRemove = (e, provider) => {
        e.preventDefault();
        console.log(e);
        console.log(provider);
        props.removeProvider(provider);
    };
    var i = 0;
    return (
        <div>
            <h2 onClick={() => props.openCreateModal()}>Providers</h2>
            <table className="table table-tranx">
                <thead>
                    <tr className="tb-tnx-head">
                        <th className="tb-tnx-id">
                            <span className="">#</span>
                        </th>
                        <th className="tb-tnx-info">
                            <span className="tb-tnx-desc d-none d-sm-inline-block">
                                <span>Title</span>
                            </span>
                            <span className="tb-tnx-date d-md-inline-block d-none">
                                <span className="d-md-none">Date</span>
                                <span className="d-none d-md-block">
                                    <span>Plans</span>
                                </span>
                            </span>
                        </th>
                        <th className="tb-tnx-amount is-alt">
                            {/* <span className="tb-tnx-total">Providers</span> */}
                            <span className="tb-tnx-status d-none d-md-inline-block">
                                Status
                            </span>
                        </th>
                        <th className="tb-tnx-action">
                            <span>&nbsp;</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.providers.map((provider) =>{
                        i++;
                        return (
                        <tr className="tb-tnx-item" key={provider.id}>
                            <td className="tb-tnx-id">
                                <a href="#">
                                    <span>{i}</span>
                                </a>
                            </td>
                            <td className="tb-tnx-info">
                                <div className="tb-tnx-desc">
                                    <span className="title">
                                        {provider.title}
                                    </span>
                                </div>
                                <div className="tb-tnx-date">
                                    <span className="date text-primary">
                                        {provider.plans.length} plans
                                    </span>
                                </div>
                            </td>
                            <td className="tb-tnx-amount is-alt">
                                {/* <div className="tb-tnx-total">
                                    <span className="provider-providers amount text-primary cursor-pointer">
                                    </span>
                                </div> */}
                                <div className="tb-tnx-status">
                                    <span className="badge badge-dot badge-success">
                                        Active
                                    </span>
                                </div>
                            </td>
                            <td className="tb-tnx-action">
                                <div className="dropdown">
                                    <a
                                        className="text-soft dropdown-toggle btn btn-icon btn-trigger"
                                        data-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <em className="icon ni ni-more-h"></em>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right dropdown-menu-xs">
                                        <ul className="link-list-plain">
                                            <li>
                                                <a href="#">View</a>
                                            </li>
                                            <li>
                                                <a href="#">Edit</a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    onClick={(e) =>
                                                        handleRemove(
                                                            e,
                                                            provider
                                                        )
                                                    }
                                                >
                                                    Remove
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    )})}
                </tbody>
            </table>
        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        providers: state.providerState.providers,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        openCreateModal: () => {
            dispatch({
                type: "OPEN_MODAL",
                modal: {
                    show: 1,
                    content: <CreateProvider />,
                    header: <h3>Create Provider</h3>,
                },
            });
        },

        removeProvider: (provider) => {
            dispatch({
                type: "OPEN_MODAL",
                modal: {
                    show: 1,
                    content: <DeleteProvider provider={provider} />,
                    header: <h3>Delete Provider</h3>,
                },
            });
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Provider);
