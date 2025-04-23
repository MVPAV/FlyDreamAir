import {FaStar} from 'react-icons/fa';

const testimonials = [
    {
        name: 'Jessica Miller',
        location: 'Sydney',
        feedback:
            'FlyDreamAir made my business trips so much easier. The easy booking process and on-time flights have made them my go-to airline for domestic travel.',
    },
    {
        name: 'Alex Pham',
        location: 'Melbourne',
        feedback:
            'The seat selection feature is fantastic! I was able to choose a comfortable spot for my long flight, and the in-flight service was exceptional.',
    },
    {
        name: 'Emma Wilson',
        location: 'Melbourne',
        feedback:
            'I love how I can easily manage my booking online. Had to change my flight date once, and it was surprisingly stress-free!',
    },
];

export default function TestimonialsSection() {
    return (
        <section className="bg-white py-20 px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                What Our <span className="text-blue-700">Passengers Say</span>
            </h2>
            <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
                Don&apos;t just take our word for it – hear from our satisfied customers
            </p>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((t, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-lg p-6 text-left shadow-sm hover:shadow-md transition"
                    >
                        {/* Avatar Placeholder */}
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 rounded-full bg-gray-200"/>
                            <div>
                                <h4 className="font-semibold text-lg">{t.name}</h4>
                                <p className="text-sm text-gray-500">{t.location}</p>
                            </div>
                        </div>

                        {/* Stars */}
                        <div className="flex gap-1 text-yellow-400 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i}/>
                            ))}
                        </div>

                        {/* Quote */}
                        <p className="text-sm text-gray-800 leading-relaxed">&ldquo;{t.feedback}&rdquo;</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
