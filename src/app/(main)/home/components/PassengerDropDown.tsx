"use client";

import { useState } from "react";
import { ChevronDown, Minus, Plus } from "lucide-react";

export default function PassengerDropdown() {
    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [open, setOpen] = useState(false);

    const hasSelection = adults > 0 || children > 0 || infants > 0;
    const totalSummary = hasSelection
        ? `${adults} Adult${adults > 1 ? "s" : ""}` +
        (children > 0 ? `, ${children} Child${children > 1 ? "ren" : ""}` : "") +
        (infants > 0 ? `, ${infants} Infant${infants > 1 ? "s" : ""}` : "")
        : "Passengers";

    const handleChange = (setter, value) => {
        if (value < 0) return;
        setter(value);
    };

    return (
        <div className="relative w-full ">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full border border-gray-300 text-left px-4 py-3 rounded-md text-sm flex justify-between items-center"
            >
                <span className="truncate">{totalSummary}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {open && (
                <div className="absolute left-0 w-full mt-1 bg-white border rounded-md shadow-lg z-10 p-4 space-y-4">
                    {[{
                        label: "Adults",
                        description: "12 years and above",
                        value: adults,
                        setValue: setAdults
                    }, {
                        label: "Children",
                        description: "2–11 years at time of travel",
                        value: children,
                        setValue: setChildren
                    }, {
                        label: "Infants",
                        description: "0–23 months at time of travel",
                        value: infants,
                        setValue: setInfants
                    }].map(({ label, description, value, setValue }) => (
                        <div className="flex justify-between items-center" key={label}>
                            <div>
                                <p className="font-medium text-sm">{label}</p>
                                <p className="text-xs text-gray-500">{description}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button
                                    type="button"
                                    onClick={() => handleChange(setValue, value - 1)}
                                    className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-4 text-center text-sm">{value}</span>
                                <button
                                    type="button"
                                    onClick={() => handleChange(setValue, value + 1)}
                                    className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}