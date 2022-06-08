import React from "react";

import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Tab from "../components/Preference/Tab";
import ChurchForm from "../components/Preference/ChurchForm";
import PasswordForm from "../components/Preference/PasswordForm";

const Preference = () => {
    return (
        <Layout>
            <Navbar />
            <div className="container mx-auto flex">
                <Sidebar />
                <main className="w-full p-10 space-y-4">
                    <div className="text-xl font-bold">Setting</div>
                    <Tab />
                    <ChurchForm />
                    <PasswordForm />
                </main>
            </div>
        </Layout>
    );
};

export default Preference;
