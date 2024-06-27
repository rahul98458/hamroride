const Admin = require('../models/admin');
const User = require('../models/user');
const Book = require('../models/book');
const Ride = require('../models/ride');
const UserKyc = require('../models/userKyc');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const registerUser = async(req, res) => {
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
  }

 const loginUser = async(req, res) => {
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
  }


  const updateRiderKyc = async(req,res)=>
    {
            req.body.citizenshipPhoto = req.files.citizenshipPhoto[0].filename
            req.body.licensePhoto = req.files.licensePhoto[0].filename
            req.body. kycVerifiedStatus = 'pending'
          // console.log(req.body)
           await UserKyc.create(req.body)
           res.json(
            {msg:"kyc submitted.Wait for Verification!"}
          )
    }


    const updatePassengerKyc = async(req,res)=>
      {
       // console.log(req.file);
              req.body.citizenshipPhoto = req.file.filename
              
              req.body. kycVerifiedStatus = 'pending'
            // console.log(req.body)
             await UserKyc.create(req.body)
             res.json(
              {msg:"kyc submitted.Wait for Verification!"}
            )
      }
      
     const checkKycStatusByUserId = async (req,res)=>{
            const kycDetails =await UserKyc.findOne({userId: req.params.userId})
            if(!kycDetails){
             return res.json({
                kycVerifiedStatus: 'unVerified'
              })
            }
           return res.json({
              kycVerifiedStatus: kycDetails.kycVerifiedStatus
            })
        
          }


          const loginAdmin = async(req, res) => {
            const admin = await Admin.findOne({email:req.body.email})
            if(admin)
              {
               const passwordMatch=await bcrypt.compare(req.body.password,admin.password);
               if(passwordMatch)
                {
                  const token = jwt.sign({ phone:req.body.phone }, process.env.SECRET_KEY);
                 
                   res.json({msg:"Login Successful",token,admin})
                }
                else
                {
                  res.status(401).json({msg:"password doesnot match"})
                }
              }
              else
              {
                return res.status(401).json({msg:"admin not registered"})
              }
          
          // res.json({msg:"send"})
          }

          const registerAdmin = async(req, res) => {
            //console.log(req.body)
            const passwordHash=await bcrypt.hash(req.body?.password,saltRounds)
            req.body.password =passwordHash
            const phoneExist =await Admin.exists({phone:req.body.phone})
            const emailExist =await Admin.exists({email:req.body.email})
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
                await Admin.create(req.body)
                return res.json({msg:"Admin registered"})
              }
          }       
          
          const getUserKyc = async (req,res)=>{
            const userKyc =  await UserKyc.find()
            res.json(
             userKyc
            )
           }      


           
           const  getBookRideDetails = async (req,res)=>{
            const bookResult =  await Book.find()
            res.json(
              bookResult
            )
           }      

         
           const  getRiderDetails = async (req,res)=>{
            const detailResult =  await User.findOne({email:req.params.riderEmail}, { password: 0 , isKycVerified:0})
            const allDetailRider = await UserKyc.findOne({userId:detailResult._id},{kycVerifiedStatus: 0 })
            res.json(
              {detailResult,allDetailRider}
            )
           }      

           const  getPassengerDetails = async (req,res)=>{
            const detailResult =  await User.findOne({email:req.params.passengerEmail}, { password: 0 , isKycVerified:0})
            const allDetailPassenger = await UserKyc.findOne({userId:detailResult._id},{kycVerifiedStatus: 0 })
            res.json(
              {detailResult,allDetailPassenger}
            )
           }      

           const  getRiderProfile = async (req,res)=>{
            const riderDetail =  await User.findOne({email:req.params.riderEmail}, { password: 0 , isKycVerified:0})
            const riderAllDetail = await UserKyc.findOne({userId:riderDetail ._id})
            const riderBooking = await Book.find({rideBy:req.params.riderEmail})
            const riderPublish = await Ride.find({publishBy:req.params.riderEmail})
            res.json(
              {riderDetail, riderAllDetail,riderBooking, riderPublish}
            )
           }     
          
           const getPassengerProfile = async (req,res)=>{
            const detailResult =  await User.findOne({email:req.params.passengerEmail}, { password: 0 , isKycVerified:0})
            const allDetailPassenger = await UserKyc.findOne({userId:detailResult._id})
            const passengerBooking = await Book.find({bookBy:req.params.passengerEmail})
            res.json(
              {detailResult,allDetailPassenger,passengerBooking}
            )
           }     

  module.exports={registerUser,loginUser,updateRiderKyc,updatePassengerKyc,
    checkKycStatusByUserId,loginAdmin,registerAdmin,
    getUserKyc,getBookRideDetails,getRiderDetails,getPassengerDetails,getRiderProfile,getPassengerProfile}