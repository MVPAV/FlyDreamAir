// types.ts
export type SummaryDetail = {
    route: string;
    value: string;
    price?: number;
};

export type SummaryItem = {
    label: string;
    details: SummaryDetail[];
};

export type BookingSummaryData = {
    fares: SummaryItem[];
    seats: SummaryItem[];
    baggage: SummaryItem[];
    meal: SummaryItem[];
};