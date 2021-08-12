import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FindUser from "./FindUser";
import SpinButton from "./SpinButton";
import Spinner from "./Spinner";

function AddAdmin() {
    const [isLoading, setIsLoading] = useState(true);
    const [admins, setAdmins] = useState([]);
    const [user, setUser] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isRemoving, setIsRemoving] = useState();

    const makeAdmin = () => {
        setIsUpdating(true);
        axios
            .post("/admin/admins", { user_id: user.id })
            .then((response) => {
                setIsUpdating(false);
                toast.success(response.data.message, {
                    position: "bottom-center",
                });
                setUser(null);
                fetchAdmins();
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    };

    const removeAdmin = (admin) => {
        axios
            .delete("/admin/admins/" + admin.id)
            .then((response) => {
                toast.success(response.data.message, {
                    position: "bottom-center",
                });
                fetchAdmins();
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    };

    const setFoundUser = (user) => {
        setUser(user);
    };

    const fetchAdmins = (page = 1) => {
        setIsLoading(true);
        axios
            .get("/admin/admins?page=" + page)
            .then((response) => {
                setAdmins(response.data.data.admins);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error.response);
                setIsLoading(false);
            });
    };
    useEffect(() => {
        fetchAdmins();
    }, []);
    return (
        <div>
            {isLoading ? (
                <Spinner text="Loading..." />
            ) : (
                <div className="flex flex-col space-y-2 w-full md:w-2/3">
                    <h2 className="font-bold text-lg text-center">Add Admin</h2>
                    <div className="w-full md:w-1/2 mx-auto">
                        <FindUser
                            user={user}
                            setFoundUser={(user) => setFoundUser(user)}
                        >
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
                                <button
                                    onClick={makeAdmin}
                                    className="btn btn-primary btn-block my-2"
                                >
                                    Make Admin
                                </button>
                            )}
                        </FindUser>
                    </div>

                    <div className="w-full my-4">
                        <h2 className="font-bold text-gray-600 text-center">
                            Admins
                        </h2>
                        <div className="flex flex-col">
                            {admins?.map((admin) => (
                                <div
                                    key={admin.id}
                                    className="bg-white my-1 flex items-center justify-between p-3"
                                >
                                    <div>
                                        <p className="font-bold text-primary capitalize">
                                            {admin.full_name}
                                        </p>
                                        <p className="text-xs text-gray-400 mb-3">
                                            {admin.email}
                                        </p>
                                        <p className="text-gray-400 text-xs font-bold">
                                            {admin.role.map((role, i) => (
                                                <span
                                                    key={i}
                                                    className="mr-1 capitalize badge text-xs badge-success"
                                                >
                                                    {deslug(role)}
                                                </span>
                                            ))}
                                        </p>
                                    </div>
                                    <div>
                                        {!admin.is_super_admin && (
                                            <SpinButton
                                                buttonClicked={() =>
                                                    removeAdmin(admin)
                                                }
                                                isLoading={false}
                                                text="Remove Admin"
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddAdmin;
