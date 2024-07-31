const mongoose = require("mongoose");


const usreSchema = new mongoose.Schema({
    name:String,
    age:Number,
    gender:String,  
});

const UserModel = mongoose.model("user",usreSchema);

module.exports = UserModel;