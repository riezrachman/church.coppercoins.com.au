import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const Sidebar = () => {
    const location = useLocation();
    return (
        <aside className="w-64 h-screen border-r bg-white" aria-label="Sidebar">
            <div className="overflow-y-auto py-4">
                <div className="text-neutral-300 px-4 font-bold my-2">
                    Portal Menu
                </div>
                <ul className="space-y-2">
                    <li>
                        <NavLink
                            to={`/`}
                            className={`flex items-center px-4 py-2 text-base font-normal ${
                                location.pathname == "/"
                                    ? "border-l-2 border-amber-500 text-amber-500"
                                    : "border-none text-neutral-500"
                            } hover:border-l-2 hover:border-amber-500 hover:text-amber-500 duration-300`}
                        >
                            <FontAwesomeIcon icon={solid("dashboard")} />
                            <span className="ml-3">Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={`/preference/withdrawal-account`}
                            className={`flex items-center px-4 py-2 text-base font-normal ${
                                location.pathname ==
                                "/preference/withdrawal-account"
                                    ? "border-l-2 border-amber-500 text-amber-500"
                                    : "border-none text-neutral-500"
                            } hover:border-l-2 hover:border-amber-500 hover:text-amber-500 duration-300`}
                        >
                            <FontAwesomeIcon icon={solid("credit-card")} />
                            <span className="ml-3">Withdrawal Account</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={`/finance`}
                            className={`flex items-center px-4 py-2 text-base font-normal ${
                                location.pathname == "/finance"
                                    ? "border-l-2 border-amber-500 text-amber-500"
                                    : "border-none text-neutral-500"
                            } hover:border-l-2 hover:border-amber-500 hover:text-amber-500 duration-300`}
                        >
                            <FontAwesomeIcon icon={solid("donate")} />
                            <span className="ml-3">Finance</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={`/preference`}
                            className={`flex items-center px-4 py-2 text-base font-normal ${
                                location.pathname == "/preference"
                                    ? "border-l-2 border-amber-500 text-amber-500"
                                    : "border-none text-neutral-500"
                            } hover:border-l-2 hover:border-amber-500 hover:text-amber-500 duration-300`}
                        >
                            <FontAwesomeIcon
                                icon={solid("screwdriver-wrench")}
                            />
                            <span className="ml-3">Setting</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
