import React from "react";

interface PassengerInfoProps {
  name: string;
  email: string;
  phone: string;
  passportNumber: string;
  departureInfo: {
    seat: string;
    meal: string;
    baggage: string;
  };
  returnInfo: {
    seat: string;
    meal: string;
    baggage: string;
  };
}

const PassengerInfo: React.FC<PassengerInfoProps> = ({
  name,
  email,
  phone,
  passportNumber,
  departureInfo,
  returnInfo,
}) => {
  return (
    <section className="mt-7">
      <h2 className="text-black text-2xl font-semibold mb-[29px]">
        Passenger Information
      </h2>
      <div className="bg-[rgba(238,243,251,1)] self-stretch flex w-full gap-5 text-black font-medium flex-wrap justify-between pl-[37px] pr-20 py-[22px] rounded-[15px] max-md:mr-[5px] max-md:px-5">
        <div className="self-stretch flex flex-col">
          <div className="text-black font-semibold">
            {name}
          </div>
          <div className="self-stretch mt-2">
            Email: {email}
          </div>
          <div className="self-stretch mt-2.5 max-md:mr-2.5">
            Passport number: {passportNumber}
          </div>
          <div className="text-[rgba(5,12,156,1)] mt-3.5">
            Departure flight:
          </div>
          <div className="mt-2.5">
            Seat selection: {departureInfo.seat}
          </div>
          <div className="mt-2.5">
            Meal: {departureInfo.meal}
          </div>
          <div className="mt-2.5">
            Baggage: {departureInfo.baggage}
          </div>
        </div>
        <div className="border w-px shrink-0 h-[124px] mt-[109px] border-[rgba(0,0,0,0.2)] border-solid max-md:mt-10" />
        <div className="flex flex-col mt-[33px]">
          <div>Phone: {phone}</div>
          <div className="text-[rgba(0,0,160,1)] mt-[50px] max-md:mt-10">
            Return flight:
          </div>
          <div className="mt-2.5">
            Seat selection: {returnInfo.seat}
          </div>
          <div className="mt-2.5">
            Meal: {returnInfo.meal}
          </div>
          <div className="self-stretch mt-2.5">
            Baggage: {returnInfo.baggage}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PassengerInfo;
