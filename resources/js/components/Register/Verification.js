import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "@hookstate/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import Steps from "./Steps";

import { stepIndexState } from "./RegisterController";

const Verification = () => {
    const stepIndex = useState(stepIndexState);

    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-3">
            <div className="bg-[url('/images/bg_login.png')] bg-right bg-cover bg-no-repeat h-screen p-12 space-y-4">
                <a href={process.env.MIX_MAIN_APP_URL}>
                    <img className="h-12" src="/images/logo_full.png" alt="" />
                </a>
                <div className="text-gray-500 font-light">
                    Be part of us, mauris neque nisi faucibus non elementum in,
                    convallis et eros.
                </div>
                <Steps currentIndex={stepIndex.get()} />
            </div>
            <div className="col-span-2">
                <div className="bg-white py-12 px-56 flex flex-col space-y-4">
                    <div className="text-3xl font-bold">Verification</div>
                    <div className="bg-green-600 p-4 rounded-full w-20 h-20 text-white flex justify-center items-center text-3xl">
                        <FontAwesomeIcon icon={solid("check")} />
                    </div>
                    <div className="text-gray-500 font-light">
                        Please check your email to verify your account. Let’s
                        get you started on your goals. Already verified?
                    </div>
                    <div className="">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => navigate("/sign-in")}
                        >
                            Login Page
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Verification;
