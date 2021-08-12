import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch } from "react-redux";

export const UserSummary = ({ user }) => {
    return (
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
                    {user.role.map((role, i) => (
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
                <p className="text-primary font-bold">{naira(user.balance)}</p>
            </div>
        </div>
    );
};
function Customers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(20);
    const [perPage, setPerPage] = useState(20);
    const [totalUsers, setTotalUsers] = useState(0);
    const dispatch = useDispatch();

    const fetchUsers = async (page) => {
        setLoading(true);
        const response = await axios.get(
            `/admin/users?page=${page}&per_page=${perPage}&delay=1`
        );
        console.log(response);
        setUsers(response.data.data.users.data);
        setTotalRows(response.data.data.users.total);
        setTotalUsers(response.data.data.users.total);

        setLoading(false);
    };

    const handleEditUser = (u) => {
        console.log(u);
        dispatch({
            type: "OPEN_MODAL",
            modal: {
                show: 1,
                content: (
                    <div className="w-1/2 mx-auto">
                        <UserSummary user={u} />
                    </div>
                ),
                header: <h3 className="font-bold uppercase">{u.full_name}</h3>,
            },
        });
    };

    const handlePageChange = (page) => {
        fetchUsers(page);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        setLoading(true);

        const response = await axios.get(
            `/admin/users?page=${page}&per_page=${newPerPage}&delay=1`
        );

        setUsers(response.data.data.users.data);
        setPerPage(newPerPage);
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers(1);
    }, []);

    const columns = [
        {
            name: <p className="font-bold">User ID</p>,
            sortable: true,
            selector: (u) => u.uniqid,
        },
        {
            name: <p className="font-bold">Phone</p>,
            sortable: true,
            selector: (u) => u.mobile,
        },
        {
            name: <p className="font-bold">Email</p>,
            sortable: true,
            selector: (u) => u.email,
            cell: (u) => <p className="font-bold text-primary">{u.email}</p>,
        },
        {
            name: <p className="font-bold">Balance</p>,
            sortable: true,
            selector: (u) => u.balance,
            cell: (u) => (
                <span className="text-lg font-bold">{naira(u.balance)}</span>
            ),
        },
        {
            name: "Action",
            cell: (u) => (
                <div className="dropdown">
                    <a
                        className="text-soft dropdown-toggle btn btn-icon btn-trigger"
                        data-toggle="dropdown"
                        data-offset="-8,0"
                        aria-expanded="false"
                    >
                        <em className="icon ni ni-more-h"></em>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right dropdown-menu-xs">
                        <ul className="link-list-plain">
                            <li>
                                <a
                                    href="#"
                                    className="text-primary"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleEditUser(u);
                                    }}
                                >
                                    View
                                </a>
                            </li>
                            {/* <li>
                                <a href="#" className="text-primary">
                                    View
                                </a>
                            </li> */}
                            <li>
                                <a href="#" className="text-danger">
                                    Remove
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            ),
        },
        // {
        //     name: <p className="font-bold">Roles</p>,
        //     selector: (u) => u.uniqid,
        //     cell: (u) => (
        //         <p className="text-gray-400 text-xs font-bold">
        //             {u.role.map((role, i) => (
        //                 <span
        //                     key={i}
        //                     className="mr-1 capitalize badge text-xs badge-success"
        //                 >
        //                     {deslug(role)}
        //                 </span>
        //             ))}
        //         </p>
        //     ),
        // },
        // {

        // }
    ];
    return (
        <div>
            <DataTable
                title={`Users (${parseInt(totalUsers).toLocaleString()})`}
                columns={columns}
                data={users}
                progressPending={loading}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                paginationPerPage={perPage}
                paginationRowsPerPageOptions={[10, 20, 50, 100, 200, 500]}
            />
        </div>
    );
}

export default Customers;
