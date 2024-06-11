
const express = require('express')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const dbConnect = require('./src/db/connection')
const app = express()
require('dotenv').config()
app.use(express.json())
const port = process.env.PORT
dbConnect()
var cors = require('cors')
app.use(cors())

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


const rideSchema = new Schema({
  leavingFrom: String,
  goingTo : String, 
 // date: Date,
  passenger:Number,
  publishBy:String,
});

const User = mongoose.model('User', userSchema);
const Ride = mongoose.model('Ride', rideSchema);

app.post('/register', async(req, res) => {
  //console.log(req.body)
  const passwordHash=await bcrypt.hash(req.body?.password,saltRounds)
  req.body.password =passwordHash
  const phoneExist =await User.exists({phone:req.body.phone})
  const emailExist =await User.exists({email:req.body.email})
  if(phoneExist)
    {
    return  res.status(409).json({msg:"phone already taken"})
    }
    else if(emailExist)
    {
      return  res.status(409).json({msg:"email id already taken"})
    }
    else
    {
      await User.create(req.body)
      return res.json({msg:"user registered"})
    }
})

app.post('/login', async(req, res) => {
  const user = await User.findOne({email:req.body.email})
  if(user)
    {
     const passwordMatch=await bcrypt.compare(req.body.password,user.password);
     if(passwordMatch)
      {
        const token = jwt.sign({ phone:req.body.phone }, process.env.SECRET_KEY);
       
         res.json({msg:"Login Successful",token,user})
      }
      else
      {
        res.status(401).json({msg:"password doesnot match"})
      }
    }
    else
    {
      return res.status(401).json({msg:"user not registered"})
    }

// res.json({msg:"send"})
})


app.post('/publishride', async(req, res) => {
//  console.log(req.body)
       await Ride.create(req.body)
       return res.json({msg:"ride published"})
})



app.post('/searchride', async(req, res) => {
  const search = await Ride.find({laevingFrom:req.body.leavingFrom} && {goingTo:req.body.goingTo})
  if(search)
    {
     
         res.json({msg:"ride found",search})
    }
    else
    {
      return res.status(401).json({msg:"ride not found"})
    }

// res.json({msg:"send"})
})



app.get('/users', async(req, res) => {
 const findUser = await User.find()
 res.send(findUser)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
