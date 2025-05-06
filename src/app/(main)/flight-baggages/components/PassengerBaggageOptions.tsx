"use client";
import React from "react";
import BaggageCounter from "./BaggageCounter";

interface PassengerBaggageOptionsProps {
  passengerIndex: number;
  onBaggageChange: (passengerIndex: number, standardCount: number, oversizedCount: number) => void;
}

const PassengerBaggageOptions: React.FC<PassengerBaggageOptionsProps> = ({
  passengerIndex,
  onBaggageChange
}) => {
  const [standardCount, setStandardCount] = React.useState(0);
  const [oversizedCount, setOversizedCount] = React.useState(0);

  const handleStandardIncrement = () => {
    if (standardCount < 3) {
      const newCount = standardCount + 1;
      setStandardCount(newCount);
      onBaggageChange(passengerIndex, newCount, oversizedCount);
    }
  };

  const handleStandardDecrement = () => {
    if (standardCount > 0) {
      const newCount = standardCount - 1;
      setStandardCount(newCount);
      onBaggageChange(passengerIndex, newCount, oversizedCount);
    }
  };

  const handleOversizedIncrement = () => {
    if (oversizedCount < 2) {
      const newCount = oversizedCount + 1;
      setOversizedCount(newCount);
      onBaggageChange(passengerIndex, standardCount, newCount);
    }
  };

  const handleOversizedDecrement = () => {
    if (oversizedCount > 0) {
      const newCount = oversizedCount - 1;
      setOversizedCount(newCount);
      onBaggageChange(passengerIndex, standardCount, newCount);
    }
  };

  return (
    <div className="flex flex-col gap-7 w-full">
      <article className="flex relative flex-wrap gap-5 justify-between items-start self-stretch px-5 py-4 w-full rounded-2xl border border-solid border-gray border-opacity-20 max-md:pr-5 max-md:max-w-full">
        <div className="flex flex-col self-start max-md:max-w-full">
          <div className="flex flex-wrap gap-2 text-l text-black">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="41" viewBox="0 0 40 41" fill="none">
              <path d="M9.16701 34.0002C9.83005 34.0002 10.4659 34.2636 10.9348 34.7324C11.4036 35.2013 11.667 35.8372 11.667 36.5002C11.667 37.1633 11.4036 37.7991 10.9348 38.268C10.4659 38.7368 9.83005 39.0002 9.16701 39.0002C8.50396 39.0002 7.86808 38.7368 7.39924 38.268C6.9304 37.7991 6.66701 37.1633 6.66701 36.5002C6.66701 35.8372 6.9304 35.2013 7.39924 34.7324C7.86808 34.2636 8.50396 34.0002 9.16701 34.0002ZM30.8337 34.0002C31.4967 34.0002 32.1326 34.2636 32.6014 34.7324C33.0703 35.2013 33.3337 35.8372 33.3337 36.5002C33.3337 37.1633 33.0703 37.7991 32.6014 38.268C32.1326 38.7368 31.4967 39.0002 30.8337 39.0002C30.1706 39.0002 29.5347 38.7368 29.0659 38.268C28.5971 37.7991 28.3337 37.1633 28.3337 36.5002C28.3337 35.8372 28.5971 35.2013 29.0659 34.7324C29.5347 34.2636 30.1706 34.0002 30.8337 34.0002ZM3.62034 3.59521L10.0003 9.97521V29.0002H33.3337V32.3335H8.33367C7.89164 32.3335 7.46772 32.158 7.15516 31.8454C6.8426 31.5328 6.66701 31.1089 6.66701 30.6669V11.3552L1.26367 5.95355L3.62034 3.59521ZM26.667 5.66688C27.109 5.66688 27.533 5.84248 27.8455 6.15504C28.1581 6.4676 28.3337 6.89152 28.3337 7.33355V10.6669H33.3237C34.2503 10.6669 35.0003 11.4269 35.0003 12.3252V25.6752C34.9992 25.8942 34.955 26.1109 34.8701 26.3128C34.7853 26.5147 34.6614 26.6979 34.5057 26.8519C34.35 27.0059 34.1654 27.1277 33.9626 27.2104C33.7598 27.293 33.5427 27.3349 33.3237 27.3335H13.3453C12.9041 27.3323 12.4809 27.1578 12.167 26.8476C11.8531 26.5375 11.6736 26.1165 11.667 25.6752V12.3252C11.6681 12.1061 11.7124 11.8893 11.7974 11.6873C11.8823 11.4853 12.0063 11.302 12.1622 11.148C12.3181 10.9939 12.5029 10.8721 12.7059 10.7896C12.9089 10.707 13.1262 10.6653 13.3453 10.6669H18.3337V7.33355C18.3337 6.89152 18.5093 6.4676 18.8218 6.15504C19.1344 5.84248 19.5583 5.66688 20.0003 5.66688H26.667ZM16.667 14.0002H15.0003V24.0002H16.667V14.0002ZM26.667 14.0002H20.0003V24.0002H26.667V14.0002ZM31.667 14.0002H30.0003V24.0002H31.667V14.0002ZM25.0003 9.00021H21.667V10.6669H25.0003V9.00021Z" fill="#050C9C"/>
            </svg>
            <h4 className="flex-auto my-auto w-[495px] max-md:max-w-full">
              Standard Checked Bag (23kg - max 3 bags)
            </h4>
          </div>
          <p className="self-start mt-2 text-base text-gray-600 max-md:max-w-full">
            Add standard checked bags for this passenger.
          </p>
        </div>
        <BaggageCounter
          count={standardCount}
          onIncrement={handleStandardIncrement}
          onDecrement={handleStandardDecrement}
        />
      </article>

      <article className="flex relative flex-col self-stretch px-5 pt-1.5 pb-4 w-full rounded-2xl border border-solid border-gray border-opacity-20 max-md:pr-5 max-md:max-w-full">
        <div className="flex flex-wrap gap-2 items-start self-start text-l text-black">

        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="41" viewBox="0 0 40 41" fill="none">
          <g clipPath="url(#clip0_374_1834)">
            <path d="M5 4.41699C5 4.08547 5.1317 3.76753 5.36612 3.53311C5.60054 3.29869 5.91848 3.16699 6.25 3.16699H13.75C14.0815 3.16699 14.3995 3.29869 14.6339 3.53311C14.8683 3.76753 15 4.08547 15 4.41699V13.167H16.25C17.2446 13.167 18.1984 13.5621 18.9017 14.2653C19.6049 14.9686 20 15.9224 20 16.917V18.167H17.5V16.917C17.5 16.5855 17.3683 16.2675 17.1339 16.0331C16.8995 15.7987 16.5815 15.667 16.25 15.667H3.75C3.41848 15.667 3.10054 15.7987 2.86612 16.0331C2.6317 16.2675 2.5 16.5855 2.5 16.917V34.417C2.5 34.7485 2.6317 35.0665 2.86612 35.3009C3.10054 35.5353 3.41848 35.667 3.75 35.667H10V38.167H6.25V38.792C6.25 39.2893 6.05246 39.7662 5.70083 40.1178C5.3492 40.4694 4.87228 40.667 4.375 40.667C3.87772 40.667 3.40081 40.4694 3.04918 40.1178C2.69754 39.7662 2.5 39.2893 2.5 38.792V37.9545C1.76856 37.6959 1.13532 37.2168 0.687571 36.5832C0.23982 35.9496 -0.0004062 35.1928 5.15592e-07 34.417V16.917C5.15592e-07 15.9224 0.395089 14.9686 1.09835 14.2653C1.80161 13.5621 2.75544 13.167 3.75 13.167H5V4.41699ZM7.5 13.167H12.5V5.66699H7.5V13.167Z" fill="#050C9C"/>
            <path d="M6.25 18.167C6.58152 18.167 6.89946 18.2987 7.13388 18.5331C7.3683 18.7675 7.5 19.0855 7.5 19.417V31.917C7.5 32.2485 7.3683 32.5665 7.13388 32.8009C6.89946 33.0353 6.58152 33.167 6.25 33.167C5.91848 33.167 5.60054 33.0353 5.36612 32.8009C5.1317 32.5665 5 32.2485 5 31.917V19.417C5 19.0855 5.1317 18.7675 5.36612 18.5331C5.60054 18.2987 5.91848 18.167 6.25 18.167ZM31.25 20.667V19.417C31.25 18.4224 30.8549 17.4686 30.1517 16.7653C29.4484 16.0621 28.4946 15.667 27.5 15.667H25C24.0054 15.667 23.0516 16.0621 22.3483 16.7653C21.6451 17.4686 21.25 18.4224 21.25 19.417V20.667H20V40.667H32.5V20.667H31.25ZM25 18.167H27.5C27.8315 18.167 28.1495 18.2987 28.3839 18.5331C28.6183 18.7675 28.75 19.0855 28.75 19.417V20.667H23.75V19.417C23.75 19.0855 23.8817 18.7675 24.1161 18.5331C24.3505 18.2987 24.6685 18.167 25 18.167ZM12.5 24.417C12.5 23.4224 12.8951 22.4686 13.5983 21.7653C14.3016 21.0621 15.2554 20.667 16.25 20.667H17.5V40.667H16.25C15.2554 40.667 14.3016 40.2719 13.5983 39.5686C12.8951 38.8654 12.5 37.9116 12.5 36.917V24.417ZM35 40.667V20.667H36.25C37.2446 20.667 38.1984 21.0621 38.9016 21.7653C39.6049 22.4686 40 23.4224 40 24.417V36.917C40 37.9116 39.6049 38.8654 38.9016 39.5686C38.1984 40.2719 37.2446 40.667 36.25 40.667H35Z" fill="#050C9C"/>
          </g>
          <defs>
            <clipPath id="clip0_374_1834">
              <rect width="40" height="40" fill="white" transform="translate(0 0.666992)"/>
            </clipPath>
          </defs>
        </svg>


          <h4 className="flex-auto mt-4 max-md:max-w-full">
            Oversized/Overweight Bag (32kg - max 2 bags)
          </h4>
        </div>
        <div className="flex flex-wrap gap-5 justify-between w-full max-md:max-w-full">
          <p className="self-start mt-3 text-base text-gray-600 max-md:max-w-full">
            Add oversized or overweight bags for this passenger.
          </p>
          <BaggageCounter
            count={oversizedCount}
            onIncrement={handleOversizedIncrement}
            onDecrement={handleOversizedDecrement}
          />
        </div>
      </article>
    </div>
  );
};

export default PassengerBaggageOptions;