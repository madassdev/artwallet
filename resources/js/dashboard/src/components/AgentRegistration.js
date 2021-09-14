import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import AgentInformation from "./AgentInformation";
import ImageUpload from "./ImageUpload";

function Information({ infoData, setInfo }) {
    const [name, setName] = useState(infoData?.name);
    const [last_name, setLastName] = useState(infoData?.last_name);
    const [email, setEmail] = useState(infoData?.email);
    const [mobile, setMobile] = useState(infoData?.mobile);
    const [address, setAddress] = useState(infoData?.address ?? "");
    const [state, setState] = useState(infoData?.state ?? "");
    const [lga, setLga] = useState(infoData?.lga ?? "");
    const [business_name, setBusinessName] = useState(infoData?.business_name);
    const [business_address, setBusinessAddress] = useState(
        infoData?.business_address
    );
    const [business_email, setBusinessEmail] = useState(
        infoData?.business_email
    );
    const [business_mobile, setBusinessMobile] = useState(
        infoData?.business_mobile
    );
    const [business_offering, setBusinessOffering] = useState(
        infoData?.business_offering
    );
    const [business_bvn, setBusinessBvn] = useState(infoData?.business_bvn);
    const [business_nin, setBusinessNin] = useState(infoData?.business_nin);
    const [business_cac, setBusinessCac] = useState(infoData?.business_cac);
    const defaultErrors = {
        name: false,
        last_name: false,
        email: false,
        mobile: false,
        address: false,
        state: false,
        lga: false,
        business_name: false,
        business_address: false,
        business_email: false,
        business_mobile: false,
        business_offering: false,
        business_bvn: false,
        business_nin: false,
        business_cac: false,
    };
    const [errors, setErrors] = useState(defaultErrors);

    function handleError(error, message) {
        setErrors((values) => ({
            ...values,
            [error]: message,
        }));
    }
    function validate() {
        let c = 0;

        if (!name) {
            handleError("name", "Please enter Name");
            c++;
        }
        if (!last_name) {
            handleError("last_name", "Please enter Last name");
            c++;
        }

        if (!email) {
            handleError("email", "Invalid Email");
            c++;
        }
        if (!mobile) {
            handleError("mobile", "Invalid please enter Mobile number");
            c++;
        }
        if (!address) {
            handleError("address", "Invalid please enter Address");
            c++;
        }
        if (!state) {
            handleError("state", "Invalid please enter State");
            c++;
        }
        if (!lga) {
            handleError("lga", "Invalid please enter LGA");
            c++;
        }
        if (!business_name) {
            handleError("business_name", "Please enter Business Name");
            c++;
        }
        if (!business_address) {
            handleError("business_address", "Please enter Business Address");
            c++;
        }

        if (!business_email) {
            handleError("business_email", "Invalid Email");
            c++;
        }
        if (!business_mobile) {
            handleError("business_mobile", "please enter valid Mobile number");
            c++;
        }
        if (!business_bvn) {
            handleError("business_bvn", "Please enter BVN");
            c++;
        }
        if (!business_nin) {
            handleError("business_nin", "Please enter NIN");
            c++;
        }
        if (!business_offering) {
            handleError("business_offering", "Please enter Offering");
            c++;
        }
        if (!business_cac) {
            handleError("business_cac", "Invalid CAC");
            c++;
        }

        return !c;
    }

    const handleSubmit = (e) => {
        setErrors(defaultErrors);
        e.preventDefault();
        if (validate()) {
            setInfo({
                name,
                last_name,
                email,
                mobile,
                address,
                state,
                lga,
                business_name,
                business_address,
                business_email,
                business_mobile,
                business_offering,
                business_bvn,
                business_nin,
                business_cac,
            });
        } else {
            // alert("please lear validation");
            toast.error("Please fill all Fields", {
                position: "top-right",
            });
            return;
        }
    };
    let defaultImage = null;
    try {
        defaultImage = URL.createObjectURL(business_cac);
    } catch (error) {
        defaultImage = business_cac;
    }
    console.log(business_cac);

    function handleImageUploaded(imageUrl) {
        setBusinessCac(imageUrl);
        console.log(imageUrl);
    }
    return (
        <div className="md:px-5 my-4 flex flex-col space-y-4">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <h2 className="font-bold text-lg text-gray-600">
                    Personal Information
                </h2>
                <div className="flex flex-col space-y-4 text-gray-600">
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/2 space-y-1 form-group px-2">
                            <p className="font-bold">Name</p>
                            <input
                                className={`w-full p-1 px-2 bg-gray-200 cursor-not-allowed border rounded border-gray-600 ${
                                    errors.name && "border-danger"
                                }`}
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                disabled
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                            {errors.name && (
                                <div className="text-danger text-xs font-bold">
                                    {errors.name}
                                </div>
                            )}
                        </div>
                        <div className="w-full md:w-1/2 space-y-1 form-group px-2">
                            <p className="font-bold">Last Name</p>
                            <input
                                className={`w-full p-1 px-2 bg-gray-200 cursor-not-allowed border rounded border-gray-600 ${
                                    errors.last_name && "border-danger"
                                }`}
                                type="text"
                                placeholder="Enter last name"
                                disabled
                                value={last_name}
                                onChange={(e) => {
                                    setLastName(e.target.value);
                                }}
                            />
                            {errors.last_name && (
                                <div className="text-danger text-xs font-bold">
                                    {errors.last_name}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/2 space-y-1 form-group px-2">
                            <p className="font-bold">Email</p>
                            <input
                                className={`w-full p-1 px-2 bg-gray-200 cursor-not-allowed border rounded border-gray-600 ${
                                    errors.email && "border-danger"
                                }`}
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                disabled
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            {errors.email && (
                                <div className="text-danger text-xs font-bold">
                                    {errors.email}
                                </div>
                            )}
                        </div>
                        <div className="w-full md:w-1/2 space-y-1 form-group px-2">
                            <p className="font-bold">Phone number</p>
                            <input
                                className={`w-full p-1 px-2 bg-gray-200 cursor-not-allowed border rounded border-gray-600 ${
                                    errors.mobile && "border-danger"
                                }`}
                                type="number"
                                placeholder="Enter phone number"
                                value={mobile}
                                disabled
                                onChange={(e) => {
                                    setMobile(e.target.value);
                                }}
                            />
                            {errors.mobile && (
                                <div className="text-danger text-xs font-bold">
                                    {errors.mobile}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-full space-y-1 form-group px-2">
                        <p className="font-bold">Address</p>
                        <input
                            className={`w-full p-3 px-2 border rounded border-gray-600 ${
                                errors.address && "border-danger"
                            }`}
                            type="text"
                            placeholder="Enter Address"
                            value={address}
                            onChange={(e) => {
                                setAddress(e.target.value);
                            }}
                        />
                        {errors.address && (
                            <div className="text-danger text-xs font-bold">
                                {errors.address}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/2 space-y-1 form-group px-2">
                            <p className="font-bold">State</p>
                            <input
                                className={`w-full p-1 px-2 border rounded border-gray-600 ${
                                    errors.state && "border-danger"
                                }`}
                                type="text"
                                placeholder="Enter state"
                                value={state}
                                onChange={(e) => {
                                    setState(e.target.value);
                                }}
                            />
                            {errors.state && (
                                <div className="text-danger text-xs font-bold">
                                    {errors.state}
                                </div>
                            )}
                        </div>
                        <div className="w-full md:w-1/2 space-y-1 form-group px-2">
                            <p className="font-bold">LGA</p>
                            <input
                                className={`w-full p-1 px-2 border rounded border-gray-600 ${
                                    errors.lga && "border-danger"
                                }`}
                                type="text"
                                placeholder="Enter LGA"
                                value={lga}
                                onChange={(e) => {
                                    setLga(e.target.value);
                                }}
                            />
                            {errors.lga && (
                                <div className="text-danger text-xs font-bold">
                                    {errors.lga}
                                </div>
                            )}
                        </div>
                    </div>

                    <h2 className="font-bold text-lg text-gray-600">
                        Business Information
                    </h2>

                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/2 space-y-1 form-group px-2">
                            <p className="font-bold">Business Name</p>
                            <input
                                className={`w-full p-1 px-2 border rounded border-gray-600 ${
                                    errors.business_name && "border-danger"
                                }`}
                                type="text"
                                placeholder="Enter Business name"
                                value={business_name}
                                onChange={(e) => {
                                    setBusinessName(e.target.value);
                                }}
                            />
                            {errors.business_name && (
                                <div className="text-danger text-xs font-bold">
                                    {errors.business_name}
                                </div>
                            )}
                        </div>
                        <div className="w-full md:w-1/2 space-y-1 form-group px-2">
                            <p className="font-bold">Business Address</p>
                            <input
                                className={`w-full p-2 px-2 border rounded border-gray-600 ${
                                    errors.business_address && "border-danger"
                                }`}
                                type="text"
                                placeholder="Enter Business address"
                                value={business_address}
                                onChange={(e) => {
                                    setBusinessAddress(e.target.value);
                                }}
                            />
                            {errors.business_address && (
                                <div className="text-danger text-xs font-bold">
                                    {errors.business_address}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/2 space-y-1 form-group px-2">
                            <p className="font-bold">Business Email</p>
                            <input
                                className={`w-full p-1 px-2 border rounded border-gray-600 ${
                                    errors.business_email && "border-danger"
                                }`}
                                type="email"
                                placeholder="Enter Business email"
                                value={business_email}
                                onChange={(e) => {
                                    setBusinessEmail(e.target.value);
                                }}
                            />
                            {errors.business_email && (
                                <div className="text-danger text-xs font-bold">
                                    {errors.business_email}
                                </div>
                            )}
                        </div>
                        <div className="w-full md:w-1/2 space-y-1 form-group px-2">
                            <p className="font-bold">Business Mobile</p>
                            <input
                                className={`w-full p-1 px-2 border rounded border-gray-600 ${
                                    errors.business_mobile && "border-danger"
                                }`}
                                type="number"
                                placeholder="Enter Business mobile"
                                value={business_mobile}
                                onChange={(e) => {
                                    setBusinessMobile(e.target.value);
                                }}
                            />
                            {errors.business_mobile && (
                                <div className="text-danger text-xs font-bold">
                                    {errors.business_mobile}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/2 space-y-1 form-group px-2">
                            <p className="font-bold">BVN</p>
                            <input
                                className={`w-full p-1 px-2 border rounded border-gray-600 ${
                                    errors.business_bvn && "border-danger"
                                }`}
                                type="number"
                                placeholder="Enter BVN"
                                value={business_bvn}
                                onChange={(e) => {
                                    setBusinessBvn(e.target.value);
                                }}
                            />
                            {errors.business_bvn && (
                                <div className="text-danger text-xs font-bold">
                                    {errors.business_bvn}
                                </div>
                            )}
                        </div>
                        <div className="w-full md:w-1/2 space-y-1 form-group px-2">
                            <p className="font-bold">NIN</p>
                            <input
                                className={`w-full p-1 px-2 border rounded border-gray-600 ${
                                    errors.business_nin && "border-danger"
                                }`}
                                type="number"
                                placeholder="Enter NIN"
                                value={business_nin}
                                onChange={(e) => {
                                    setBusinessNin(e.target.value);
                                }}
                            />
                            {errors.business_nin && (
                                <div className="text-danger text-xs font-bold">
                                    {errors.business_nin}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/2 space-y-1 form-group px-2">
                            <p className="font-bold">Business Offering</p>
                            <input
                                className={`w-full p-1 px-2 border rounded border-gray-600 ${
                                    errors.business_offering && "border-danger"
                                }`}
                                type="text"
                                placeholder="Enter what your business offers"
                                value={business_offering}
                                onChange={(e) => {
                                    setBusinessOffering(e.target.value);
                                }}
                            />
                            {errors.business_offering && (
                                <div className="text-danger text-xs font-bold">
                                    {errors.business_offering}
                                </div>
                            )}
                        </div>
                        <div className="w-full md:w-1/2 space-y-1 form-group px-2">
                            <p className="font-bold">Upload CAC</p>
                            <ImageUpload
                                imageUploaded={handleImageUploaded}
                                defaultImage={defaultImage}
                            />

                            {errors.business_cac && (
                                <div className="text-danger text-xs font-bold">
                                    {errors.business_cac}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-full flex justify-end my-4">
                        <button className="btn btn-primary">Proceed</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

function AgentRegistration() {
    const [infoData, setInfoData] = useState({
        name: AUTH_USER.agent?.name ?? AUTH_USER.name,
        last_name: AUTH_USER.agent?.last_name ?? AUTH_USER.last_name,
        email: AUTH_USER.agent?.email ?? AUTH_USER.email,
        mobile: AUTH_USER.agent?.mobile ?? AUTH_USER.mobile,
        address: AUTH_USER.agent?.address ?? "",
        state: AUTH_USER.agent?.state ?? "",
        lga: AUTH_USER.agent?.lga ?? "",
        business_name: AUTH_USER.agent?.business_name ?? "",
        business_address: AUTH_USER.agent?.business_address ?? "",
        business_email: AUTH_USER.agent?.business_email ?? "",
        business_mobile: AUTH_USER.agent?.business_mobile ?? "",
        business_offering: AUTH_USER.agent?.business_offering ?? "",
        business_bvn: AUTH_USER.agent?.business_bvn ?? "",
        business_nin: AUTH_USER.agent?.business_nin ?? "",
        business_cac: AUTH_USER.agent?.business_cac ?? null,
    });

    const [infoDone, setInfoDone] = useState(false);
    const [isSavingAgent, setIsSavingAgent] = useState(false);

    const formData = new FormData();

    const setInfo = (info) => {
        setInfoData(info);
        setInfoDone(true);
    };

    function handleSave() {
        for (var key in infoData) {
            formData.append(key, infoData[key]);
        }
        console.log(formData);
        setIsSavingAgent(true);
        axios.post("/save-agent", formData).then((res) => {
            console.log(res.data);
            toast.success(res.data.message, {
                position: "bottom-center",
            });
            window.location.reload();
        });

        toast.success("Upload ready");
    }

    function handleEdit() {
        setInfoDone(false);
    }

    return (
        <div className="bg-white p-3 md:p-5">
            <div className="md:px-5">
                {AUTH_USER.agent ? (
                    <>
                        <h2 className="text-purple-500 text-center font-bold text-lg capitalize">
                            Agent Information
                        </h2>
                        <AgentInformation saved={true} agent={AUTH_USER.agent} />
                    </>
                ) : (
                    <>
                        <h2 className="text-purple-500 text-center font-bold text-lg capitalize">
                            Agent Registration
                        </h2>
                        {infoDone ? (
                            <>
                                <AgentInformation
                                    saved={false}
                                    agent={infoData}
                                />

                                <div className="flex mt-8 justify-between">
                                    <span
                                        className="text-gray-400 underline cursor-pointer"
                                        onClick={handleEdit}
                                    >
                                        Update Agent Information
                                    </span>
                                    {isSavingAgent ? (
                                        <button
                                            // onClick={() =>
                                            // setIsSavingPin(false)
                                            // }
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
                                        <button
                                            className="btn btn-primary text-white font-bold"
                                            onClick={handleSave}
                                            type=""
                                        >
                                            Submit
                                        </button>
                                    )}
                                </div>
                            </>
                        ) : (
                            <Information
                                infoData={infoData}
                                setInfo={setInfo}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default AgentRegistration;
