import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import axios from "axios";

const Navbar = () => {
    const navigate = useNavigate();

    const onLogout = async (e) => {
        try {
            e.preventDefault();

            const formData = new FormData();

            const apiUrl = process.env.MIX_MAIN_APP_URL;

            const response = await axios.post(
                `${apiUrl}/api/auth/sign-out`,
                formData
            );

            localStorage.clear();

            console.log(response);
            navigate("/sign-in");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded drop-shadow-lg">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <a
                    href={process.env.MIX_MAIN_APP_URL}
                    className="flex items-center"
                >
                    <img
                        src="/images/logo_full.png"
                        className="mr-3 h-6 sm:h-9"
                        alt="Copper Coins Logo"
                    />
                </a>
                <button
                    data-collapse-toggle="mobile-menu"
                    type="button"
                    className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    aria-controls="mobile-menu"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    <svg
                        className="hidden w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>
                <div
                    className="hidden w-full md:block md:w-auto"
                    id="mobile-menu"
                >
                    <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-md md:font-medium">
                        <li>
                            <a
                                href=""
                                className="block py-2 pr-4 pl-3 text-white bg-amber-500 rounded md:bg-transparent md:text-amber-500 md:p-0"
                                aria-current="page"
                            >
                                <FontAwesomeIcon icon={solid("bell")} />
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 pr-4 pl-3 text-white bg-neutral-500 rounded md:bg-transparent md:text-neutral-500 md:p-0"
                                aria-current="page"
                                onClick={onLogout}
                            >
                                <FontAwesomeIcon
                                    icon={solid("sign-out-alt")}
                                    className="mr-2"
                                />
                                Sign Out
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
