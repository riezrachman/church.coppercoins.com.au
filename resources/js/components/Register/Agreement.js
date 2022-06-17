import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createState, useState } from "@hookstate/core";

import Steps from "./Steps";

import {
    stepIndexState,
    emailState,
    passwordState,
    churchNameState,
    churchAddressState,
    churchCityState,
    churchStateState,
    churchPostalCodeState,
    churchCountryState,
    nameState,
    phoneState,
} from "./RegisterController";

const Agreement = () => {
    const stepIndex = useState(stepIndexState);

    const agreeAllState = createState(false);
    const agreeAll = useState(agreeAllState);
    const agreePrivacyPolicyState = createState(false);
    const agreePrivacy = useState(agreePrivacyPolicyState);
    const agreeWebsiteTermsState = createState(false);
    const agreeWebsiteTerms = useState(agreeWebsiteTermsState);
    const agreeCharityTermsState = createState(false);
    const agreeCharityTerms = useState(agreeCharityTermsState);

    const email = useState(emailState);
    const password = useState(passwordState);

    const churchName = useState(churchNameState);
    const churchAddress = useState(churchAddressState);
    const churchCity = useState(churchCityState);
    const churchState = useState(churchStateState);
    const churchPostalCode = useState(churchPostalCodeState);
    const churchCountry = useState(churchCountryState);

    const name = useState(nameState);
    const phone = useState(phoneState);

    const navigate = useNavigate();

    const loadingState = createState(false);
    const loading = useState(loadingState);

    const errorState = createState("");
    const errorMessage = useState(errorState);

    const toggleAgreeAll = () => {
        agreeAll.set(!agreeAll.get());
        if (agreeAll.get() == true) {
            agreePrivacy.set(true);
            agreeWebsiteTerms.set(true);
            agreeCharityTerms.set(true);
        } else {
            agreePrivacy.set(false);
            agreeWebsiteTerms.set(false);
            agreeCharityTerms.set(false);
        }
    };

    const checkAgreeAll = () => {
        if (
            agreePrivacy.get() &&
            agreeWebsiteTerms.get() &&
            agreeCharityTerms.get()
        ) {
            agreeAll.set(true);
        } else {
            agreeAll.set(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            loading.set(true);

            const formData = new FormData();
            formData.append("name", name.get());
            formData.append("phone", phone.get());
            formData.append("email", email.get());
            formData.append("password", password.get());
            formData.append("role", "church");
            formData.append("church[name]", churchName.get());
            formData.append("church[address]", churchAddress.get());
            formData.append("church[city]", churchCity.get());
            formData.append("church[state]", churchState.get());
            formData.append("church[country]", churchCountry.get());
            formData.append("church[postal_code]", churchPostalCode.get());

            const apiUrl = process.env.MIX_MAIN_APP_URL;
            const response = await axios.post(
                `${apiUrl}/api/auth/sign-up`,
                formData
            );

            loading.set(false);

            if (response.status == 200) {
                localStorage.setItem("token", response.data.data.token);
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
        <div className="grid grid-cols-2">
            <div className="bg-[url('/images/bg_login.png')] bg-right bg-cover bg-no-repeat h-screen p-12 space-y-4">
                <img className="h-12" src="/images/logo_full.png" alt="" />
                <div className="">
                    Be part of us, mauris neque nisi faucibus non elementum in,
                    convallis et eros.
                </div>
                <Steps currentIndex={stepIndex.get()} />
            </div>
            <form onSubmit={handleRegister}>
                <div className="bg-white p-12 flex flex-col space-y-4">
                    <div className="text-3xl font-bold">Agreement</div>
                    <div>
                        I declare that i have read and fully understand and i
                        agree to comply by the following legal documents
                    </div>
                    {errorMessage.get() != "" && (
                        <div
                            className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                            role="alert"
                        >
                            {errorMessage.get()}
                        </div>
                    )}
                    <div className="flex items-center">
                        <input
                            id="agree_all"
                            type="checkbox"
                            checked={agreeAll.get()}
                            onChange={toggleAgreeAll}
                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                            htmlFor="agree_all"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            I agree and understand all documents
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            id="agree_privacy_policy"
                            type="checkbox"
                            checked={agreePrivacy.get()}
                            onChange={() => {
                                agreePrivacy.set(!agreePrivacy.get());
                                checkAgreeAll();
                            }}
                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                            htmlFor="agree_privacy_policy"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            I agree and understand the Privacy Policy
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            id="agree_website_terms"
                            type="checkbox"
                            checked={agreeWebsiteTerms.get()}
                            onChange={() => {
                                agreeWebsiteTerms.set(!agreeWebsiteTerms.get());
                                checkAgreeAll();
                            }}
                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                            htmlFor="agree_website_terms"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            I agree and understand the Website Terms of Use
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            id="agree_charity_terms"
                            type="checkbox"
                            checked={agreeCharityTerms.get()}
                            onChange={() => {
                                agreeCharityTerms.set(!agreeCharityTerms.get());
                                checkAgreeAll();
                            }}
                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                            htmlFor="agree_charity_terms"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            I agree and understand the Charity Terms of Use
                        </label>
                    </div>
                    <div className="flex justify-between items-center">
                        <a
                            href="#"
                            className="text-amber-500 font-medium"
                            onClick={() => stepIndex.set(stepIndex.get() - 1)}
                        >
                            Previous
                        </a>
                        {loading.get() ? (
                            <button
                                disabled
                                type="button"
                                className="text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 duration-300 flex justify-center items-center"
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
                                className="text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 duration-300"
                                disabled={!agreeAll.get()}
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Agreement;
