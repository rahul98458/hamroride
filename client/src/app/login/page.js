import React from 'react'
import {Button,Input} from "@nextui-org/react";
import Link from "next/link";
import CustumNavbar from '@/component/navbar/page';


const login = () => {
  return (
   <div> 
    <CustumNavbar/>
    <br/><br/><br/>
   <div className='flex justify-center items-center  '>
    <div className='w-[45%] bg-blue-200 font-bold rounded-lg p-8	'>
     <div className='text-blue-600 text-center text-3xl'>
      <h1>Login to Hamro Ride</h1>
      </div>
      <br/>
      <Input type="email" variant="bordered" label="Email" placeholder="Enter your email" /><br/>
      <Input type="password" label="Password"  variant="bordered" placeholder="Enter your password" />
    <br/><br/>
     <div className='text-blue-600 text-center '>
      <Button radius="full" className="bg-blue-600 text-white shadow-lg">
      Login
    </Button>
    <br/><br/>
   <Link href='/register'> Don't have an account?</Link>  
    </div>
    </div>   
    
     </div>
     </div>
  )
}

export default login;