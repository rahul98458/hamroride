'use client'
import HamroRideLogo from '@/component/logo/page'
import CustumNavbar2 from '@/component/navbar2/page'
import { setBookingRequestedDetails } from '@/redux/reducerSlices/publishResultSlice'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaCircleArrowDown, FaCircleUser } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'

const RideRequest = () => {
    
    const {userDetails}=useSelector(state=>state.user)
    const {bookingRequestedDetails} = useSelector(state=>state.publishResult)
   // const [refresh, setRefresh] = useState(false); 
    const dispatch = useDispatch();
    const router=useRouter()

        useEffect(() => {
          checkRequestedRide()
        });

    const checkRequestedRide = async ()=> {
      const {data} =await axios.get(`http://localhost:4000/rider/requestedride/${userDetails.email}`)
     // console.log(data.myRequest);
      dispatch(setBookingRequestedDetails(data.myRequest))
        
         }    

        const rejectRide = async (id) => {
    try {
      await axios.patch(`http://localhost:4000/rider/rejectride/${id}`);
     // setRefresh(prev => !prev);
    } catch (error) {
      console.error('Error rejecting ride:', error);
    }
  }

  const back = ()=>
    {
      router.push('/rider/publishride')
    }
    
  const passengerDetails =(passengeremail) =>{
    router.push(`/rider/passengerdetails?email=${passengeremail}`)
   }
   
       
  const pendingItems = bookingRequestedDetails.filter(item => item.bookingStatus === 'pending');
  const otherItems = bookingRequestedDetails.filter(item => item.bookingStatus !== 'pending');

// Map over the pendingItems to create the list of pending items
const pendingListItems = pendingItems.map((item) => (
  <div key={item._id} className='p-2 border-b'>
    <div>
      <strong>Leaving From:</strong> {item.leavingFrom}
      <strong className='ml-2'>Going To:</strong> {item.goingTo}
      <strong className='ml-2'>Passenger Num:</strong> {item.passengerNum}
      <strong className='ml-2'>Date:</strong> {item.date}
      <strong className='ml-2'>Price:</strong> {item.price}
      <strong className='ml-2'>Booked By:</strong> {item.bookBy}
      <strong className='ml-2'>Status:</strong> {item.bookingStatus}
      <br/>
      <div>
      <Button onClick={()=>passengerDetails(item.bookBy)} className='ml-1' type='primary'>View Rider Details</Button>
        <Button onClick={() => acceptRide(item._id)} className='ml-2' type='primary'>
          Accept Ride
        </Button>
        <Button onClick={() => rejectRide(item._id)} className='ml-2' type='primary'>
          Reject Ride
        </Button>
        <Button onClick={() =>back()} className='ml-2' type='primary'>
          Back
        </Button>
      </div>
    </div>
  </div>
));

// Map over the otherItems to create the list of items with other statuses
const otherListItems = otherItems.map((item) => (
  <div key={item._id} className='p-2 border-b'>
    <div>
      <strong>Leaving From:</strong> {item.leavingFrom}
      <strong className='ml-2'>Going To:</strong> {item.goingTo}
      <strong className='ml-2'>Passenger Num:</strong> {item.passengerNum}
      <strong className='ml-2'>Date:</strong> {item.date}
      <strong className='ml-2'>Price:</strong> {item.price}
      <strong className='ml-2'>Booked By:</strong> {item.bookBy}
      <strong className='ml-2'>Status:</strong> {item.bookingStatus}
      <br/>
    </div>
  </div>
));


        

  return (
    <div>
        <div className='m-4'>
            <CustumNavbar2/>
        </div>

       <br/><br/>
      
       <div className='w-[100%] flex flex-col items-center m-4 p-4 '>
      <div className='text-blue-600 m-2' >Pending Ride Requested To You</div>
      <div >{pendingListItems}</div>
    </div>
            <br/>
            
       <div className='w-[100%] flex flex-col items-center m-4 p-4 '>
      <div className='text-blue-600 m-2' >Requested Ride Decision By You.</div>
      <div >{otherListItems}</div>
    </div>

    </div>
  )
}

export default RideRequest