const express = require("express");
const mongoose = require("mongoose");
const voteRoute = require("./controller/voteRoute");
const userRoutes = require("./controller/userRoutes");
const adminRoutes = require("./controller/adminRoutes"); // Import adminRoutes
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

mongoose.set("strictQuery", true);
mongoose.connect("mongodb+srv://test:12345@cluster0.gvh79wd.mongodb.net/voting");
var db = mongoose.connection;
db.on("open", () => console.log("Connected to DB"));
db.on("error", () => console.log("Error occurred"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Use voteRoute, userRoutes, and adminRoutes
app.use("/voteRoute", voteRoute);
app.use("/userRoute", userRoutes);
app.use("/adminRoute", adminRoutes); // Set up adminRoutes at /adminRoute endpoint

app.listen(4000, () => {
    console.log("Server started at 4000");
});
