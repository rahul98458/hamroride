'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { CgAdd } from "react-icons/cg";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { FaCircleArrowDown } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import {Input} from "@nextui-org/react";
import {DatePicker} from "@nextui-org/react";
import HamroRideLogo from '../logo/page';
import { FaSearch } from 'react-icons/fa';




const SearchRide = () => {

  let [passenger, setPassenger] = useState(1);

  if(passenger==0)
    {
     setPassenger(1)
    }

  return (
    <div>
 <div className=' flex items-center justify-between m-4'>
     <div >
     <HamroRideLogo/>
    </div>
    <div className='flex'>
    <div className='flex p-2 space-x-4'> 
    
    
      <Link href="/publishride">
    <div className='text-blue-600 flex'>
      <div className=' mr-1 mt-1 ml-2 '>
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
         <div className='flex '>
        <div>  <FaCircleUser/></div>
         <div > <FaCircleArrowDown/></div>
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
   
   
    <br/><br/>
          
         
         
         <div className='text-blue-600 text-center'>
          Find a Ride
         </div>
         <br/><br/>
        
      <div className='flex justify-center  items-center' >

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

export default SearchRide