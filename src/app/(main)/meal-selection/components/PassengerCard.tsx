import { User } from "lucide-react";

const PassengerCard = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
      <div className="flex items-center space-x-3">
        <div className="bg-blue-900 text-white rounded-full p-2">
          <User className="h-4 w-4" />
        </div>
        <div>
          <span className="text-sm font-medium text-gray-600">Adult</span>
          <div className="text-lg font-semibold text-gray-900">James Smith</div>
        </div>
      </div>
    </div>
  );
};

export default PassengerCard;