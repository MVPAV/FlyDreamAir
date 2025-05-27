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
