import {FaUserCircle} from 'react-icons/fa';

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
            <div className="flex items-center space-x-8">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <img src="/logo.png" alt="FlyDreamAir Logo" className="h-6 w-auto"/>
                    <span className="text-xl font-bold text-blue-900">FlyDreamAir</span>
                </div>

                {/* Navigation Links */}
                <ul className="flex items-center space-x-6 text-blue-900 font-medium">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Manage Booking</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">About Us</a></li>
                </ul>
            </div>

            {/* Buttons */}
            <div className="flex items-center space-x-4">
                <button className="bg-blue-900 text-white px-6 py-2 rounded-lg font-medium">Login</button>
                <button className="border border-blue-900 text-blue-900 px-6 py-2 rounded-lg font-medium">Sign up
                </button>
                <FaUserCircle className="text-3xl text-gray-700"/>
            </div>
        </nav>
    );
}
