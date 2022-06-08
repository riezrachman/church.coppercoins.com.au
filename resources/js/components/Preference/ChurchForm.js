import React, { useState, useEffect } from "react";
import axios from "axios";

const ChurchForm = () => {
    const [churchName, setChurchName] = useState("");
    const [churchAddress, setChurchAddress] = useState("");
    const [churchCity, setChurchCity] = useState("");
    const [churchPostalCode, setChurchPostalCode] = useState("");
    const [churchCountry, setChurchCountry] = useState("");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

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
            if (response.status == 200) {
                console.log(response.data.data);
                const data = response.data.data;
                setChurchName(data.name);
                setChurchAddress(data.address.address);
                setChurchCity(data.address.city);
                setChurchPostalCode(data.address.postal_code);
                setChurchCountry(data.address.country);
                setName(data.user.name);
                setEmail(data.user.email);
                setPhone(data.user.profile.phone);
            }
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

    return (
        <form className="space-y-4">
            <div className="text-xl font-bold">Church Profile</div>
            {loading && (
                <div
                    className="p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg"
                    role="alert"
                >
                    <svg
                        role="status"
                        className="inline w-4 h-4 mr-3 text-blue-700 animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor"
                        />
                    </svg>
                    Please wait...
                </div>
            )}
            {error && (
                <div
                    className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
                    role="alert"
                >
                    {error}
                </div>
            )}
            <div className="flex space-x-2">
                <img
                    className="rounded-lg border border-neutral-200 object-cover object-center w-32 h-32"
                    src="/images/placeholder.png"
                    alt=""
                />
                <div className="flex flex-col space-y-2">
                    <div>Church Logo</div>
                    <div className="text-xs font-thin">
                        Format file JPG, PNG and max. image size is 2MB
                    </div>
                    <button
                        type="button"
                        className="text-black border border-neutral-300 bg-white hover:bg-neutral-300 focus:ring-4 focus:ring-neutral-300 font-medium rounded-lg text-sm px-5 py-2.5 duration-300"
                    >
                        Upload Image
                    </button>
                </div>
            </div>
            <div>
                <label
                    htmlFor="church_name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    Church Name
                </label>
                <input
                    type="text"
                    id="church_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
                    value={churchName}
                    onChange={(e) => setChurchName(e.target.value)}
                    placeholder="Enter your church name"
                    required
                />
            </div>
            <div>
                <label
                    htmlFor="church_address"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    Church Address
                </label>
                <input
                    type="text"
                    id="church_address"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
                    value={churchAddress}
                    onChange={(e) => setChurchAddress(e.target.value)}
                    placeholder="Enter your church address"
                    required
                />
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label
                        htmlFor="church_city"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        City
                    </label>
                    <input
                        type="text"
                        id="church_city"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
                        value={churchCity}
                        onChange={(e) => setChurchCity(e.target.value)}
                        placeholder="Enter your church city"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="church_postal_code"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        ZIP Code
                    </label>
                    <input
                        type="number"
                        id="church_postal_code"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
                        value={churchPostalCode}
                        onChange={(e) => setChurchPostalCode(e.target.value)}
                        placeholder="Enter your church zip code"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="church_country"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Country
                    </label>
                    <input
                        type="text"
                        id="church_country"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
                        value={churchCountry}
                        onChange={(e) => setChurchCountry(e.target.value)}
                        placeholder="Enter your church country"
                        required
                    />
                </div>
            </div>
            <div className="text-xl font-bold">Contact Person</div>
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    required
                />
            </div>
            {loading ? (
                <button
                    disabled
                    type="button"
                    className="text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 duration-300 flex justify-center items-center shrink"
                >
                    <svg
                        role="status"
                        className="inline w-4 h-4 mr-3 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor"
                        />
                    </svg>
                    Loading...
                </button>
            ) : (
                <button
                    type="submit"
                    className="text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 duration-300 shrink"
                >
                    Save Changes
                </button>
            )}
        </form>
    );
};

export default ChurchForm;
