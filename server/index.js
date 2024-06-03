
const express = require('express')
const mongoose = require('mongoose');

const dbConnect = require('./src/db/connection')
const app = express()
require('dotenv').config()
app.use(express.json())
const port = process.env.PORT
dbConnect()

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String, // String is shorthand for {type: String}
  address: String,
  phone:String,
  email:String,
  licenseNum:String,
  vehicleNum:String,
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

app.post('/register', (req, res) => {

  console.log(req.body)
  res.send("ok")
  User.create(req.body)
})

app.get('/users', async(req, res) => {
 const findUser = await User.find()
 res.send(findUser)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
