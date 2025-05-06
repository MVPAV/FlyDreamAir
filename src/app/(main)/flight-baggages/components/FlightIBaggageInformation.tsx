"use client";
import React from 'react';
import { Plane, BaggageClaim, Backpack } from 'lucide-react';


type FlightBaggageSectionProps = {
  departureAirport: string;
  arrivalAirport: string;
  standardBags: number;
  oversizedBags: number;
  onUpdateStandardBags: (amount: number) => void;
  onUpdateOversizedBags: (amount: number) => void;
};

export const FlightBaggageInformation = ({
  departureAirport,
  arrivalAirport,
  standardBags,
  oversizedBags,
  onUpdateStandardBags,
  onUpdateOversizedBags,
}: FlightBaggageSectionProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <div className="mr-2">
          <Plane size={20} />
        </div>
        <span className="font-medium">{departureAirport}</span>
        <span className="mx-2">→</span>
        <span className="font-medium">{arrivalAirport}</span>
      </div>
      
      <div className="space-y-3">
        {/* Standard Bag selection */}
      
        
        {/* Oversized Bag selection */}
       
      </div>
    </div>
  );
};