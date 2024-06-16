'use client'
import { Button } from '@nextui-org/react'
import React from 'react'
import { useSelector } from 'react-redux'


const searchResult = () => {
  
    const {searchResultDetails} = useSelector(state=>state.searchResult)

    const listItems = searchResultDetails.map((item) => (
      <div key={item._id} className='p-2 border-b'>
        <div><strong>Leaving From:</strong> {item.leavingFrom}
        <strong className='ml-2'>Going To:</strong> {item.goingTo}
        <strong  className='ml-2'>Passenger:</strong> {item.passenger}
        <strong  className='ml-2'>Date:</strong> {item.date.year}/{item.date.month}/{item.date.day}
        <strong  className='ml-2'>Ride By:</strong> {item.publishBy}
        <Button className='ml-2' type='primary'>Book Ride</Button>
        </div>
      </div>
    ));

  return (
    <div>
      <div className='flex flex-col items-center m-4 p-4'>Available Ride</div>
          <div className='flex flex-col items-center m-4 p-4'>{listItems}</div>
    {/* <div>{JSON.stringify(searchResultDetails)}</div> */}
    </div>
  )

}
export default searchResult