
import { useState } from "react";

interface MealOptionProps {
  title: string;
  description: string;
  price: string;
  isIncluded?: boolean;
  onSelect: (selected: boolean) => void;
}

const MealOption = ({ title, description, price, isIncluded = false, onSelect }: MealOptionProps) => {
  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    const newSelected = !selected;
    setSelected(newSelected);
    onSelect(newSelected);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600 text-sm mt-1">{description}</p>
        </div>
        <div className="text-right ml-4">
          {isIncluded ? (
            <span className="text-green-600 font-medium">Included</span>
          ) : (
            <span className="text-blue-900 font-semibold">{price}</span>
          )}
        </div>
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={selected}
          onChange={handleSelect}
          className="h-4 w-4 text-blue-900 border-gray-300 rounded focus:ring-blue-500"
        />
        <label className="ml-2 text-sm text-gray-700 cursor-pointer" onClick={handleSelect}>
          Select
        </label>
      </div>
    </div>
  );
};

export default MealOption;