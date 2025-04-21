import ManageBooking from "src/app/(main)/manage-booking/components/ManageBooking";
import TravelToolsSection from "src/app/(main)/manage-booking/components/TravelToolsSection";

export default function Booking() {
    return (
        <div className="pt-12">
            <ManageBooking/>
            <TravelToolsSection/>
        </div>
    );
}
