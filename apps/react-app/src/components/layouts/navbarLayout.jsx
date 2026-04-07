import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../util-components/Navbar'

function NavbarLayout() {
  return (
    <div className='h-screen bg-black text-white'>
        <Navbar/>
        <div>
            <Outlet/>
        </div>
    </div>
  )
}

export default NavbarLayout