import { FaPlaneDeparture } from "react-icons/fa";

interface FlightCardProps {
    airline: string;
    flightNo: string;
    departTime: string;
    arriveTime: string;
    from: string;
    to: string;
    duration: string;
    baggage: string;
    aircraft: string;
    price: string;
    seatsLeft: number;
    selected?: boolean;
    onClick?: () => void;
}

const FlightCard = ({
                        airline,
                        flightNo,
                        departTime,
                        arriveTime,
                        from,
                        to,
                        duration,
                        baggage,
                        aircraft,
                        price,
                        seatsLeft,
                        selected = false,
                        onClick,
                    }: FlightCardProps) => {
    return (
        <div
            onClick={onClick}
            className={`grid grid-cols-6 items-center gap-6 border rounded-xl p-5 bg-white shadow transition cursor-pointer
            ${selected ? 'border-blue-600 ring-2 ring-blue-100 bg-blue-50' : 'hover:shadow-md'}`}
        >
            <div className="flex items-center gap-3">
                <FaPlaneDeparture className="text-blue-600 text-2xl" />
                <div>
                    <div className="font-semibold text-base">{airline}</div>
                    <div className="text-sm text-gray-500">{flightNo}</div>
                </div>
            </div>
            <div className="text-center">
                <div className="text-lg font-semibold">{departTime}</div>
                <div className="text-sm text-gray-500">{from}</div>
            </div>
            <div className="text-center">
                <div className="text-sm text-gray-700">{duration}</div>
                <div className="text-xs text-gray-500">● Direct</div>
            </div>
            <div className="text-center">
                <div className="text-lg font-semibold">{arriveTime}</div>
                <div className="text-sm text-gray-500">{to}</div>
            </div>
            <div className="text-sm text-gray-500 text-center leading-5">
                <div>{baggage}</div>
                <div>{aircraft}</div>
            </div>
            <div className="text-right">
                <div className="text-blue-700 font-bold text-lg">{price}</div>
                <div className="text-sm text-gray-500">{seatsLeft} seats left</div>
            </div>
        </div>
    );
};

export default FlightCard;
