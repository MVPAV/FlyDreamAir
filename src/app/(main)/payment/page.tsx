"use client";

import * as React from "react";
import PaymentForm from "./components/PaymentForm";

import {useBookingStore} from "src/store/bookingStore";
import {useBaggageTypeStore} from "src/store/baggageTypeStore";
import {useMealTypeStore} from "src/store/mealTypeStore";
import {useSeatStore} from "src/store/seatStore";
import PassengerInfoList from "src/app/(main)/payment/components/PassengerInfoList";
import {trpc} from "src/utils/trpc";
import CurrentFlightHeader from "src/app/(main)/components/CurrentFlightHeader";
import PrimaryModal from "src/app/components/PrimaryModal";
import { useSession } from "next-auth/react";


export default function Payment() {
    const {currentBooking} = useBookingStore();
    const passengers = currentBooking.passengers;
    const itinerary = currentBooking.itinerary;
    const getBaggageTypeById = useBaggageTypeStore((s) => s.getBaggageTypeById);
    const getMealTypeById = useMealTypeStore((s) => s.getMealTypeById);
    const getSeatNumberById = useSeatStore((s) => s.getSeatNumberById);
    const getSeatById = useSeatStore((s) => s.getSeatById);
    const {mutate: confirmBooking} = trpc.bookings.confirmBooking.useMutation();
    const updateTotalPrice = useBookingStore((s) => s.updateTotalPrice)
    const { data: session } = useSession();
    const userId = session?.user?.id;
    const [showSuccessModal, setShowSuccessModal] = React.useState(false);
    const [showErrorModal, setShowErrorModal] = React.useState(false);

    const buildPassengerSummaries = () => {
        return passengers.map((p) => {
            const summarizeSegment = (segmentId?: string) => {
                if (!segmentId) return {seat: "–", meals: [], baggages: []};

                const seatId = p.tickets.find((t) => t.segmentId === segmentId)?.seatId;
                const seat = seatId ? getSeatNumberById(seatId) ?? "–" : "–";

                const mealItems = p.meals.filter((m) => m.segmentId === segmentId);
                const mealNames = mealItems.map(
                    (m) => getMealTypeById(m.typeId)?.name ?? "Unnamed"
                );

                const baggageItems = p.baggages.filter((b) => b.segmentId === segmentId);
                const baggageLabels = baggageItems.map(
                    (b) => getBaggageTypeById(b.typeId)?.name ?? "Baggage"
                );

                return {seat, meals: mealNames, baggages: baggageLabels};
            };

            return {
                name: `${p.title} ${p.firstName} ${p.lastName}`,
                email: p.email,
                phone: p.phone,
                passportNumber: p.passport,
                departureInfo: summarizeSegment(itinerary.outbound?.id),
                returnInfo: itinerary.return ? summarizeSegment(itinerary.return.id) : undefined,
            };
        });
    };

    const calculateTotal = () => {
        return passengers.reduce((sum, p) => {
            const baggages = p.baggages.reduce(
                (s, b) => s + (getBaggageTypeById(b.typeId)?.price ?? 0),
                0
            );
            const meals = p.meals.reduce(
                (s, m) => s + (getMealTypeById(m.typeId)?.price ?? 0),
                0
            );
            const seats = p.tickets.reduce(
                (s, t) => s + (getSeatById(t.seatId)?.price ?? 0),
                0
            );
            const fare = [itinerary.outbound, itinerary.return]
                .filter(Boolean)
                .reduce((s, seg) => {
                    const matched = seg?.fares.find(f => f.fareClass === currentBooking.flightClass);
                    return s + (matched?.price ?? 0);
                }, 0);


            return sum + baggages + meals + seats + fare;
        }, 0);
    };

    const passengerSummaries = buildPassengerSummaries();
    const calculatedTotalPrice = calculateTotal();
    const totalAmount = `${calculatedTotalPrice.toFixed(2)} AUD`;


    React.useEffect(() => {
        updateTotalPrice(calculatedTotalPrice);
    }, [calculatedTotalPrice, updateTotalPrice]);

    const handlePaymentSubmit = () => {
        confirmBooking(
            {
                booking: currentBooking,
                userId: userId,
            },
            {
                onSuccess: (data) => {
                    console.log('Booking confirmed:', data);
                    setShowSuccessModal(true);
                },
                onError: (error) => {
                    console.error('Booking confirmation failed:', error);
                    setShowErrorModal(true);
                },
            }
        );
    };

    return (
        <div className="pt-20 bg-white flex flex-col overflow-hidden items-stretch">
            <CurrentFlightHeader/>

            <main
                className="mt-8 bg-white self-center flex w-full max-w-5xl flex-col text-xl font-semibold pt-[34px] pb-[76px] px-[43px] border-[rgba(0,0,0,0.2)] border-r border-l max-md:max-w-full max-md:px-5">
                <div
                    className="self-stretch flex items-stretch gap-5 text-md font-bold flex-wrap justify-between max-md:max-w-full">
                    <h1 className="text-black">Payment</h1>
                    <div className="text-[rgba(0,0,160,1)] text-center">
                        {totalAmount}
                    </div>
                </div>

                <div
                    className="border self-stretch w-full shrink-0 h-px mt-[25px] border-[rgba(0,0,0,0.2)] border-solid"/>

                <PassengerInfoList passengers={passengerSummaries}/>

                <PaymentForm onSubmit={handlePaymentSubmit}/>
            </main>

            <PrimaryModal
                showModal={showSuccessModal}
                setShowModal={setShowSuccessModal}
                onCloseModal={() => setShowSuccessModal(false)}
            >
                <h2 className="text-lg font-semibold mb-2">Booking Confirmed</h2>
                <p>Your booking has been successfully confirmed!</p>
            </PrimaryModal>

            <PrimaryModal
                showModal={showErrorModal}
                setShowModal={setShowErrorModal}
                onCloseModal={() => setShowErrorModal(false)}
            >
                <h2 className="text-lg font-semibold mb-2 text-red-600">Booking Failed</h2>
                <p>There was an error while processing your booking. Please try again.</p>
            </PrimaryModal>
        </div>
    );
}
