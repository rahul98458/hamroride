'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { use, useState } from 'react'
import { CgAdd } from "react-icons/cg";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { FaCircleArrowDown } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import {Input} from "@nextui-org/react";
import {DatePicker} from "@nextui-org/react";
import HamroRideLogo from '../../component/logo/page';
import { FaSearch } from 'react-icons/fa';
import { Formik, useFormik } from 'formik';
import { useSelector} from 'react-redux';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux'
import { setSearchResult } from '@/redux/reducerSlices/searchResultSlice';

const searchRide = () => {

  const {userDetails} = useSelector(state=>state.user)
  const router = useRouter();
  const dispatch = useDispatch();
 const email = userDetails.email; 
 
  
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

  const response = await fetch('http://localhost:4000/searchride', requestOptions);
  const data = await response.json();
  
  if (response.status === 200) {
    toast.success(data.msg);
   // console.log(data)
     dispatch(setSearchResult(data))
    router.push('/searchresult');
    
  } else {
    toast.error(data.msg);
  }
};

  // let [passenger, setPassenger] = useState(1);

  // if(passenger==0)
  //   {
  //    setPassenger(1)
  //   }

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
       {email}
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
           <DropdownItem key="login" className='text-blue-600' ><Link href="/login">Profile</Link></DropdownItem>
         <DropdownItem key="signup" className='text-blue-600' > <Link href="/">SignOut</Link></DropdownItem>
           
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
       </div>
     )
}

export default searchRide