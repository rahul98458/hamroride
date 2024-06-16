'use client'
import React from 'react'
import Link from 'next/link';
import {Button, Input} from "@nextui-org/react";
import CustumNavbar from '@/component/navbar/page';
import { useFormik} from 'formik';
import * as Yup from "yup";
import toast from 'react-hot-toast';
import { Router } from 'next/navigation';

const signupSchema = Yup.object().shape({
  firstName: Yup.string()
      .min(2,'Too Short')
      .required('First Name is required'),
  lastName: Yup.string()
      .min(2,'Too Short')
      .required('Last Name is required'),    
  email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
  address: Yup.string()
      .min(2,'Too Short')
      .required('Address is required'),
  password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required'),
  phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
      .required('Phone number is required'),    
});

const Register = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      address:'',
      password:'',
      phoneNumber:'',
      gender: '',
      role:'',
    },
    validationSchema:signupSchema,
    onSubmit: values=> {
      registerUser(values);
    }
  });

  const registerUser =async(values)=>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
  };
  const response = await fetch('http://localhost:4000/register', requestOptions);
  const data = await response.json();
  if(response.status==200){
    toast.success(data.msg);
    router.push('/login'); 
    }
    else
    {toast.error(data.msg);}
  }


  return (
    <div>
        <CustumNavbar/>
        <form onSubmit={formik.handleSubmit}>
         <div className='flex justify-center items-center  '>
         <div className='w-[45%]  p-8 bg-gray-100 rounded-3xl shadow-2xl p-20 m-5 space-y-7	'>
     <div className='text-blue-600 text-center text-5xl'>
      <h1>Sign Up</h1>
    <br/></div>
    <div>
    <Input type="firstName" variant="bordered" label="First Name" 
    id="firstName"
    name="firstName"
    onChange={formik.handleChange}
    value={formik.values.firstName} 
     />
     {formik.touched.firstName && formik.errors.firstName ? (
        <div className="text-black text-sm">{formik.errors.firstName}</div>
        ) : null}
        </div>
        <div>
    <Input type="lastName" variant="bordered" label="Last Name" 
     id="lastName"
     name="lastName"
     onChange={formik.handleChange}
     value={formik.values.lastName}
      />
       {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="text-black text-sm">{formik.errors.lastName}</div>
                ) : null}
      </div>
    <div>
    <Input type="email" variant="bordered" label="Email" 
     id="email"
     name="email"
     onChange={formik.handleChange}
     value={formik.values.email}
      />
    {formik.touched.email && formik.errors.email ? (
                  <div className="text-black text-sm">{formik.errors.email}</div>
                ) : null}
    </div>
    <div>
    <Input type="address" variant="bordered" label="Address" 
     id="address"
     name="address"
     onChange={formik.handleChange}
     value={formik.values.address}
      />
       {formik.touched.address && formik.errors.address ? (
                  <div className="text-black text-sm">{formik.errors.address}</div>
                ) : null}
      </div>
      <div>
    <Input type="password" label="Password"  variant="bordered"
     id="password"
     name="password"
     onChange={formik.handleChange}
     value={formik.values.password}
     />
     {formik.touched.password && formik.errors.password ? (
                  <div className="text-black text-sm">{formik.errors.password}</div>
                ) : null}
    </div>
    <div>
    <Input type="Number" variant="bordered" label="Phone Number" 
     id="phoneNumber"
     name="phoneNumber"
     onChange={formik.handleChange}
     value={formik.values.phoneNumber}
      />
       {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <div className="text-black text-sm">{formik.errors.phoneNumber}</div>
                ) : null}
      </div>
    <br/>

     <div className='w-[100%] text-base mt-3 mb-3'>
       
       <label>
          Gender:
          <label>
            <input className='mr-2 ml-2'
              type="radio"
              name="gender"
              value="male"
              checked={formik.values.gender === 'male'}
              onChange={formik.handleChange}
            />
            Male
          </label>
          <label>
            <input className='mr-2 ml-2'
              type="radio"
              name="gender"
              value="female"
              checked={formik.values.gender === 'female'}
              onChange={formik.handleChange}
            />
            Female
          </label>
          <label>
            <input className='mr-2 ml-2'
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

       <div  className='w-[100%] flex justify-center items-center mb-3 '>
       <div className='text-base'>
       <label for="registeras">Registered As a:</label>

        <select id="role"  name="role" onChange={formik.handleChange} 
           >
        <option value="choose">Choose One</option>
            <option value="rider">Rider</option>
            <option value="passenger">Passenger</option>
        </select>
       </div>
       </div>


     <div className='text-blue-600 text-center '>
      <Button type='submit' radius="full" className="bg-blue-600 text-white shadow-lg">
      Sign Up
    </Button>
    <br/><br/>
    <div className='font-bold'>
   <Link href='/login'> Already Have an Account?</Link> 
</div></div>



   </div></div>
   </form>
   </div>
  )
}

export default Register;
