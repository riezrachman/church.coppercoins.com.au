import React from "react";

import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Finance = () => {
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
                                    0 AUD
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
                                    0 AUD
                                </div>
                            </div>
                            <div className="border hover:border-none bg-white rounded-lg p-4 hover:drop-shadow-lg duration-300">
                                <small className="text-xs font-thin">
                                    Total Withdrawn
                                </small>
                                <div className="text-xl font-semibold">
                                    0 AUD
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border space-y-4">
                        <div className="text-xl font-bold p-4">History</div>
                        <table className="table-fixed w-full">
                            <thead>
                                <tr>
                                    <th>Time, Date</th>
                                    <th>Amount</th>
                                    <th>Activity</th>
                                    <th>Donor Name</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </main>
            </div>
        </Layout>
    );
};

export default Finance;
