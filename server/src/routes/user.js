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

const { registerUser, loginUser, updateRiderKyc, updatePassengerKyc,checkKycStatusByUserId } = require('../controllers/user');

router.post('/register',registerUser )
  
router.post('/login', loginUser)

router.post('/rider-kyc',upload.fields([
    { name: "citizenshipPhoto", maxCount: 1 },
    { name: "licensePhoto", maxCount: 1 },]), updateRiderKyc)

router.post('/passenger-kyc', upload.single('citizenshipPhoto'), updatePassengerKyc)

 router.get('/kyc-status/rider/:userId', checkKycStatusByUserId)

 router.get('/kyc-status/passenger/:userId', checkKycStatusByUserId)

module.exports=router