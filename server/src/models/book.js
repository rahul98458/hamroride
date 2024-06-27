const mongoose = require('mongoose');
const { Schema } = mongoose;
const bookSchema = new Schema({
    leavingFrom: String,
    goingTo : String, 
    date:Object,
    passengerNum:Number,
    bookBy:String,
    rideBy:String,
    rideId:String,
    price:Number,
    bookingStatus: {
      type: String,
      enum : ['accept','reject','pending'],
      default: 'pending'
  },
  
  });

  const Book =  mongoose.model('Book', bookSchema);
  module.exports=Book;