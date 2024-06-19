'use client'
import React, { useState } from 'react'
import Link from 'next/link';
import { Input} from "@nextui-org/react";
import CustumNavbar from '@/component/navbar/page';
import { useFormik} from 'formik';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import HamroRideLogo from '../../component/logo/page';
import { FaCircleArrowDown } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
   
const KycVerifyPassenger = () => {
   
  const {userDetails}=useSelector(state=>state.user);
  const{firstName,lastName,email,address,phone,_id}=userDetails;
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      address:address,
      phone:phone,
      gender: '',
      licenseNum:'',
      citizenshipNum:'',
    },
    onSubmit: values=> {
        submitKycUser(values);
    }
  });

  const LogOut=()=>
    {
    dispatch(logOutUser);
    }
    
    const Phome=()=>
        {
            router.push('/searchride')
        }

  const  submitKycUser =async(values)=>{
    let formData = new FormData(); 
   
    formData.append('citizenshipNum', values.citizenshipNum);
   
    formData.append('userId', _id);
    formData.append('citizenshipPhoto', cimage);
   

    
    const requestOptions = {
      method: 'POST',
      body: formData
    };

  const response = await fetch('http://localhost:4000/passenger-kyc', requestOptions);
  const data = await response.json();
  if(data.msg){
    toast(data.msg)
  }
}
       
  const [cimage, setCImage] = useState(null)

  return (
    <div>
         <div className=' flex flex-col  m-4'>
        <div className='flex '>
        <HamroRideLogo/>
      

         
       <div className=' absolute right-20'>
       <div className='text-blue-600 flex'>
       <Dropdown>
         <DropdownTrigger>
           <Button className='text-blue-600 '>
            <div className='flex '>
           <div>  <FaCircleUser className='text-4xl'/></div>
            <div > <FaCircleArrowDown/></div>
             </div>
           </Button>
         </DropdownTrigger>
         <DropdownMenu aria-label="Static Actions">
           <DropdownItem key="login" className='text-blue-600' ><Link href="/login">Profile</Link></DropdownItem>
         <DropdownItem key="signup" className='text-blue-600' > <Link onClick={()=>LogOut()} href="/">LogOut</Link></DropdownItem>
           
         </DropdownMenu>
       </Dropdown>
       </div>
       </div>
       </div>
               <div>
        <form onSubmit={formik.handleSubmit}>
         <div className='flex justify-center items-center  '>
         <div className='w-[45%]  p-8 bg-gray-100 rounded-3xl shadow-2xl p-20 m-5 space-y-7	'>
     <div className='text-blue-600 text-center text-5xl'>
      <h1>Kyc Verification</h1>
    <br/></div>
    <div>
    <Input type="text" variant="bordered" label="First Name" 
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
    <Input type="text" variant="bordered" label="Last Name" 
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
    <Input type="text" variant="bordered" label="Address" 
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
    <Input type="text" variant="bordered" label="Phone Number" 
     id="phone"
     name="phone"
     onChange={formik.handleChange}
     value={formik.values.phone}
      />
       {formik.touched.phoneNumber && formik.errors.phone ? (
                  <div className="text-black text-sm">{formik.errors.phone}</div>
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

       <div>
    <Input type="text" variant="bordered" label="CitizenShip Number" 
     id="citizenshipNum"
     name="citizenshipNum"
     onChange={formik.handleChange}
     value={formik.values.citizenshipNum}
      />
       {formik.touched.citizenshipNum && formik.errors.citizenshipNum ? (
                  <div className="text-black text-sm">{formik.errors.citizenshipNum}</div>
                ) : null}
      </div>

      
       <div>Upload CitizenShip
        <input type='file' className='mt-1' name='citizenshipPhoto'
          onChange={(e)=>setCImage(e.target.files[0])}/>
       </div>


     <div className='text-blue-600 text-center '>
      <Button onClick={()=>Phome()} type='submit' radius="full" className="bg-blue-600 text-white shadow-lg">
      Submit
    </Button>
    <br/><br/>
    </div>
   </div></div>
   </form>
   </div>
   </div>
   </div>
  )
}

export default KycVerifyPassenger;
