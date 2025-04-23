import React from 'react';

const SupportSection = () => {
    return (
        <div className="text-center pb-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Need help with our Services?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
                Our customer service team is available 24/7 to assist you with any questions about our services.
            </p>
            <div className="flex justify-center gap-4">
                <button className="bg-blue-900 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-800 transition">
                    Contact Support
                </button>
                <button className="bg-white border border-gray-300 text-lg font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-50 transition">
                    FAQs
                </button>
            </div>
        </div>
    );
};

export default SupportSection;
