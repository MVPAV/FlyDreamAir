"use client";

import { useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import Link from "next/link";

const VerifyCodeForm = () => {
    const [code, setCode] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className="flex justify-center items-center grow bg-white">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg md:max-w-2xl space-y-4 px-6 py-8 shadow-md rounded-md"
            >
                <h2 className="text-2xl font-bold text-gray-900">Verify code</h2>

                <p className="text-medium text-gray-700">
                    An Authentication Code Has Been Sent To Your Email. Enter Code:
                </p>

                <input
                    id="code"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    className="w-full border border-blue-100 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="123ABC"
                />

                <PrimaryButton type="submit">Verify</PrimaryButton>

                <p className="text-center text-medium text-gray-400">
                    Didn't Receive A Code?{" "}
                    <Link href="#" className="text-blue-600 hover:underline">
                        Resend
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default VerifyCodeForm;
