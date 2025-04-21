const destinations = [
    {
        city: 'Melbourne',
        code: 'MEL',
        price: '$109',
        image: '/images/melbourne.jpg',
        highlight: true,
    },
    {
        city: 'Perth',
        code: 'PE',
        price: '$199',
        image: '/images/perth.jpg',
    },
    {
        city: 'Sydney',
        code: 'SYD',
        price: '$99',
        image: '/images/sydney.jpg',
    },
];

export default function PopularDestinations() {
    return (
        <section className="bg-[#f8f9fc] py-20 px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Popular <span className="text-blue-700">Destinations</span>
            </h2>
            <p className="text-gray-600 text-lg mb-12">
                Explore our most frequently booked routes across Australia
            </p>

            {/* Destination Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {destinations.map((dest, index) => (
                    <div
                        key={index}
                        className="relative rounded-2xl overflow-hidden shadow-sm group"
                    >
                        <img
                            src={dest.image}
                            alt={dest.city}
                            className="w-full h-64 object-cover transform group-hover:scale-105 transition"
                        />
                        <div className="absolute inset-0 bg-black/30"></div>

                        {/* Content Overlay */}
                        <div className="absolute bottom-0 p-4 text-left text-white w-full">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-bold">{dest.city}</h3>
                                    <p className="text-sm">{dest.code}</p>
                                </div>
                                <p className="text-sm font-semibold">From {dest.price}</p>
                            </div>
                            {dest.highlight && (
                                <button className="mt-3 bg-blue-600 text-white text-sm px-4 py-1 rounded-md font-medium">
                                    Book now
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA Button */}
            <div className="mt-12">
                <button className="bg-blue-800 text-white px-8 py-3 rounded-lg text-base font-semibold hover:bg-blue-900 transition">
                    View All Destinations
                </button>
            </div>
        </section>
    );
}
