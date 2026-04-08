import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../util-components/Navbar'

function NavbarLayout() {
  return (
    <div className='overflow-hidden min-h-screen bg-black flex flex-col items-center text-white'>
        <Navbar/>
        <div className='flex-1' >
            <Outlet/>
        </div>
    </div>
  )
}

export default NavbarLayout