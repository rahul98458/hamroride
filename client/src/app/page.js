'use client'
import React, { useState } from 'react'
import {Image} from "@nextui-org/image";
import {Button} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import {DatePicker} from "@nextui-org/react";
import Bottom from '@/component/about/page';
import CustumNavbar from '@/component/navbar/page';
import { useRouter } from 'next/navigation';

const Home = () => {

  const router = useRouter();

  const handleClick =()=>
    {
      router.push('/login');
    }

  let [passenger, setPassenger] = useState(1);

  if(passenger==0)
    {
     setPassenger(1)
    }


  return (
     
    <div >
      <CustumNavbar/>

    <div >
      <Image 
       width={1600}
       height={1}
      alt="Pick A Ride"
      src="/body.png"
    />
      </div>

      <div >

             <div className="flex w-full gap-4">
    <div className='m-4'>  <Input type="text" label="Leaving From"  isRequired/></div>
    <div className='m-4'>  <Input type="text" label="Going To"  isRequired/></div>
    <div className='m-4'> 
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <DatePicker 
          label="Date"
          className="max-w-[284px]"
          isRequired
        />
    </div>
     </div>
    <div className='m-4 text-black mt-6'> 
    Passenger
    <button className='m-2 bg-blue-400 h-8 w-8' onClick={()=>setPassenger(passenger-1)}>-</button>{passenger}<button className='m-2 bg-blue-400 h-8 w-8' onClick={()=>setPassenger(passenger+1)}>+</button>
  
    </div>
      
    
           
     <Button color="primary" onClick={()=>handleClick()} className='mt-6 mr-4 h-12'>Search</Button>
    </div>

      </div>

        <div className='flex m-4 items-center justify-center'>
          <div className='m-4'><h4>Your pick of rides at low prices</h4>
           <p className='text-gray-600 text-xs'>No matter where you’re going, by bus or<br/> 
           carpool, find the perfect ride from our wide<br/> 
           range of destinations and routes at low <br/>prices.</p>
           </div>
           <div className='ml-4 mr-4 mt-4'><h4>Trust who you travel with</h4>
           <p className='text-gray-600 text-xs'>We take the time to get to know each of our<br/> 
           members and bus partners. We check<br/> 
           reviews, profiles and IDs, so you know who <br/>you’re travelling with and can book your
           <br/>ride at ease on our secure platform.</p>
           </div>
           <div className='m-4'><h4>Scroll, click, tap and go!</h4>
           <p className='text-gray-600 text-xs'>Booking a ride has never been easier!<br/> 
           Thanks to our simple app powered by great<br/> 
           technology, you can book a ride close to<br/>you in just minutes.</p>
           </div>
        </div>
    
    <div className='bg-blue-600 flex items-center justify-center mb-4'>
    <div className='m-2 flex items-center justify-center '>
    <Image  className=' p-4 '
       width={400}
       
      alt="car Share"
      src="/carshare.jpg"
    />
    </div>
    <div>
    <div className='m-4'><h1>Your safety is our priority</h1>
           <p className='text-white text-sm'>At Hamro Ride, we're working hard to make our platform as secure as it<br/> 
           can be. But when scams do happen, we want you to know exactly how<br/> 
           to avoid and report them. Follow our tips to help us keep you safe.<br/></p>
           </div>
    </div>
    </div>

    <div className='flex m-4 items-center justify-center'>
          <div className='m-4'><h4>Drive when you want, make what you need</h4>
           <p className='text-gray-600 text-xs'>Make money on your schedule with deliveries or rides—or<br/> 
           both. You can use your own car or choose a rental<br/> 
           through Hamro Ride. <br/></p>
           </div>
           <div className='ml-4 mr-4 mt-4'><h4>Trust who you travel with</h4>
           <p className='text-gray-600 text-xs'>We take the time to get to know each of our<br/> 
           members and bus partners. We check<br/> 
           reviews, profiles and IDs, so you know who <br/>you’re travelling with and can book your
           <br/>ride at ease on our secure platform.</p>
           </div>
           <div className='m-4'><h4>Scroll, click, tap and go!</h4>
           <p className='text-gray-600 text-xs'>Booking a ride has never been easier!<br/> 
           Thanks to our simple app powered by great<br/> 
           technology, you can book a ride close to<br/>you in just minutes.</p>
           </div>
        </div>

       <div className='bg-gray-600 '>
    <Bottom/>
    </div>
    </div>
    
  )
}

export default Home