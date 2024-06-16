const {Router}=require('express');
const router = Router();
const { searchRide } = require('../controllers/ride');
router.post('/searchride',searchRide)
module.exports=router;
