import React from 'react'
import logo from './assets/logo.png'
import supermart_profile from './assets/supermart_profile.png'
import Analytics from './test/Analytics'

export default function Home() {
  return (
    <div className='w-[100vw] h-[97vh] bg-[#FFF]'>
       {/* Navbar */}
       <div className='h-[10%] w-full flex items-center justify-between p-4 border border-[#F5F5F5] border-2'>
          <div className='flex gap-20'>
            <img src={logo} alt="Nexus logo" className='w-[20%] h-auto ml-4 -mt-1.5'/>
            <h1 className='text-3xl font-bold'>Summary</h1>
          </div>

          <div className='bg-[#efeff7] rounded-full w-[3.5%] h-auto mr-5'>
            <img src={supermart_profile} alt="profile icon" className='w-full h-full rounded-full' />
          </div>
       </div>

       <div className='flex w-full h-[93%]'>
          {/* Menu */}
          <div className='w-[15%] h-full'></div>

          {/* Analytics tab */}
          <div className='w-[85%] h-full bg-[#F5F5F5]'>

            <Analytics />

          </div>
       </div>
    </div>
  )
}