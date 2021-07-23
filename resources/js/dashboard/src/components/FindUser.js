import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
function FindUser(props) {
    const [userTerm, setUserTerm] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [user, setUser] = useState(props.user);
    const [userBalance, setUserBalance] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
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
                setUser(res.data.data.user);
                props.setFoundUser(res.data.data.user);
                setIsSearching(false);
                toast.success("User found", {
                    position: "bottom-center",
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
    return (
        <div className="w-full flex flex-col space-y-4">
            {user ? (
                <div className="flex flex-col space-y-4 my-4">
                    <h2 className="text-center font-bold mb-0">User Summary</h2>

                    <div>
                        <h2 className="font-bold m-0">User ID</h2>
                        <p className="text-primary font-bold">{user.uniqid}</p>
                    </div>

                    <div>
                        <h2 className="font-bold m-0">Name</h2>
                        <p className="text-gray-600">{user.full_name}</p>
                        <p className="text-gray-400 text-xs font-bold">
                            {user?.role?.map((role, i) => (
                                <span key={i} className="mr-2 capitalize badge-xs badge bg-red-300">{deslug(role)}</span>
                            ))}
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

                    {props.children}
                    <p
                        onClick={() => setUser(null)}
                        className="text-center mt-2 cursor-pointer text-gray-400 hover:text-purple-700 text-xs"
                    >
                        {"<<"} Go back
                    </p>
                </div>
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
                                onChange={(e) => setUserTerm(e.target.value)}
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
    );
}

export default FindUser;
