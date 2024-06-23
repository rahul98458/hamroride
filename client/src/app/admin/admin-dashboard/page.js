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
import { setPublishResult } from '@/redux/reducerSlices/publishResultSlice';


const AdminDashboard = () => {
  
 
  return (
    <div>
    <div className=' flex items-center justify-between m-4'>
        <div className='flex' >
        <HamroRideLogo/>
        
       </div>
       <div className='flex'>
      
      
        
        
         <div>
         <div className='text-blue-600 flex'>
         
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
         <DropdownItem key="signup" className='text-blue-600' > <Link onClick={()=>LogOut()} href="/">LogOut</Link></DropdownItem>
           
         </DropdownMenu>
       </Dropdown>
         
         </div>
         </div>
       </div>
       </div>
       <br/><br/>
        
        <div className='items-center  m-4 w-[20%] bg-blue-400'>
          <div className='p-1 pl-12'>
          Admin Panel
          </div>
          <br/>
          <div className='pl-1'>
          <Link href='/admin/verifykyc'>Verify the KYC</Link>
          </div>
        </div>

       </div>
     )
}

export default AdminDashboard