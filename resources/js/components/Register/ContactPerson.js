import React from "react";
import { useState } from "@hookstate/core";

import Steps from "./Steps";

import {
    stepIndexState,
    nameState,
    emailState,
    phoneState,
} from "./RegisterController";

const ContactPerson = () => {
    const stepIndex = useState(stepIndexState);

    const name = useState(nameState);
    const email = useState(emailState);
    const phone = useState(phoneState);

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
                    <div className="text-3xl font-bold">Contact Person</div>
                    <div>
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
                            value={name.get()}
                            onChange={(e) => name.set(e.target.value)}
                            placeholder="Full Name"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
                            value={email.get()}
                            onChange={(e) => email.set(e.target.value)}
                            placeholder="Email"
                            disabled
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="phone"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Phone Number
                        </label>
                        <input
                            type="number"
                            id="phone"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
                            value={phone.get()}
                            onChange={(e) => phone.set(e.target.value)}
                            placeholder="Phone Number"
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

export default ContactPerson;
