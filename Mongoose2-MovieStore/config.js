const mongoose = require("mongoose")

const url = "mongodb://127.0.0.1:27017/movieStore"
const connectToDB = mongoose.connect(url);

module.exports = connectToDB;