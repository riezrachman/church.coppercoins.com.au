import React, { useEffect } from "react";
import { createState, useState } from "@hookstate/core";
import axios from "axios";
import Select from "react-select";

import Steps from "./Steps";

import {
    stepIndexState,
    bankState,
    bankUsernameState,
    bankPasswordState,
} from "./RegisterController";

const BankAccount = () => {
    const stepIndex = useState(stepIndexState);

    const [bankOption, setBankOption] = React.useState([]);

    const bank = useState(bankState);
    const bankUsername = useState(bankUsernameState);
    const bankPassword = useState(bankPasswordState);

    const obscurePasswordState = createState(true);
    const obscurePassword = useState(obscurePasswordState);

    const [loading, setLoading] = React.useState(false);

    const fetchBank = async () => {
        try {
            setLoading(true);
            const apiUrl = process.env.MIX_MAIN_APP_URL;
            const token = localStorage.getItem("token");
            const response = await axios.get(`${apiUrl}/api/bank-institution`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status == 200) {
                console.log(response.data.data);
                let data = response.data.data.map((e) => {
                    return {
                        value: e.id,
                        label: e.full_name,
                    };
                });
                setBankOption(data);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            var message = "Oops! Something went wrong...";
            if (error.response) {
                console.log(error.response);
                message = error.response.data.message;
            } else {
                console.log(error);
            }
            console.log(message);
        }
    };

    useEffect(() => {
        fetchBank();
    }, []);

    return (
        <div className="grid grid-cols-2">
            <div className="bg-[url('/images/bg_login.png')] bg-right bg-cover bg-no-repeat h-screen p-12 space-y-4">
                <img className="h-12" src="/images/logo_full.png" alt="" />
                <div className="">
                    Be part of us, mauris neque nisi faucibus non elementum in,
                    convallis et eros.
                </div>
                <Steps currentIndex={stepIndex.get()} />
            </div>
            <form onSubmit={() => stepIndex.set(stepIndex.get() + 1)}>
                <div className="bg-white p-12 flex flex-col space-y-4">
                    <div className="text-3xl font-bold">Bank Account</div>
                    <div>
                        <label
                            htmlFor="bank"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Bank
                        </label>
                        <Select
                            options={bankOption}
                            value={bank.get()}
                            onChange={(e) => bank.set(e)}
                            isLoading={loading}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="username"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
                            value={bankUsername.get()}
                            onChange={(e) => bankUsername.set(e.target.value)}
                            placeholder="Username"
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
                                    obscurePassword.get() ? "password" : "text"
                                }
                                id="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
                                value={bankPassword.get()}
                                onChange={(e) =>
                                    bankPassword.set(e.target.value)
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
                                    obscurePassword.set(!obscurePassword.get())
                                }
                            >
                                {obscurePassword.get() ? "Show" : "Hide"}
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <a
                            href="#"
                            className="text-amber-500 font-medium"
                            onClick={() => stepIndex.set(stepIndex.get() - 1)}
                        >
                            Previous
                        </a>
                        <button
                            type="submit"
                            className="text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 duration-300"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default BankAccount;
