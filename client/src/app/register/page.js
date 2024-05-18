import HamroRideLogo from '@/component/logo/page'
import Link from 'next/link';
import React from 'react'
import { FaArrowCircleRight } from "react-icons/fa";
import { MdOutlineEmail,MdWhatsapp } from "react-icons/md";


const register = () => {
  return (
    <div>
    <div className='m-4 p-4 '><HamroRideLogo/></div>
    <div className='flex justify-center items-center '>
    <div className='text-5xl flex flex-col justify-center items-left  '>
    How do you want to sign up?
    <br/> <br/>
    <div className=' text-3xl text-blue-600 underline space-y-8 '>
      <Link href='/register-email'>
<div className='flex space-x-4 hover:bg-blue-600 hover:text-white '>
<div><h1> Sign Up using Email </h1> </div>
<div><MdOutlineEmail /></div>
 <div><FaArrowCircleRight />  </div>
</div>
</Link>
<Link href='/register-whatsapp'>
<div className='flex space-x-4 hover:bg-blue-600 hover:text-white'>
<div><h1>Sign Up using What's app</h1></div>
<div><MdWhatsapp/></div>
<div><FaArrowCircleRight /></div>
</div>
</Link>
</div>
<br/>
<Link href='/login'>
<div className='text-center w-[60%] text-2xl text-white bg-blue-400 hover:bg-blue-600 rounded-xl'><h1>Already a member?</h1></div>
</Link>
</div>    </div>
    </div>
  )
}

export default register