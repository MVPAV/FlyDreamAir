"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import {login} from "src/services/auth"
import {useRouter} from "next/navigation"

const LoginForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(""); // thêm state lỗi nếu cần báo lỗi

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        try {
            const res = await login(email, password);

            if (res.token) {
                localStorage.setItem('token', res.token); // lưu token vào localStorage
                router.push('/'); // redirect về trang chủ
            } else {
                setError(res.message || "Login failed");
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong");
        }
    };

    return (
        <div className=" pt-50 flex justify-center items-center grow bg-white">
            <form
                onSubmit={handleLogin}
                className="w-full max-w-lg md:max-w-3xl space-y-6 px-6 py-10 shadow-md rounded-md"
            >
                <h2 className="text-2xl font-bold text-gray-900">Login to your account</h2>

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
                            {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                        </button>
                    </div>
                    <div className="text-right mt-1">
                        <Link href="/auth/forgot_password" className="text-medium text-blue-600 hover:underline">
                            Forgot Password ?
                        </Link>
                    </div>
                </div>

                <button
                    type="submit"
                    className="text-lg w-full bg-[#000057] text-white py-2 rounded-md font-semibold hover:bg-blue-900"
                >
                    Login now
                </button>

                <p className="text-center text-sm text-gray-600">
                    Don't Have An Account?{" "}
                    <Link href="/auth/signup" className="text-blue-600 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default LoginForm;