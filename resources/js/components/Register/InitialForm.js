import React from "react";
import { NavLink, Link } from "react-router-dom";
import { createState, useState } from "@hookstate/core";

import {
    stepIndexState,
    emailState,
    passwordState,
} from "./RegisterController";

const InitialForm = () => {
    const stepIndex = useState(stepIndexState);

    const email = useState(emailState);
    const password = useState(passwordState);

    const obscurePasswordState = createState(true);
    const obscurePassword = useState(obscurePasswordState);

    return (
        <div
            key={0}
            className="bg-[url('/images/bg_login.png')] bg-center bg-cover w-screen h-screen"
        >
            <div className="container mx-auto grid grid-cols-2 h-full items-center">
                <form onSubmit={() => stepIndex.set(stepIndex.get() + 1)}>
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
                            <div className="">
                                Welcome to CopperCoins portal, mauris neque
                                nisi, faucibus non elementum in, convallis et
                                eros.
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
                                value={email.get()}
                                onChange={(e) => email.set(e.target.value)}
                                placeholder="user@mail.com"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={
                                        obscurePassword.get()
                                            ? "password"
                                            : "text"
                                    }
                                    id="password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
                                    value={password.get()}
                                    onChange={(e) =>
                                        password.set(e.target.value)
                                    }
                                    placeholder={
                                        obscurePassword.get()
                                            ? "**********"
                                            : "Password"
                                    }
                                    required
                                />
                                <button
                                    type="button"
                                    className="text-amber-500 font-medium absolute right-2.5 bottom-2.5"
                                    onClick={() =>
                                        obscurePassword.set(
                                            !obscurePassword.get()
                                        )
                                    }
                                >
                                    {obscurePassword.get() ? "Show" : "Hide"}
                                </button>
                            </div>
                            <small className="text-neutral-500">
                                *Please use 8 or more characters with a mix
                                uppercase, lowercase and numbers
                            </small>
                        </div>
                        <div>
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
                        <button
                            type="submit"
                            className="text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full duration-300"
                        >
                            Register
                        </button>
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
