const Ride = require('../models/ride');

const publishRide = async(req, res) => {
           
  
     //  console.log(req.body.date.year)
        await Ride.create(req.body)
         return res.json({msg:"ride published"})
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

module.exports={publishRide,searchRide}