const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/locations", async (req, res) => {
    try {
        const response = await axios.get("https://api-dev.karpadu.com/GetStations", {
            headers: {
                "subscription-key": "e28de51808104be6824cc86b1786d1dc",
            },
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error calling Azure Function:", error.message);

        res.status(500).json({
            error: "Failed to fetch locations",
            message: error.message,
            details: error.response?.data,
        });
    }
});


app.listen(PORT, () => {
    console.log(`Backend server running on PORT:${PORT}`);
});
