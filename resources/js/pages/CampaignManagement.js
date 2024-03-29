import React, { useState, useEffect } from "react";
import axios from "axios";

import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Tab from "../components/Preference/Tab";

const CampaignManagement = () => {
    const [institutions, setInstitutions] = useState([]);

    const [institutionId, setInstitutionId] = useState("");
    const [bsb, setBsb] = useState("");
    const [accountName, setAccountName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            const formData = new FormData();
            formData.append("insitution_id", institutionId);
            formData.append("bsb", bsb);
            formData.append("account_name", accountName);
            formData.append("account_number", accountNumber);
            const apiUrl = process.env.MIX_MAIN_APP_URL;
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `${apiUrl}/api/church-bank`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response);
            await fetchAccount();
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
            setError(message);
        }
    };
    const fetchAccount = async () => {
        try {
            setLoading(true);
            const apiUrl = process.env.MIX_MAIN_APP_URL;
            const token = localStorage.getItem("token");
            await getBankInstitution();
            const response = await axios.get(`${apiUrl}/api/church-bank/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status == 200) {
                console.log(response.data);
                if (response.data.data) {
                    setInstitutionId(response.data.data.institution.id);
                    setBsb(response.data.data.bsb);
                    setAccountName(response.data.data.account_name);
                    setAccountNumber(response.data.data.account_number);
                }
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
            setError(message);
        }
    };
    async function getBankInstitution() {
        try {
            const apiUrl = process.env.MIX_MAIN_APP_URL;
            const response = await axios.get(`${apiUrl}/api/bank-institution`, {
                headers: {
                    Accept: "application/json",
                },
            });
            setInstitutions(response.data.data);
        } catch (error) {
            console.log(error);
            setError("Failed to load Bank list");
        }
    }
    useEffect(() => {
        fetchAccount();
    }, []);
    return (
        <Layout>
            <Navbar />
            <div className="container mx-auto flex">
                <Sidebar />
                <main className="w-full p-10 space-y-4">
                    <div className="text-xl font-bold">Withdrawal Account</div>
                    <Tab />
                    <form onSubmit={handleSubmit}>
                        <div className="w-full space-y-4">
                            {loading && (
                                <div
                                    className="p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg"
                                    role="alert"
                                >
                                    <svg
                                        role="status"
                                        className="inline w-4 h-4 mr-3 text-blue-700 animate-spin"
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
                                    Please wait...
                                </div>
                            )}
                            {error && (
                                <div
                                    className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                                    role="alert"
                                >
                                    {error}
                                </div>
                            )}
                            <div>
                                <label
                                    htmlFor="bsb"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    BSB
                                </label>
                                <select
                                    id="institution_id"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
                                    value={institutionId}
                                    onChange={(e) =>
                                        setInstitutionId(e.target.value)
                                    }
                                    required
                                >
                                    {institutions.map((e) => (
                                        <option key={e.id} value={e.id}>
                                            {e.full_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label
                                    htmlFor="bsb"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    BSB
                                </label>
                                <input
                                    type="text"
                                    id="bsb"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
                                    value={bsb}
                                    onChange={(e) => setBsb(e.target.value)}
                                    placeholder="Enter your BSB"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="account_name"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Account Name
                                </label>
                                <input
                                    type="text"
                                    id="account_name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
                                    value={accountName}
                                    onChange={(e) =>
                                        setAccountName(e.target.value)
                                    }
                                    placeholder="Enter your account name"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="account_number"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Account Number
                                </label>
                                <input
                                    type="text"
                                    id="account_number"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
                                    value={accountNumber}
                                    onChange={(e) =>
                                        setAccountNumber(e.target.value)
                                    }
                                    placeholder="Enter your account number"
                                    required
                                />
                            </div>
                            {loading ? (
                                <button
                                    disabled
                                    type="button"
                                    className="text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 duration-300 flex justify-center items-center shrink"
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
                                    className="text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 duration-300 shrink"
                                >
                                    Save Changes
                                </button>
                            )}
                        </div>
                    </form>
                </main>
            </div>
        </Layout>
    );
};

export default CampaignManagement;
