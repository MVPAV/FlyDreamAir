'use client';
import React, { ChangeEvent, FormEvent } from "react";

const PassengerForm: React.FC = () => {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Ngừng hành vi mặc định (trang không reload)
    console.log("Form submitted");
  };

  return (
    <div className="min-h-screen flex items-start justify-center p-6">
      <div className="bg-white rounded-xl shadow-md w-full max-w-6xl p-8 mt-0 mb-0">  {/* Loại bỏ margin-bottom */}
        <h1 className="text-3xl font-bold mb-4">Passenger Details</h1>
        <h2 className="text-xl font-semibold mb-6">Passenger 1:</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title:</label>
              <select id="title" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Select title</option>
                <option>Mr</option>
                <option>Mrs</option>
                <option>Miss</option>
              </select>
            </div>
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name:</label>
              <input 
                type="text" 
                placeholder="First name (as in passport)" 
                id="firstName" 
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                onChange={handleChange} 
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name:</label>
              <input 
                type="text" 
                placeholder="Last name (as in passport)" 
                id="lastName" 
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth:</label>
              <input 
                type="date" 
                id="dob" 
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
              <input 
                type="email" 
                placeholder="example@gmail.com" 
                id="email" 
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone number:</label>
              <input 
                type="tel" 
                placeholder="0123456789" 
                id="phone" 
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              className="bg-white border border-gray-300 text-black px-6 py-3 rounded-md shadow hover:bg-gray-100"
            >
              Back to Search
            </button>
            <button
              type="submit"
              className="bg-blue-700 text-white px-6 py-3 rounded-md shadow hover:bg-blue-800"
            >
              Continue to Select Your Seats
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PassengerForm;
