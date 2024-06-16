const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String, // String is shorthand for {type: String}
  address: String,
  phone:String,
  email:String,
  password : String,
  gender : {
    type: String,
    enum : ['male','female','other'],
    default: 'male'
},
role: {
    type: String,
    enum : ['admin','rider','passenger'],
    default: 'passenger'
}
  
});
const User = mongoose.model('User', userSchema);
module.exports=User;