import { Link } from "@inertiajs/inertia-react";
import React from "react";
import MainLayout from "../Layouts/MainLayout";
import CardWrapper from "../Layouts/Partials/CardWrapper";

function Buy() {
    return (
        <MainLayout>
            <ServiceCard
                icon={"mdi mdi-cellphone"}
                title="Airtime"
                link={route("buy.airtime")}
            />

            <ServiceCard
                icon={"mdi mdi-wifi"}
                title="Data"
                link={route("buy.data")}
            />
            <p className="text-center">
                <Link
                    className="text-primary my-8 text-center text-sm"
                    href={route("dashboard.index")}
                >
                    Go Home
                </Link>
            </p>
        </MainLayout>
    );
}

export function ServiceCard({ icon, title, link }) {
    return (
        <Link href={link}>
            <div className="my-4 md:my-8 hover:shadow-lg w-full md:w-2/3 md:mx-auto shadow-sm rounded py-5 px-4 text-gray-600 flex items-center justify-between bg-white">
                <div className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                        <i className={icon}></i>
                    </span>
                    <p className="ml-4">{title}</p>
                </div>
                <i className="mdi mdi-chevron-right text-4xl text-gray-500 text-right"></i>
            </div>
        </Link>
    );
}

export default Buy;
