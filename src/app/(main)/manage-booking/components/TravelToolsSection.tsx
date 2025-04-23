import { FaTicketAlt, FaCalendarAlt, FaSearchLocation } from 'react-icons/fa';

const tools = [
    {
        icon: <FaTicketAlt className="text-blue-800 text-xl" />,
        title: 'Online Check-in',
        description: 'Save time at the airport by check in online 24 hours before your flight.',
        button: 'Check in now',
    },
    {
        icon: <FaCalendarAlt className="text-blue-800 text-xl" />,
        title: 'Flight Status',
        description: 'Track your flight status in real-time to stay informed about any changes.',
        button: 'Check status',
    },
    {
        icon: <FaSearchLocation className="text-blue-800 text-xl" />,
        title: 'Travel Requirements',
        description: 'Check the latest travel requirements for your destination.',
        button: 'View requirements',
    },
];

export default function TravelToolsSection() {
    return (
        <section className="bg-white py-20 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {tools.map((tool, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-xl p-6 shadow-sm text-center flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center justify-center gap-2 mb-4">
                                {tool.icon}
                                <h3 className="font-semibold text-lg text-black">{tool.title}</h3>
                            </div>
                            <p className="text-gray-600 text-sm mb-6">{tool.description}</p>
                        </div>
                        <button className="bg-blue-800 hover:bg-blue-900 text-white py-2 rounded-lg text-sm font-medium">
                            {tool.button}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
