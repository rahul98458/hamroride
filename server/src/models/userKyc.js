const mongoose = require('mongoose')
const { Schema } = mongoose;

const userKycSchema = new Schema({
  citizenshipPhoto: String,
  licensePhoto: String,
  citizenshipNum:String,
  licenseNum:String,
  userId: String,
  kycVerifiedStatus: {
    type: String,
    enum : ['unVerified','pending','verified'],
    default: 'unVerified'
  },
},{
  timestamps:true
});
const UserKyc = mongoose.model('UserKyc', userKycSchema);
module.exports= UserKyc