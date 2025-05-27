import ManageBooking from "src/app/(main)/manage-booking/components/ManageBooking";
import TravelToolsSection from "src/app/(main)/manage-booking/components/TravelToolsSection";
import {Suspense} from "react";

export default function Booking() {
    return (
        <div className="pt-12">
            <Suspense fallback={<h1>Loading</h1>}>
                <ManageBooking/>
                <TravelToolsSection/>
            </Suspense>
        </div>
    );
}
