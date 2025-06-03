"use client";
import { useState } from "react";
import PassengerCard from "./components/PassengerCard";
import MealSelections from "./components/MealSelections";
import FlightTabs from "./components/FlightTabs";
import FlightSummaryHeader from "../components/FlightSummaryHeader";


const MealSelectPage = () => {
  const [mealTotal, setMealTotal] = useState(0);
  const [selectedMeals, setSelectedMeals] = useState<{ [key: string]: boolean }>({});

  const mealOptions = [
    {
      id: "standard",
      title: "Standard Meal",
      description: "Included with your flight",
      price: "Included",
      cost: 0,
      isIncluded: true,
    },
    {
      id: "vegetarian",
      title: "Vegetarian",
      description: "Plant-based meal option",
      price: "+$20",
      cost: 20,
    },
    {
      id: "gluten-free",
      title: "Gluten free",
      description: "Meal without gluten",
      price: "+$25",
      cost: 25,
    },
    {
      id: "halal",
      title: "Halal",
      description: "Halal certified meal",
      price: "+$30",
      cost: 30,
    },
    {
      id: "premium",
      title: "Premium Menu",
      description: "Gourmet meal with wine",
      price: "+$50",
      cost: 50,
    },
  ];

  const handleMealSelection = (mealId: string, cost: number) => (selected: boolean) => {
    setSelectedMeals(prev => ({
      ...prev,
      [mealId]: selected
    }));

    setMealTotal(prev => {
      if (selected) {
        return prev + cost;
      } else {
        return prev - cost;
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Select Your Meal Preferences</h1>
          <p className="text-gray-600">A standard meal is included in your ticket.</p>
        </div>

        <PassengerCard />
        <FlightTabs />

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {mealOptions.map((meal) => (
            <MealSelections
              key={meal.id}
              title={meal.title}
              description={meal.description}
              price={meal.price}
              isIncluded={meal.isIncluded}
              onSelect={handleMealSelection(meal.id, meal.cost)}
            />
          ))}
        </div>

        <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-lg font-semibold text-gray-900">
            Meal Total: ${mealTotal}
          </div>
          
          <div className="flex space-x-4">
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Back to Baggage
            </button>
            <button className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealSelectPage;

