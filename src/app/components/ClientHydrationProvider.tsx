'use client';

import {useEffect} from 'react';
import {trpc} from 'src/utils/trpc';
import {useBaggageTypeStore} from 'src/store/baggageTypeStore';
import {useMealTypeStore} from 'src/store/mealTypeStore';

export default function ClientHydrationProvider() {
    const {data: baggageTypes} = trpc.baggages.getBaggageTypes.useQuery();
    const {data: mealTypes} = trpc.meals.getMealTypes.useQuery();

    const setBaggageTypes = useBaggageTypeStore((s) => s.setBaggageTypes);
    const setMealTypes = useMealTypeStore((s) => s.setMealTypes);

    useEffect(() => {
        if (baggageTypes) setBaggageTypes(baggageTypes);
    }, [baggageTypes, setBaggageTypes]);

    useEffect(() => {
        if (mealTypes) setMealTypes(mealTypes);
    }, [mealTypes, setMealTypes]);

    return null;
}
