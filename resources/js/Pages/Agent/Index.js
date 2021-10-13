import ImageUpload from "@/dashboard/src/components/ImageUpload";
import { usePage } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import MainLayout from "../Layouts/MainLayout";
import CardWrapper from "../Layouts/Partials/CardWrapper";
import SpinButton from "../Components/SpinButton";
import axios from "axios";
import { values } from "lodash";
import { Inertia } from "@inertiajs/inertia";

function Index() {
    const { auth } = usePage().props;
    const [isSaving, setIsSaving] = useState(false);
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
    function handleError(error, message) {
        setErrors((values) => ({
            ...values,
            [error]: message,
        }));
    }

    function setValues(key, value) {
        setInfoData((values) => ({
            ...values,
            [key]: value,
        }));
    }
    function validate() {
        let c = 0;

        if (!infoData.name) {
            handleError("name", "Please enter Name");
            c++;
        }
        if (!infoData.last_name) {
            handleError("last_name", "Please enter Last name");
            c++;
        }

        if (!infoData.email) {
            handleError("email", "Invalid Email");
            c++;
        }
        if (!infoData.mobile) {
            handleError("mobile", "Invalid please enter Mobile number");
            c++;
        }
        if (!infoData.address) {
            handleError("address", "Invalid please enter Address");
            c++;
        }
        if (!infoData.state) {
            handleError("state", "Invalid please enter State");
            c++;
        }
        if (!infoData.lga) {
            handleError("lga", "Invalid please enter LGA");
            c++;
        }
        if (!infoData.business_name) {
            handleError("business_name", "Please enter Business Name");
            c++;
        }
        if (!infoData.business_address) {
            handleError("business_address", "Please enter Business Address");
            c++;
        }

        if (!infoData.business_email) {
            handleError("business_email", "Invalid Email");
            c++;
        }
        if (!infoData.business_mobile) {
            handleError("business_mobile", "Please enter valid Mobile number");
            c++;
        }
        if (!infoData.business_bvn) {
            handleError("business_bvn", "Please enter BVN");
            c++;
        }
        if (!infoData.business_nin) {
            handleError("business_nin", "Please enter NIN");
            c++;
        }
        if (!infoData.business_offering) {
            handleError("business_offering", "Please enter Offering");
            c++;
        }
        if (!infoData.business_cac) {
            handleError("business_cac", "Invalid CAC");
            c++;
        }

        return !c;
    }

    const handleSubmit = (e) => {
        setErrors(defaultErrors);
        e.preventDefault();
        if (validate()) {
            // setInfoData({
            //     name,
            //     last_name,
            //     email,
            //     mobile,
            //     address,
            //     state,
            //     lga,
            //     business_name,
            //     business_address,
            //     business_email,
            //     business_mobile,
            //     business_offering,
            //     business_bvn,
            //     business_nin,
            //     business_cac,
            // });
        } else {
            // alert("please lear validation");
            toast.error("Please fill all Fields", {
                position: "top-right",
            });
            return;
        }

        console.log(infoData);

        // Upload Image
        const formData = new FormData();

        for (var key in infoData) {
            formData.append(key, infoData[key]);
        }
        console.log(formData);
        setIsSaving(true);
        Inertia.post(route("agent.submit-application"), formData, {
            onError: (error) => {
                setSubmitting(false);
                toast.error(error.message, {
                    position: "bottom-center",
                    style: {
                        background: "rgba(185, 16, 16,1)",
                        color: "#fff",
                        padding: "20px",
                    },
                });
            },
        });
    };
    let defaultImage = null;
    try {
        defaultImage = URL.createObjectURL(infoData.business_cac);
    } catch (error) {
        defaultImage = infoData.business_cac;
    }

    function handleImageUploaded(imageUrl) {
        setValues("business_cac", imageUrl);
        handleError("business_cac", false);
        console.log(imageUrl);
    }
    return (
        <MainLayout>
            <CardWrapper>
                <p className="font-bold text-center text-primary">
                    Agent Registration
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col space-y-4 text-gray-600"
                >
                    <h2 className="font-bold text-lg text-gray-600">
                        Personal Information
                    </h2>
                    <div className="flex flex-col space-y-4 text-gray-600">
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/2 space-y-1 form-group px-2 my-2">
                                <p className="mb-1">Name</p>
                                <input
                                    className={`w-full p-1 px-2  cursor-not-allowed border rounded border-gray-300 ${
                                        errors.name && "border-danger"
                                    }`}
                                    type="text"
                                    placeholder="Enter name"
                                    value={infoData.name}
                                    onChange={(e) => {
                                        setValues("name", e.target.value);
                                    }}
                                />
                                {errors.name && (
                                    <div className="text-red-600 text-xs">
                                        {errors.name}
                                    </div>
                                )}
                            </div>
                            <div className="w-full md:w-1/2 space-y-1 form-group px-2 my-2">
                                <p className="mb-1">Last Name</p>
                                <input
                                    className={`w-full p-1 px-2  cursor-not-allowed border rounded border-gray-300 ${
                                        errors.last_name && "border-danger"
                                    }`}
                                    type="text"
                                    placeholder="Enter last name"
                                    value={infoData.last_name}
                                    onChange={(e) => {
                                        setValues("last_name", e.target.value);
                                    }}
                                />
                                {errors.last_name && (
                                    <div className="text-red-600 text-xs">
                                        {errors.last_name}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/2 space-y-1 form-group px-2 my-2">
                                <p className="mb-1">Email</p>
                                <input
                                    className={`w-full p-1 px-2  cursor-not-allowed border rounded border-gray-300 ${
                                        errors.email && "border-danger"
                                    }`}
                                    type="email"
                                    placeholder="Enter email"
                                    value={infoData.email}
                                    onChange={(e) => {
                                        setValues("email", e.target.value);
                                    }}
                                />
                                {errors.email && (
                                    <div className="text-red-600 text-xs">
                                        {errors.email}
                                    </div>
                                )}
                            </div>
                            <div className="w-full md:w-1/2 space-y-1 form-group px-2 my-2">
                                <p className="mb-1">Phone number</p>
                                <input
                                    className={`w-full p-1 px-2  cursor-not-allowed border rounded border-gray-300 ${
                                        errors.mobile && "border-danger"
                                    }`}
                                    type="number"
                                    placeholder="Enter phone number"
                                    value={infoData.mobile}
                                    onChange={(e) => {
                                        setValues("mobile", e.target.value);
                                    }}
                                />
                                {errors.mobile && (
                                    <div className="text-red-600 text-xs">
                                        {errors.mobile}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="w-full space-y-1 form-group px-2">
                            <p className="mb-1">Address</p>
                            <input
                                className={`w-full p-3 px-2 border rounded border-gray-300 ${
                                    errors.address && "border-danger"
                                }`}
                                type="text"
                                placeholder="Enter Address"
                                value={infoData.address}
                                onChange={(e) => {
                                    setValues("address", e.target.value);
                                }}
                            />
                            {errors.address && (
                                <div className="text-red-600 text-xs">
                                    {errors.address}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/2 space-y-1 form-group px-2">
                                <p className="mb-1">State</p>
                                <input
                                    className={`w-full p-1 px-2 border rounded border-gray-300 ${
                                        errors.state && "border-danger"
                                    }`}
                                    type="text"
                                    placeholder="Enter state"
                                    value={infoData.state}
                                    onChange={(e) => {
                                        setValues("state", e.target.value);
                                    }}
                                />
                                {errors.state && (
                                    <div className="text-red-600 text-xs">
                                        {errors.state}
                                    </div>
                                )}
                            </div>
                            <div className="w-full md:w-1/2 space-y-1 form-group px-2">
                                <p className="font-bold">LGA</p>
                                <input
                                    className={`w-full p-1 px-2 border rounded border-gray-300 ${
                                        errors.lga && "border-danger"
                                    }`}
                                    type="text"
                                    placeholder="Enter LGA"
                                    value={infoData.lga}
                                    onChange={(e) => {
                                        setValues("lga", e.target.value);
                                    }}
                                />
                                {errors.lga && (
                                    <div className="text-red-600 text-xs">
                                        {errors.lga}
                                    </div>
                                )}
                            </div>
                        </div>

                        <h2 className="font-bold text-lg text-gray-600 my-4">
                            Business Information
                        </h2>

                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/2 space-y-1 form-group px-2 my-2">
                                <p className="mb-1">Business Name</p>
                                <input
                                    className={`w-full p-1 px-2 border rounded border-gray-300 ${
                                        errors.business_name && "border-danger"
                                    }`}
                                    type="text"
                                    placeholder="Enter Business name"
                                    value={infoData.business_name}
                                    onChange={(e) => {
                                        setValues(
                                            "business_name",
                                            e.target.value
                                        );
                                    }}
                                />
                                {errors.business_name && (
                                    <div className="text-red-600 text-xs">
                                        {errors.business_name}
                                    </div>
                                )}
                            </div>
                            <div className="w-full md:w-1/2 space-y-1 form-group px-2 my-2">
                                <p className="mb-1">Business Address</p>
                                <input
                                    className={`w-full p-2 px-2 border rounded border-gray-300 ${
                                        errors.business_address &&
                                        "border-danger"
                                    }`}
                                    type="text"
                                    placeholder="Enter Business address"
                                    value={infoData.business_address}
                                    onChange={(e) => {
                                        setValues(
                                            "business_address",
                                            e.target.value
                                        );
                                    }}
                                />
                                {errors.business_address && (
                                    <div className="text-red-600 text-xs">
                                        {errors.business_address}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/2 space-y-1 form-group px-2 my-2">
                                <p className="mb-1">Business Email</p>
                                <input
                                    className={`w-full p-1 px-2 border rounded border-gray-300 ${
                                        errors.business_email && "border-danger"
                                    }`}
                                    type="email"
                                    placeholder="Enter Business email"
                                    value={infoData.business_email}
                                    onChange={(e) => {
                                        setValues(
                                            "business_email",
                                            e.target.value
                                        );
                                    }}
                                />
                                {errors.business_email && (
                                    <div className="text-red-600 text-xs">
                                        {errors.business_email}
                                    </div>
                                )}
                            </div>
                            <div className="w-full md:w-1/2 space-y-1 form-group px-2 my-2">
                                <p className="mb-1">Business Mobile</p>
                                <input
                                    className={`w-full p-1 px-2 border rounded border-gray-300 ${
                                        errors.business_mobile &&
                                        "border-danger"
                                    }`}
                                    type="number"
                                    placeholder="Enter Business mobile"
                                    value={infoData.business_mobile}
                                    onChange={(e) => {
                                        setValues(
                                            "business_mobile",
                                            e.target.value
                                        );
                                    }}
                                />
                                {errors.business_mobile && (
                                    <div className="text-red-600 text-xs">
                                        {errors.business_mobile}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/2 space-y-1 form-group px-2 my-2">
                                <p className="mb-1">BVN</p>
                                <input
                                    className={`w-full p-1 px-2 border rounded border-gray-300 ${
                                        errors.business_bvn && "border-danger"
                                    }`}
                                    type="number"
                                    placeholder="Enter BVN"
                                    value={infoData.business_bvn}
                                    onChange={(e) => {
                                        setValues(
                                            "business_bvn",
                                            e.target.value
                                        );
                                    }}
                                />
                                {errors.business_bvn && (
                                    <div className="text-red-600 text-xs">
                                        {errors.business_bvn}
                                    </div>
                                )}
                            </div>
                            <div className="w-full md:w-1/2 space-y-1 form-group px-2 my-2">
                                <p className="mb-1">NIN</p>
                                <input
                                    className={`w-full p-1 px-2 border rounded border-gray-300 ${
                                        errors.business_nin && "border-danger"
                                    }`}
                                    type="number"
                                    placeholder="Enter NIN"
                                    value={infoData.business_nin}
                                    onChange={(e) => {
                                        setValues(
                                            "business_nin",
                                            e.target.value
                                        );
                                    }}
                                />
                                {errors.business_nin && (
                                    <div className="text-red-600 text-xs">
                                        {errors.business_nin}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/2 space-y-1 form-group px-2 my-2">
                                <p className="mb-1">Business Offering</p>
                                <input
                                    className={`w-full p-1 px-2 border rounded border-gray-300 ${
                                        errors.business_offering &&
                                        "border-danger"
                                    }`}
                                    type="text"
                                    placeholder="Enter what your business offers"
                                    value={infoData.business_offering}
                                    onChange={(e) => {
                                        setValues(
                                            "business_offering",
                                            e.target.value
                                        );
                                    }}
                                />
                                {errors.business_offering && (
                                    <div className="text-red-600 text-xs">
                                        {errors.business_offering}
                                    </div>
                                )}
                            </div>
                            <div className="w-full md:w-1/2 space-y-1 form-group px-2 my-2">
                                <p className="mb-1">Upload CAC</p>
                                <ImageUpload
                                    imageUploaded={handleImageUploaded}
                                    defaultImage={defaultImage}
                                />

                                {errors.business_cac && (
                                    <div className="text-red-600 text-xs">
                                        {errors.business_cac}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 mx-auto my-4">
                            {isSaving ? (
                                <SpinButton />
                            ) : (
                                <button className="btn btn-block btn-primary flex items-center justify-between">
                                    Proceed
                                    <i className="mdi mdi-chevron-right text-white text-right"></i>
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </CardWrapper>
        </MainLayout>
    );
}

export default Index;
