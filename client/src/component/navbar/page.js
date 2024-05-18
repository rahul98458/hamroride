'use client'
import React from 'react'
import { FaSearch } from "react-icons/fa";
import { CgAdd } from "react-icons/cg";
import { FaCircleUser } from "react-icons/fa6";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { FaCircleArrowDown } from "react-icons/fa6";
import HamroRideLogo from '../logo/page';
import Link from 'next/link';




const CustumNavbar = () => {
  return (
     <div className=' flex items-center justify-between m-4'>
     <div >
     <HamroRideLogo/>
    </div>
    <div className='flex'>
    <div className='flex p-4 space-x-4'> 
    <Link href="/searchride">
    <div className='text-blue-600 flex'>
      <div className='m-2'>
        <FaSearch className='text-xl' />
        </div>
      <div>Search Ride
      </div>
      </div>
      </Link>
    
      <Link href="/publishride">
    <div className='text-blue-600 flex'>
      <div className=' m-2 '>
        <CgAdd className='text-xl' />
        </div>
      <div className=''>Publish A Ride
      </div>
      </div>
      </Link>
      </div>
      <div>
      <div className='text-blue-600'>
         
      <Dropdown>
      <DropdownTrigger>
        <Button className='text-blue-600 '>
         <div className='flex'>
          <FaCircleUser className='text-4xl'/>
          <FaCircleArrowDown/>
          </div>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="login" className='text-blue-600' ><Link href="/login">Login</Link></DropdownItem>
      <DropdownItem key="signup" className='text-blue-600' > <Link href="/register">SignUp</Link></DropdownItem>
        
      </DropdownMenu>
    </Dropdown>
      
      </div>
      </div>
    </div>
    </div>
  )
}

export default CustumNavbar