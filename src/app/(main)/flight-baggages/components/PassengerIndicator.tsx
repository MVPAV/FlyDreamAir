import { Users } from "lucide-react";

type PassengerIndicatorProps = {
    currentPassenger: number;
    totalPassengers: number;
    onSelectPassenger: (index: number) => void;
  };
  
  export const PassengerIndicator = ({
    currentPassenger,
    totalPassengers,
    onSelectPassenger,
  }: PassengerIndicatorProps) => {
    return (
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <div className="flex items-center text-gray-600 mr-1">
          <Users size={18} className="mr-1" />
          <span className="text-sm">Passenger:</span>
        </div>
  
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: totalPassengers }).map((_, index) => (
            <button
              key={index}
              onClick={() => onSelectPassenger(index)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                currentPassenger === index
                  ? "bg-flydream-primary text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    );
  };