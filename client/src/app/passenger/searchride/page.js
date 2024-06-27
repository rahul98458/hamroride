'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'
import { CgAdd } from "react-icons/cg";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { FaCircleArrowDown } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import {Input} from "@nextui-org/react";
import {DatePicker} from "@nextui-org/react";
import HamroRideLogo from '../../../component/logo/page';
import { FaSearch } from 'react-icons/fa';
import { Formik, useFormik } from 'formik';
import { useSelector} from 'react-redux';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux'
import { setBookRideResult, setSearchResult } from '@/redux/reducerSlices/searchResultSlice';
import { logOutUser ,setUserKycVerifiedStatus} from '@/redux/reducerSlices/userSlice';
import axios from 'axios';

const searchRide = () => {

  const {userDetails,kycVerifiedStatus} = useSelector(state=>state.user)
  const {bookRideResult} = useSelector(state=>state.searchResult)
  const router = useRouter();
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false); 
 const email = userDetails.email; 
const uName = userDetails.firstName;
const id = userDetails._id;

    const logOut=()=>
      {
        dispatch(logOutUser)
      }

      useEffect(() => {
        checkKycStatus()
      }, []);
      useEffect(() => {
        checkBookRide()
      },[refresh]);
    
      const checkKycStatus = async ()=> {
        const {data} =await axios.get(`http://localhost:4000/passenger/kyc-status/${id}`)
       // console.log(data.kycVerifiedStatus)
         dispatch(setUserKycVerifiedStatus(data.kycVerifiedStatus))
       }

       const removeBookRide = async (pid)=> {
        const {data} =await axios.get(`http://localhost:4000/passenger/bookride/rem/${pid}`)
        toast.success(data.msg);
        setRefresh(prev => !prev);
       
       }

       const generateKycDiv = ()=>{
        if(kycVerifiedStatus=== 'unVerified'){
           return <p className='p-2 bg-orange-100 rounded-lg text-md'> ⚠️ User KYC is not verified. <Link href="/kyc-verify-passenger">Verify Now</Link> </p>
        }else if(kycVerifiedStatus === 'pending'){
          return <p className='p-2 bg-orange-100 rounded-lg text-md'> User KYC is submitted. Please wait for Admin Approval </p>
        }else if(kycVerifiedStatus === 'rejected'){
          return <p className='p-2 bg-orange-100 rounded-lg text-md'> Your KYC was rejected. <Link href="/kyc-verify-passenger">Re-submit Now</Link> </p>
        }
      }

      const checkBookRide = async ()=> {
        const {data} =await axios.get(`http://localhost:4000/passenger/bookride/${email}`)
       // console.log(data.myBook);
         dispatch(setBookRideResult(data.myBook))
      
       }

       console.log(bookRideResult)
     

       const pendingItems = bookRideResult.filter(item => item.bookingStatus === 'pending');
       const decisionItems = bookRideResult.filter(item => item.bookingStatus !== 'pending');
      
       const pendingListItems = pendingItems.map((item) => (
        <div key={item._id} className='p-2 border-b'>
          <div>
            <strong>Leaving From:</strong> {item.leavingFrom}
            <strong className='ml-2'>Going To:</strong> {item.goingTo}
            <strong className='ml-2'>Booked Seat:</strong> {item.passengerNum}
            <strong className='ml-2'>Date:</strong> {item.date}
            <strong className='ml-2'>Price:</strong> {item.price}
            <strong className='ml-2'>Ride By:</strong> {item.rideBy}
            <strong className='ml-2'>Status:</strong> {item.bookingStatus}
            <Button onClick={() => editPublishRide(item._id)} className='ml-2' type='primary'>
              Edit Ride
            </Button>
            <Button onClick={() => removeBookRide(item._id)} className='ml-2' type='primary'>
              Delete Ride
            </Button>
          </div>
        </div>
      ));
      
      // Map over the otherItems to create the list of items with other statuses
      const decisionListItems = decisionItems.map((item) => (
        <div key={item._id} className='p-2 border-b'>
          <div>
            <strong>Leaving From:</strong> {item.leavingFrom}
            <strong className='ml-2'>Going To:</strong> {item.goingTo}
            <strong className='ml-2'>Booked Seat:</strong> {item.passengerNum}
            <strong className='ml-2'>Date:</strong> {item.date}
            <strong className='ml-2'>Price:</strong> {item.price}
            <strong className='ml-2'>Ride By:</strong> {item.rideBy}
            <strong className='ml-2'>Status:</strong> {item.bookingStatus}
          </div>
        </div>
      ));


      //  const listItems =bookRideResult.map((item) => (
      //   <div key={item._id} className='p-2 border-b'>
      //     <div><strong>Leaving From:</strong> {item.leavingFrom}
      //     <strong className='ml-2'>Going To:</strong> {item.goingTo}
      //     <strong  className='ml-2'>Booked Seat:</strong> {item.passengerNum}
      //     <strong  className='ml-2'>Date:</strong> {item.date}
      //     <strong  className='ml-2'>Price:</strong> {item.price}
      //     <strong  className='ml-2'>Ride By:</strong> {item.rideBy}
      //     <strong  className='ml-2'>Status:</strong> {item.bookingStatus}

      //     {item.bookingStatus === 'pending' && (
      //   <>
      //     <Button onClick={() => editPublishRide(item._id)} className='ml-2' type='primary'>
      //       Edit Ride
      //     </Button>
      //     <Button onClick={() => removeBookRide(item._id)} className='ml-2' type='primary'>
      //       Delete Ride
      //     </Button>
      //   </>
      // )}
         
      //     </div>
      //   </div>
      // ));
    
  
  const formik = useFormik({
    initialValues: {
      leavingFrom: '',
      goingTo: '',
   //   date: null,
      passenger:1,
      searchBy:email,
    },
   // validationSchema:validationSchema,
    onSubmit: values => {
     // console.log(values)
      searchRide(values)
    },
  });

  const searchRide =async(values)=>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
  };
  
  const response = await fetch('http://localhost:4000/passenger/searchride', requestOptions);
  const data = await response.json();
  
  // if (response.status === 200) {
  //   toast.success(data.msg);
  //  //console.log(data.search)
  //   dispatch(setSearchResult(data))
  //   router.push('/searchresult');
    
  // } else if(response.status === 204){
  //   toast.error('Ride not found');
  //   dispatch(setSearchResult([]));
  // }

  const length =data.search.length;
  if(length>=1)
    {
    toast.success('Ride found');
    dispatch(setSearchResult(data))
    router.push('/passenger/searchresult');
    }
    else
          {
            toast.error('Ride not found');
          }
    

};

  // let [passenger, setPassenger] = useState(1);

  // if(passenger==0)
  //   {
  //    setPassenger(1)
  //   }

    // const handleDateChange = (date) => {
    //   formik.setFieldValue('date', date);
    // };

     // Handlers for passenger buttons
  const handleDecreasePassenger = () => {
    if (formik.values.passenger > 1) {
      formik.setFieldValue('passenger', formik.values.passenger - 1);
    }
  };

  const handleIncreasePassenger = () => {
    formik.setFieldValue('passenger', formik.values.passenger + 1);
  };


  return (
    <div>
    <div className=' flex items-center justify-between m-4'>
        <div >
        <HamroRideLogo/>
       </div>
       <div className='flex'>
      
       {/* <div className='flex p-2 space-x-4'> 
       <Link href="/searchride">
       <div className='text-blue-600 flex'>
         <div className='mr-1 mt-1'>
           <FaSearch className='text-xl' />
           </div>
         <div className='mr-1'>Search Ride
         </div>
         </div>
         </Link>
         </div> */}
        
        
         <div>
         <div className='text-blue-600 flex'>
          <div  className='m-2' >
          Hi.{uName}
       {generateKycDiv()}
          </div>
         <Dropdown>
         <DropdownTrigger>
           <Button className='text-blue-600 '>
            <div className='flex '>
           <div>  <FaCircleUser className='text-4xl'/></div>
            <div className='mt-3' > <FaCircleArrowDown/></div>
             </div>
           </Button>
         </DropdownTrigger>
         <DropdownMenu aria-label="Static Actions">
           <DropdownItem key="login" className='text-blue-600' ><Link href="/passenger/passengerprofile"><div>Profile</div></Link></DropdownItem>
         <DropdownItem key="logout" className='text-blue-600' > <Link onClick={()=>logOut()} href="/"><div>LogOut</div></Link></DropdownItem>
           
         </DropdownMenu>
       </Dropdown>
         
         </div>
         </div>
       </div>
       </div>
      
      
       <br/><br/>
      
            <div className='text-blue-600 text-center'>
             Search a Ride
            </div>
            <br/><br/>
           
         <div className='flex justify-center  items-center' >
   
         <form onSubmit={formik.handleSubmit} className="flex w-full gap-4">
   
   <div className='m-4 w-50 mr-8'>  <Input type="text" label="Leaving From"  isRequired
   id="leavingFrom"
   name="leavingFrom"
   onChange={formik.handleChange}
   value={formik.values.leavingFrom}  
   /></div>
   
   <div className='m-4 w-50'>  <Input type="text" label="Going To"  isRequired
   id="goingTO"
   name="goingTo"
   onChange={formik.handleChange}
   value={formik.values.goingTo}  
   /></div>
   
   {/* <div className='m-4'> 
   <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
   <DatePicker 
   label="Date"
   className="max-w-[284px]"
   isRequired
   value={formik.values.date}
   onChange={handleDateChange}
   />
   </div>
   </div> */}
   
   <div className='text-black w-72'> 
   Passenger
   <br/>
   <button className='m-2 bg-blue-400 h-8 w-5' type='button' onClick={handleDecreasePassenger}>-</button> 
    {formik.values.passenger}
    <button className='m-2 bg-blue-400 h-8 w-5'type='button' onClick={handleIncreasePassenger}>+</button>
   
   </div>

   <div className='m-4'>
      <Input type="text" label="Search By"  
              id="publishBy"
              name="publishBy"
              onChange={formik.handleChange}
              value={formik.values.searchBy} 
              readOnly/>
   </div>
   
   
   
   <Button type="submit" color="primary" className='mt-6 mr-4 h-12'>Search</Button>
   
   </form>
   </div>
   <div className='w-[100%] flex flex-col items-center m-4 p-4 '>
      <div className='text-blue-600 m-2' >Your Pending Booked Ride</div>
      <div >{pendingListItems}</div>
    </div>
    <div className='w-[100%] flex flex-col items-center m-4 p-4 '>
      <div className='text-blue-600 m-2' >Your Decisioned Booked Ride</div>
      <div >{decisionListItems}</div>
    </div>
       </div>
     )
}

export default searchRide