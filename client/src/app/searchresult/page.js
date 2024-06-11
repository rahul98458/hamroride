'use client'
import React from 'react'
import { useSelector } from 'react-redux'

const searchResult = () => {
  
    const {searchResultDetails} = useSelector(state=>state.searchResult)
   

  return (
    <div>{JSON.stringify(searchResultDetails)}</div>
  )
}

export default searchResult