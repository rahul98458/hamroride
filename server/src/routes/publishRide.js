const {Router}=require('express');
const router = Router();
const { publishRide } = require('../controllers/ride');
router.post('/publishride',publishRide)
module.exports=router;