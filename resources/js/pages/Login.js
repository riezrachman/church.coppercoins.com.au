import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [obscurePassword, setObscurePassword] = useState(true);

    const [loading, setLoading] = useState(false);
    const [validation, setValidation] = useState([]);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);
            const apiUrl = process.env.MIX_MAIN_APP_URL;
            const response = await axios.post(
                `${apiUrl}/api/auth/sign-in`,
                formData
            );
            if (response.data.data.user.role == "church") {
                localStorage.setItem("token", response.data.data.token);
                setLoading(false);
                navigate("/");
            } else {
                setLoading(false);
                setValidation({
                    message: "Your account not registered as church.",
                    status: false,
                    data: null,
                });
            }
        } catch (error) {
            setLoading(false);
            var message = "Oops! Something went wrong...";
            if (error.response) {
                console.log(error.response);
                message = error.response.data.message;
            } else {
                console.log(error);
            }
            setValidation({
                message: message,
                status: false,
                data: null,
            });
        }
    };

    return (
        <div className="h-screen w-screen">
            <div className="bg-[url('/images/bg_login.png')] bg-no-repeat bg-cover bg-center bg-fixed min-h-screen py-16">
                <div className="container mx-auto grid grid-cols-2 h-full items-center">
                    <form onSubmit={handleLogin}>
                        <div className="bg-white rounded-lg w-full p-12 space-y-4">
                            <a href={process.env.MIX_MAIN_APP_URL}>
                                <img
                                    className="h-12"
                                    src="/images/logo_full.png"
                                    alt=""
                                />
                            </a>
                            <div>
                                <div className="text-3xl font-bold">
                                    Church Portal
                                </div>
                                <div className="">
                                    Welcome to CopperCoins portal, mauris neque
                                    nisi, faucibus non elementum in, convallis
                                    et eros.
                                </div>
                            </div>
                            {validation.message && (
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
                                        type={
                                            obscurePassword
                                                ? "password"
                                                : "text"
                                        }
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
                            </div>
                            <div>
                                <NavLink
                                    to={``}
                                    className="text-amber-500 font-medium"
                                >
                                    Forgot Password?
                                </NavLink>
                            </div>
                            {loading ? (
                                <button
                                    disabled
                                    type="button"
                                    className="text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 duration-300 w-full flex justify-center items-center"
                                >
                                    <svg
                                        role="status"
                                        className="inline w-4 h-4 mr-3 text-white animate-spin"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="#E5E7EB"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    Loading...
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 block w-full duration-300"
                                >
                                    Login
                                </button>
                            )}
                            <div>
                                Do not have a church account? Please{" "}
                                <Link
                                    to={`/sign-up`}
                                    className="text-amber-500 font-medium"
                                >
                                    register here
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
