import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

import Step1 from "../components/Register/Step1";

const Register = () => {
    const steps = [
        <div
            key={0}
            className="bg-[url('/images/bg_login.png')] bg-center bg-cover w-screen h-screen"
        >
            <div className="container mx-auto grid grid-cols-2 h-full items-center">
                <form onSubmit={(e) => setStepIndex(1)}>
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
                        {validation && validation.message && (
                            <div
                                className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                                role="alert"
                            >
                                {validation.message}
                            </div>
                        )}
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                    type={obscurePassword ? "password" : "text"}
                                    id="password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder={
                                        obscurePassword
                                            ? "**********"
                                            : "password"
                                    }
                                    required
                                />
                                <button
                                    type="button"
                                    className="text-amber-500 font-medium absolute right-2.5 bottom-2.5"
                                    onClick={() =>
                                        setObscurePassword(!obscurePassword)
                                    }
                                >
                                    {obscurePassword ? "Show" : "Hide"}
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
                            className="text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-full duration-300"
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
        </div>,
        <Step1 key={1} />,
    ];

    const [stepIndex, setStepIndex] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [obscurePassword, setObscurePassword] = useState(true);

    const [loading, setLoading] = useState(false);
    const [validation, setValidation] = useState([]);

    const navigate = useNavigate();

    return steps[stepIndex];
};

export default Register;
