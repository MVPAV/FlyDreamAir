"use client";

import React, {useEffect, useMemo, useState} from "react";
import {Calendar, CreditCard, Plane} from "lucide-react";
import {signOut, useSession} from "next-auth/react";
import {trpc} from "src/utils/trpc";
import TicketHistory from "src/app/(main)/profile/components/TicketHistory";

export const ProfileInterface = () => {
    const [activeTab, setActiveTab] = useState<"profile" | "ticketHistory">("profile");
    const {data: session, update} = useSession();
    const user = session?.user;
    const userId = session?.user?.id;

    const {data: bookings = [], isLoading} = trpc.users.getUserBookingss.useQuery();

    const {upcomingCount, pastCount} = useMemo(() => {
        let upcoming = 0;
        let past = 0;
        const now = new Date();

        bookings.forEach((booking) => {
            booking.itinerary.segments.forEach((segment) => {
                const depTime = new Date(segment.departureTime);
                if (depTime > now) upcoming++;
                else past++;
            });
        });

        return {upcomingCount: upcoming, pastCount: past};
    }, [bookings]);

    // Local state
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [contactName, setContactName] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [relationship, setRelationship] = useState("");

    // Sync with session when it loads
    useEffect(() => {
        if (user) {
            setFirstName(user.firstName ?? "");
            setLastName(user.lastName ?? "");
            setPhoneNumber(user.phoneNumber ?? "");
            setDateOfBirth(user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split("T")[0] : "");
            setContactName(user.emergencyName ?? "");
            setContactPhone(user.emergencyPhone ?? "");
            setRelationship(user.emergencyRelationship ?? "");
        }
    }, [user]);

    // Mutation
    const utils = trpc.useUtils();
    const updateProfile = trpc.users.updateProfile.useMutation({
        onSuccess: async () => {
            await update();
            utils.invalidate(); // revalidate session if needed
            alert("Profile updated successfully!");
        },
    });

    const handleSave = async () => {
        await updateProfile.mutateAsync({
            firstName,
            lastName,
            phoneNumber,
            dateOfBirth,
            emergencyName: contactName,
            emergencyPhone: contactPhone,
            emergencyRelationship: relationship,
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow grow">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4 p-5">
                <h2 className="text-xl font-semibold">Welcome, {user?.firstName ?? "User"}!</h2>
                <div className="flex gap-4">
                    <button className="bg-blue-900 text-white px-5 py-2 rounded hover:bg-blue-800 transition">
                        Book Flight
                    </button>
                    <button onClick={async () => {
                        await signOut();
                    }} className="bg-gray-400 text-white px-5 py-2 rounded cursor-pointer">
                        Log out
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <SummaryCard icon={<Plane className="w-6 h-6 text-blue-900"/>} title="Upcoming Flights"
                             value={upcomingCount}/>
                <SummaryCard icon={<Calendar className="w-6 h-6 text-blue-900"/>} title="Past Flights"
                             value={pastCount}/>
                <SummaryCard icon={<CreditCard className="w-6 h-6 text-blue-900"/>} title="Saved payment methods"
                             value={1}/>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-8">
                <div className="flex border rounded-md overflow-hidden w-120">
                    {["profile", "ticketHistory"].map((tab) => (
                        <button
                            key={tab}
                            className={`flex-1 py-2 text-center font-semibold ${
                                activeTab === tab ? "bg-gray-200 text-gray-900" : "bg-white text-gray-600 hover:bg-gray-100"
                            }`}
                            onClick={() => setActiveTab(tab as typeof activeTab)}
                            type="button"
                        >
                            {tab === "profile" ? "Profile" : "Ticket History"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Profile Form */}
            {activeTab === "profile" && (
                <>
                    <legend className="pt-6 font-semibold mb-4">Personal Information</legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Left column */}
                        <div className="space-y-4">
                            <InputField
                                label="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                id="firstName"
                            />
                            <InputField
                                label="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                id="lastName"
                            />
                            <InputField
                                label="Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                id="phone"
                            />
                        </div>

                        {/* Right column */}
                        <div className="space-y-4">
                            <InputField label="Email" value={user?.email ?? ""} id="email" readOnly/>
                            <InputField
                                label="Date of Birth"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                id="dob"
                                type="date"
                            />
                        </div>
                    </div>

                    <legend className="pt-6 font-semibold mb-4">Emergency Contact</legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Left column */}
                        <div className="space-y-4">
                            <InputField
                                label="Contact Name"
                                value={contactName}
                                onChange={(e) => setContactName(e.target.value)}
                                id="contactName"
                            />
                            <div>
                                <label htmlFor="relationship" className="block text-sm font-medium text-gray-700">
                                    Relationship
                                </label>
                                <select
                                    id="relationship"
                                    value={relationship}
                                    onChange={(e) => setRelationship(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select relationship</option>
                                    <option>Spouse</option>
                                    <option>Sibling</option>
                                    <option>Friend</option>
                                    <option>Other</option>
                                </select>
                            </div>
                        </div>

                        {/* Right column */}
                        <div className="space-y-4">
                            <InputField
                                label="Contact Phone"
                                value={contactPhone}
                                onChange={(e) => setContactPhone(e.target.value)}
                                id="contactPhone"
                            />
                        </div>

                        {/* Save Button */}
                        <div className="sm:col-span-2 flex justify-end pt-6">
                            <button
                                type="button"
                                onClick={handleSave}
                                className="bg-blue-900 text-white px-6 py-3 rounded hover:bg-blue-800 transition"
                            >
                                {updateProfile.isPending ? "Saving..." : "Save changes"}
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Ticket History Tab Placeholder */}
            {activeTab === "ticketHistory" && (
                <TicketHistory/>
            )}
        </div>
    );
};

const SummaryCard = ({icon, title, value}: { icon: React.ReactNode; title: string; value: number }) => (
    <div className="flex items-start gap-3 p-4 border rounded-md shadow-sm bg-gray-50">
        {icon}
        <div>
            <p className="text-sm font-medium text-gray-700">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    </div>
);

const InputField = ({
                        label,
                        id,
                        value,
                        onChange,
                        type = "text",
                        readOnly = false,
                    }: {
    label: string;
    id: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    readOnly?: boolean;
}) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
        </label>
        <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            className={`w-full border border-gray-300 rounded-md px-4 py-2 ${
                readOnly ? "bg-gray-100" : ""
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
    </div>
);

export default ProfileInterface;
