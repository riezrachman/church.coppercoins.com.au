import React from "react";
import axios from "axios";
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
import LoadingButton from "../LoadingButton";
import { Link } from "react-router-dom";

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
        <div className="grid grid-cols-3">
            <div className="bg-[url('/images/bg_login.png')] bg-right bg-cover bg-no-repeat h-screen p-12 space-y-4">
                <a href={process.env.MIX_MAIN_APP_URL}>
                    <img className="h-12" src="/images/logo_full.png" alt="" />
                </a>
                <div className="text-gray-500 font-light">
                    Be part of us, mauris neque nisi faucibus non elementum in,
                    convallis et eros.
                </div>
                <Steps currentIndex={stepIndex.get()} />
            </div>
            <form onSubmit={handleRegister} className="col-span-2">
                <div className="bg-white py-12 px-56 flex flex-col space-y-4">
                    <div className="text-3xl font-bold">Agreement</div>
                    <div className="text-gray-500 font-light">
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
                            I agree and understand the{" "}
                            <Link to={`/privacy-policy`} className="underline">
                                Privacy Policy
                            </Link>
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
                            I agree and understand the{" "}
                            <Link to={`/terms`} className="underline">
                                Website Terms of Use
                            </Link>
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
                            I agree and understand the{" "}
                            <Link to={`/terms`} className="underline">
                                Charity Terms of Use
                            </Link>
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
                            <LoadingButton className="btn btn-primary" />
                        ) : (
                            <button
                                type="submit"
                                className="btn btn-primary"
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
