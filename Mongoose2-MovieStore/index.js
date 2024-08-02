const express = require("express");
const mongoose = require("mongoose");
const connectToDB = require("./config");
const MovieModel = require("./model/movie.model");
const movieRouter = require("./routes/movie.route");


const PORT = 8080;
const server = express();

server.use(express.json());

server.use("/movies",movieRouter)


server.listen(PORT, async () => {
    try {
        await connectToDB;
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
    }
    console.log("Server is running on", PORT);
})

