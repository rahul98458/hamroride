const User = require('../models/user');
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

  module.exports={registerUser,loginUser,updateRiderKyc,updatePassengerKyc,checkKycStatusByUserId}