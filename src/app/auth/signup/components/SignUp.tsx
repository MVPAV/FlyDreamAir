"use client";

import React, {useState} from "react";
import Link from "next/link";
import {Eye, EyeOff} from "lucide-react";
import PrimaryButton from "src/app/auth/components/PrimaryButton";
import {useRouter} from "next/navigation"
import {signIn} from "next-auth/react";
import PrimaryModal from "src/app/components/PrimaryModal";
import { FaCheckCircle } from 'react-icons/fa';

const SignupForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleCloseModal = () => {
        router.push("/");
    }

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password}),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            setIsSuccess(true);
            console.log("Registration Successful", response);
        } catch (error: any) {
            setIsSuccess(false);
            console.error("Registration Failed:", error);
        }
    };


    return (
        <>
            <div className="py-20 flex justify-center items-center grow bg-white">
                <form
                    onSubmit={handleSignup}
                    className="w-full max-w-lg md:max-w-3xl space-y-6 px-6 py-10 shadow-md rounded-md"
                >
                    <h2 className="text-2xl font-bold text-gray-900">Create an account</h2>

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
                            className="w-full border border-blue-100 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="example@gmail.com"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-1" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 outline-none focus:ring-2 focus:ring-blue-300"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                aria-label="Toggle password visibility"
                            >
                                {showPassword ? <Eye className="w-5 h-5"/> : <EyeOff className="w-5 h-5"/>}
                            </button>
                        </div>
                    </div>

                    <PrimaryButton type="submit">Create account</PrimaryButton>

                    <button
                        className="text-lg w-full bg-blue-100 text-gray-800 py-2 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-blue-200 transition">
                        <img
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        Continue with Google
                    </button>

                    <p className="text-center text-lg text-gray-600">
                        Already Have An Account ?{" "}
                        <Link href="/auth/signin" className="text-blue-600 hover:underline">
                            Log In
                        </Link>
                    </p>
                </form>
            </div>
            <PrimaryModal showModal={showModal} setShowModal={setShowModal} onCloseModal={handleCloseModal}>
                <div className="p-6 text-center">
                    <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-green-100">
                        <FaCheckCircle className="text-green-600 text-3xl" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Registration Successful</h2>
                    <p className="text-gray-600 mb-6">
                        Your account has been created successfully. You can now log in and start using the platform.
                    </p>
                    <button
                        onClick={() => setShowModal(false)}
                        className="inline-block px-6 py-2 bg-blue-800 text-white font-medium rounded-md hover:bg-blue-900 transition"
                    >
                        Continue
                    </button>
                </div>
            </PrimaryModal>
        </>
    );
};

export default SignupForm;
