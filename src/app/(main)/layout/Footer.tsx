import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import Link from "next/link";
export default function Footer() {
    return (
        <footer className="bg-[#0a0a2a] text-white px-6 py-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand Info */}
                <div>
                    <h2 className="text-xl font-semibold text-sky-300">FlyDreamAir</h2>
                    <p className="mt-4 text-sm">
                        Australia's newest domestic airline, committed to excellence in air travel.
                    </p>
                    <div className="flex gap-4 mt-4 text-xl">
                        <FaFacebookF />
                        <FaInstagram />
                        <FaYoutube />
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/home">Home</Link></li>
                        <li><Link href="/manage-booking">Manage Booking</Link></li>
                        <li><Link href="/our-services">Services</Link></li>
                        <li><Link href="/">About Us</Link></li>
                    </ul>
                </div>

                {/* Help & Support */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Help & Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="#">FAQs</Link></li>
                        <li><Link href="#">Baggage Information</Link></li>
                        <li><Link href="#">Contact Us</Link></li>
                        <li><Link href="#">Privacy Policy</Link></li>
                        <li><Link href="#">Terms & Conditions</Link></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                    <p className="text-sm mb-4">Subscribe to receive special offers and updates.</p>
                    <div className="flex items-center mb-4">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="bg-[#1c1c3a] text-white text-sm px-4 py-2 rounded-l-md w-full"
                        />
                        <button className="bg-sky-300 text-black text-sm px-4 py-2 rounded-r-md">Subscribe</button>
                    </div>
                    <p className="text-sm flex items-center gap-2">
                        📧 <a href="mailto:contact@flydreamair.it.com">contact@flydreamair.it.com</a>
                    </p>
                    <p className="text-sm flex items-center gap-2 mt-2">
                        📞 1800 0123
                    </p>
                </div>
            </div>

            <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
                © 2025 FlyDreamAir. All rights reserved.
            </div>
        </footer>
    );
}
