'use client';

import { useQueryStates } from 'nuqs';
import { parseAsString, parseAsInteger } from 'nuqs';
import { format } from 'date-fns';
import { trpc } from 'src/utils/trpc';
import FlightCard from './FlightCard';
import FlightSummaryHeader from 'src/app/(main)/components/FlightSummaryHeader';
import { useRouter } from 'next/navigation';
import { useBookingStore } from 'src/store/bookingStore';
import { useEffect } from 'react';
import PrimaryModal from "../../../components/PrimaryModal";
import {useState} from "react";

const calculateDuration = (departure: Date, arrival: Date) => {
    const diff = (new Date(arrival).getTime() - new Date(departure).getTime()) / 60000;
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return `${hours}h ${minutes}m`;
};

const getLowestFare = (fares: { price: number }[]) => {
    if (!fares || fares.length === 0) return null;
    return Math.min(...fares.map(f => f.price));
};

const FlightSearchResults = () => {
    const router = useRouter();

    const {
        currentBooking,
        setOutboundSegment,
        setReturnSegment,
        initializeBooking,
    } = useBookingStore();

    const [params] = useQueryStates({
        from: parseAsString,
        to: parseAsString,
        departureDate: parseAsString,
        returnDate: parseAsString,
        passengerCount: parseAsInteger.withDefault(1),
        flightClass: parseAsString.withDefault('ECONOMY'),
        tripType: parseAsString.withDefault('return'),
    });

    useEffect(() => {
        if (params.flightClass && params.passengerCount) {
            initializeBooking(params.flightClass, params.passengerCount);
        }
    }, [params.flightClass, params.passengerCount, initializeBooking]);

    const [showModal, setShowModal] = useState(false);
    const [missingPart, setMissingPart] = useState<'outbound' | 'return' | null>(null);

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return '-';
        try {
            return format(new Date(dateStr), 'dd MMMM yyyy');
        } catch {
            return dateStr;
        }
    };

    const departureQuery = trpc.flights.getFlights.useQuery(
        {
            from: params.from!,
            to: params.to!,
            departureDate: new Date(params.departureDate!),
        },
        {
            enabled: Boolean(params.from && params.to && params.departureDate),
        }
    );

    const returnQuery = trpc.flights.getFlights.useQuery(
        {
            from: params.to!,
            to: params.from!,
            departureDate: params.returnDate ? new Date(params.returnDate) : new Date(),
        },
        {
            enabled: params.tripType === 'return' && Boolean(params.returnDate),
        }
    );

    if (!params.from || !params.to || !params.departureDate) {
        return (
            <div className="p-10 text-center text-red-600 font-semibold">
                Invalid or missing search parameters.
            </div>
        );
    }

    const renderFlightCard = (
        flight: any,
        direction: 'outbound' | 'return',
        onSelect: (flight: any) => void,
        selectedId?: string
    ) => {
        const price = getLowestFare(flight.fares);
        const duration = calculateDuration(flight.departureTime, flight.arrivalTime);
        const seatsLeft = flight.seatCapacity - flight.tickets.length;

        return (
            <FlightCard
                key={flight.id}
                airline={flight.airline.name}
                flightNo={flight.flightNumber}
                departTime={new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                arriveTime={new Date(flight.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                from={direction === 'outbound' ? params.from ?? '' : params.to ?? ''}
                to={direction === 'outbound' ? params.to ?? '' : params.from ?? ''}
                duration={duration}
                baggage="20kg"
                aircraft="Airbus A320"
                price={price ? `$${price}` : 'N/A'}
                seatsLeft={seatsLeft}
                selected={selectedId === flight.id}
                onClick={() => onSelect(flight)}
            />
        );
    };
    const handleContinue = () => {
        const { outbound, return: returnSegment } = currentBooking.itinerary;

        if (!outbound?.id) {
            setMissingPart('outbound');
            setShowModal(true);
            return;
        }

        if (params.tripType === 'return' && !returnSegment?.id) {
            setMissingPart('return');
            setShowModal(true);
            return;
        }

        router.push('/passenger-details');
    };


    return (
        <>
            <FlightSummaryHeader
                departureCode={params.from}
                destinationCode={params.to}
                departureDate={formatDate(params.departureDate)}
                returnDate={params.returnDate ? formatDate(params.returnDate) : ''}
                passengers={params.passengerCount}
                flightClass={params.flightClass}
                tripType={params.tripType}
            />

            <div className="p-4 sm:p-10 bg-gray-100 min-h-screen">
                {/* Filters */}
                <div className="max-w-7xl mx-auto flex flex-wrap gap-3 mb-6 justify-center sm:justify-start">
                    <button className="bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-semibold">Price</button>
                    <button className="bg-white border px-5 py-2 rounded-full text-sm">Departure Time</button>
                    <button className="bg-white border px-5 py-2 rounded-full text-sm">Duration</button>
                </div>

                {/* Flight results */}
                <div className="max-w-7xl mx-auto space-y-10">
                    {/* Outbound flights */}
                    <section>
                        <h2 className="font-semibold text-lg mb-4 text-center sm:text-left">
                            {params.from} to {params.to} - {formatDate(params.departureDate)}
                        </h2>
                        <div className="space-y-4">
                            {departureQuery.data?.map((flight) =>
                                renderFlightCard(flight, 'outbound', setOutboundSegment, currentBooking.itinerary.outbound?.id)
                            )}
                        </div>
                    </section>

                    {/* Return flights */}
                    {params.tripType === 'return' && params.returnDate && returnQuery.data && (
                        <section>
                            <h2 className="font-semibold text-lg mb-4 text-center sm:text-left">
                                {params.to} to {params.from} - {formatDate(params.returnDate)}
                            </h2>
                            <div className="space-y-4">
                                {returnQuery.data.map((flight) =>
                                    renderFlightCard(flight, 'return', setReturnSegment, currentBooking.itinerary.return?.id)
                                )}
                            </div>
                        </section>
                    )}
                </div>

                {/* Navigation buttons */}
                <div className="max-w-7xl mx-auto mt-10 flex flex-col sm:flex-row gap-4 sm:justify-between items-center">
                    <button
                        onClick={() => router.back()}
                        className="w-full sm:w-auto px-6 py-3 bg-white border border-gray-300 rounded-md text-sm font-semibold hover:bg-gray-50"
                    >
                        ← Back
                    </button>
                    <button
                        onClick={handleContinue}
                        className="w-full sm:w-auto px-6 py-3 bg-blue-700 text-white rounded-md text-sm font-semibold hover:bg-blue-800"
                    >
                        Continue →
                    </button>
                </div>
            </div>
            <PrimaryModal showModal={showModal} setShowModal={setShowModal}>
                <h2 className="text-lg font-semibold mb-2">
                    {missingPart === 'outbound' && 'Outbound Flight Not Selected'}
                    {missingPart === 'return' && 'Return Flight Not Selected'}
                </h2>
                <p className="text-sm text-gray-600">
                    {missingPart === 'outbound' && 'Please select an outbound flight before continuing.'}
                    {missingPart === 'return' && 'Please select a return flight before continuing.'}
                </p>
            </PrimaryModal>
        </>
    );
};

export default FlightSearchResults;
