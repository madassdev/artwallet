import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import FindUser from "./FindUser";

function CreditUser() {
    const [user, setUser] = useState(null);
    const [userBalance, setUserBalance] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const setFoundUser = (user) => {
        setUser(user);
        setUserBalance(user.balance);
    };

    const updateUserBalance = (e) => {
        e.preventDefault();
        setIsUpdating(true);
        axios
            .put("/admin/users/" + user.uniqid + "/updateBalance", {
                balance: userBalance,
            })
            .then((res) => {
                console.log(res.data);
                setUser(res.data.data.user);
                setUserBalance(res.data.data.user.balance);
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
    };
    return (
        <div className="md:w-3/4 mx-auto p-3 md:p-5 bg-white">
            <h2 className="text-primary text-center font-bold text-lg">
                Credit User
            </h2>
            <div className="w-full md:w-1/2 mx-auto">
                <FindUser setFoundUser={(user) => setFoundUser(user)}>
                    <form onSubmit={updateUserBalance}>
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
                        </div>
                    </form>
                </FindUser>
            </div>
        </div>
    );
}

export default CreditUser;
