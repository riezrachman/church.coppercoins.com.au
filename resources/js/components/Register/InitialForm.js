import React from "react";
import { NavLink, Link } from "react-router-dom";
import { createState, useState } from "@hookstate/core";
import axios from "axios";

import {
    stepIndexState,
    emailState,
    passwordState,
} from "./RegisterController";
import LoadingButton from "../LoadingButton";
import Label from "../Label";

const InitialForm = () => {
    const stepIndex = useState(stepIndexState);

    const email = useState(emailState);
    const password = useState(passwordState);

    const obscurePasswordState = createState(true);
    const obscurePassword = useState(obscurePasswordState);
    const loadingState = createState(false);
    const loading = useState(loadingState);
    const errorState = createState("");
    const errorMessage = useState(errorState);

    const handleValidateEmail = async (e) => {
        e.preventDefault();
        try {
            loading.set(true);
            const formData = new FormData();
            formData.append("email", email.get());
            const apiUrl = process.env.MIX_MAIN_APP_URL;
            const response = await axios.post(
                `${apiUrl}/api/auth/validate-email`,
                formData
            );
            loading.set(false);
            if (response.status == 200) {
                stepIndex.set(stepIndex.get() + 1);
            }
        } catch (error) {
            loading.set(false);
            var message = "Oops! Something went wrong...";
            if (error.response) {
                console.log(error.response);
                message = error.response.data.message;
            } else {
                console.log(error);
            }
            errorMessage.set(message);
        }
    };

    return (
        <div
            key={0}
            className="bg-[url('/images/bg_login.png')] bg-center bg-cover w-screen h-screen"
        >
            <div className="container mx-auto grid grid-cols-2 h-full items-center">
                <form onSubmit={handleValidateEmail}>
                    <div className="bg-white rounded-lg w-full p-12 space-y-4">
                        <img
                            className="h-12"
                            src="/images/logo_full.png"
                            alt=""
                        />
                        <div>
                            <div className="text-3xl font-bold">
                                Church Portal
                            </div>
                            <div className="text-gray-500 font-light">
                                Welcome to CopperCoins portal, mauris neque
                                nisi, faucibus non elementum in, convallis et
                                eros.
                            </div>
                        </div>
                        {errorMessage.get() != "" && (
                            <div
                                className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                                role="alert"
                            >
                                {errorMessage.get()}
                            </div>
                        )}
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                value={email.get()}
                                onChange={(e) => email.set(e.target.value)}
                                placeholder="user@mail.com"
                                minLength={6}
                                maxLength={255}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <input
                                    type={
                                        obscurePassword.get()
                                            ? "password"
                                            : "text"
                                    }
                                    id="password"
                                    className="form-control"
                                    value={password.get()}
                                    onChange={(e) =>
                                        password.set(e.target.value)
                                    }
                                    placeholder={
                                        obscurePassword.get()
                                            ? "**********"
                                            : "Password"
                                    }
                                    minLength={8}
                                    maxLength={255}
                                    required
                                />
                                <button
                                    type="button"
                                    className="text-amber-500 text-xs font-medium absolute right-3.5 bottom-3.5"
                                    onClick={() =>
                                        obscurePassword.set(
                                            !obscurePassword.get()
                                        )
                                    }
                                >
                                    {obscurePassword.get() ? "Show" : "Hide"}
                                </button>
                            </div>
                            <small className="text-gray-500">
                                *Please use 8 or more characters with a mix
                                uppercase, lowercase and numbers
                            </small>
                        </div>
                        <div className="text-gray-500 font-light">
                            By clicking “Create Account”, you agree to our{" "}
                            <NavLink
                                to={``}
                                className="text-amber-500 font-medium"
                            >
                                Terms of Use
                            </NavLink>{" "}
                            and{" "}
                            <NavLink
                                to={``}
                                className="text-amber-500 font-medium"
                            >
                                Privacy Policy
                            </NavLink>
                        </div>
                        {loading.get() ? (
                            <LoadingButton className="btn btn-primary w-full" />
                        ) : (
                            <button
                                type="submit"
                                className="btn btn-primary w-full"
                            >
                                Register
                            </button>
                        )}
                        <div>
                            Already have a church account? Please{" "}
                            <Link
                                to={`/sign-in`}
                                className="text-amber-500 font-medium"
                            >
                                login here
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InitialForm;
