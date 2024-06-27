'use client';
import CustumNavbar2 from '@/component/navbar2/page';
import { Card, CardHeader } from '@nextui-org/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {ScrollShadow} from "@nextui-org/react";
import Link from 'next/link';
import Bottom from '@/component/Buttom/page';

const PassengerProfile = () => {
  const { userDetails } = useSelector((state) => state.user);
  const [passengerData, setPassengerData] = useState(null);

  useEffect(() => {
    const checkPassengerProfile = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/passenger/passengerprofile/${userDetails.email}`);
        console.log(data);
        setPassengerData(data);
      } catch (error) {
        console.error('Error fetching rider profile data:', error);
      }
    };

    checkPassengerProfile();
  }, [userDetails.email]);

  const passengerDetail = () => {
    if (!passengerData || !passengerData.detailResult) return null;
    return (
      <div>
        <strong className="ml-2">First Name:</strong> {passengerData.detailResult.firstName}
        <br />
        <strong className="ml-2">Last Name:</strong> {passengerData.detailResult.lastName}
        <br />
        <strong className="ml-2">Address:</strong> {passengerData.detailResult.address}
        <br />
        <strong className="ml-2">Phone:</strong>{passengerData.detailResult.phone}
        <br />
        <strong className="ml-2">Email:</strong> {passengerData.detailResult.email}
        <br />
        <strong className="ml-2">Gender:</strong> {passengerData.detailResult.gender}
        <br />
        <strong className="ml-2">Role:</strong> {passengerData.detailResult.role}
        <br />
      </div>
    );
  };

  const passengerAllDetail = () => {
    if (!passengerData || !passengerData.allDetailPassenger) return null;
    return (
      <div>
        <strong className="ml-2">CitizenShip Photo:</strong> {passengerData.allDetailPassenger.citizenshipPhoto}
        <br />
       
        <strong className="ml-2">CitizenShip Number:</strong> {passengerData.allDetailPassenger.citizenshipNum}
        <br />
        
        <strong className="ml-2">KycVerifiedStatus:</strong> {passengerData.allDetailPassenger.kycVerifiedStatus}
        <br />
      </div>
    );
  };



    const getStatusColor = (status) => {
      switch (status) {
        case 'reject':
          return 'bg-red-400'; // Red background for rejected
        case 'pending':
          return 'bg-yellow-400'; // Yellow background for pending
        case 'accept':
          return 'bg-green-400'; // Green background for accepted
        default:
          return ''; // Default background color
      }
    };

    const bookedItems = passengerData && passengerData.passengerBooking && passengerData.passengerBooking.length > 0
    ? passengerData.passengerBooking.map((item) => (
        <div key={item._id} className={`p-2 border-b ${getStatusColor(item.bookingStatus)}`}>
          <div>
            <strong>Leaving From:</strong> {item.leavingFrom}
            <strong className="ml-2">Going To:</strong> {item.goingTo}
            <strong className="ml-2">Passenger Num:</strong> {item.passengerNum}
            <strong className="ml-2">Ride By:</strong> {item.rideBy}
            <strong className="ml-2">Date:</strong> {item.date}
            <strong className="ml-2">Price:</strong> {item.price}
            <strong className="ml-2">Status:</strong> {item.bookingStatus}
          </div>
        </div>
      ))
    : <div className="p-2">No Booked rides available.</div>;
  
  // Function to determine status color based on bookingStatus
  





  
  return (
    <div>
      <div className="m-4">
        <CustumNavbar2 />
      </div>

      <div className="w-[100%] flex flex-col items-center m-4 p-4">
        <div className="text-blue-600 m-2 mb-4">User Profile</div>

        <div className="max-w-[900px] gap-2 grid grid-cols-12  px-8 w-full">
          <Card className="col-span-12 sm:col-span-4 h-[300px] bg-blue-400 w-full">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">Personal Detail</p>
              <br />
              {passengerDetail()}
            </CardHeader>
          </Card>
          <Card className="col-span-12 sm:col-span-8 h-[300px] bg-blue-400 w-full">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">Documents</p>
              <br />
              {passengerAllDetail()}
            </CardHeader>
          </Card>

          {/* <Card isFooterBlurred className="w-full h-[250px] col-span-12 sm:col-span-6 bg-blue-400">
           <div className='mb-8'>
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">Publish Ride</p>
            </CardHeader>
            </div>
            <div className="relative h-full overflow-auto">
              <ScrollShadow>
                {publishItems}
              </ScrollShadow>
            </div>
          </Card> */}

          <Card isFooterBlurred className="w-full h-[250px] col-span-12 sm:col-span-12 bg-blue-400">
           <div className='mb-9'>
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">Booked Ride Status</p>
            </CardHeader>
            </div>
            <div className="relative h-full overflow-auto">
              <ScrollShadow>
                {bookedItems}
              </ScrollShadow>
            </div>
             
          </Card>

          <Link className='text-xl' href='/passenger/searchride'>Back</Link>
        </div>
      
      </div>
      <br/><br/><br/>
      <div className='flex flex-col'>
    <Bottom/>
    </div>
    </div>
  );
};

export default PassengerProfile;
