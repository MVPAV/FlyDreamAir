import FlightSearchResults from "src/app/(main)/search-flights/components/FlightSearchResults";
import {Suspense} from "react";

export default function Booking() {
    return (
        <div className="pt-20">
            <Suspense fallback={<h1> Loading </h1>}>
                <FlightSearchResults/>
            </Suspense>
        </div>
    );
}
