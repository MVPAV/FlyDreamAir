"use client";
import * as React from "react";
import FlightSummaryHeader from "../components/FlightSummaryHeader";
import PaymentForm from "./components/PaymentForm";
import PassengerInfo from "./components/PassengerInfo";

export default function Booking() {
        const totalAmount = "406.00 aud";
        
        const passengerInfo = {
          name: "Mr. James Smith",
          email: "james.smith@gmail.com",
          phone: "+61 123456789",
          passportNumber: "C0123456",
          departureInfo: {
            seat: "6F",
            meal: "Standard meal",
            baggage: "1 Standard",
          },
          returnInfo: {
            seat: "5C",
            meal: "Premium meal",
            baggage: "1 Standard, 1 Oversized",
          },
        };
      
        const handlePaymentSubmit = () => {
          alert("Payment completed successfully!");
        };
    return (
        <div className="bg-white flex flex-col overflow-hidden items-stretch">
            <FlightSummaryHeader 
            departureCode="SYD"
            destinationCode="MEL"
            departureDate="22-04-2025"
            returnDate="27-04-2025"
            passengers={1}
            flightClass="Economy"
            />

            <main className="bg-white self-center flex w-full max-w-[1191px] flex-col text-xl font-semibold pt-[34px] pb-[76px] px-[43px] border-[rgba(0,0,0,0.2)] border-r border-l max-md:max-w-full max-md:px-5">
                <div className="self-stretch flex items-stretch gap-5 text-[32px] font-bold flex-wrap justify-between max-md:max-w-full">
                <h1 className="text-black">Payment</h1>
                <div className="text-[rgba(0,0,160,1)] text-center">
                    {totalAmount}
                </div>
                </div>
                
                <div className="border self-stretch w-full shrink-0 h-px mt-[25px] border-[rgba(0,0,0,0.2)] border-solid" />
                
                <PassengerInfo {...passengerInfo} />
                
                <PaymentForm onSubmit={handlePaymentSubmit} />
            </main>

        </div>



    )
}