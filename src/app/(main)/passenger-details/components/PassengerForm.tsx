'use client';

import React, { ChangeEvent, FormEvent } from 'react';
import { useBookingStore } from 'src/store/bookingStore';
import { useRouter } from 'next/navigation';
import {useState} from "react";

const PassengerForm: React.FC = () => {
    const router = useRouter();

    const passengers = useBookingStore((s) => s.currentBooking.passengers);
    const addPassenger = useBookingStore((s) => s.addPassenger);
    const removePassenger = useBookingStore((s) => s.removePassenger);
    const updatePassengerField = useBookingStore((s) => s.updatePassengerField);

    const [errors, setErrors] = useState<{ [key: number]: Partial<Record<string, string>> }>({});

    const handleChange = (
        index: number,
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { id, value } = e.target;
        updatePassengerField(index, id as keyof typeof passengers[0], value);
        setErrors((prevErrors) => {
            const updated = { ...prevErrors };
            if (updated[index]?.[id]) {
                delete updated[index]?.[id];
                if (Object.keys(updated[index]!).length === 0) {
                    delete updated[index];
                }
            }
            return updated;
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let hasError = false;
        const newErrors: typeof errors = {};

        passengers.forEach((p, idx) => {
            const passengerErrors: Record<string, string> = {};

            if (!p.firstName) passengerErrors.firstName = 'First name is required';
            if (!p.lastName) passengerErrors.lastName = 'Last name is required';
            if (!p.email) passengerErrors.email = 'Email is required';
            if (!p.phone) passengerErrors.phone = 'Phone is required';
            if (!p.dob) passengerErrors.dob = 'Date of birth is required';
            if (!p.title) passengerErrors.title = 'Title is required';
            if (!p.passport) passengerErrors.passport = 'Passport is required';

            if (Object.keys(passengerErrors).length > 0) {
                hasError = true;
                newErrors[idx] = passengerErrors;
            }
        });

        setErrors(newErrors);

        if (!hasError) {
            router.push('/seat-selection');
        }
    };

    return (
        <div className="min-h-screen flex justify-center p-4 sm:p-6">
            <div className="bg-white rounded-xl shadow-md w-full max-w-6xl p-4 sm:p-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
                    Passenger Details
                </h1>

                <form className="space-y-10" onSubmit={handleSubmit}>
                    {passengers.map((passenger, index) => (
                        <div
                            key={index}
                            className="space-y-6 border-b pb-6 last:border-none last:pb-0"
                        >
                            <h2 className="text-lg sm:text-xl font-semibold">
                                Passenger {index + 1}
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                    <select
                                        id="title"
                                        value={passenger.title}
                                        onChange={(e) => handleChange(index, e)}
                                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                                    >
                                        <option value="">Select title</option>
                                        <option>Mr</option>
                                        <option>Mrs</option>
                                        <option>Miss</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        value={passenger.firstName}
                                        onChange={(e) => handleChange(index, e)}
                                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                                        placeholder="First name"
                                    />
                                    {errors[index]?.firstName && (
                                        <p className="text-sm text-red-600 mt-1">{errors[index]?.firstName}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        value={passenger.lastName}
                                        onChange={(e) => handleChange(index, e)}
                                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                                        placeholder="Last name"
                                    />
                                    {errors[index]?.lastName && (
                                        <p className="text-sm text-red-600 mt-1">{errors[index]?.lastName}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                    <input
                                        type="date"
                                        id="dob"
                                        value={passenger.dob}
                                        onChange={(e) => handleChange(index, e)}
                                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                                    />
                                    {errors[index]?.dob && (
                                        <p className="text-sm text-red-600 mt-1">{errors[index]?.dob}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={passenger.email}
                                        onChange={(e) => handleChange(index, e)}
                                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                                        placeholder="Email"
                                    />
                                    {errors[index]?.email && (
                                        <p className="text-sm text-red-600 mt-1">{errors[index]?.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={passenger.phone}
                                        onChange={(e) => handleChange(index, e)}
                                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                                        placeholder="Phone"
                                    />
                                    {errors[index]?.phone && (
                                        <p className="text-sm text-red-600 mt-1">{errors[index]?.phone}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="passport" className="block text-sm font-medium text-gray-700 mb-1">Passport Number</label>
                                    <input
                                        type="text"
                                        id="passport"
                                        value={passenger.passport}
                                        onChange={(e) => handleChange(index, e)}
                                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                                        placeholder="e.g. P12345678"
                                    />
                                    {errors[index]?.passport && (
                                        <p className="text-sm text-red-600 mt-1">{errors[index]?.passport}</p>
                                    )}
                                </div>
                            </div>

                            {passengers.length > 1 && (
                                <div className="text-right">
                                    <button
                                        type="button"
                                        onClick={() => removePassenger(index)}
                                        className="text-sm text-red-600 hover:underline"
                                    >
                                        Remove Passenger
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-6 gap-4">
                        <button
                            type="button"
                            onClick={addPassenger}
                            className="text-blue-600 hover:underline text-sm text-left"
                        >
                            + Add another passenger
                        </button>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="w-full sm:w-auto bg-white border border-gray-300 px-6 py-3 rounded-md shadow hover:bg-gray-100"
                            >
                                Back to Search
                            </button>
                            <button
                                type="submit"
                                className="w-full sm:w-auto bg-blue-700 text-white px-6 py-3 rounded-md shadow hover:bg-blue-800"
                            >
                                Continue to Select Your Seats
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PassengerForm;
