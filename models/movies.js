const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movies = new Schema({
    name:{
        type:String,
        unique:true
    },
    year:Number,
    director:String,
    imdbRating:String,
    raw:String,
    last_updated:{
        type:Date,
        default:new Date()
    }
});

module.exports = mongoose.model('movies',movies,'movies');

