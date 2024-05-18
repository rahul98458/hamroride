import React from 'react'
import HamroRideLogo from '@/component/logo/page'
import Link from 'next/link';
import {Button, Input} from "@nextui-org/react";


const registerEmail = () => {
  return (
    <div>
         <div className='m-4 p-4 '><HamroRideLogo/></div>
         <div className='flex justify-center items-center '>
    <div className='text-5xl flex flex-col justify-center items-left bg-gray-100 rounded-3xl shadow-2xl p-20 m-5 space-y-7  '>
    What's your email?
    <br/> <br/>
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
     <div className='w-[100%]'> <Input type="email" label="Email" variant="bordered" /></div>
    </div>
    <Button color="primary">Continue</Button>
    </div></div></div>
  )
}

export default registerEmail;