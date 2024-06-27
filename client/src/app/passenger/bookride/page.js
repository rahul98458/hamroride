'use client'
import React from 'react'
import { Formik, useFormik } from 'formik';
import { Button, Input } from '@nextui-org/react'
import { useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast';
const BookRide = () => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
  

    const {searchResultDetails} = useSelector(state=>state.searchResult)
    const {userDetails} = useSelector(state=>state.user)
    const rideDetail = searchResultDetails.filter((item)=>{
      if(item._id===id)
        return item
   })
 //  console.log(abc[0].passenger)
  //console.log(rideDetail[0])
//  console.log(userDetails)
    
    const formik = useFormik({
        initialValues: {
          passengerNum: '',
          rideId:rideDetail[0]._id,
          leavingFrom:rideDetail[0].leavingFrom,
          goingTo:rideDetail[0].goingTo,
          price:rideDetail[0].price,
          bookBy:userDetails.email,
          rideBy:rideDetail[0].publishBy,
          date:rideDetail[0].date.year+'/'+rideDetail[0].date.month+'/'+rideDetail[0].date.day,
        },
        onSubmit: values => {
            if(values.passengerNum<=rideDetail[0].remainingSeats)
            //    console.log('ok')
            bookRide(values)
            else
           // console.log('nok')
           toast('num of seat is not available')
        
        },
      });
           

      const bookRide =async(values)=>{
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
      };
    
      const response = await fetch('http://localhost:4000/passenger/bookride', requestOptions);
      const data = await response.json();
      
      if(response.status==200){
        toast.success(data.msg);
        router.push('/passenger/searchride')
        }
        else
        {toast.error(data.msg);}
      }
     
   

      const askedSeats=()=>{
        return (
         <form onSubmit={formik.handleSubmit} className=" w-full gap-4">
            <div className='flex-col'>
        <div className='m-4 w-50 ml-18'>  <Input type="text" label="How Many Seats you Want?"  isRequired
        id="passengerNum"
        name="passengerNum"
        onChange={formik.handleChange}
        value={formik.values.passengerNum}  
        /></div>

<div className='m-4 w-50 ml-18'>  <Input type="text" label="Leaving From?"  isRequired
        id="leavingFrom"
        name="leavingFrom"
        onChange={formik.handleChange}
        value={formik.values.leavingFrom}  
        /></div>

<div className='m-4 w-50 ml-18'>  <Input type="text" label="Going To?"  isRequired
        id="goingto"
        name="goingto"
        onChange={formik.handleChange}
        value={formik.values.goingTo}  
        /></div>



<div className='m-4 w-50 ml-18'>  <Input type="text" label="Price"  isRequired
        id="price"
        name="price"
        onChange={formik.handleChange}
        value={formik.values.price}  
        /></div>

<div className='m-4 w-50 ml-18'>  <Input type="text" label="Book By?"  isRequired
        id="bookBy"
        name="bookBy"
        onChange={formik.handleChange}
        value={formik.values.bookBy}  
        /></div>

<div className='m-4 w-50 ml-18'>  <Input type="text" label="Ride By?"  isRequired
        id="rideBy"
        name="rideBy"
        onChange={formik.handleChange}
        value={formik.values.rideBy}  
        /></div>

<div className='m-4 w-50 ml-18'>  <Input type="text" label="Book By?"  isRequired
        id="rideId"
        name="rideId"
        onChange={formik.handleChange}
        value={formik.values.rideId}  
        /></div>

<div className='m-4 w-50 ml-18'>  <Input type="text" label="Date"  isRequired
        id="date"
        name="date"
        onChange={formik.handleChange}
        value={formik.values.date}  
        /></div>

        <Button type="submit" color="primary" className='mt-6 mr-4 h-12'>Book Ride</Button>
        </div>
        </form>)
        }

  return (
    
    <div>
         <div className='text-blue-600 text-center'>
             Confirm a Ride
            </div>
          <div className='flex-col items-center m-4 p-4'>{askedSeats()}</div>
    </div>


  )
}

export default BookRide