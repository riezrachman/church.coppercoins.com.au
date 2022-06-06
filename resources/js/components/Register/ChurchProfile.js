import React from "react";
import { useState } from "@hookstate/core";

import Steps from "./Steps";

import {
    stepIndexState,
    churchNameState,
    churchAddressState,
    churchCityState,
    churchPostalCodeState,
    churchCountryState,
} from "./RegisterController";

const ChurchProfile = () => {
    const stepIndex = useState(stepIndexState);

    const churchName = useState(churchNameState);
    const churchAddress = useState(churchAddressState);
    const churchCity = useState(churchCityState);
    const churchPostalCode = useState(churchPostalCodeState);
    const churchCountry = useState(churchCountryState);

    return (
        <div className="grid grid-cols-2">
            <div className="bg-[url('/images/bg_login.png')] bg-center bg-cover h-screen p-12 space-y-4">
                <img className="h-12" src="/images/logo_full.png" alt="" />
                <div className="">
                    Be part of us, mauris neque nisi faucibus non elementum in,
                    convallis et eros.
                </div>
                <Steps currentIndex={stepIndex.get()} />
            </div>
            <form onSubmit={() => stepIndex.set(stepIndex.get() + 1)}>
                <div className="bg-white p-12 flex flex-col space-y-4">
                    <div className="text-3xl font-bold">Church Profile</div>
                    <div>
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Church Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
                            value={churchName.get()}
                            onChange={(e) => churchName.set(e.target.value)}
                            placeholder="Church Name"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="address"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Church Address
                        </label>
                        <textarea
                            type="text"
                            id="address"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
                            value={churchAddress.get()}
                            onChange={(e) => churchAddress.set(e.target.value)}
                            placeholder="Church Address"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label
                                htmlFor="city"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                City
                            </label>
                            <input
                                type="text"
                                id="city"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
                                value={churchCity.get()}
                                onChange={(e) => churchCity.set(e.target.value)}
                                placeholder="Church Address"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="postal_code"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                ZIP Code
                            </label>
                            <input
                                type="number"
                                id="postal_code"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
                                value={churchPostalCode.get()}
                                onChange={(e) =>
                                    churchPostalCode.set(e.target.value)
                                }
                                placeholder="Church Address"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="country"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Country
                            </label>
                            <input
                                type="text"
                                id="country"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
                                value={churchCountry.get()}
                                onChange={(e) =>
                                    churchCountry.set(e.target.value)
                                }
                                placeholder="Church Address"
                                required
                            />
                        </div>
                    </div>
                    <div className="place-self-end">
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

export default ChurchProfile;
