import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

import Steps from "./Steps";

const Step1 = ({ controller }) => {
    return (
        <div className="grid grid-cols-2">
            <div className="bg-[url('/images/bg_login.png')] bg-center bg-cover h-screen p-12 space-y-4">
                <img className="h-12" src="/images/logo_full.png" alt="" />
                <div className="">
                    Be part of us, mauris neque nisi faucibus non elementum in,
                    convallis et eros.
                </div>
                <Steps currentIndex={1} />
            </div>
            <div className="bg-white p-12 flex space-y-4"></div>
        </div>
    );
};

export default Step1;
