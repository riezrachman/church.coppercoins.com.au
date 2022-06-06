import React from "react";
import { useState } from "@hookstate/core";

import { stepIndexState } from "../components/Register/RegisterController";
import InitialForm from "../components/Register/InitialForm";
import ChurchProfile from "../components/Register/ChurchProfile";
import ContactPerson from "../components/Register/ContactPerson";
import BankAccount from "../components/Register/BankAccount";
import Agreement from "../components/Register/Agreement";
import Verification from "../components/Register/Verification";

const Register = () => {
    const stepIndex = useState(stepIndexState);

    const steps = [
        <InitialForm key={0} />,
        <ChurchProfile key={1} />,
        <ContactPerson key={2} />,
        <BankAccount key={3} />,
        <Agreement key={4} />,
        <Verification key={5} />,
    ];

    return steps[stepIndex.get()];
};

export default Register;
