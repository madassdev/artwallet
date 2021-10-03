import Spinner from "@/Pages/Components/Spinner";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { naira } from "../data/functions";

function OrderCard({ order, orderOpened }) {
    function handleOrderOpened() {
        orderOpened(order);
    }
    return (
        <div className="flex bg-white shadow p-3 rounded my-2 items-start justify-between">
            <div>
                <p className="text-primary font-bold">{order.recipient}</p>
                <p className="text-gray-600 text-xs font-bold mb-4">
                    {order.plan.title}
                </p>
                <p className="text-xs text-gray-400 ">{order.date}</p>
            </div>
            {/* <p>{order.created_at}</p> */}
            <div className="capitalize text-right">
                <p
                    className={`font-bold ${
                        order.status === "complete" ||
                        order.status === "success"
                            ? "text-success"
                            : order.status === "failed"
                            ? "text-danger"
                            : "text-warning"
                    }`}
                >
                    {naira(order.amount)}
                </p>
                <span
                    className={`badge badge-dot capitalize text-xs mb-4 ${
                        order.status === "complete" ||
                        order.status === "success"
                            ? "badge-success"
                            : order.status === "failed"
                            ? "badge-danger"
                            : "badge-warning"
                    }`}
                >
                    {order.status}
                </span>
                <p className="" onClick={handleOrderOpened}>
                    <button className="btn btn-primary btn-xs">View</button>
                </p>
            </div>
        </div>
    );
}

function OpenOrder({ order, orderClosed }) {
    function handleBackClicked() {
        orderClosed();
    }
    const [pins, setPins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        axios.get("/orders/recharge-print/" + order.id).then(({ data }) => {
            if (data.success) {
                setPins(data.data.pins);
            }
            console.log(data);
            setIsLoading(false);
        }).catch(err=>{
            toast.error(err.response.data.message,{
                position: "bottom-center"
            })
            setIsLoading(false)
        });
    }, []);
    return (
        <div>
            {isLoading ? (
                <Spinner text="Loading..." />
            ) : (
                <div>
                    <p>{order.plan.title}</p>
                    {pins.length ? (
                        <>
                            {pins.map((pin) => (
                                <p className="font-bold my-2" key={pin.pin}>
                                    {pin.pin}
                                </p>
                            ))}
                        </>
                    ) : (
                        <>
                            <p className="text-center my-8 text-2xl text-gray-400 font-bold">
                                No Recharge Prints Found for this transaction.
                            </p>
                        </>
                    )}
                    <p
                        className="text text-gray-400 text-center font-bold cursor-pointer"
                        onClick={handleBackClicked}
                    >
                        {"<<"} Go back
                    </p>
                </div>
            )}
        </div>
    );
}

function RechargeHistory() {
    const [openOrder, setOpenOrder] = useState(null);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        axios.get("/orders/recharge-print").then(({ data }) => {
            setOrders(data.data.orders);
            console.log(data);
            setIsLoading(false);
        });
    }, []);

    function orderClosed() {
        setOpenOrder(null);
    }

    function orderOpened(order) {
        setOpenOrder(order);
    }
    return (
        <div className="bg-white p-3 md:p-5">
            {isLoading ? (
                <>
                    <Spinner text="Loading..." />
                </>
            ) : (
                <div className="w-full md:w-2/3 mx-auto">
                    {openOrder ? (
                        <>
                            <OpenOrder
                                order={openOrder}
                                orderClosed={orderClosed}
                            />
                        </>
                    ) : (
                        <>
                            {orders.length ? (
                                <>
                                    {orders.map((order) => (
                                        <OrderCard
                                            key={order.id}
                                            order={order}
                                            orderOpened={orderOpened}
                                        />
                                    ))}
                                </>
                            ) : (
                                <>
                                    <p className="text-center text-2xl text-gray-400 font-bold">
                                        No Recharge Print Purchase yet
                                    </p>
                                    <p className="text-center mt-4">
                                        <Link
                                            to="/buy/recharge-print"
                                            className="btn btn-primary"
                                        >
                                            Buy Now
                                        </Link>
                                    </p>
                                </>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default RechargeHistory;
