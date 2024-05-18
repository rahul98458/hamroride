import React from 'react'
import Link from 'next/link';
import Image from 'next/image';


const HamroRideLogo = () => {
  return (
    <div>
         <div className='w-20'>
      <Link href="/">
       <Image 
       height={100}
      width={80}
      alt="Logo"
      src="/logo.png"
    /></Link></div>
    </div>
  )
}

export default HamroRideLogo;