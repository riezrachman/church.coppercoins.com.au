import React from "react";
import { Grid } from "gridjs-react";

import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Finance = () => {
    const apiUrl = process.env.MIX_MAIN_APP_URL;
    const token = localStorage.getItem("token");
    return (
        <Layout>
            <Navbar />
            <div className="container mx-auto flex">
                <Sidebar />
                <main className="w-full p-10 space-y-4">
                    <div className="text-xl font-bold">Finance</div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="border hover:border-none bg-white rounded-lg p-4 hover:drop-shadow-lg duration-300 flex flex-col justify-between space-y-2">
                            <div>
                                <small className="text-xs font-thin">
                                    Current Active Balance
                                </small>
                                <div className="text-xl font-semibold">
                                    810 AUD
                                </div>
                            </div>
                            <div className="self-end">
                                <button className="text-amber-500 hover:text-white border border-amber-500 bg-white hover:bg-amber-500 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center duration-300 shrink">
                                    Request Withdraw
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-rows-2 gap-4">
                            <div className="border hover:border-none bg-white rounded-lg p-4 hover:drop-shadow-lg duration-300">
                                <small className="text-xs font-thin">
                                    Total Donated
                                </small>
                                <div className="text-xl font-semibold">
                                    13.250 AUD
                                </div>
                            </div>
                            <div className="border hover:border-none bg-white rounded-lg p-4 hover:drop-shadow-lg duration-300">
                                <small className="text-xs font-thin">
                                    Total Withdrawn
                                </small>
                                <div className="text-xl font-semibold">
                                    500 AUD
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border space-y-4">
                        <div className="text-xl font-bold p-4">History</div>
                        <Grid
                            columns={[
                                {
                                    name: "Bank Name",
                                },
                                {
                                    name: "Account Number",
                                },
                                {
                                    name: "Rounding",
                                },
                                {
                                    name: "Recurring Deposit",
                                },
                                {
                                    name: "Action",
                                },
                            ]}
                            pagination={{
                                enabled: true,
                                limit: 5,
                                server: {
                                    url: (prev, page, limit) =>
                                        `${prev}?page=${page}`,
                                },
                            }}
                            server={{
                                url: `${apiUrl}/api/spending-account`,
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                                then: (response) =>
                                    response.data.data.map((e) => [
                                        e.institution.full_name,
                                        e.account_no.replace(
                                            /.(?=.{3,}$)/g,
                                            "*"
                                        ),
                                        Grid.html(`
                            <div class="text-center">
                                <button class="rounded-lg p-2 font-bold text-sm duration-300 ${
                                    e.id == ""
                                        ? "bg-green-800 text-white hover:bg-green-200 hover:text-green-800"
                                        : "bg-green-200 text-green-800 hover:bg-green-800 hover:text-white"
                                }" onclick="updateOrCreateRoundUp('${
                                            e.id
                                        }');">${
                                            e.id == "" ? "Enabled" : "Disabled"
                                        }</button>
                            </div>
                        `),
                                        Grid.html(`
                            <div class="text-center">
                                <button class="rounded-lg p-2 font-bold text-sm ${
                                    e.id == ""
                                        ? "bg-green-800 text-white hover:bg-green-200 hover:text-green-800"
                                        : "bg-green-200 text-green-800 hover:bg-green-800 hover:text-white"
                                }" onclick="updateOrCreateRoundUp('${
                                            e.id
                                        }');">${
                                            e.id == "" ? "Enabled" : "Disabled"
                                        }</button>
                            </div>
                        `),
                                        Grid.html(`
                            <div class="text-center">
                                <button class="text-amber-500 bg-amber-100 hover:bg-amber-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center duration-300" onclick="openDeletePrompt('${e.id}');"><i class="fas fa-trash"></i></button>
                            </div>        
                        `),
                                    ]),
                                total: (response) => response.data.total,
                            }}
                            className={{
                                table: "w-full",
                                td: "",
                            }}
                        />
                    </div>
                </main>
            </div>
        </Layout>
    );
};

export default Finance;
