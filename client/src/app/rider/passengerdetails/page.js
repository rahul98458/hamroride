'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios'
import CustumNavbar2 from '@/component/navbar2/page'
import Link from 'next/link'
import Bottom from '@/component/Buttom/page'

const PassengerDetails = () => {
      
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get('email')
   

    useEffect(() => {
        checkPassengerDetail()
      }, [email]);

      const [passengerDetail, setPassengerDetail] = useState([])
    const checkPassengerDetail = async ()=> {
        const {data} =await axios.get(`http://localhost:4000/rider/passengerdetail/${email}`)
        setPassengerDetail(data) 
       }
     //  {JSON.stringify(riderDetail.detailResult.firstName, null, 2)}
  return (
    <div> 
        <div className='m-4'>
            <CustumNavbar2/>
        </div>
        <div className="flex justify-center items-center ">
        <h2 className="text-3xl text-blue-600 mb-8">Passenger Details</h2>
      </div>

     
      {passengerDetail && passengerDetail.detailResult ? (
                <div className="flex justify-center">
                    <div className="border rounded-lg p-4 shadow-lg w-full max-w-lg">
                        <div className="mb-4">
                            <h3 className="text-2xl font-bold mb-2">Passenger Information</h3>
                            <p><strong>First Name:</strong> {passengerDetail.detailResult.firstName}</p>
                            <p><strong>Last Name:</strong> {passengerDetail.detailResult.lastName}</p>
                            <p><strong>Email:</strong> {passengerDetail.detailResult.email}</p>
                            <p><strong>Phone:</strong> {passengerDetail.detailResult.phone}</p>
                            <p><strong>Address:</strong> {passengerDetail.detailResult.address}</p>
                            <p><strong>Gender:</strong> {passengerDetail.detailResult.gender}</p>
                           
                        </div>
                        <Link href='/rider/publishride'>Back</Link>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center">
                    <p>Loading Passenger details...</p>
                </div>
            )}

<br/><br/><br/>
    <div className='flex flex-col'>
    <Bottom/>
    </div>
     </div>
  )
}

export default PassengerDetails