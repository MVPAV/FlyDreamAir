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
        <>
            {/* 📱 Mobile View */}
            <div
                onClick={onClick}
                className={`sm:hidden w-full rounded-xl p-4 shadow-md bg-white border cursor-pointer transition
                    ${selected ? 'border-blue-600 ring-2 ring-blue-100 bg-blue-50' : 'hover:shadow-lg'}
                `}
            >
                <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-semibold text-gray-800">{from} → {to}</div>
                    <div className="text-blue-700 font-bold text-lg">{price}</div>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <div className="flex flex-col text-left">
                        <span className="text-xl font-bold">{departTime}</span>
                        <span className="text-sm text-gray-500">{from}</span>
                    </div>
                    <div className="text-center text-sm text-gray-500">
                        <div>{duration}</div>
                        <div>● Direct</div>
                    </div>
                    <div className="flex flex-col text-right">
                        <span className="text-xl font-bold">{arriveTime}</span>
                        <span className="text-sm text-gray-500">{to}</span>
                    </div>
                </div>

                <hr className="mb-3" />

                <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <FaPlaneDeparture className="text-blue-600" />
                        <div className="flex flex-col leading-tight">
                            <span className="font-medium">{airline}</span>
                            <span className="text-xs">{flightNo}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div>{baggage}</div>
                        <div>{aircraft}</div>
                        <div className="text-xs text-red-500">{seatsLeft} seats left</div>
                    </div>
                </div>
            </div>

            {/* 💻 Desktop View */}
            <div
                onClick={onClick}
                className={`hidden sm:grid grid-cols-6 items-center gap-6 border rounded-xl p-5 bg-white shadow transition cursor-pointer
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
        </>
    );
};

export default FlightCard;
