'use client'
import HamroRideLogo from '@/component/logo/page'
import { setBookingRequestedDetails } from '@/redux/reducerSlices/publishResultSlice'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaCircleArrowDown, FaCircleUser } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'

const RideRequest = () => {
    
    const {userDetails}=useSelector(state=>state.user)
    const {bookingRequestedDetails} = useSelector(state=>state.publishResult)
   // const [refresh, setRefresh] = useState(false); 
    const dispatch = useDispatch();
    const LogOut=()=>
        {
               dispatch(logOutUser);
        }

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
        <Button onClick={() => acceptRide(item._id)} className='ml-2' type='primary'>
          Accept Ride
        </Button>
        <Button onClick={() => rejectRide(item._id)} className='ml-2' type='primary'>
          Reject Ride
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

<div className=' flex items-center justify-between m-4'>
        <div >
        <HamroRideLogo/>
       </div>
       <div className='flex'>

        
         <div>
         <div className='text-blue-600 flex'>
          <div  className='m-3 mt-0 ' >
          Hi.{userDetails.firstName}
          </div>
         <Dropdown>
         <DropdownTrigger>
           <Button className='text-blue-600 '>
            <div className='flex '>
           <div>  <FaCircleUser className='text-4xl'/></div>
            <div > <FaCircleArrowDown/></div>
             </div>
           </Button>
         </DropdownTrigger>
         <DropdownMenu aria-label="Static Actions">
          
           <DropdownItem key="requestedride" className='text-blue-600' ><Link href="/rider/riderequest">Profile</Link></DropdownItem>
         <DropdownItem key="logout" className='text-blue-600' > <Link onClick={()=>LogOut()} href="/">LogOut</Link></DropdownItem>
           
         </DropdownMenu>
       </Dropdown>
         
         </div>
         </div>
       </div>
       </div>

       <br/><br/>
      
       <div className='w-[100%] flex flex-col items-center m-4 p-4 '>
      <div className='text-blue-600 m-2' >Pending Ride Requested To You</div>
      <div >{pendingListItems}</div>
    </div>
            <br/><br/>
            
       <div className='w-[100%] flex flex-col items-center m-4 p-4 '>
      <div className='text-blue-600 m-2' >Requested Ride Decision By You.</div>
      <div >{otherListItems}</div>
    </div>

    </div>
  )
}

export default RideRequest