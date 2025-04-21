import {
    FaClock,
    FaMapMarkerAlt,
    FaWallet,
    FaShieldAlt,
    FaUserFriends,
    FaSuitcaseRolling,
} from 'react-icons/fa';

export default function FeatureGrid() {
    const features = [
        {
            icon: <FaClock className="text-blue-700 text-2xl" />,
            title: 'Real-time Updates',
            description:
                'Get instant notifications for flight statuses, gate changes, and boarding times directly to your device.',
        },
        {
            icon: <FaMapMarkerAlt className="text-blue-700 text-2xl" />,
            title: 'Domestic Routes',
            description:
                'Connecting all major Australian cities with frequent, convenient flight schedules.',
        },
        {
            icon: <FaWallet className="text-blue-700 text-2xl" />,
            title: 'Secure Payments',
            description:
                'Book with confidence using our encrypted payment system supporting multiple payment methods.',
        },
        {
            icon: <FaShieldAlt className="text-blue-700 text-2xl" />,
            title: 'Safety First',
            description:
                'Your safety is our priority with rigorous safety measures and well-maintained modern aircraft.',
        },
        {
            icon: <FaUserFriends className="text-blue-700 text-2xl" />,
            title: 'Personalised Services',
            description:
                'Enjoy tailored travel experiences based on your preferences and previous bookings.',
        },
        {
            icon: <FaSuitcaseRolling className="text-blue-700 text-2xl" />,
            title: 'Flexible Baggage',
            description:
                'Choose baggage options that suit your needs with transparent pricing and no hidden fees.',
        },
    ];

    return (
        <section className="bg-white py-20 px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-black">
                    Flying Made <span className="text-blue-700">Simple</span>
                </h2>
                <p className="text-gray-600 text-lg mt-4">
                    Discover why passengers choose FlyDreamAir for their travel needs
                </p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
                    >
                        <div className="mb-4">{feature.icon}</div>
                        <h3 className="text-lg font-semibold text-black mb-2">
                            {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
