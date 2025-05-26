import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {MealType} from "@prisma/client";

interface MealTypeState {
    mealTypes: MealType[];
    setMealTypes: (types: MealType[]) => void;
    getMealTypeByName: (name: string) => MealType | undefined;
    getMealTypeById: (id: string) => MealType | undefined;
}

export const useMealTypeStore = create<MealTypeState>()(
    persist(
        (set, get) => ({
            mealTypes: [],

            setMealTypes: (types) => set({mealTypes: types}),

            getMealTypeByName: (name) =>
                get().mealTypes.find(
                    (t) => t.name.toLowerCase().trim() === name.toLowerCase().trim()
                ),

            getMealTypeById: (id) =>
                get().mealTypes.find((type) => type.id === id),
        }),
        {
            name: 'flydreamair-meal-type-store',
        }
    )
);
