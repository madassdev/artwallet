import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { Pagination } from "react-laravel-paginex";

function AdminReport() {
    const [isLoading, setIsLoading] = useState(true);
    const [activities, setActivities] = useState([]);
    const fetchActivities = (page = 1) => {
        setIsLoading(true);
        axios
            .get("/admin/admin-activities?page=" + page)
            .then((response) => {
                setActivities(response.data.data.activities);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error.response);
            });
    };
    useEffect(() => {
        fetchActivities();
    }, []);
    const getData = (data) => {
        // console.log(data)
        fetchActivities(data.page);
    };

    return (
        <div>
            {isLoading ? (
                <Spinner text="Loading..." />
            ) : (
                <div className="flex flex-col space-y-2 w-full md:w-2/3">
                    <table className="table table-orders bg-white">
                        <thead className="tb-odr-head">
                            <tr className="tb-odr-item">
                                <th className="tb-odr-info">
                                    <span className="tb-odr-id">TYPE</span>
                                    <span className="tb-odr-date d-none d-md-inline-block">
                                        Date
                                    </span>
                                </th>
                                <th className="tb-odr-amount">
                                    <span className="tb-odr-total">ACCOUNT</span>
                                    <span className="tb-odr-status d-none d-md-inline-block">
                                        Status
                                    </span>
                                </th>
                                {/* <th className="tb-odr-action">&nbsp;</th> */}
                            </tr>
                        </thead>
                        <tbody className="tb-odr-body">
                            {activities?.data?.map((a) => (
                                <tr className="tb-odr-item" key={a.id}>
                                    <td className="tb-odr-amount">
                                        <span className="tb-odr-id font-bold text-purple-500 uppercase">
                                            <a href="#" className="font-bold">
                                                {a.type}
                                            </a>
                                        </span>
                                        <span className="tb-odr-date">
                                            {a.date}
                                        </span>
                                    </td>
                                    <td className="tb-odr-amount">
                                        <span className="tb-odr-total">
                                            <span className="amount font-bold text-gray-600 capitalize">
                                                {a.user.full_name}
                                            </span>
                                            <br />
                                            <p className="text-gray-400 text-xs">
                                                {a.user.email}
                                            </p>
                                        </span>
                                        <span className="tb-odr-status">
                                            <span
                                                className={`badge badge-dot capitalize ${
                                                    a.status === "success"
                                                        ? "badge-success"
                                                        : a.status === "failed"
                                                        ? "badge-danger"
                                                        : "badge-warning"
                                                }`}
                                            >
                                                {a.status}
                                            </span>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="my-8 flex items-center justify-center w-full">
                        <Pagination
                            buttonIcons={true}
                            numberClass="bg-light rounded p-2 mx-1"
                            activeClass="active text-primary font-bold"
                            prevButtonIcon="mdi mdi-chevron-left"
                            nextButtonIcon="mdi mdi-chevron-right"
                            containerClass="flex items-center space-x-2"
                            changePage={getData}
                            data={activities}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminReport;
