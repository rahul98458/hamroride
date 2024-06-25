const {Router}=require('express');
const router = Router();
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, 'uploads/document/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
})

const upload = multer({ storage: storage })

const { registerUser, loginUser,registerAdmin,loginAdmin, getUserKyc,
  updateRiderKyc, updatePassengerKyc,checkKycStatusByUserId,
  getBookRideDetails,getRiderDetails,getPassengerDetails } = require('../controllers/user');

router.post('/register',registerUser )
  
router.post('/login', loginUser)

router.post('/rider/rider-kyc',upload.fields([
    { name: "citizenshipPhoto", maxCount: 1 },
    { name: "licensePhoto", maxCount: 1 },]), updateRiderKyc)

router.post('/passenger/passenger-kyc', upload.single('citizenshipPhoto'), updatePassengerKyc)

 router.get('/rider/kyc-status/:userId', checkKycStatusByUserId)

 router.get('/passenger/kyc-status/:userId', checkKycStatusByUserId)

router.post('/admin/admin-register',registerAdmin )
  
router.post('/admin/admin-login', loginAdmin)

router.get('/admin/verify-kyc', getUserKyc)

router.get('/admin/bookdetails', getBookRideDetails)

router.get('/passenger/riderdetail/:riderEmail', getRiderDetails)

router.get('/rider/passengerdetail/:passengerEmail', getPassengerDetails)

module.exports=router