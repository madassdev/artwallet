import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Sales from "./Sales";
import CableTvManagement from "./CableTvManagement";
import AirtimeManagement from "./AirtimeManagement";
import {
    Link,
    useRouteMatch,
    Switch,
    Route,
    useParams,
} from "react-router-dom";
import DataSales from "./DataSales";
import AirtimeSales from "./AirtimeSales";
import CableSales from "./CableSales";
import ElectricitySales from "./ElectricitySales";
import Spinner from "./Spinner";
import axios from "axios";
import toast from "react-hot-toast";

function SalesDashboard(props) {
    let { path, url } = useRouteMatch();
    const [isLoading, setIsLoading] = useState(true);
    const [analytics, setAnalytics] = useState(null);
    useEffect(() => {
        axios
            .get("/admin/sales/analytics")
            .then((response) => {
                setIsLoading(false);
                setAnalytics(response.data.data);
            })
            .catch((error) => {
                toast.error("Not found");
            });
    }, []);
    return (
        <Switch>
            <Route exact path={path}>
                <div>
                    {isLoading ? (
                        <Spinner text="Loading Sales data" />
                    ) : (
                        <div className="my-4 cards flex flex-wrap">
                            <div className="bg-purple-700 shadow-md rounded p-3 w-full md:w-60 m-3 cursor-pointer">
                                <h2 className="text-lg text-white m-0 p-0">
                                    ClubKonnect Balance
                                </h2>
                                <p className="text-2xl text-white font-bold m-0 p-0">
                                    {naira(analytics?.clubkonnect_balance)}
                                </p>
                            </div>
                            <Link to="/sales/airtime">
                                <div className="bg-white shadow-md rounded p-3 w-full md:w-60 m-3 cursor-pointer">
                                    <h2 className="text-lg text-gray-600 m-0 p-0">
                                        Airtime Sales ({analytics?.airtime.success})
                                    </h2>
                                    <p className="text-2xl text-primary font-bold m-0 p-0">
                                        {naira(analytics?.airtime.success_sum)}
                                    </p>
                                    <p className="text-xs text-right text-gray-400 font-bold">Failed ({analytics?.airtime.failed}): {naira(analytics?.airtime.failed_sum)}</p>
                                </div>
                            </Link>
                            <Link to="/sales/data">
                                <div className="bg-white shadow-md rounded p-3 w-full md:w-60 m-3 cursor-pointer">
                                    <h2 className="text-lg text-gray-600 m-0 p-0">
                                        Data Sales ({analytics?.data.success})
                                    </h2>
                                    <p className="text-2xl text-primary font-bold m-0 p-0">
                                        {naira(analytics?.data.success_sum)}
                                    </p>
                                    <p className="text-xs text-right text-gray-400 font-bold">Failed ({analytics?.data.failed}): {naira(analytics?.data.failed_sum)}</p>
                                </div>
                            </Link>
                            <Link to="/sales/cable-tv">
                                <div className="bg-white shadow-md rounded p-3 w-full md:w-60 m-3 cursor-pointer">
                                    <h2 className="text-lg text-gray-600 m-0 p-0">
                                        Cable Tv Sales ({analytics?.cable_tv.success})
                                    </h2>
                                    <p className="text-2xl text-primary font-bold m-0 p-0">
                                        {naira(analytics?.cable_tv.success_sum)}
                                    </p>
                                    <p className="text-xs text-right text-gray-400 font-bold">Failed ({analytics?.cable_tv.failed}): {naira(analytics?.cable_tv.failed_sum)}</p>
                                </div>
                            </Link>
                            <Link to="/sales/electricity">
                                <div className="bg-white shadow-md rounded p-3 w-full md:w-60 m-3 cursor-pointer">
                                    <h2 className="text-lg text-gray-600 m-0 p-0">
                                        Electricity Sales ({analytics?.electricity.success})
                                    </h2>
                                    <p className="text-2xl text-primary font-bold m-0 p-0">
                                        {naira(
                                            analytics?.electricity.success_sum
                                        )}
                                    </p>
                                    <p className="text-xs text-right text-gray-400 font-bold">Failed ({analytics?.electricity.failed}): {naira(analytics?.electricity.failed_sum)}</p>
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
            </Route>
            <Route path={`${path}/data`}>
                <DataSales />
            </Route>
            <Route path={`${path}/airtime`}>
                <AirtimeSales />
            </Route>
            <Route path={`${path}/cable-tv`}>
                <CableSales />
            </Route>
            <Route path={`${path}/electricity`}>
                <ElectricitySales />
            </Route>
        </Switch>
    );
}

const mapState = (state) => {
    return {};
};

const mapDispatch = (dispatch) => {
    return {};
};

export default connect(mapState, mapDispatch)(SalesDashboard);
