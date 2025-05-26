'use client';

import {useState} from 'react';
import {FaCalendarAlt} from 'react-icons/fa';
import PassengerDropdown from '../components/PassengerDropDown';
import {useRouter} from 'next/navigation';

export default function FlightSearchSection() {
    const [activeTab, setActiveTab] = useState('search');
    const [tripType, setTripType] = useState('return');

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [passengerCount, setPassengerCount] = useState(1);
    const [flightClass, setFlightClass] = useState('ECONOMY');

    const router = useRouter();

    const handleSearch = () => {
        const params = new URLSearchParams({
            from,
            to,
            departureDate,
            ...(tripType === 'return' && returnDate ? {returnDate} : {}),
            passengerCount: passengerCount.toString(),
            flightClass,
            tripType,
        });
        router.push(`/search-flights?${params.toString()}`);
    };

    return (
        <section className="relative text-white pt-24 pb-32 px-4 text-center overflow-hidden">
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'linear-gradient(to bottom, #05007a 80%, white 100%)',
                }}
            />
            <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    Your Journey Begins with <span className="text-sky-300">FlyDreamAir</span>
                </h2>
                <p className="text-lg mb-12 max-w-xl mx-auto">
                    Experience comfort, reliability, and exceptional service with Australia's newest domestic airline.
                </p>

                <div className="bg-[#f6f6ff] rounded-xl max-w-3xl mx-auto p-6 text-left text-black shadow-lg">
                    <div className="flex mb-6">
                        <button
                            className={`flex-1 px-4 py-2 rounded-t-md font-medium ${
                                activeTab === 'search' ? 'bg-white' : 'bg-gray-200'
                            }`}
                            onClick={() => setActiveTab('search')}
                        >
                            Search Flights
                        </button>
                        <button
                            className={`flex-1 px-4 py-2 rounded-t-md font-medium ${
                                activeTab === 'manage' ? 'bg-white' : 'bg-gray-200'
                            }`}
                            onClick={() => setActiveTab('manage')}
                        >
                            Manage Bookings
                        </button>
                    </div>

                    {activeTab === 'search' && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-6">
                                {['return', 'oneway'].map((type) => (
                                    <label key={type}
                                           className="flex items-center gap-2 text-sm cursor-pointer select-none">
                                        <input
                                            type="radio"
                                            name="trip"
                                            value={type}
                                            checked={tripType === type}
                                            onChange={() => setTripType(type)}
                                            className="peer hidden"
                                        />
                                        <div
                                            className="w-4 h-4 rounded-full border-2 border-blue-600 flex items-center justify-center peer-checked:bg-blue-600 transition">
                                            <div
                                                className="w-2 h-2 bg-white rounded-full scale-0 peer-checked:scale-100 transition-transform duration-200"/>
                                        </div>
                                        <span className="capitalize">
                      {type === 'return' ? 'Return' : 'One-way'}
                    </span>
                                    </label>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <select
                                    className="w-full p-3 rounded-md border border-gray-300 text-sm"
                                    value={from}
                                    onChange={(e) => setFrom(e.target.value)}
                                >
                                    <option value="" disabled>From</option>
                                    <option value="SYD">Sydney</option>
                                    <option value="MEL">Melbourne</option>
                                    <option value="BRI">Brisbane</option>
                                    <option value="PER">Perth</option>
                                    <option value="ADE">Adelaide</option>
                                </select>
                                <select
                                    className="w-full p-3 rounded-md border border-gray-300 text-sm"
                                    value={to}
                                    onChange={(e) => setTo(e.target.value)}
                                >
                                    <option value="" disabled>To</option>
                                    <option value="SYD">Sydney</option>
                                    <option value="MEL">Melbourne</option>
                                    <option value="BRI">Brisbane</option>
                                    <option value="PER">Perth</option>
                                    <option value="ADE">Adelaide</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative">
                                    <FaCalendarAlt className="absolute top-3 left-3 text-gray-400"/>
                                    <input
                                        type="date"
                                        value={departureDate}
                                        onChange={(e) => setDepartureDate(e.target.value)}
                                        className="w-full pl-10 p-3 rounded-md border border-gray-300 text-sm"
                                        placeholder="Departure date"
                                    />
                                </div>
                                <div className="relative">
                                    <FaCalendarAlt className="absolute top-3 left-3 text-gray-400"/>
                                    <input
                                        type="date"
                                        value={returnDate}
                                        onChange={(e) => setReturnDate(e.target.value)}
                                        className="w-full pl-10 p-3 rounded-md border border-gray-300 text-sm"
                                        placeholder="Return date"
                                        disabled={tripType === 'oneway'}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <PassengerDropdown onChange={(count) => setPassengerCount(count)}/>
                                <select
                                    className="w-full p-3 rounded-md border border-gray-300 text-sm"
                                    value={flightClass}
                                    onChange={(e) => setFlightClass(e.target.value)}
                                >
                                    <option value="ECONOMY">Economy</option>
                                    <option value="PREMIUM">Premium Economy</option>
                                    <option value="BUSINESS">Business</option>
                                </select>
                            </div>

                            <button
                                className="bg-blue-800 hover:bg-blue-900 text-white w-full py-3 rounded-md font-semibold"
                                onClick={handleSearch}
                            >
                                Search Flights
                            </button>
                        </div>
                    )}

                    {activeTab === 'manage' && (
                        <div className="text-sm text-center text-gray-500 py-8">
                            Booking management coming soon.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
