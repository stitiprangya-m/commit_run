const express = require("express");
const cors = require("cors");

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is running successfully",
    });
});

module.exports = app;