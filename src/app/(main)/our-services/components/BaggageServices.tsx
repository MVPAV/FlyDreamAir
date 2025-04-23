'use client'

import React from "react";
import { Briefcase, ShieldCheck, Package, Luggage, PlaneTakeoff, Music, HeartPulse } from "lucide-react";

export default function BaggageServices() {
    return (
        <div className="max-w-7xl mx-auto p-6 font-sans">
            {/* Grid Layout: 2 columns, 4 rows */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Row 1 - Section Titles */}
                <div>
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-blue-900">
                        <Luggage className="w-5 h-5" /> Check Baggage Allowance
                    </h3>
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-blue-900">
                        <Package className="w-5 h-5" /> Cabin Baggage Allowance
                    </h3>
                </div>

                {/* Row 2 - Economy */}
                <div className="border border-gray-200 rounded-lg p-4">
                    <p className="font-semibold mb-2">Economy Class:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                        <li className="flex justify-between"><span>Standard allowance</span><span>1 × 23kg bag</span></li>
                        <li className="flex justify-between"><span>Additional bag (pre-purchased)</span><span>$35 per bag</span></li>
                        <li className="flex justify-between"><span>Additional bag (airport)</span><span>$50 per bag</span></li>
                        <li className="flex justify-between"><span>Overweight fee (23–32kg)</span><span>$30 per bag</span></li>
                    </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                    <p className="font-semibold mb-2">Economy Class:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                        <li className="flex justify-between"><span>Carry-on bag</span><span>1 × 7kg bag</span></li>
                        <li className="flex justify-between"><span>Personal item</span><span>1 small item</span></li>
                        <li className="flex justify-between"><span>Maximum dimensions</span><span>56 × 36 × 23cm</span></li>
                    </ul>
                </div>

                {/* Row 3 - Business */}
                <div className="border border-gray-200 rounded-lg p-4">
                    <p className="font-semibold mb-2">Business Class:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                        <li className="flex justify-between"><span>Standard allowance</span><span>2 × 32kg bags</span></li>
                        <li className="flex justify-between"><span>Additional bag (pre-purchased)</span><span>$50 per bag</span></li>
                        <li className="flex justify-between"><span>Additional bag (airport)</span><span>$75 per bag</span></li>
                    </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                    <p className="font-semibold mb-2">Business Class:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                        <li className="flex justify-between"><span>Carry-on bag</span><span>2 × 7kg bags</span></li>
                        <li className="flex justify-between"><span>Personal item</span><span>1 small item</span></li>
                        <li className="flex justify-between"><span>Maximum dimensions</span><span>56 × 36 × 23cm</span></li>
                    </ul>
                </div>

                {/* Row 4 - Protection and Special Items */}
                <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-blue-900" /> Baggage protection
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                        Add extra protection to your valuable items.
                    </p>
                    <p className="text-sm text-gray-700 mb-4">
                        Our baggage protection service covers loss, damage, or delay of your checked baggage up to $2,500.
                    </p>
                    <ul className="text-sm text-gray-700 space-y-1">
                        <li className="flex justify-between"><span>Basic protection</span><span>$10 per flight</span></li>
                        <li className="flex justify-between"><span>Premium protection</span><span>$25 per flight</span></li>
                    </ul>
                </div>

                <div className="bg-blue-900 text-white rounded-lg p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-white" /> Special Items
                    </h3>
                    <p className="text-sm mb-4">
                        We accommodate various special items including sports equipment, musical instruments, and medical devices.
                    </p>
                    <ul className="text-sm space-y-2">
                        <li className="flex items-start gap-2">
                            <span className="pt-1">🔹</span>
                            <span><strong>Sport Equipment</strong>: Bikes, surfboards, golf clubs, ski equipment</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="pt-1">🔹</span>
                            <span><strong>Musical Instruments</strong>: Guitars, violins, other portable instruments</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="pt-1">🔹</span>
                            <span><strong>Medical Equipment</strong>: Wheelchairs, CPAP machines, other medical devices</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
