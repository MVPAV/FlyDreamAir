"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    const handleClick = () => {
        router.back();
    };

    return (
        <div className="text-right max-w-3xl mx-auto px-4 sm:px-6">
            <button
                onClick={handleClick}
                className="bg-white text-black py-3 px-6 rounded-md font-semibold w-full sm:w-auto border border-gray-300 hover:bg-gray-100 transition"
            >
                Return
            </button>
        </div>
    );
}
