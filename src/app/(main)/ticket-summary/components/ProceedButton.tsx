"use client";

import { useRouter } from "next/navigation";

export default function ProceedButton() {
    const router = useRouter();

    const handleClick = () => {
        router.push("/payment");
    };

    return (
        <div className="text-right max-w-3xl mx-auto px-4 sm:px-6">
            <button
                onClick={handleClick}
                className="bg-blue-800 hover:bg-blue-900 text-white py-3 px-6 rounded-md font-semibold w-full sm:w-auto"
            >
                Proceed to Payment
            </button>
        </div>
    );
}
