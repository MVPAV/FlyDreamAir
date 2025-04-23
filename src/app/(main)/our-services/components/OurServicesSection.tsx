'use client'

import {useState} from 'react';
import {FaSuitcaseRolling, FaPlane} from 'react-icons/fa';
import BaggageServices from "src/app/(main)/our-services/components/BaggageServices";
import InflightServices from "src/app/(main)/our-services/components/InflightServices";

export default function OurServicesSection() {
    const [tab, setTab] = useState('inflight');

    return (
        <section className="bg-white py-20 px-6">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-blue-900">Our Services</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
                Enhance your journey with our range of services designed to make your flight more comfortable and
                enjoyable.
            </p>

            {/* Tab Switcher */}
            <div className="flex justify-center mb-12">
                <div className="flex rounded-lg overflow-hidden shadow-sm border border-gray-200">
                    <button
                        onClick={() => setTab('inflight')}
                        className={`flex items-center gap-2 px-6 py-2 text-sm font-medium ${
                            tab === 'inflight' ? 'bg-white text-blue-900 border border-blue-700 rounded-md' : 'bg-gray-100 text-gray-500'
                        }`}
                    >
                        <FaPlane/> In-Flight
                    </button>
                    <button
                        onClick={() => setTab('baggage')}
                        className={`flex items-center gap-2 px-6 py-2 text-sm font-medium ${
                            tab === 'baggage' ? 'bg-white text-blue-900 border border-blue-700 rounded-md' : 'bg-gray-100 text-gray-500'
                        }`}
                    >
                        <FaSuitcaseRolling/> Baggage
                    </button>
                </div>
            </div>

            {/* Inflight tab */}
            {tab === 'inflight' && (
                <InflightServices/>
            )}

            {/* Baggage tab */}
            {tab === 'baggage' && (
                <BaggageServices/>
            )}
        </section>
    );
}
