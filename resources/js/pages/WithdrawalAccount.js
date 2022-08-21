import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Modal from "react-modal";

import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Tab from "../components/Preference/Tab";

const WithdrawalAccount = () => {
    const bannerImageRef = useRef("");

    const [name, setName] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [campaignContent, setCampaignContent] = useState("");
    const [donationContent, setDonationContent] = useState("");
    const [bannerImage, setBannerImage] = useState(null);
    const [bannerImagePreview, setBannerImagePreview] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    Modal.setAppElement("#app");
    const [modalPreviewIsOpen, setModalPreviewIsOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("name", name);
            formData.append("introduction", introduction);
            formData.append("campaign_content", campaignContent);
            formData.append("donation_content", donationContent);
            if (bannerImage != null) {
                formData.append("banner_image", bannerImage);
            }

            const apiUrl = process.env.MIX_MAIN_APP_URL;
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `${apiUrl}/api/campaign`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response);
            await fetchCampaign();
            setLoading(false);
            setModalPreviewIsOpen(true);
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
    const fetchCampaign = async () => {
        try {
            setLoading(true);
            const apiUrl = process.env.MIX_MAIN_APP_URL;
            const token = localStorage.getItem("token");
            const response = await axios.get(`${apiUrl}/api/campaign/null`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status == 200) {
                console.log(response.data);
                if (response.data.data) {
                    setBannerImagePreview(response.data.data.banner_image);
                    setName(response.data.data.name);
                    setIntroduction(response.data.data.introduction);
                    setCampaignContent(response.data.data.campaign_content);
                    setDonationContent(response.data.data.donation_content);
                }
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
    const onSelectBannerImage = (e) => {
        e.preventDefault();
        bannerImageRef.current.click();
    };
    const onChangeBannerImage = (e) => {
        const file = e.target.files[0];
        setBannerImage(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            setBannerImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
    };
    useEffect(() => {
        fetchCampaign();
    }, []);
    return (
        <Layout>
            <Navbar />
            <div className="container mx-auto flex">
                <Sidebar />
                <main className="w-full p-10 space-y-4">
                    <div className="text-xl font-bold">Campaign Management</div>
                    <Tab />
                    <form onSubmit={handleSubmit}>
                        <div className="w-full space-y-4">
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
                                    className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                                    role="alert"
                                >
                                    {error}
                                </div>
                            )}
                            <div>
                                <label
                                    htmlFor="banner"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Banner Image
                                </label>
                                <div
                                    className={`rounded-lg border border-neutral-200 w-2/3 aspect-video`}
                                >
                                    {bannerImagePreview != null ? (
                                        <img
                                            className="rounded-lg object-center object-cover cursor-pointer"
                                            src={bannerImagePreview}
                                            alt="Banner Image"
                                            onClick={onSelectBannerImage}
                                        />
                                    ) : (
                                        <div className="flex flex-col justify-center items-center space-y-2 p-10 h-full">
                                            <FontAwesomeIcon
                                                icon={solid("image")}
                                            />
                                            <div>
                                                Format file JPG, PNG and max.
                                                image size is 10MB
                                            </div>
                                            <button
                                                type="button"
                                                className="text-black border border-neutral-300 bg-white hover:bg-neutral-300 focus:ring-4 focus:ring-neutral-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 duration-300"
                                                onClick={onSelectBannerImage}
                                            >
                                                Upload Image
                                            </button>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        ref={bannerImageRef}
                                        onChange={onChangeBannerImage}
                                        className="hidden"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Campaign Title
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your campaign title"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="introduction"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Campaign Introduction
                                </label>
                                <textarea
                                    id="introduction"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
                                    value={introduction}
                                    onChange={(e) =>
                                        setIntroduction(e.target.value)
                                    }
                                    placeholder="Enter your campaign introduction"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="campaign_content"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Campaign Content
                                </label>
                                <textarea
                                    id="campaign_content"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
                                    value={campaignContent}
                                    onChange={(e) =>
                                        setCampaignContent(e.target.value)
                                    }
                                    placeholder="Enter your campaign content"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="donation_content"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Donation Content
                                </label>
                                <textarea
                                    id="donation_content"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
                                    value={donationContent}
                                    onChange={(e) =>
                                        setDonationContent(e.target.value)
                                    }
                                    placeholder="Enter your donation content"
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
                                    Preview
                                </button>
                            )}
                        </div>
                    </form>
                </main>
            </div>
            <Modal
                isOpen={modalPreviewIsOpen}
                onRequestClose={() => setModalPreviewIsOpen(false)}
                contentLabel="Preview"
                className="relative p-4 w-full max-w-2xl h-full md:h-auto"
                overlayClassName="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex justify-center items-center bg-white/50 backdrop-blur-sm"
            >
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex justify-between items-center p-4 rounded-t border-b dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Preview
                        </h3>
                        <div className="flex space-x-2">
                            <button
                                type="button"
                                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-amber-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 duration-300"
                                onClick={() => setModalPreviewIsOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center duration-300"
                                onClick={() => setModalPreviewIsOpen(false)}
                            >
                                Publish
                            </button>
                        </div>
                    </div>
                    <div className="p-6 space-y-2">
                        <img
                            className="rounded-lg object-center object-cover"
                            src={bannerImagePreview}
                            alt="Banner Image Preview"
                        />
                        <div className="text-xl font-bold">{name}</div>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {campaignContent}
                        </p>
                    </div>
                </div>
            </Modal>
        </Layout>
    );
};

export default WithdrawalAccount;
