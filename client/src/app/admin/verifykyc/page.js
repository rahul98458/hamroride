'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const VerifyKyc = () => {

    useEffect(() => {
        getKycList()
      }, []);
      
      const [kycList, setKycList] = useState([])
      const getKycList = async ()=> {
        const {data} =await axios.get(`http://localhost:4000/admin/verify-kyc`)
        setKycList(data)
        console.log(data)
       }  

       return (<div className="mx-10">
          
         

        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <div className='items-center p-2'>Verify KYC</div>
            <table className="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          CitizenShip Num
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        License Num
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                       Email
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Role
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            KYC status
                        </th>
                    </tr>
                </thead>
                <tbody>
                {kycList.length> 0 && kycList.map((item)=>{
               return( <tr>
                        <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 w-10 h-10">
                                    <img className="w-full h-full rounded-full"
                                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                        alt="" />
                                </div>
                                    <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {item.citizenshipNum}
                                        </p>
                                    </div>
                                </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                            {item.name}
                            </p>
                        </td>
                        <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 w-10 h-10">
                                    <img className="w-full h-full rounded-full"
                                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                        alt="" />
                                </div>
                                    <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {item.licenseNum}
                                        </p>
                                    </div>
                                </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                            {item.email}
                            </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                            {item.role}
                            </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span
                                className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                <span aria-hidden
                                    className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                            <span className="relative">
                            {item.kycVerifiedStatus}
                            </span>
                            </span>
                        </td>
                    </tr>)
                        })}
                </tbody>
            </table>
            </div>
            </div>

   </div>);
};

export default VerifyKyc