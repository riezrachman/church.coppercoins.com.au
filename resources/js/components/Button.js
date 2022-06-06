import React from "react";

const Button = ({ children, ...props }) => {
    <button
        type="button"
        className="text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
        {...props}
    >
        {children}
    </button>;
};

export default Button;
