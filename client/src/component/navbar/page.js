'use client'
import React from 'react'
import Link from 'next/link';
import { FaSearch } from "react-icons/fa";
import { CgAdd } from "react-icons/cg";
import { FaCircleUser } from "react-icons/fa6";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { FaCircleArrowDown } from "react-icons/fa6";
import Image from 'next/image';



const CustumNavbar = () => {
  return (
 <div className='m-4 flex'>
      <div className='w-20'>
      <Link href="/">
       <Image 
       height={100}
      width={80}
      alt="Logo"
      src="/logo.png"
    /></Link></div>
    
    <Link href="/searchride">
    <div className='text-blue-600 absolute top-5 right-60 h-8 w-8 flex mr-9'>
      <div className='top-8 m-2'>
        <FaSearch className='text-xl' />
        </div>
      <div className=''>Search Ride
      </div>
      </div>
      </Link>
    
      <Link href="/publishride">
    <div className='text-blue-600 absolute top-5 right-40 h-8 w-8 flex mr-7'>
      <div className='top-8 m-2 right-8'>
        <CgAdd className='text-xl' />
        </div>
      <div className=''>Publish A Ride
      </div>
      </div>
      </Link>
    
      <div className='text-blue-600 absolute top-3 right-11 h-8 w-8 flex'>
         
      <Dropdown className='relative top-2'>
      <DropdownTrigger>
        <Button className='text-blue-600 absolute top-2  right-0 bg-slate-200'>
         <div className='flex'>
          <FaCircleUser className='text-4xl'/>
          <FaCircleArrowDown className='absolute top-4 right-1'/>
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
  )
}

export default CustumNavbar