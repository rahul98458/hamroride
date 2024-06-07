'use client'
import React from 'react'
import HamroRideLogo from '@/component/logo/page'
import Link from 'next/link';
import {Button, Input, dropdown} from "@nextui-org/react";
import { useFormik } from 'formik';
import {RadioGroup, Radio} from "@nextui-org/react";




const registerEmail = () => {

 

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      address:'',
      password:'',
      phone:'',
      gender: '',
      registeras:'',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
    <div>
         <div className='m-4 p-4 '><HamroRideLogo/></div>
         <div className='flex justify-center items-center '>
    <div className='text-5xl flex flex-col justify-center items-center bg-blue-400 rounded-3xl shadow-2xl pt-5 m-1 space-y-7 w-80  '>
    Sign Up
    <br/> <br/>
    <div >
    <div className='w-[100%] mb-1'> 
      <Input  type="text" label="First Name" variant="bordered" 
        id="firstName"
        name="firstName"
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />
      </div>

    <div className='w-[100%] mb-1'> 
      <Input type="text" label="Last Name" variant="bordered" 
        id="lastName"
        name="lastName"
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />
      </div>

    <div className='w-[100%] mb-1'> 
      <Input type="text" label="Address" variant="bordered" 
        id="address"
        name="address"
        onChange={formik.handleChange}
        value={formik.values.address}
      />
      </div>

    <div className='w-[100%] mb-1'>
       <Input type="text" label="Phone" variant="bordered"
         id="phone"
         name="phone"
         onChange={formik.handleChange}
         value={formik.values.phone}
       />
       </div>
     <div className='w-[100%] mb-1'>
          <Input type="email" label="Email" variant="bordered" 
             id="email"
             name="email"
             onChange={formik.handleChange}
             value={formik.values.email}
       />
       </div>

     <div className='w-[100%] mb-1'>
       <Input type="password" label="Password" variant="bordered" 
         id="password"
         name="password"
        
         onChange={formik.handleChange}
         value={formik.values.password}
       />
       </div>

       <div className='w-[100%] text-base'>
       
       <label>
          Gender:
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formik.values.gender === 'male'}
              onChange={formik.handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formik.values.gender === 'female'}
              onChange={formik.handleChange}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="other"
              checked={formik.values.gender === 'other'}
              onChange={formik.handleChange}
            />
            Other
          </label>
        </label>
       </div>

       <div  className='w-[100%] flex justify-center items-center mt-2'>
       <div className='text-base mt-1'>
       <label for="cars">Registered As a:</label>

        <select id="registeras"  onChange={formik.handleChange}
         value={formik.values.registeras} >
            <option  name="registeras" value="rider">Rider</option>
            <option  name="registeras" value="passenger">Passenger</option>
        </select>
       </div>
       </div>
    
    </div>
    <Button type="submit" color="primary">Sign Up</Button>
    </div></div></div>
    </form>
  )
}

export default registerEmail;