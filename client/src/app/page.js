'use client'
import React, { useState } from 'react'
import {Image} from "@nextui-org/image";
import Link from 'next/link';
import { FaSearch } from "react-icons/fa";
import { CgAdd } from "react-icons/cg";
import { FaCircleUser } from "react-icons/fa6";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { FaCircleArrowDown } from "react-icons/fa6";
import {Input} from "@nextui-org/react";
import {DatePicker} from "@nextui-org/react";




const Home = () => {

  let [passenger, setPassenger] = useState(1);

  if(passenger==0)
    {
     setPassenger(1)
    }


  return (
      
    <div className='bg-white'>
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

    <div >
      <Image 
       width={1600}
       height={1}
      alt="Pick A Ride"
      src="/body.png"
    />
      </div>

      <div >

             <div className="flex w-full gap-4">
    <div className='m-4'>  <Input type="text" label="Leaving From"  isRequired/></div>
    <div className='m-4'>  <Input type="text" label="Going To"  isRequired/></div>
    <div className='m-4'> 
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <DatePicker 
          label="Date"
          className="max-w-[284px]"
          isRequired
        />
    </div>
     </div>
    <div className='m-4 text-black mt-6'> 
    Passenger
    <button className='m-2 bg-blue-400 h-8 w-8' onClick={()=>setPassenger(passenger-1)}>-</button>{passenger}<button className='m-2 bg-blue-400 h-8 w-8' onClick={()=>setPassenger(passenger+1)}>+</button>
  
    </div>
      
    

     <Button color="primary" className='mt-6 mr-4 h-12'>Search</Button>
    </div>

      </div>

    </div>
    
  )
}

export default Home