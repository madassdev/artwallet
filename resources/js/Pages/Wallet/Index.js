import React from "react";
import { ServiceCard } from "../Buy/Buy";
import MainLayout from "../Layouts/MainLayout";

function Index() {
    return (
        <MainLayout>
            <div className="w-full">
                <ServiceCard
                    icon={"mdi mdi-wallet-plus"}
                    title="Fund Wallet"
                    link={route("wallet.fund")}
                />
                <ServiceCard
                    icon={"mdi mdi-account-cash"}
                    title="Transfer to others"
                    link={route("wallet.transfer")}
                />
                <ServiceCard
                    icon={"mdi mdi-history"}
                    title="Wallet history"
                    link={route("wallet.history")}
                />
            </div>
        </MainLayout>
    );
}

export default Index;
