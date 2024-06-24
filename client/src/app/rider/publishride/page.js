'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { CgAdd } from "react-icons/cg";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { FaCircleArrowDown } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import {Input} from "@nextui-org/react";
import {DatePicker} from "@nextui-org/react";
import HamroRideLogo from '../../../component/logo/page';
import { FaSearch } from 'react-icons/fa';
import { Formik, useFormik } from 'formik';
import { useDispatch, useSelector} from 'react-redux';
import toast from 'react-hot-toast';
import { logOutUser, setUserKycVerifiedStatus } from '@/redux/reducerSlices/userSlice';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { removePublishResult, setPublishResult } from '@/redux/reducerSlices/publishResultSlice';

const publishride = () => {
  
  const router = useRouter();
  const {userDetails,kycVerifiedStatus} = useSelector(state=>state.user)
  const {publishResultDetails} = useSelector(state=>state.publishResult)
  const [refresh, setRefresh] = useState(false); 
  const dispatch = useDispatch();
 const email = userDetails.email; 
 const uName = userDetails.firstName;
 const id = userDetails._id;
// console.log(kycVerifiedStatus)
     
const LogOut=()=>
  {
         dispatch(logOutUser);
  }

  useEffect(() => {
    checkPublishRide()
  },[refresh]);
  
  useEffect(() => {
    checkKycStatus()
  }, []);

  const checkKycStatus = async ()=> {
    const {data} =await axios.get(`http://localhost:4000/rider/kyc-status/${id}`)
   // console.log(data.kycVerifiedStatus)
     dispatch(setUserKycVerifiedStatus(data.kycVerifiedStatus))
   }


  const checkPublishRide = async ()=> {
   const {data} =await axios.get(`http://localhost:4000/rider/publishride/${email}`)
  // console.log(data.myPublish);
    dispatch(setPublishResult(data.myPublish))
 
  }

  const removePublishRide = async (pid)=> {
    const {data} =await axios.get(`http://localhost:4000/rider/publishride/rem/${pid}`)
    toast.success(data.msg);
    setRefresh(prev => !prev);
   }

  //  const editPublishRide = async (pid)=> {
  //   const {data} =await axios.post(`http://localhost:4000/rider/publishride/${pid}`)
  
  //  }

   
 
 // console.log(publishResultDetails)

  const listItems = publishResultDetails.map((item) => (
    <div key={item._id} className='p-2 border-b'>
      <div><strong>Leaving From:</strong> {item.leavingFrom}
      <strong className='ml-2'>Going To:</strong> {item.goingTo}
      <strong  className='ml-2'>Passenger:</strong> {item.passenger}
      <strong  className='ml-2'>Date:</strong> {item.date.year}/{item.date.month}/{item.date.day}
      <strong  className='ml-2'>Price:</strong> {item.price}
      <Button onClick={()=>editPublishRide(item._id)} className='ml-2' type='primary'>Edit Ride</Button>
     <Button onClick={()=>removePublishRide(item._id)} className='ml-2' type='primary'>Delete Ride</Button>
      
      </div>
    </div>
  ));


  
  const formik = useFormik({
    initialValues: {
      leavingFrom: '',
      goingTo: '',
      date: null,
      passenger:1,
      publishBy:email,
      price:'',
    },
   // validationSchema:validationSchema,
    onSubmit: values => {
    //  console.log(values)
      publishRide(values)
    },
  });
        

  const publishRide =async(values)=>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
  };

  const response = await fetch('http://localhost:4000/rider/publishride', requestOptions);
  const data = await response.json();
  
  if(response.status==200){
    toast.success(data.msg);
    setRefresh(prev => !prev);
    }
    else
    {toast.error(data.msg);}
  }


  



    const handleDateChange = (date) => {
      formik.setFieldValue('date', date);
    };

     // Handlers for passenger buttons
  const handleDecreasePassenger = () => {
    if (formik.values.passenger > 1) {
      formik.setFieldValue('passenger', formik.values.passenger - 1);
    }
  };

  const handleIncreasePassenger = () => {
    formik.setFieldValue('passenger', formik.values.passenger + 1);
  };

  const generateKycDiv = ()=>{
    if(kycVerifiedStatus=== 'unVerified'){
       return <p className='p-2 bg-orange-100 rounded-lg text-md'> ⚠️ User KYC is not verified. <Link href="/kyc-verify-rider">Verify Now</Link> </p>
    }else if(kycVerifiedStatus === 'pending'){
      return <p className='p-2 bg-orange-100 rounded-lg text-md'> User KYC is submitted. Please wait for Admin Approval </p>
    }else if(kycVerifiedStatus === 'rejected'){
      return <p className='p-2 bg-orange-100 rounded-lg text-md'> Your KYC was rejected. <Link href="/kyc-verify-rider">Re-submit Now</Link> </p>
    }
  }

//  {!isVerify && <p className='bg-orange-400'>your kyc is not verified.<Link href={'/kyc-verify'}>verify now</Link></p>}

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
          <div  className='m-3 mt-0 ' >
          Hi.{uName}
          
          {generateKycDiv()}
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
           <DropdownItem key="profile" className='text-blue-600' ><Link href="/login">Profile</Link></DropdownItem>
           <DropdownItem key="requestedride" className='text-blue-600' ><Link href="/rider/requestedride">Requested Ride</Link></DropdownItem>
         <DropdownItem key="logout" className='text-blue-600' > <Link onClick={()=>LogOut()} href="/">LogOut</Link></DropdownItem>
           
         </DropdownMenu>
       </Dropdown>
         
         </div>
         </div>
       </div>
       </div>
      
      
       <br/><br/>
      
            <div className='text-blue-600 text-center'>
             Publish a Ride
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
   
    <div className='m-4'> 
   <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
   <DatePicker 
   id='date'
   name='date'
   label="Date"
   className="max-w-[284px]"
   isRequired
   value={formik.values.date}
   onChange={(value)=>formik.setFieldValue('date',value)}
   />
   </div>
   </div> 

   <div className='m-4 w-50'>  <Input type="text" label="Price Per Person"  isRequired
   id="price"
   name="price"
   onChange={formik.handleChange}
   value={formik.values.price}  
   /></div>
   
   <div className='text-black w-72'> 
   Passenger
   <br/>
   <button className='m-2 bg-blue-400 h-8 w-5' type='button' onClick={handleDecreasePassenger}>-</button> 
    {formik.values.passenger}
    <button className='m-2 bg-blue-400 h-8 w-5'type='button' onClick={handleIncreasePassenger}>+</button>
   </div>

   <div className='m-4'>
      <Input type="text" label="Publish By"  
              id="publishBy"
              name="publishBy"
              onChange={formik.handleChange}
              value={formik.values.publishBy} 
              readOnly/>
   </div>
   
   
   
   <Button type="submit" color="primary" className='mt-6 mr-4 h-12'>Publish</Button>
   
   </form>

   

   </div>
   <div className='w-[100%] flex flex-col items-center m-4 p-4 '>
      <div >Your Published Ride</div>
      <div >{listItems}</div>
    </div>
       </div>
     )
}

export default publishride