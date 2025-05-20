"use client";

import { useState } from "react";
import { Calendar, CreditCard, Plane } from "lucide-react";

export const ProfileInterface = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "ticketHistory">("profile");

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow grow">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <h2 className="text-xl font-semibold">Welcome, James Smith!</h2>
        <div className="flex gap-4">
          <button className="bg-blue-900 text-white px-5 py-2 rounded hover:bg-blue-800 transition">
            Book Flight
          </button>
          <button className="bg-gray-400 text-white px-5 py-2 rounded cursor-not-allowed">
            Log out
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="flex items-start gap-3 p-4 border rounded-md shadow-sm bg-gray-50">
          <Plane className="w-6 h-6 text-blue-900" />
          <div>
            <p className="text-sm font-medium text-gray-700">Upcoming Flights</p>
            <p className="text-2xl font-bold">2</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-4 border rounded-md shadow-sm bg-gray-50">
          <Calendar className="w-6 h-6 text-blue-900" />
          <div>
            <p className="text-sm font-medium text-gray-700">Past Flights</p>
            <p className="text-2xl font-bold">1</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-4 border rounded-md shadow-sm bg-gray-50">
          <CreditCard className="w-6 h-6 text-blue-900" />
          <div>
            <p className="text-sm font-medium text-gray-700">Saved payment methods</p>
            <p className="text-2xl font-bold">1</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex border rounded-md overflow-hidden w-120">
          <button
            className={`flex-1 py-2 text-center font-semibold ${
              activeTab === "profile"
                ? "bg-gray-200 text-gray-900"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("profile")}
            type="button"
          >
            Profile
          </button>
          <button
            className={`flex-1 py-2 text-center font-semibold ${
              activeTab === "ticketHistory"
                ? "bg-gray-200 text-gray-900"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("ticketHistory")}
            type="button"
          >
            Ticket History
          </button>
        </div>
      </div>

      {/* Profile Form */}
      {activeTab === "profile" && (
        <>
        <legend className="pt-6 font-semibold mb-4">Personal Information</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Left column: Full Name, Phone Number, Contact Name, Relationship */}
          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                defaultValue="James Smith"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                defaultValue="012345678"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          {/* Right column: Email, Date of Birth, Contact Phone */}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  placeholder="example@gmail.com"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                  className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M8 7V3M16 7V3M3 10h18M4 19h16a2 2 0 0 0 2-2v-7H2v7a2 2 0 0 0 2 2z" />
                </svg>
              </div>
            </div>
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="text"
                id="dob"
                placeholder="dd/mm/yyyy"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        <legend className="pt-6 font-semibold mb-4">Emergency Contact</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Left column: Full Name, Phone Number, Contact Name, Relationship */}
          <div className="space-y-4">
            <div>
              <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">
                Contact Name
              </label>
              <input
                type="text"
                id="contactName"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="relationship" className="block text-sm font-medium text-gray-700">
                Relationship
              </label>
              <select
                id="relationship"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Select relationship</option>
                <option>Spouse</option>
                <option>Sibling</option>
                <option>Friend</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* Right column: Email, Date of Birth, Contact Phone */}
          <div className="space-y-4">
            <div>
              <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
                Contact Phone
              </label>
              <input
                type="tel"
                id="contactPhone"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="sm:col-span-2 flex justify-end pt-6">
            <button
              type="submit"
              className="bg-blue-900 text-white px-6 py-3 rounded hover:bg-blue-800 transition"
            >
              Save changes
            </button>
          </div>
        </div>
        </>
      )}

      {/* Ticket History Tab Placeholder */}
      {activeTab === "ticketHistory" && (
        <div className="text-gray-700 text-center py-20">Ticket History content coming soon...</div>
      )}
    </div>
  );
};

export default ProfileInterface;