import React from "react";
import { useState } from "@hookstate/core";

import Steps from "./Steps";

import {
    stepIndexState,
    nameState,
    emailState,
    phoneState,
} from "./RegisterController";
import Label from "../Label";

const ContactPerson = () => {
    const stepIndex = useState(stepIndexState);

    const name = useState(nameState);
    const email = useState(emailState);
    const phone = useState(phoneState);

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
                    <div className="text-3xl font-bold">Contact Person</div>
                    <div>
                        <Label htmlFor="name">Full Name</Label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            value={name.get()}
                            onChange={(e) => name.set(e.target.value)}
                            placeholder="Full Name"
                            minLength="6"
                            maxLength="255"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="email">Email Address</Label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email.get()}
                            onChange={(e) => email.set(e.target.value)}
                            placeholder="Email"
                            minLength="6"
                            maxLength="255"
                            disabled
                        />
                    </div>
                    <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <input
                            type="number"
                            id="phone"
                            className="form-control"
                            value={phone.get()}
                            onChange={(e) => phone.set(e.target.value)}
                            placeholder="Phone Number"
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
                        <button type="submit" className="btn btn-primary">
                            Next
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ContactPerson;
