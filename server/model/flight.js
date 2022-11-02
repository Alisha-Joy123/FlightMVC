const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var flightSchema  = new Schema({
    flightNo : {
        type : String,
        required: true,
    },
    airlines : {
        type : String,
        required: true,
    },
    source : {
        type: String,
         
    },
    destination : {
        type: String,
        
    },
    duration : {
        type: String,
    },
    departureDate : {
        type:Date,
       
    },
    status : String
})

const FlightDB = mongoose.model('FlightDB', flightSchema);

module.exports = FlightDB;