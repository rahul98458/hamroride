'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const RideDetails = () => {

    useEffect(() => {
        getBookList()
      }, []);
      
      const [bookList, setBookList] = useState([])
      const getBookList = async ()=> {
        const {data} =await axios.get(`http://localhost:4000/admin/bookdetails`)
        setBookList(data)   
      // return data;
       
       }  

       return (<div className="mx-10">
          
         

        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <div className='items-center p-2'>Booking Details</div>
            <table className="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                         Leaving From
                        </th>

                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Going To
                        </th>

                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                       Date
                        </th>

                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Number Of Passenger
                        </th>

                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                       Ride By
                        </th>

                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Book By
                        </th>

                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Price
                        </th>

                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                             status
                        </th>

                    </tr>
                </thead>
                <tbody>
                {bookList.length> 0 && bookList.map((item)=>{
               return( <tr>
                        <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {item.leavingFrom}
                            </p>
                        </td>

                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                            {item.goingTo}
                            </p>
                        </td>

                        <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {item.date}
                            </p>
                        </td>

                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap ">
                            {item.passengerNum}
                            </p>
                        </td>

                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                            {item.rideBy}
                            </p>
                        </td>

                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                            {item.bookBy}
                            </p>
                        </td>

                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                            {item.price}
                            </p>
                        </td>

                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                           
                <span className="relative inline-block px-3 py-1 font-semibold leading-tight">
                    <span className={`absolute inset-0 ${
                        item.bookingStatus === 'reject' ? 'bg-red-200' : 'bg-green-200'
                    } opacity-50 rounded-full`}></span>
                    <span className={`relative ${
                        item.bookingStatus === 'reject' ? 'text-red-900' : 'text-green-900'
                    }`}>
                        {item.bookingStatus}
                    </span>
                </span>

                            {/* <span
                                className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                <span aria-hidden
                                    className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                            <span className="relative">
                            {item.bookingStatus}
                            </span>
                            </span> */}

                        </td>

                    </tr>)
                        })}
                </tbody>
            </table>
            </div>
            </div>

   </div>);
};

export default RideDetails