import React from "react";
import { Grid } from "gridjs-react";

import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Material = () => {
    const apiUrl = process.env.MIX_MAIN_APP_URL;
    const token = localStorage.getItem("token");
    return (
        <Layout>
            <Navbar />
            <div className="container mx-auto flex">
                <Sidebar />
                <main className="w-full p-10 space-y-4">
                    <div className="text-xl font-bold">Material</div>
                </main>
            </div>
        </Layout>
    );
};

export default Material;
