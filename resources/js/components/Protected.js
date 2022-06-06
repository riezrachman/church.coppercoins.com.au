import React from "react";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
    const token = localStorage.getItem("token");
    const isLoggedIn = token != null && token != "";
    if (!isLoggedIn) {
        return <Navigate to="/sign-in" replace />;
    }
    return children;
};

export default Protected;
