import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Card, Typography, Input, Checkbox, Button } from "@material-tailwind/react";
import { Footer } from "@/widgets/layout";
import { contactData } from "@/data";
import axios from "axios";
import { generateTimeOptions } from "@/helpers/helper";
import "@fortawesome/fontawesome-free/css/all.min.css";


export function Home() {
    // const [pickUpDate, setPickUpDate] = useState(new Date());
    const [locations, setLocations] = useState([]);
    // const [error, setError] = useState(null);
    const [driverAgeCheck, setDriverAgeCheck] = useState(false)
    const [sameDropOffLocation, setSameDropOffLocation] = useState(false)

    const [searchTerm, setSearchTerm] = useState("");
    const [dropOffSearchTerm, setDropOffSearchTerm] = useState("");
    const [filteredLocations, setFilteredLocations] = useState([]);
    // const [filteredDropOffLocations, setFilteredDropOffLocations] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    // const [showDropOffDropdown, setShowDropOffDropdown] = useState(false);

    const [isSameLocation, setIsSameLocation] = useState(true);
    const [pickupDate, setPickupDate] = useState(new Date());
    const [dropoffDate, setDropoffDate] = useState(new Date());
    const [typeOfvehicle,setTypeOfvehicle] = useState({
        car: false,
        motobike: false,
        
        
      });
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
    console.log(locations)

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
    }
    // const handleDropOffSearchChange = (e) => {
    //     const value = e.target.value;
    //     setDropOffSearchTerm(value);

    //     if (value.length >= 3 && Array.isArray(locations)) {
    //         const searchValue = value.toLowerCase();
    //         const matchedLocations = locations.filter((loc) =>
    //             (loc.address && loc.address.toLowerCase().includes(searchValue)) ||
    //             (loc.city && loc.city.toLowerCase().includes(searchValue)) ||
    //             (loc.country && loc.country.toLowerCase().includes(searchValue))
    //         );

    //         setFilteredDropOffLocations(matchedLocations);
    //         setShowDropOffDropdown(matchedLocations.length > 0);
    //     } else {
    //         setFilteredDropOffLocations([]);
    //         setShowDropOffDropdown(false);
    //     }
    // };
console.log(pickupDate,dropoffDate)
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

    // const handleCheckboxChange = () => {
    //     setIsSameLocation(!isSameLocation);
    //     if (!isSameLocation) {
    //         setDropOffSearchTerm(searchTerm); // Sync the drop-off location with pick-up when checked
    //     }
    // };

    return (
        <>
            
  
            <div className="relative flex h-screen content-center items-center justify-center pb-32">
                <div className="absolute top-0 h-full w-full bg-[url('/img/young-couple-car-trip.png')] bg-cover bg-center" />
                <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
                <div className="max-w-8xl container relative mx-auto">
                    <div className="flex flex-wrap items-center">

                        <div className="ml-auto mr-auto w-full px-4 text-center lg:w-11/12">
                            <Typography
                                variant="h1"
                                color="white"
                                className="mb-6 font-black"
                            >
                                Your journey starts with Karpadu
                            </Typography>



                            {/* Transparent box */}
                            
                            <div className=" bg-slate-500/50 bg-center p-6 max-w-4xl mx-auto rounded-lg shadow-md border ">
                                <div className="flex justify-around mb-4">
                                    <button className="text-center p-2 flex items-center gap-2 text-white border-b-2 border-blue-500">
                                    <i className="fas fa-car"></i> Car
                                    </button>
                                    <button className="text-center p-2 flex items-center gap-2 text-white hover:text-blue-500">
                                    <i className="fas fa-motorcycle"></i> Motorbike
                                    </button>
                                    <button className="text-center p-2 flex items-center gap-2 text-white hover:text-blue-500">
                                    <i className="fas fa-ship"></i> Boat
                                    </button>
                                    <button className="text-center p-2 flex items-center gap-2 text-white hover:text-blue-500">
                                    <i className="fas fa-map-signs"></i> Tour
                                    </button>
                                </div>

                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-grow">
                                    <label htmlFor="pickup-location" className="block text-white mb-1">
                                        Pickup Location
                                    </label>
                                    <input
                                        type="text"
                                        id="pickup-location"
                                        placeholder="Enter Location"
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
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
                                    <div className="flex-grow">
                                    <label htmlFor="pickup-date" className="block text-gray-500 mb-1">
                                        Pickup Date
                                    </label>
                                    <DatePicker
                                        selected={pickupDate}
                                        onChange={(date) => setPickupDate(date)}
                                        showTimeSelect
                                        dateFormat="dd/MM/yyyy HH:mm"
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                    />
                                    </div>
                                    <div className="flex-grow">
                                    <label htmlFor="dropoff-date" className="block text-gray-500 mb-1">
                                        Dropoff Date
                                    </label>
                                    <DatePicker
                                        selected={dropoffDate}
                                        onChange={(date) => setDropoffDate(date)}
                                        showTimeSelect
                                        dateFormat="dd/MM/yyyy HH:mm"
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                    />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex gap-4 items-center">
                                    <label className="flex items-center text-gray-500">
                                        <input
                                        type="checkbox"
                                        className="mr-2 rounded border-gray-300 focus:ring-blue-200"
                                        onChange={()=> setSameDropOffLocation(!sameDropOffLocation)}
                                        />
                                        Same Drop-off Location?
                                    </label>
                                    <label className="flex items-center text-gray-500">
                                        <input
                                        type="checkbox"
                                        className="mr-2 rounded border-gray-300 focus:ring-blue-200"
                                        onChange={()=> setDriverAgeCheck(!driverAgeCheck)}
                                        
                                        />
                                        Driver age between 26-64
                                    </label>
                                    </div>
                                    <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                                        onClick={()=>{}}>
                                    Search
                                    </button>
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
