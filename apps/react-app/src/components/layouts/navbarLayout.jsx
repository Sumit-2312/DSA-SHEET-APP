import React from 'react'
import { Outlet } from 'react-router-dom'

function NavbarLayout() {
  return (
    <div>
        <div>navbar</div>
        <div>
            <Outlet/>
        </div>
    </div>
  )
}

export default NavbarLayout