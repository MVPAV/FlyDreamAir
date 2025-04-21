export default function Hero() {
    return (
        <section className="bg-gradient-to-r from-[#0a0a9e] to-[#0a0a2a] text-white py-24 text-center">
            <div className="max-w-3xl mx-auto px-6">
                <h1 className="text-4xl sm:text-5xl font-bold">
                    Welcome to <span className="text-sky-300">FlyDreamAir</span>
                </h1>
                <p className="mt-6 text-lg sm:text-xl leading-relaxed">
                    Discover a new era of air travel. Comfort, convenience, and exceptional
                    service await you.
                </p>
                <div className="mt-10 flex justify-center gap-4 flex-wrap">
                    <button
                        className="bg-white text-black px-6 py-3 rounded-lg text-base font-semibold shadow-md hover:bg-gray-100 transition">
                        Login
                    </button>
                    <button
                        className="bg-sky-300 text-black px-6 py-3 rounded-lg text-base font-semibold shadow-md hover:bg-sky-200 transition">
                        Explore flights
                    </button>
                </div>
            </div>
        </section>
    )
}
