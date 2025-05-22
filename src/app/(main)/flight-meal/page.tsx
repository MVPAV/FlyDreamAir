"use client"

import { useState } from "react"

interface MealOption {
  id: string
  name: string
  description: string
  price: number
  category: "standard" | "dietary" | "premium" | "vegetarian" | "halal"
}

export default function MealSelection() {
  const [activeTab, setActiveTab] = useState<"outbound" | "return">("outbound")
  const [selectedMeals, setSelectedMeals] = useState<Record<string, boolean>>({
    standard: true,
  })

  const mealOptions: MealOption[] = [
    { id: "standard", name: "Standard Meal", description: "Included with your flight", price: 0, category: "standard" },
    { id: "gluten-free", name: "Gluten free", description: "Meal without gluten", price: 15, category: "dietary" },
    { id: "premium", name: "Premium Menu", description: "Gourmet meal with wine", price: 50, category: "premium" },
    { id: "vegetarian", name: "Vegetarian", description: "Plant-based meal option", price: 20, category: "vegetarian" },
    { id: "halal", name: "Halal", description: "Halal certified meal", price: 20, category: "halal" },
  ]

  const calculateTotal = () => {
    return mealOptions.filter((meal) => selectedMeals[meal.id]).reduce((total, meal) => total + meal.price, 0)
  }

  const handleMealSelection = (mealId: string) => {
    // If selecting standard meal, deselect all others
    if (mealId === "standard") {
      setSelectedMeals({ standard: true })
      return
    }

    // If selecting any other meal, deselect standard
    const newSelections = { ...selectedMeals, [mealId]: !selectedMeals[mealId] }
    if (mealId !== "standard") {
      newSelections.standard = false
    }

    setSelectedMeals(newSelections)
  }

    return(
        <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          {/* Flight Details */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="text-lg font-semibold">SYD - MEL</div>
                <div className="mx-2 text-gray-400">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4 12H20M20 12L14 6M20 12L14 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-lg font-semibold">MEL - SYD</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-gray-500">From:</div>
                <div>SYD</div>
              </div>
              <div>
                <div className="text-gray-500">To:</div>
                <div>MEL</div>
              </div>
              <div>
                <div className="text-gray-500">Depart:</div>
                <div>22-04-2025</div>
              </div>
              <div>
                <div className="text-gray-500">Return:</div>
                <div>27-04-2025</div>
              </div>
              <div>
                <div className="text-gray-500">Passengers:</div>
                <div>1</div>
              </div>
              <div>
                <div className="text-gray-500">Class:</div>
                <div>Economy</div>
              </div>
            </div>
          </div>

          {/* Meal Preferences */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-1">Select Your Meal Preferences</h2>
            <p className="text-gray-600 text-sm mb-4">A standard meal is included in your ticket.</p>

            {/* Passenger Info */}
            <div className="mb-6">
              <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mb-2">Adult</div>
              <div className="border border-gray-300 rounded p-3">
                <div className="text-gray-700">James Smith</div>
              </div>
            </div>

            {/* Route Tabs */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              <button
                className={`py-2 text-center rounded-md ${activeTab === "outbound" ? "bg-gray-300" : "bg-gray-100"}`}
                onClick={() => setActiveTab("outbound")}
              >
                SYD - MEL
              </button>
              <button
                className={`py-2 text-center rounded-md ${activeTab === "return" ? "bg-gray-300" : "bg-gray-100"}`}
                onClick={() => setActiveTab("return")}
              >
                MEL - SYD
              </button>
            </div>

            {/* Meal Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Standard Meal</h3>
                <div className="border border-gray-200 rounded-md p-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <div>
                      <div className="font-medium">Included with your flight</div>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="standard"
                        checked={selectedMeals.standard}
                        onChange={() => handleMealSelection("standard")}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                    </div>
                  </div>
                </div>

                <h3 className="font-semibold mb-2">Gluten free</h3>
                <div className="border border-gray-200 rounded-md p-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <div>
                      <div className="font-medium">Meal without gluten</div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-700 mr-2">+$15</span>
                      <input
                        type="checkbox"
                        id="gluten-free"
                        checked={selectedMeals["gluten-free"] || false}
                        onChange={() => handleMealSelection("gluten-free")}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                    </div>
                  </div>
                </div>

                <h3 className="font-semibold mb-2">Premium Menu</h3>
                <div className="border border-gray-200 rounded-md p-4">
                  <div className="flex justify-between mb-2">
                    <div>
                      <div className="font-medium">Gourmet meal with wine</div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-700 mr-2">+$50</span>
                      <input
                        type="checkbox"
                        id="premium"
                        checked={selectedMeals.premium || false}
                        onChange={() => handleMealSelection("premium")}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Vegetarian</h3>
                <div className="border border-gray-200 rounded-md p-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <div>
                      <div className="font-medium">Plant-based meal option</div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-700 mr-2">+$20</span>
                      <input
                        type="checkbox"
                        id="vegetarian"
                        checked={selectedMeals.vegetarian || false}
                        onChange={() => handleMealSelection("vegetarian")}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                    </div>
                  </div>
                </div>

                <h3 className="font-semibold mb-2">Halal</h3>
                <div className="border border-gray-200 rounded-md p-4">
                  <div className="flex justify-between mb-2">
                    <div>
                      <div className="font-medium">Halal certified meal</div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-700 mr-2">+$20</span>
                      <input
                        type="checkbox"
                        id="halal"
                        checked={selectedMeals.halal || false}
                        onChange={() => handleMealSelection("halal")}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Total and Navigation */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-4 border-t border-gray-200">
              <div className="mb-4 md:mb-0">
                <span className="font-semibold">Meal Total: </span>
                <span className="font-bold">${calculateTotal()}</span>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
                  Back to Baggage
                </button>
                <button className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-700">Continue</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    )
}