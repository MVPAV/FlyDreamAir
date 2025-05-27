import {
    Airline,
    Airport,
    Baggage,
    BaggageType, Fare,
    FlightSegment,
    Meal,
    MealType,
    Passenger,
    Seat,
    Ticket
} from "@prisma/client";

export interface ClientTicket {
    segmentId: string;
    seatId: string;
}

export interface ClientMeal {
    segmentId: string;
    typeId: string;
}

export interface ClientPassenger {
    title: string;
    firstName: string;
    lastName: string;
    dob: string;
    email: string;
    phone: string;
    passport: string;
    tickets: ClientTicket[];
    baggages: ClientBaggage[];
    meals: ClientMeal[];
}

export interface ClientBaggage {
    id?: string;
    typeId: string;
    segmentId: string;
}

export type FlightSegmentWithRelations = FlightSegment & {
    departureAirport: Airport;
    arrivalAirport: Airport;
    airline: Airline;
    fares: Fare[];
};

export interface ClientBooking {
    itinerary: {
        outbound?: FlightSegmentWithRelations;
        return?: FlightSegmentWithRelations;
    };
    passengers: ClientPassenger[];
    flightClass: string;
    passengerCount: number;
    totalPrice: number;
}

export type FullTicket = Ticket & {
    segment: FlightSegment & {
        departureAirport: Airport;
        arrivalAirport: Airport;
        airline: Airline;
    };
    seat: Seat;
    passenger: Passenger & {
        meals: (Meal & { type: MealType })[];
        bags: (Baggage & { type: BaggageType })[];
    };
};
