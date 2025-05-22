import React from 'react';


interface FlightInformationProps {
    departureAirport?: string;
    destinationAirport?: string;
  }

export const FlightInformation = ({
    departureAirport,
    destinationAirport,
}) => {
    return (
        <div className="flex items-center mb-4">
            <span className="font-regular text-lg">{departureAirport}</span>
                <div className='m-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="41" viewBox="0 0 40 41" fill="none">
                        <path d="M10.7 39.4672H14.7L23.676 23.4652H34C34 23.4652 40 23.4652 40 20.6672C40 17.8672 34 17.8672 34 17.8672H23.676L14.7 1.86719H10.7L15.676 17.8672H8.502L4 13.8652H0L3.202 20.6652L0 27.4672H4L8.502 23.4652H15.676L10.7 39.4672Z" fill="black"/>
                    </svg>
                </div>
            <span className="font-regular text-lg">{destinationAirport}</span>
        </div>
    )
}