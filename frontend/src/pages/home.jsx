import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Card, Typography, Input, Checkbox, Button } from "@material-tailwind/react";
import { Footer } from "@/widgets/layout";
import { contactData } from "@/data";
import axios from "axios";
import { generateTimeOptions } from "@/helpers/helper";

export function Home() {
    const [pickUpDate, setPickUpDate] = useState(new Date());
    const [dropOffDate, setDropOffDate] = useState(new Date());
    const [locations, setLocations] = useState([]);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [dropOffSearchTerm, setDropOffSearchTerm] = useState("");
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [filteredDropOffLocations, setFilteredDropOffLocations] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropOffDropdown, setShowDropOffDropdown] = useState(false);

    const [isSameLocation, setIsSameLocation] = useState(true);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/locations");
                setLocations(response.data.stations || []);
            } catch (err) {
                setError(err.response?.data?.message || "An error occurred");
            }
        };

        fetchLocations();
    }, []);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.length >= 3 && Array.isArray(locations)) {
            const searchValue = value.toLowerCase();
            const matchedLocations = locations.filter((loc) =>
                (loc.address && loc.address.toLowerCase().includes(searchValue)) ||
                (loc.city && loc.city.toLowerCase().includes(searchValue)) ||
                (loc.country && loc.country.toLowerCase().includes(searchValue))
            );

            setFilteredLocations(matchedLocations);
            setShowDropdown(matchedLocations.length > 0);
        } else {
            setFilteredLocations([]);
            setShowDropdown(false);
        }
    };

    const handleDropOffSearchChange = (e) => {
        const value = e.target.value;
        setDropOffSearchTerm(value);

        if (value.length >= 3 && Array.isArray(locations)) {
            const searchValue = value.toLowerCase();
            const matchedLocations = locations.filter((loc) =>
                (loc.address && loc.address.toLowerCase().includes(searchValue)) ||
                (loc.city && loc.city.toLowerCase().includes(searchValue)) ||
                (loc.country && loc.country.toLowerCase().includes(searchValue))
            );

            setFilteredDropOffLocations(matchedLocations);
            setShowDropOffDropdown(matchedLocations.length > 0);
        } else {
            setFilteredDropOffLocations([]);
            setShowDropOffDropdown(false);
        }
    };

    const handleSelectLocation = (loc) => {
        setSearchTerm(`${loc.address} ${loc.city} ${loc.country}`);
        if (isSameLocation) {
            setDropOffSearchTerm(`${loc.address} ${loc.city} ${loc.country}`);
        }
        setShowDropdown(false);
    };

    const handleSelectDropOffLocation = (loc) => {
        setDropOffSearchTerm(`${loc.address} ${loc.city} ${loc.country}`);
        setShowDropOffDropdown(false);
    };

    const handleCheckboxChange = () => {
        setIsSameLocation(!isSameLocation);
        if (!isSameLocation) {
            setDropOffSearchTerm(searchTerm); // Sync the drop-off location with pick-up when checked
        }
    };

    return (
        <>
            <div className="relative flex h-screen content-center items-center justify-center pb-32">
                <div className="absolute top-0 h-full w-full bg-[url('/img/young-couple-car-trip.png')] bg-cover bg-center" />
                <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
                <div className="max-w-8xl container relative mx-auto">
                    <div className="flex flex-wrap items-center">
                        <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
                            <Typography
                                variant="h1"
                                color="white"
                                className="mb-6 font-black"
                            >
                                Your journey starts with us.
                            </Typography>
                            <div className="relative p-6 rounded-lg bg-black/50 backdrop-blur-sm text-white">
                                <div className="flex flex-col gap-4">
                                    {/* First Row: Pick-up and Drop-off Locations */}
                                    <div className="flex flex-row gap-4 items-center">
                                        <div className="w-full max-w-sm relative">
                                            <Input
                                                variant="outlined"
                                                size="lg"
                                                label="Pick-up Location"
                                                className="border-white text-white"
                                                value={searchTerm}
                                                onChange={handleSearchChange}
                                            />
                                            {showDropdown && (
                                                <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-y-auto shadow-lg">
                                                    {filteredLocations.map((loc, idx) => (
                                                        <li
                                                            key={idx}
                                                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-black"
                                                            onClick={() => handleSelectLocation(loc)}
                                                        >
                                                            {loc.address}, {loc.city}, {loc.country}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>

                                        {!isSameLocation && (
                                            <div className="w-full max-w-sm relative">
                                                <Input
                                                    variant="outlined"
                                                    size="lg"
                                                    label="Drop-off Location"
                                                    className="border-white text-white"
                                                    value={dropOffSearchTerm}
                                                    onChange={handleDropOffSearchChange}
                                                />
                                                {showDropOffDropdown && (
                                                    <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-y-auto shadow-lg">
                                                        {filteredDropOffLocations.map((loc, idx) => (
                                                            <li
                                                                key={idx}
                                                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-black"
                                                                onClick={() => handleSelectDropOffLocation(loc)}
                                                            >
                                                                {loc.address}, {loc.city}, {loc.country}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Second Row: Date Pickers and Time Dropdowns */}
                                    <div className="flex flex-row gap-4 items-center">
                                        {/* Pick-up Date and Time */}
                                        <div className="flex flex-col gap-2">
                                            <DatePicker
                                                selected={pickUpDate}
                                                onChange={(date) => setPickUpDate(date)}
                                                showTimeSelect
                                                timeFormat="HH:mm"
                                                timeIntervals={15}
                                                dateFormat="yyyy-MM-dd HH:mm"
                                                className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>

                                        {/* Drop-off Date and Time */}
                                        <div className="flex flex-col gap-2">
                                            <DatePicker
                                                selected={dropOffDate}
                                                onChange={(date) => setDropOffDate(date)}
                                                showTimeSelect
                                                timeFormat="HH:mm"
                                                timeIntervals={15}
                                                dateFormat="yyyy-MM-dd HH:mm"
                                                className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                    </div>


                                    {/* Third Row: Checkbox */}
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                type="checkbox"
                                                id="same-location"
                                                checked={isSameLocation}
                                                onChange={handleCheckboxChange}
                                                className="w-5 h-5"
                                                label="Same Drop-off Location"
                                            />
                                            <Checkbox
                                                type="checkbox"
                                                id="driver-age"
                                                className="w-5 h-5"
                                                label="Driver age between 26-75"
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => alert("Searching...")} // Replace this with actual functionality
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        Search
                                    </Button>

                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
            <section className="relative bg-white py-24 px-4">
                <div className="container mx-auto">
                    <div className="mx-auto mt-10 mb-12 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
                        {contactData.map(({ title, icon, description }) => (
                            <Card
                                key={title}
                                color="transparent"
                                shadow={false}
                                className="text-center text-blue-gray-900"
                            >
                                <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-blue-gray-900 shadow-lg shadow-gray-500/20">
                                    {React.createElement(icon, {
                                        className: "w-5 h-5 text-white",
                                    })}
                                </div>
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    {title}
                                </Typography>
                                <Typography className="font-normal text-blue-gray-500">
                                    {description}
                                </Typography>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
            <div className="bg-white">
                <Footer />
            </div>
        </>
    );
}

export default Home;
