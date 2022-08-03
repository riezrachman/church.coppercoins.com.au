import React from "react";

const Steps = ({ currentIndex }) => {
    return (
        <div className="flex flex-col space-y-2">
            <div className="flex space-x-2 items-center">
                <div
                    className={`${
                        currentIndex == 1 ? "bg-black" : "bg-black/30"
                    } text-white rounded-full flex justify-center items-center w-6 h-6 p-1`}
                >
                    1
                </div>
                <div className={`${currentIndex == 1 ? "" : "text-black/30"}`}>
                    Church Profile
                </div>
            </div>
            <div className={`flex space-x-2 items-center`}>
                <div
                    className={`${
                        currentIndex == 2 ? "bg-black" : "bg-black/30"
                    } text-white rounded-full flex justify-center items-center w-6 h-6 p-1`}
                >
                    2
                </div>
                <div className={`${currentIndex == 2 ? "" : "text-black/30"}`}>
                    Contact Person
                </div>
            </div>
            <div className={`flex space-x-2 items-center`}>
                <div
                    className={`${
                        currentIndex == 3 ? "bg-black" : "bg-black/30"
                    } text-white rounded-full flex justify-center items-center w-6 h-6 p-1`}
                >
                    3
                </div>
                <div className={`${currentIndex == 3 ? "" : "text-black/30"}`}>
                    Bank Account
                </div>
            </div>
            <div className={`flex space-x-2 items-center`}>
                <div
                    className={`${
                        currentIndex == 4 ? "bg-black" : "bg-black/30"
                    } text-white rounded-full flex justify-center items-center w-6 h-6 p-1`}
                >
                    4
                </div>
                <div className={`${currentIndex == 4 ? "" : "text-black/30"}`}>
                    Agreement
                </div>
            </div>
            <div className={`flex space-x-2 items-center`}>
                <div
                    className={`${
                        currentIndex == 5 ? "bg-black" : "bg-black/30"
                    } text-white rounded-full flex justify-center items-center w-6 h-6 p-1`}
                >
                    5
                </div>
                <div className={`${currentIndex == 5 ? "" : "text-black/30"}`}>
                    Verification
                </div>
            </div>
        </div>
    );
};

export default Steps;
