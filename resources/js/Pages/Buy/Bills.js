import { Link } from "@inertiajs/inertia-react";
import React from "react";
import MainLayout from "../Layouts/MainLayout";
import { ServiceCard } from "./Buy";

function Bills() {
    return (
        <MainLayout>
            <ServiceCard
                icon={"mdi mdi-television-classic"}
                title="Cable Tv"
                link={route("bills.cable-tv")}
            />

            <ServiceCard
                icon={"mdi mdi-lightning-bolt"}
                title="Electricity"
                link={route("bills.electricity")}
            />

            <ServiceCard
                icon={"mdi mdi-satellite-uplink"}
                title="Internet"
                link={route("bills.internet")}
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

export default Bills;
