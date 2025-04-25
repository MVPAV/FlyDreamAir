"use client";

import { useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

const SetNewPasswordForm = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // handle set new password logic
    };

    return (
        <div className="flex justify-center items-center grow bg-white">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg md:max-w-2xl space-y-7 px-6 py-9 shadow-md rounded-md"
            >
                <h2 className="text-2xl font-bold text-gray-900">Set A New Password</h2>

                <div className="relative">
                    <label className="block text-lg font-medium text-gray-700 mb-1" htmlFor="password">
                        Create A New Password
                    </label>
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full border border-blue-100 rounded-md px-4 py-2 pr-10 outline-none focus:ring-2 focus:ring-blue-300"
                        placeholder=""
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-[42px] text-gray-500"
                        aria-label="Toggle password visibility"
                    >
                        {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-1" htmlFor="confirmPassword">
                        Re-Enter New Password
                    </label>
                    <div className="relative">
                        <input
                            id="confirmPassword"
                            type={showConfirm ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder=""
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm((prev) => !prev)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            aria-label="Toggle password visibility"
                        >
                            {showConfirm ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <PrimaryButton type="submit">Set password</PrimaryButton>
            </form>
        </div>
    );
};

export default SetNewPasswordForm;
