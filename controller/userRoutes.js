const express = require("express");
const mongoose = require("mongoose");
const User = require("../model/userSchema"); // Importing the user schema

const userRoutes = express.Router();

// User signup route
userRoutes.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Create a new user without password hashing
        const newUser = new User({
            username,
            password,
            // Add any additional fields you might want to include during signup
        });

        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// User login route
userRoutes.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Check if the password matches
        if (password !== user.password) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Simulate token creation (replace this logic with your authentication mechanism)
        const token = generateToken(user._id); // Custom token generation logic
        
        res.status(200).json({ token, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Simulated token generation function (to replace jwt.sign)
function generateToken(userId) {
    // Replace this logic with your custom token generation mechanism
    return `mocked-token-${userId}`;
}

module.exports = userRoutes;
