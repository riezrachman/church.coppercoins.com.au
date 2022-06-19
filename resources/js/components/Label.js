import React from "react";

const Label = (props) => {
    return (
        <label
            className="block mb-2 text-xs font-light text-gray-500"
            {...props}
        >
            {props.children}
        </label>
    );
};

export default Label;
