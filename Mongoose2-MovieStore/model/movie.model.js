const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    genre:{
        type:String,
        required:true,
    },
    actors:{
        type:[String],
        required:true,
    },
    directors:{
        type:[String],
        required:true,
    },
    year:{
        type:Number,
        required:true,
    },
},{versionKey:false})

const MovieModel = mongoose.model("movie",movieSchema);

module.exports = MovieModel;