'use client'
import React from 'react'
import { FaSearch } from "react-icons/fa";
import { CgAdd } from "react-icons/cg";
import { FaCircleUser } from "react-icons/fa6";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { FaCircleArrowDown } from "react-icons/fa6";
import HamroRideLogo from '../logo/page';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { logOutUser } from '@/redux/reducerSlices/userSlice';




const CustumNavbar2 = () => {
 
  const dispatch = useDispatch()
    
  const logOut=()=>
    {
      dispatch(logOutUser)
    }

   
  return (
     <div className=' flex items-center justify-between m-4'>
     <div >
     <HamroRideLogo/>
    </div>
    <div className='flex'>
     
      <div>
      <div className='text-blue-600'>
      <Dropdown>
      <DropdownTrigger>
        <Button className='text-blue-600 '>
         <div className='flex '>
        <div className='text-4xl' >  <FaCircleUser /></div>
         <div className='mt-3'> <FaCircleArrowDown/></div>
          </div>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem onClick={()=>logOut()} key="login" className='text-blue-600' ><Link href="/"><div>LogOut</div></Link></DropdownItem>
     
        
      </DropdownMenu>
    </Dropdown>
      
      </div>
      </div>
    </div>
    </div>
  )
}

export default CustumNavbar2