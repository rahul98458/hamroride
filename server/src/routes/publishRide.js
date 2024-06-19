const {Router}=require('express');
const router = Router();
const { publishRide, myPublishRide, } = require('../controllers/ride');
router.post('/publishride',publishRide)
router.get('/publishride/:userEmail',myPublishRide)
module.exports=router;