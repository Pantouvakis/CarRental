import React from "react";

export const generateTimeOptions = () => {
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
