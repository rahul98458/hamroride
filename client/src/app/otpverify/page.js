'use client'
import HamroRideLogo from '@/component/logo/page';
import React from 'react';
import {Input} from "@nextui-org/react";

const OTPForm = () => {
 

  return (
    <div>
        <div className='p-4'><HamroRideLogo/></div>
    <div className="max-w-xs mx-auto mt-8 p-4 bg-blue-400 shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Enter OTP</h2>
      <form>
        <div className="flex justify-between">
         
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Input type="text" label="OTP" />
    
    </div>

        </div>
    <div className='text-center'>    <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:bg-blue-600">
          Submit
        </button></div>
      </form>
    </div>
    </div>
  );
};

export default OTPForm;