
import { useState } from "react";

const FlightTabs = () => {
  const [activeTab, setActiveTab] = useState("outbound");

  return (
    <div className="flex bg-gray-100 rounded-lg p-1 mb-6 w-full max-w-md mx-auto sm:max-w-lg">
      <button
        onClick={() => setActiveTab("outbound")}
        className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 text-center rounded-md transition-colors text-sm sm:text-base ${
          activeTab === "outbound"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        <span className="block sm:hidden">SYD→MEL</span>
        <span className="hidden sm:block">SYD - MEL</span>
      </button>
      <button
        onClick={() => setActiveTab("return")}
        className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 text-center rounded-md transition-colors text-sm sm:text-base ${
          activeTab === "return"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        <span className="block sm:hidden">MEL→SYD</span>
        <span className="hidden sm:block">MEL - SYD</span>
      </button>
    </div>
  );
};

export default FlightTabs;