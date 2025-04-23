import FlightSearchSection from "src/app/(main)/home/components/FlightSearchSection";
import FeatureGrid from "src/app/(main)/home/components/FeatureGrid";
import PopularDestinations from "src/app/(main)/home/components/PopularDestinations";
import TestimonialsSection from "src/app/(main)/home/components/TestimonialsSection";

export default function Landing() {
    return (
        <div className="pt-12">
            <FlightSearchSection/>
            <FeatureGrid/>
            <PopularDestinations/>
            <TestimonialsSection/>
        </div>
    );
}
