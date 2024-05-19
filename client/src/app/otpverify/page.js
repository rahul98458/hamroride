'use client'
import HamroRideLogo from '@/component/logo/page';
import React from 'react';
import {Input} from "@nextui-org/react";

const OTPForm = () => {
 

  return (
    <div>
        <div className='p-4'><HamroRideLogo/></div>
    <div className="max-w-2xl mx-auto mt-8 p-20 bg-gray-100 shadow-2xl rounded-3xl">
      <h2 className="text-3xl  mb-4 text-center">Enter OTP</h2>
      <br/><br/>
      <form>
        <div className="flex justify-between ">
         
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 border-2 rounded-2xl border-black  w-[100%]">
      <Input type="text" label="OTP" />
    
    </div>

        </div>
        <br/>
    <div className='text-center'>    <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-3xl  shadow-2xl focus:outline-none focus:bg-blue-600">
          Submit
        </button></div>
      </form>
    </div>
    </div>
  );
};

export default OTPForm;