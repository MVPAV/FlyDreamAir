import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {persist} from 'zustand/middleware';
import {BaggageType} from "@prisma/client";

interface BaggageTypeState {
    baggageTypes: BaggageType[];
    setBaggageTypes: (types: BaggageType[]) => void;
    getBaggageTypeByName: (name: string) => BaggageType | undefined;
    getBaggageTypeById: (id: string) => BaggageType | undefined;
}

export const useBaggageTypeStore = create<BaggageTypeState>()(
    persist(immer((set, get) => ({
        baggageTypes: [],
        setBaggageTypes: (types) => set((state) => {
            state.baggageTypes = types;
        }),
        getBaggageTypeByName: (name) =>
            get().baggageTypes.find((t) => t.name.toLowerCase() === name.toLowerCase()),
        getBaggageTypeById: (id) =>
            get().baggageTypes.find((type) => type.id === id),
    })), {
        name: 'flydreamair-baggage-type-store',
    })
);
