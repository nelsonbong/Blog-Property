import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className='flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-5 items-center'>
        <Image src={assets.logo} alt='' width={120}/>
        <p className='text-sm text-white'>All right reserved. Copyright @Malaysia Property</p>
            <div className="flex">
                <Image src={assets.all_icon} alt='' width={140}/>
            </div>
    </div>
  )
}

export default Footer