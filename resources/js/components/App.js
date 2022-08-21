import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";

import Protected from "../components/Protected";
import Dashboard from "../pages/Dashboard";
import CampaignManagement from "../pages/CampaignManagement";
import Finance from "../pages/Finance";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Preference from "../pages/Preference";
import Material from "../pages/Material";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Protected>
                            <Dashboard />
                        </Protected>
                    }
                />
                <Route
                    path="/preference/campaign-management"
                    element={
                        <Protected>
                            <CampaignManagement />
                        </Protected>
                    }
                />
                <Route
                    path="/preference/withdrawal-account"
                    element={
                        <Protected>
                            <CampaignManagement />
                        </Protected>
                    }
                />
                <Route
                    path="/finance"
                    element={
                        <Protected>
                            <Finance />
                        </Protected>
                    }
                />
                <Route
                    path="/preference"
                    element={
                        <Protected>
                            <Preference />
                        </Protected>
                    }
                />
                <Route
                    path="/material"
                    element={
                        <Protected>
                            <Material />
                        </Protected>
                    }
                />
                <Route path="/sign-in" element={<Login />} />
                <Route path="/sign-up" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
