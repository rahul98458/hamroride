const {Router}=require('express');
const router = Router();
const { publishRide, myPublishRide, removePublishRide,requestedRide,rejectRide,acceptRide} = require('../controllers/ride');
router.post('/rider/publishride',publishRide)
router.get('/rider/publishride/:userEmail',myPublishRide)
router.get('/rider/publishride/rem/:rideId',removePublishRide)
router.get('/rider/requestedride/:userEmail',requestedRide)
router.patch('/rider/rejectride/:rideId',rejectRide)
router.patch('/rider/acceptride/:rideId',acceptRide)
//router.post('/rider/publishride/:rideId',editPublishRide)
module.exports=router;