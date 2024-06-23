const {Router}=require('express');
const router = Router();
const { publishRide, myPublishRide, removePublishRide} = require('../controllers/ride');
router.post('/rider/publishride',publishRide)
router.get('/rider/publishride/:userEmail',myPublishRide)
router.get('/rider/publishride/rem/:rideId',removePublishRide)
//router.post('/rider/publishride/:rideId',editPublishRide)
module.exports=router;