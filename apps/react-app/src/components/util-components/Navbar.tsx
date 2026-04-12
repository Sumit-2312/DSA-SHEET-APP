import { User } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    type itemsType = "Editor"|"Sheet"|"";
    const items:itemsType[] = ["Editor","Sheet"];
    const [selectedField,setSelectedField] = useState<itemsType>("")

    const handleNavigate = (path:string)=>{
        navigate(`/${path}`);
    }

  return (
    <div className='flex w-full px-10 border-b bg-blue-900 border-gray-600 h-14 items-center justify-between gap-5'>
        {/* logo */}
        <div onClick={()=>handleNavigate("dashboard")} className='hover:cursor-pointer h-14  '>
            <img src="../../../public/logo.png" alt="logo" className='h-[100%]' />
        </div>
        {/* right side */}
       <div className='flex items-center gap-10'>
            <div className='flex gap-5'>
                {
                    items.map((item,i)=>{
                        const lowerCaseItem = item.toLowerCase();

                        return( 
                        <div 
                            key={i} 
                            className={` ${selectedField===item?"bg-slate-950":""} hover:cursor-pointer hover:bg-slate-950 px-3 py-1 bg-blue-950 rounded-lg `} 
                            onClick={()=>{
                                setSelectedField(item);
                                handleNavigate(lowerCaseItem)
                            }}
                        >
                            {item}
                        </div>
                        )
                    })
                }
            </div>
            <div  className='h-10 w-10 hover:cursor-pointer rounded-full border border-gray-500 font-bold' onClick={()=>handleNavigate("profile")}  >
                <User className="h-full w-full opacity-60 " />
            </div>
       </div>
    </div>
  )
}

export default Navbar