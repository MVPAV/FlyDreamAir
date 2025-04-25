"use client";

import { useState } from "react";
import PrimaryButton from "src/app/auth/components/PrimaryButton";
import Link from "next/link";

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className="pt-50 flex justify-center items-center bg-white">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg md:max-w-3xl space-y-4 px-6 py-8 shadow-md rounded-md"
            >
                <h2 className="text-2xl font-bold text-gray-900">Forgot your password?</h2>

                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-1" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full border border-blue-100 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-blue-300"
                        placeholder="abc@gmail.com"
                    />
                </div>

                <div className="text-right mt-1">
                    Remember your password?{" "}
                    <Link href="/auth/login" className="text-blue-600 hover:underline">
                        Back to Login
                    </Link>
                </div>

                <PrimaryButton type="submit">Submit</PrimaryButton>

                <div className="text-center text-lg text-gray-400">Or</div>

                <button className="w-full bg-blue-100 text-gray-800 py-2 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-blue-200 transition">
                    <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    Continue with Google
                </button>
            </form>
        </div>
    );
};

export default ForgotPasswordForm;
