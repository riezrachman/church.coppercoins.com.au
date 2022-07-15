import React from "react";
import { useLocation } from "react-router-dom";

const Tab = () => {
    const location = useLocation();
    return (
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
            <ul className="flex flex-wrap -mb-px space-x-2">
                <li className="">
                    <a
                        href="/preference"
                        className={`inline-block p-4 rounded-t-lg border-b-2 ${
                            location.pathname == "/preference"
                                ? "text-amber-500 border-amber-500"
                                : "border-transparent"
                        } hover:text-amber-600 hover:border-amber-600 duration-300`}
                    >
                        Account
                    </a>
                </li>
                <li className="">
                    <a
                        href="/preference/campaign-management"
                        className={`inline-block p-4 rounded-t-lg border-b-2 ${
                            location.pathname ==
                            "/preference/campaign-management"
                                ? "text-amber-500 border-amber-500"
                                : "border-transparent"
                        } hover:text-amber-600 hover:border-amber-600 duration-300`}
                    >
                        Campaign Management
                    </a>
                </li>
                <li className="">
                    <a
                        href="/preference/withdrawal-account"
                        className={`inline-block p-4 rounded-t-lg border-b-2 ${
                            location.pathname ==
                            "/preference/withdrawal-account"
                                ? "text-amber-500 border-amber-500"
                                : "border-transparent"
                        } hover:text-amber-600 hover:border-amber-600 duration-300`}
                    >
                        Withdrawal Account
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Tab;
