'use client'
import React from 'react'
import Link from 'next/link';
import {Button, Input} from "@nextui-org/react";
import CustumNavbar from '@/component/navbar/page';
import { useFormik} from 'formik';
import * as Yup from "yup";
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import HamroRideLogo from '@/component/logo/page';

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
  phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
      .required('Phone number is required'),    
});
   

const AdminRegister = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      address:'',
      password:'',
      phone:'',
    },
    validationSchema:signupSchema,
    onSubmit: values=> {
      registerAdmin(values);
    }
  });

  const registerAdmin =async(values)=>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
  };
  const response = await fetch('http://localhost:4000/admin/admin-register', requestOptions);
  const data = await response.json();
  if(response.status==200){
    toast.success(data.msg);
    router.push('/admin/admin-login'); 
    }
    else
    {toast.error(data.msg);}
  }


  return (
    <div>
        <div className='m-4'>
          <HamroRideLogo/>
        </div>
        <form onSubmit={formik.handleSubmit}>
         <div className='flex justify-center items-center  '>
         <div className='w-[45%]  p-8 bg-gray-100 rounded-3xl shadow-2xl p-20 m-5 space-y-7	'>
     <div className='text-blue-600 text-center text-5xl'>
      <h1>Admin Registration Panel</h1>
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
    <Input type="String" variant="bordered" label="Phone Number" 
     id="phone"
     name="phone"
     onChange={formik.handleChange}
     value={formik.values.phoneNumber}
      />
       {formik.touched.phone && formik.errors.phone ? (
                  <div className="text-black text-sm">{formik.errors.phone}</div>
                ) : null}
      </div>
    <br/>


     <div className='text-blue-600 text-center '>
      <Button type='submit' radius="full" className="bg-blue-600 text-white shadow-lg">
      Sign Up
    </Button>
    <br/><br/>
    <div className='font-bold'>
   <Link href='/admin/admin-login'> Already Have an Account?</Link> 
</div></div>



   </div></div>
   </form>
   </div>
  )
}

export default AdminRegister;
