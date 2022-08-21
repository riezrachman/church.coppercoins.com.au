import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfileComponent = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const fetchProfile = async () => {
        try {
            setLoading(true);
            const apiUrl = process.env.MIX_MAIN_APP_URL;
            const token = localStorage.getItem("token");
            const response = await axios.get(`${apiUrl}/api/church/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            setData(response.data.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            var message = "Oops! Something went wrong...";
            if (error.response) {
                console.log(error.response);
                message = error.response.data.message;
            } else {
                console.log(error);
            }
            setError(message);
        }
    };
    useEffect(() => {
        fetchProfile();
    }, []);
    return loading ? (
        <></>
    ) : (
        <div className="border bg-white rounded-lg p-4 flex flex-col space-y-4">
            <div className="flex space-x-4">
                <img
                    className="rounded-lg object-cover object-center h-24 aspect-square"
                    src="/images/placeholder.png"
                    alt=""
                />
                <div className="flex flex-col space-y-2">
                    <div className="text-xl font-bold">
                        {data ? data.name : "-"}
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <small className="text-xs font-thin">
                                Australian Business Number
                            </small>
                            <div>{data ? data.user.profile.phone : "-"}</div>
                        </div>
                        <div>
                            <small className="text-xs font-thin">Website</small>
                            <div>coppercoins.com</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="font-bold mb-4">Contact Information</div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-2">
                        <div className="flex space-x-4">
                            <div className="text-gray-500 w-1/2">Email</div>
                            <div>{data ? data.user.email : "-"}</div>
                        </div>
                        <div className="flex space-x-4">
                            <div className="text-gray-500 w-1/2">
                                Contact Number
                            </div>
                            <div>{data ? data.user.profile.phone : "-"}</div>
                        </div>
                        <div className="flex space-x-4">
                            <div className="text-gray-500 w-1/2">
                                Contact Person
                            </div>
                            <div>{data ? data.user.name : "-"}</div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <div className="flex space-x-4">
                            <div className="text-gray-500 w-1/2">
                                Church Address
                            </div>
                            <div>{data ? data.address.address : "-"}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileComponent;
