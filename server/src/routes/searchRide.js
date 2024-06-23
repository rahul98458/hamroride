const {Router}=require('express');
const router = Router();
const { searchRide, bookRide ,myBookRide,removeBookRide} = require('../controllers/ride');
router.post('/passenger/searchride',searchRide)
router.post('/passenger/bookride',bookRide)
router.get('/passenger/bookRide/:userEmail',myBookRide)
router.get('/passenger/bookride/rem/:bookId',removeBookRide)
module.exports=router;
