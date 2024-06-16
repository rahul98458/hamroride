const mongoose = require('mongoose');
const { Schema } = mongoose;
const rideSchema = new Schema({
    leavingFrom: String,
    goingTo : String, 
    date:Object,
    passenger:Number,
    publishBy:String,
  });

  const Ride =  mongoose.model('Ride', rideSchema);
  module.exports=Ride;