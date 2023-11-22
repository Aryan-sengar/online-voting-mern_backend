const express = require("express");
const mongoose = require("mongoose");
const Admin = require("../model/adminSchema"); // Importing the admin schema

const adminRoutes = express.Router();

// Admin login route
adminRoutes.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the admin exists
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Check if the password matches (plaintext comparison, not recommended for production)
        if (password !== admin.password) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Simulate token creation (replace this logic with your authentication mechanism)
        const token = generateToken(admin._id); // Custom token generation logic
        
        res.status(200).json({ token, adminId: admin._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Simulated token generation function (to replace jwt.sign)
function generateToken(adminId) {
    // Replace this logic with your custom token generation mechanism
    return `mocked-token-${adminId}`;
}

module.exports = adminRoutes;
