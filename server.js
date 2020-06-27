#!/usr/bin/env nodejs
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const exerciseRoutes = require("./routes/exerciseRoutes");
const userRoutes = require("./routes/userRoutes");
const path = require("path");
require("dotenv").config();

// Middleware
app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.json());


// Database
mongoose.connect(process.env.DB_String, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {
    console.log("Connected to Mongo Atlas Database");
}).catch(err => console.log("Error"));

// Routes
app.use("/exercises", exerciseRoutes);
app.use("/users", userRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

console.log(process.env.NODE_ENV);

const PORT = 5000;
console.log(PORT);

// Application
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
