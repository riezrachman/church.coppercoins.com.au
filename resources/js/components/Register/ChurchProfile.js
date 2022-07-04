import React from "react";
import { useState } from "@hookstate/core";

import Steps from "./Steps";

import {
    stepIndexState,
    churchNameState,
    churchAddressState,
    churchCityState,
    churchStateState,
    churchPostalCodeState,
    churchCountryState,
} from "./RegisterController";
import Label from "../Label";

const ChurchProfile = () => {
    const stepIndex = useState(stepIndexState);

    const churchName = useState(churchNameState);
    const churchAddress = useState(churchAddressState);
    const churchCity = useState(churchCityState);
    const churchState = useState(churchStateState);
    const churchPostalCode = useState(churchPostalCodeState);
    const churchCountry = useState(churchCountryState);

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
            <form
                onSubmit={() => stepIndex.set(stepIndex.get() + 1)}
                className="col-span-2"
            >
                <div className="bg-white py-12 px-56 flex flex-col space-y-4">
                    <div className="text-3xl font-bold">Church Profile</div>
                    <div>
                        <Label htmlFor="name">Church Name</Label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            value={churchName.get()}
                            onChange={(e) => churchName.set(e.target.value)}
                            placeholder="Church Name"
                            minLength={6}
                            maxLength={255}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="address">Church Address</Label>
                        <input
                            type="text"
                            id="address"
                            className="form-control"
                            value={churchAddress.get()}
                            onChange={(e) => churchAddress.set(e.target.value)}
                            placeholder="Church Address"
                            minLength={6}
                            maxLength={255}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div>
                            <Label htmlFor="city">City</Label>
                            <input
                                type="text"
                                id="city"
                                className="form-control"
                                value={churchCity.get()}
                                onChange={(e) => churchCity.set(e.target.value)}
                                placeholder="City"
                                minLength={6}
                                maxLength={255}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="state">State</Label>
                            <input
                                type="text"
                                id="state"
                                className="form-control"
                                value={churchState.get()}
                                onChange={(e) =>
                                    churchState.set(e.target.value)
                                }
                                placeholder="State"
                                minLength={6}
                                maxLength={255}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="postal_code">ZIP Code</Label>
                            <input
                                type="number"
                                id="postal_code"
                                className="form-control"
                                value={churchPostalCode.get()}
                                onChange={(e) =>
                                    churchPostalCode.set(e.target.value)
                                }
                                placeholder="Postal Code"
                                minLength={6}
                                maxLength={6}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="country">Country</Label>
                            <input
                                type="text"
                                id="country"
                                className="form-control"
                                value={churchCountry.get()}
                                onChange={(e) =>
                                    churchCountry.set(e.target.value)
                                }
                                placeholder="Country"
                                minLength={6}
                                maxLength={255}
                                required
                            />
                        </div>
                    </div>
                    <div className="place-self-end">
                        <button type="submit" className="btn btn-primary">
                            Next
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ChurchProfile;
