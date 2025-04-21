import { FaSearch, FaUsers, FaShieldAlt } from 'react-icons/fa';

export default function Features() {
    const features = [
        {
            icon: <FaSearch className="text-sky-300 text-4xl mb-4" />,
            title: 'Easy Booking',
            description: 'Simple and intuitive flight search and booking process.',
        },
        {
            icon: <FaUsers className="text-sky-300 text-4xl mb-4" />,
            title: 'Personalised Experience',
            description: 'Tailored services and preferences for every traveler.',
        },
        {
            icon: <FaShieldAlt className="text-sky-300 text-4xl mb-4" />,
            title: 'Secure Travel',
            description: 'Your safety and data protection are our top priorities.',
        },
    ];

    return (
        <section className="bg-[#f8fbff] py-20 px-6 text-center">
            <h2 className="text-3xl font-bold text-[#0a0a2a] mb-12">
                Why Choose <span className="text-[#0a0a2a]">FlyDreamAir</span>?
            </h2>
            <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-3">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-sm p-8 text-center hover:shadow-md transition"
                    >
                        {feature.icon}
                        <h3 className="text-blue-900 font-bold text-lg mb-2">
                            {feature.title}
                        </h3>
                        <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
