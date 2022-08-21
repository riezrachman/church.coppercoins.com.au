import React from "react";
import ProfileComponent from "../components/Dashboard/ProfileComponent";

import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
    return (
        <Layout>
            <Navbar />
            <div className="container mx-auto flex">
                <Sidebar />
                <main className="w-full p-10 space-y-4">
                    <div className="text-xl font-bold">Dashboard</div>
                    <div className="grid grid-cols-3 justify-items-stretch gap-4">
                        <div className="border hover:border-none bg-white rounded-lg p-4 hover:drop-shadow-lg duration-300">
                            <small className="text-xs font-thin">
                                Total Donated
                            </small>
                            <div className="text-xl font-semibold">0 AUD</div>
                        </div>
                        <div className="border hover:border-none bg-white rounded-lg p-4 hover:drop-shadow-lg duration-300">
                            <small className="text-xs font-thin">
                                Current Active Balance
                            </small>
                            <div className="text-xl font-semibold">0 AUD</div>
                        </div>
                        <div className="border hover:border-none bg-white rounded-lg p-4 hover:drop-shadow-lg duration-300">
                            <small className="text-xs font-thin">
                                Added Watchlist
                            </small>
                            <div className="text-xl font-semibold">0</div>
                        </div>
                    </div>
                    <ProfileComponent />
                </main>
            </div>
        </Layout>
    );
};

export default Dashboard;
