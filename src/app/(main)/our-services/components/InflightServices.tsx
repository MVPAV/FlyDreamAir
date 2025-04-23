import {FaHeadphones, FaUtensils, FaWifi} from "react-icons/fa";


const inFlightServices = [
    {
        icon: <FaUtensils className="text-blue-700 text-xl"/>,
        title: 'Meal Service',
        description:
            'Enjoy delicious, freshly-prepared meals during your flight. Choose from our standard menu or pre-order special dietary options.',
        items: [
            {label: 'Standard meal', value: 'Included'},
            {label: 'Premium meal', value: 'From $15'},
            {label: 'Special Dietary', value: 'From $12'},
        ],
        cta: 'View Menu',
    },
    {
        icon: <FaWifi className="text-blue-700 text-xl"/>,
        title: 'In-Flight Entertainment',
        description:
            'Stay connected and entertained with our Wi-Fi service and wide range of movies, TV shows, music, and games.',
        items: [
            {label: 'Basic Wi-Fi', value: 'From $8'},
            {label: 'Streaming Wi-Fi', value: 'From $15'},
            {label: 'Entertainment System', value: 'Included'},
        ],
        cta: 'Learn More',
    },
    {
        icon: <FaHeadphones className="text-blue-700 text-xl"/>,
        title: 'Comfort Amenities',
        description:
            'Enjoy delicious, freshly-prepared meals during your flight. Choose from our standard menu or pre-order special dietary options.',
        items: [
            {label: 'Standard meal', value: 'Included'},
            {label: 'Premium meal', value: 'From $15'},
            {label: 'Special Dietary', value: 'From $12'},
        ],
        cta: 'View Options',
    },
];

export default function InflightServices() {
    return (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {inFlightServices.map((service, index) => (
                <div
                    key={index}
                    className="border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col justify-between"
                >
                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            {service.icon}
                            <h3 className="text-lg font-semibold text-black">{service.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                        <ul className="text-sm text-gray-800 space-y-1">
                            {service.items.map((item, i) => (
                                <li key={i} className="flex justify-between">
                                    <span>{item.label}</span>
                                    <span className="font-medium">{item.value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button
                        className="mt-6 border border-gray-300 hover:border-blue-700 text-sm font-medium py-2 px-4 rounded-md transition">
                        {service.cta}
                    </button>
                </div>
            ))}
        </div>
    )
}
