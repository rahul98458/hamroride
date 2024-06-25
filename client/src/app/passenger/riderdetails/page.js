'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios'
import CustumNavbar2 from '@/component/navbar2/page'
import Link from 'next/link'

const RiderDetails = () => {
      
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get('email')
   

    useEffect(() => {
        checkRiderDetail()
      }, [email]);

      const [riderDetail, setriderDetail] = useState([])
    const checkRiderDetail = async ()=> {
        const {data} =await axios.get(`http://localhost:4000/passenger/riderdetail/${email}`)
        setriderDetail(data) 
       }
     //  {JSON.stringify(riderDetail.detailResult.firstName, null, 2)}
  return (
    <div> 
        <div className='m-4'>
            <CustumNavbar2/>
        </div>
        <div className="flex justify-center items-center ">
        <h2 className="text-3xl text-blue-600 mb-8">Rider Details</h2>
      </div>

     
      {riderDetail && riderDetail.detailResult ? (
                <div className="flex justify-center">
                    <div className="border rounded-lg p-4 shadow-lg w-full max-w-lg">
                        <div className="mb-4">
                            <h3 className="text-2xl font-bold mb-2">Rider Information</h3>
                            <p><strong>First Name:</strong> {riderDetail.detailResult.firstName}</p>
                            <p><strong>Last Name:</strong> {riderDetail.detailResult.lastName}</p>
                            <p><strong>Email:</strong> {riderDetail.detailResult.email}</p>
                            <p><strong>Phone:</strong> {riderDetail.detailResult.phone}</p>
                            <p><strong>Address:</strong> {riderDetail.detailResult.address}</p>
                            <p><strong>Gender:</strong> {riderDetail.detailResult.gender}</p>
                           
                        </div>
                        <Link href='/passenger/searchresult'>Back</Link>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center">
                    <p>Loading rider details...</p>
                </div>
            )}
     </div>
  )
}

export default RiderDetails