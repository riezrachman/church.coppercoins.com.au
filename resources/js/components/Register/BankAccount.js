import React, { useEffect } from "react";
import { useState } from "@hookstate/core";
import axios from "axios";

import Steps from "./Steps";

import {
    stepIndexState,
    bankState,
    bankAccountNameState,
    bankAccountNumberState,
    bankBSBNumberState,
} from "./RegisterController";
import Label from "../Label";
import LoadingButton from "../LoadingButton";

const BankAccount = () => {
    const stepIndex = useState(stepIndexState);

    const [bankOption, setBankOption] = React.useState([]);

    const bank = useState(bankState);
    const bankAccountName = useState(bankAccountNameState);
    const bankAccountNumber = useState(bankAccountNumberState);
    const bankBSBNumber = useState(bankBSBNumberState);

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
        <div className="grid grid-cols-3">
            <div className="bg-[url('/images/bg_login.png')] bg-right bg-cover bg-no-repeat h-screen p-12 space-y-4">
                <img className="h-12" src="/images/logo_full.png" alt="" />
                <div className="text-gray-500 font-light">
                    Be part of us, mauris neque nisi faucibus non elementum in,
                    convallis et eros.
                </div>
                <Steps currentIndex={stepIndex.get()} />
            </div>
            <form
                onSubmit={() => stepIndex.set(stepIndex.get() + 1)}
                className="col-span-2"
            >
                <div className="bg-white py-12 px-56 flex flex-col space-y-4">
                    <div className="text-3xl font-bold">Bank Account</div>
                    <div>
                        <Label htmlFor="bank">Bank</Label>
                        <select
                            className="form-control"
                            value={bank.get()}
                            onChange={(e) => bank.set(e.target.value)}
                            required
                        >
                            <option>-- Select Bank --</option>
                            {bankOption.map((e) => {
                                return (
                                    <option key={e.value} value={e.value}>
                                        {e.label}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div>
                        <Label htmlFor="bank_account_name">Account Name</Label>
                        <input
                            type="text"
                            id="bank_account_name"
                            className="form-control"
                            value={bankAccountName.get()}
                            onChange={(e) =>
                                bankAccountName.set(e.target.value)
                            }
                            placeholder="Account Name"
                            minLength="6"
                            maxLength="255"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="bank_account_number">
                            Account Number
                        </Label>
                        <input
                            type="number"
                            id="bank_account_number"
                            className="form-control"
                            value={bankAccountNumber.get()}
                            onChange={(e) =>
                                bankAccountNumber.set(e.target.value)
                            }
                            placeholder="Account Number"
                            minLength="6"
                            maxLength="255"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="bank_bsb_number">BSB Number</Label>
                        <input
                            type="number"
                            id="bank_bsb_number"
                            className="form-control"
                            value={bankBSBNumber.get()}
                            onChange={(e) => bankBSBNumber.set(e.target.value)}
                            placeholder="BSB Number"
                            minLength="6"
                            maxLength="255"
                            required
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <a
                            href="#"
                            className="text-amber-500 font-medium"
                            onClick={() => stepIndex.set(stepIndex.get() - 1)}
                        >
                            Previous
                        </a>
                        {loading ? (
                            <LoadingButton className="btn btn-primary" />
                        ) : (
                            <button type="submit" className="btn btn-primary">
                                Next
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default BankAccount;
