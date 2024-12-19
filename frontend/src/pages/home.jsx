import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Card, Typography, Input,} from "@material-tailwind/react";
import { Footer } from "@/widgets/layout";
import { contactData } from "@/data";

export function Home() {
    const [pickUpDate, setPickUpDate] = useState(new Date());
    const [dropOffDate, setDropOffDate] = useState(new Date());

    const generateTimeOptions = () => {
        const options = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute of [0, 30]) {
                const hourFormatted = hour.toString().padStart(2, "0");
                const minuteFormatted = minute.toString().padStart(2, "0");
                options.push(
                    <option key={`${hourFormatted}:${minuteFormatted}`} value={`${hourFormatted}:${minuteFormatted}`}>
                        {hourFormatted}:{minuteFormatted}
                    </option>
                );
            }
        }
        return options;
    };

    return (
        <>
            <div className="relative flex h-screen content-center items-center justify-center pb-32">
                <div className="absolute top-0 h-full w-full bg-[url('/img/road-woman-beautiful-safari-young.png')] bg-cover bg-center" />
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
                            <div className="flex flex-wrap gap-4 items-center">
                                <Input variant="outlined" size="lg" label="Pick-up Location" />

                                {/* Pick-up Date and Time */}
                                <div className="flex flex-row items-center gap-2">
                                    <DatePicker
                                        selected={pickUpDate}
                                        onChange={(date) => setPickUpDate(date)}
                                        dateFormat="yyyy-MM-dd"
                                        className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <select
                                        defaultValue="11:00"
                                        className="px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        {generateTimeOptions()}
                                    </select>
                                </div>

                                {/* Drop-off Date and Time */}
                                <div className="flex flex-row items-center gap-2">
                                    <DatePicker
                                        selected={dropOffDate}
                                        onChange={(date) => setDropOffDate(date)}
                                        dateFormat="yyyy-MM-dd"
                                        className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <select
                                        defaultValue="11:00"
                                        className="px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        {generateTimeOptions()}
                                    </select>
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
