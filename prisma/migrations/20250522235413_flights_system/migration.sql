-- CreateTable
CREATE TABLE "Flights" (
    "id" TEXT NOT NULL,
    "flightNumber" TEXT NOT NULL,
    "departureTime" TIMESTAMP(3) NOT NULL,
    "arrivalTime" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "seatsAvailable" INTEGER NOT NULL,
    "departureId" TEXT NOT NULL,
    "destinationId" TEXT NOT NULL,
    "airlineId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Flights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Airports" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "Airports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Airlines" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Airlines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Passengers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passport" TEXT NOT NULL,

    CONSTRAINT "Passengers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookings" (
    "id" TEXT NOT NULL,
    "flightId" TEXT NOT NULL,
    "passengerId" TEXT NOT NULL,
    "seatNumber" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "bookedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Flights_flightNumber_key" ON "Flights"("flightNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Airports_code_key" ON "Airports"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Airlines_code_key" ON "Airlines"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Passengers_email_key" ON "Passengers"("email");

-- AddForeignKey
ALTER TABLE "Flights" ADD CONSTRAINT "Flights_departureId_fkey" FOREIGN KEY ("departureId") REFERENCES "Airports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flights" ADD CONSTRAINT "Flights_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Airports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flights" ADD CONSTRAINT "Flights_airlineId_fkey" FOREIGN KEY ("airlineId") REFERENCES "Airlines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "Flights"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_passengerId_fkey" FOREIGN KEY ("passengerId") REFERENCES "Passengers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
