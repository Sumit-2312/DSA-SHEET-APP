import React from 'react'
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    const items:Array<string> = ["Editor","Sheet"];

    const handleNavigate = (path:string)=>{
        navigate(`/${path}`);
    }

  return (
    <div className='flex border-2 border-black items-center justify-center gap-5'>
        {
            items.map((item,i)=>{
                const lowerCaseItem = item.toLowerCase();

                return( 
                <div key={i} className='hover:cursor-pointer ' onClick={()=>handleNavigate(lowerCaseItem)}>
                    {item}
                </div>
                )
            })
        }
        <div className='font-bold' onClick={()=>handleNavigate("profile")}  >
            Profile
        </div>
    </div>
  )
}

export default Navbar