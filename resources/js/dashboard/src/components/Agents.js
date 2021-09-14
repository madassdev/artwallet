import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { paintStatus } from "../data/functions";
import AgentInformation from "./AgentInformation";

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

function ViewAgentInfo({ agent, openAgent }) {
    function openAgentInfo() {
        console.log(agent);
        openAgent(agent)
    }
    return (
        <p className="text text-info cursor-pointer" onClick={openAgentInfo}>
            More info...
        </p>
    );
}

function AgentAction({ agent }) {
    const [isLoading, setIsLoading] = useState(false);
    function approveAgent() {
        if (
            confirm("Are you sure you want to approve " + agent.business_name)
        ) {
            axios
                .post("/admin/agents/" + agent.id, { status: "approved" })
                .then((res) => {
                    toast.success(res.data.message, {
                        position: "bottom-center",
                    });
                    window.location.reload();
                })
                .catch((err) => {
                    // handleError
                });
            setIsLoading(true);
        } else {
            return;
        }
    }

    function disproveAgent() {
        if (
            confirm(
                "Are you sure you want to disapprove " + agent.business_name
            )
        ) {
            axios
                .post("/admin/agents/" + agent.id, { status: "disapproved" })
                .then((res) => {
                    toast.success(res.data.message, {
                        position: "bottom-center",
                    });
                    window.location.reload();
                })
                .catch((err) => {
                    // handleError
                });
            setIsLoading(true);
        } else {
            return;
        }
    }
    return (
        <div className="flex items-center space-x-4">
            {isLoading ? (
                <button
                    // onClick={() => setIsLoading(false)}
                    className="btn btn-light"
                    type="button"
                >
                    <div
                        className="spinner-border-sm spinner-border text-primary"
                        role="status"
                    >
                        {/* <span class="sr-only">Loading...</span> */}
                    </div>
                </button>
            ) : (
                <>
                    <button
                        onClick={approveAgent}
                        className="btn btn-xs btn-success text-white"
                    >
                        <i className="mdi mdi-check mr-1"></i>
                        Approve
                    </button>
                    {/* <button
                        onClick={disproveAgent}
                        className="btn btn-xs btn-danger text-white"
                    >
                        <i className="mdi mdi-close"></i>
                    </button> */}
                </>
            )}
        </div>
    );
}
function Agents() {
    const [agents, setAgents] = useState([]);
    const [openAgent, setOpenAgent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(20);
    const [perPage, setPerPage] = useState(20);
    const [totalAgents, setTotalAgents] = useState(0);
    const dispatch = useDispatch();

    const fetchAgents = async (page) => {
        setLoading(true);
        const response = await axios.get(
            `/admin/agents?page=${page}&per_page=${perPage}&delay=1`
        );
        console.log(response);
        setAgents(response.data.data.agents.data);
        setTotalRows(response.data.data.agents.total);
        setTotalAgents(response.data.data.agents.total);

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
        fetchAgents(page);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        setLoading(true);

        const response = await axios.get(
            `/admin/agents?page=${page}&per_page=${newPerPage}&delay=1`
        );

        setAgents(response.data.data.agents.data);
        setPerPage(newPerPage);
        setLoading(false);
    };

    useEffect(() => {
        fetchAgents(1);
    }, []);

    const columns = [
        {
            name: <p className="font-bold">Business Name</p>,
            sortable: true,
            selector: (u) => u.business_name,
        },
        {
            name: <p className="font-bold">Phone</p>,
            sortable: true,
            selector: (u) => u.mobile,
        },
        {
            name: <p className="font-bold">Status</p>,
            sortable: true,
            selector: (u) => (
                <span
                    className={`badge badge-dot capitalize text-gray-400 text-xs ${paintStatus(
                        u.status
                    )}`}
                >
                    {u.status}
                </span>
            ),
        },
        {
            name: <p className="font-bold">Has Paid</p>,
            sortable: true,
            selector: (u) =>
                u.has_paid ? (
                    <i className="font-bold text-success text-lg mdi mdi-check"></i>
                ) : (
                    <i className="font-bold text-danger text-lg mdi mdi-close"></i>
                ),
        },

        {
            name: <p className="font-bold">Info</p>,
            sortable: true,
            selector: (u) => <ViewAgentInfo agent={u} openAgent={setOpenAgent}/>,
        },
        {
            name: <p className="font-bold">Action</p>,
            sortable: true,
            selector: (u) => <AgentAction agent={u} />,
        },
    ];
    return (
        <>
        {openAgent ? (
            <>
            <button onClick={()=>setOpenAgent(null)} className="btn btn-primary">
                Back to agents
            </button>
        <AgentInformation saved={true} agent={openAgent} source={"admin"}/>
        
        </>):(

        <div>
            <DataTable
                title={`Agents (${parseInt(totalAgents).toLocaleString()})`}
                columns={columns}
                data={agents}
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
        )}
        </>
    );
}

export default Agents;
