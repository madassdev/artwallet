import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

function CreditUser() {
    const [userTerm, setUserTerm] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [user, setUser] = useState(null);
    const [userBalance, setUserBalance] = useState("");
    const [isUpdating, setIsUpdating] = useState(false)
    const searchUser = (e) => {
        e.preventDefault();
        if (userTerm === "") {
            alert("Please enter a search term");
            return;
        }
        setIsSearching(true);
        setUser(null);
        axios
            .post("/admin/users/find", { term: userTerm })
            .then((res) => {
                console.log(res.data);
                setUser(res.data.data.user);
                setUserBalance(res.data.data.user.balance)
                setIsSearching(false);
                toast.success("User found", {
                    position: "bottom-right",
                });
            })
            .catch((err) => {
                setIsSearching(false);
                toast.error(err.response.data.message, {
                    position: "top-center",
                    style: {
                        background: "rgba(185, 16, 16,1)",
                        color: "#fff",
                        padding: "20px",
                    },
                });
            });
    };

    const updateUserBalance = (e) => {
        e.preventDefault();
        setIsUpdating(true)
        axios
            .put("/admin/users/"+user.uniqid, { balance: userBalance })
            .then((res) => {
                console.log(res.data);
                setUser(res.data.data.user);
                setUserBalance(res.data.data.user.balance)
                setIsUpdating(false);
                toast.success("User balance successfully updated", {
                    position: "bottom-right",
                });
                window.location.reload();
            })
            .catch((err) => {
                setIsSearching(false);
                toast.error(err.response.data.message, {
                    position: "top-center",
                    style: {
                        background: "rgba(185, 16, 16,1)",
                        color: "#fff",
                        padding: "20px",
                    },
                });
            });
    }
    return (
        <div className="md:w-3/4 mx-auto p-3 md:p-5 bg-white">
            <h2 className="text-primary text-center font-bold text-lg">
                Credit User
            </h2>

            <div className="w-full md:w-1/2 mx-auto flex flex-col space-y-4">
                {user ? (
                    <form onSubmit={updateUserBalance}>
                        <div className="flex flex-col space-y-4 my-4">
                            <h2 className="text-center font-bold mb-0">
                                User Summary
                            </h2>

                            <div>
                                <h2 className="font-bold m-0">User ID</h2>
                                <p className="text-primary font-bold">
                                    {user.uniqid}
                                </p>
                            </div>

                            <div>
                                <h2 className="font-bold m-0">Name</h2>
                                <p className="text-gray-600">
                                    {user.full_name}
                                </p>
                                <p className="text-gray-400 text-xs capitalize font-bold">
                                    {user.role}
                                </p>
                            </div>

                            <div>
                                <h2 className="font-bold m-0">Email</h2>
                                <p className="text-gray-600">{user.email}</p>
                            </div>

                            <div>
                                <h2 className="font-bold m-0">Phone Number</h2>
                                <p className="text-gray-600">{user.mobile}</p>
                            </div>

                            <div>
                                <h2 className="font-bold m-0">Joined at</h2>
                                <p className="text-xs">{user.date}</p>
                            </div>

                            <div>
                                <h2 className="font-bold m-0">Balance</h2>
                                <p className="text-primary font-bold">
                                    {naira(user.balance)}
                                </p>
                            </div>

                            <div className="form-group flex flex-col space-y-1">
                                <p className="font-bold">Update Balance</p>
                                <div className="form-control-wrap">
                                    <input
                                        type="number"
                                        className="w-full rounded border-gray-300"
                                        value={userBalance}
                                        onChange={(e) =>
                                            setUserBalance(e.target.value)
                                        }
                                        placeholder="Enter search term"
                                        required
                                    />
                                    {isUpdating ? (
                                        <button
                                            className="btn btn-light btn-block my-2"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setIsUpdating(false);
                                            }}
                                        >
                                            <div
                                                className="spinner-border-sm spinner-border text-primary"
                                                role="status"
                                            ></div>
                                        </button>
                                    ) : (
                                        <button className="btn btn-primary btn-block my-2">
                                            Update
                                        </button>
                                    )}
                                </div>

                                <p
                                    onClick={() => setUser(null)}
                                    className="text-center mt-2 cursor-pointer text-gray-400 hover:text-purple-700 text-xs"
                                >
                                    {"<<"} Go back
                                </p>
                            </div>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={searchUser}>
                        <div className="form-group flex flex-col space-y-1">
                            <p className="font-bold">
                                Search User ID, Email or Mobile
                            </p>
                            <div className="form-control-wrap flex space-x-4 space-between">
                                <input
                                    type="text"
                                    className="w-full rounded border-gray-300"
                                    value={userTerm}
                                    onChange={(e) =>
                                        setUserTerm(e.target.value)
                                    }
                                    placeholder="Enter search term"
                                    required
                                />
                                {isSearching ? (
                                    <button
                                        className="btn btn-light"
                                        onClick={() => {
                                            setIsSearching(false);
                                        }}
                                        type="button"
                                    >
                                        <div
                                            className="spinner-border-sm spinner-border text-primary"
                                            role="status"
                                        ></div>
                                    </button>
                                ) : (
                                    <button className="btn btn-primary">
                                        Search
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default CreditUser;
