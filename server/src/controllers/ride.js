const Book = require('../models/book');
const Ride = require('../models/ride');

const publishRide = async(req, res) => {
     //  console.log(req.body.date.year)
        await Ride.create(req.body)
         return res.json({msg:"ride published"})
    }

    const bookRide = async(req, res) => {
      //  console.log(req.body.date.year)
         await Book.create(req.body)
          return res.json({msg:"ride booked"})
     }


const searchRide = async(req, res) => {
        const search = await Ride.find({
          $and: [
            { leavingFrom: req.body.leavingFrom },
            { goingTo: req.body.goingTo },
            { passenger: { $gte: req.body.passenger } }
          ]
        });  
        
        // if(search)
        //   {
        //        res.status(200).json({msg:"ride found",search})
        //   }
        //   else
        //   {
        //     res.status(204).end();
        //   }
       res.json({search})
      }

      const myPublishRide = async(req, res) => {
        //console.log(req.params)
      const myPublish = await Ride.find({publishBy:req.params.userEmail})
    // console.log(myPublish);
      res.json({msg:"Your All Published Ride",myPublish})
    
      }

      const removePublishRide = async(req, res) => {
      
        const remPublish = await Ride.findByIdAndDelete({_id:req.params.rideId})
    
        res.json({msg:"Your Ride Deleted"})
      
        }

        const removeBookRide = async(req, res) => {
      
          const remPublish = await Book.findByIdAndDelete({_id:req.params.bookId})
      
          res.json({msg:"Your Ride Deleted"})
        
          }

       
      const myBookRide = async(req, res) => {
        //console.log(req.params)
      const myBook = await Book.find({bookBy:req.params.userEmail})
    //console.log(myBook);
      res.json({msg:"Your All Published Ride",myBook})
    
      }


      const requestedRide = async(req, res) => {
      //  console.log(req.params)
      const myRequest = await Book.find({rideBy:req.params.userEmail})
   // console.log(myRequest);
      res.json({msg:"Your All Requested Ride",myRequest})
    
      }


      const rejectRide = async(req, res) => {
            
        
       const rejectStatus =await Book.findByIdAndUpdate(req.params.rideId,{ bookingStatus: 'reject' })
       console.log(rejectStatus)   
      
        }

        // const editPublishRide =async(req,res)=>
        //   {
        //     const editPublish = await Ride.findByIdAndUpdate({_id:req.params.rideId})
        //     console.log(editPublishRide)
        //   }



module.exports={publishRide,searchRide,myPublishRide,removePublishRide,bookRide,myBookRide,removeBookRide,requestedRide,rejectRide}