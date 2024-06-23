const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
  firstName: String,
  lastName: String, // String is shorthand for {type: String}
  address: String,
  phone:String,
  email:String,
  password : String,
});
const Admin = mongoose.model('Admin', adminSchema);
module.exports=Admin;