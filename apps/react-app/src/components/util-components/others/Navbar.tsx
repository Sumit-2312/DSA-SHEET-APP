import { ChevronDown, User } from 'lucide-react';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { allSheetsState } from '../../../recoilstates/sheet/allSheetsState';
import axios from 'axios';
import { toast } from 'react-toastify';
import { createSheetModalOpen } from '../../../recoilstates/sheet/createSheetModalState';
import { viewAllSheetsModalOpen } from '../../../recoilstates/sheet/viewAllSheetsModalOpenState';
import { currentSheet } from '../../../recoilstates/sheet/currentSheet';

function Navbar() {
    const navigate = useNavigate();
    const [selectedField,setSelectedField] = useState<string>("");
    const [allSheets,setAllSheets] = useRecoilState(allSheetsState);
    const [current_Sheet,setCurrentSheet] = useRecoilState(currentSheet);
    const [isOpen, setIsOpen] = useState(false);
    const [,setOpenCreateModal] = useRecoilState(createSheetModalOpen);
    const setOpenViewSheetModal = useSetRecoilState(viewAllSheetsModalOpen);

    const handleNavigate = (path:string)=>{
        console.log("Navigating to ",path);
        navigate(`/${path}`);
    }

    useEffect(()=>{
        // fetch all sheets for dropdown
        const fetchSheets = async ()=>{
            console.log("trying to fetch sheets from frontend")
            try{
                console.log(`sending req to ${import.meta.env.VITE_BACKEND_URL}/sheet/SheetList`)
                const response:any = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/sheet/SheetList`,{
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })

                const data = response.data;

                if(!data.success){
                    toast.error(data.error);
                    if(data.redirect){
                        navigate(data.redirect);
                    }
                    return;
                }

                setAllSheets(data.sheets);
            }catch(err){
                console.log(err.message || err );
                toast.error(err.message || err);
            }
        }

        fetchSheets();
    },[])

    useEffect(()=>{
        console.log("All Sheets : " ,allSheets);
    },[allSheets]);

  return (
    <div className='flex w-full px-10 border-b bg-blue-900 border-gray-600 h-14 items-center justify-between gap-5'>
        {/* logo */}
        <div onClick={()=>handleNavigate("dashboard")} className='hover:cursor-pointer h-14  '>
            <img src="../../../public/logo.png" alt="logo" className='h-[100%]' />
        </div>
        {/* right side */}
       <div className='flex items-center gap-10'>
            <div className='flex gap-5'>
                        <div  
                            className={` ${selectedField==="Editor"?"bg-slate-950":"bg-slate"} hover:cursor-pointer hover:bg-slate-950 px-3 py-1 bg-blue-950 rounded-lg `} 
                            onClick={()=>{
                                setSelectedField("Editor");
                                handleNavigate('editor')
                            }}
                        >
                            <div>Editor</div>
                        </div>
                        <div className="relative select-none">
                            {/* Trigger */}
                            <div
                                onClick={() => setIsOpen(prev => !prev)}
                                className="flex items-center gap-2 bg-blue-950 px-3 py-1 rounded-lg cursor-pointer hover:bg-slate-950"
                            >
                                <span>
                                    Sheets
                                </span>
                                <ChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                            </div>

                            {/* Dropdown */}
                                {isOpen && (
                                    <div className="absolute mt-2  bg-blue-950 border min-w-48 border-gray-600 rounded-lg shadow-lg z-50 overflow-hidden">
                                        
                                        {/* Sheets List */}
                                        <div className="max-h-60 overflow-y-auto scrollbar-hide ">
                                            {allSheets.map((sheet) => (
                                                <div
                                                    key={sheet.id}
                                                    onClick={() => {
                                                        setCurrentSheet({id:sheet.id,name:sheet.name})
                                                        setSelectedField(sheet.name);
                                                        handleNavigate(`sheet/${sheet.id}`);
                                                        setIsOpen(false);
                                                    }}
                                                    className={` ${sheet.id == current_Sheet?.id ? "bg-gray-900":"" } px-3 py-2 hover:bg-slate-800 cursor-pointer`}
                                                >
                                                    {sheet.name}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Divider */}
                                        <div className="border-t border-gray-600"></div>

                                        {/* Create New Button */}
                                        <div className='flex justify-between'>
                                            <div
                                                onClick={() => {
                                                    setIsOpen(false);
                                                    setOpenCreateModal(true);
                                                }}
                                                className="px-3 text-center py-2 text-blue-400 hover:bg-slate-800 cursor-pointer font-medium"
                                            >
                                                Create 
                                            </div>
                                            <div
                                                onClick={() => {
                                                    setIsOpen(false);
                                                    setOpenViewSheetModal(true);
                                                }}
                                                className="px-3 text-center py-2 text-blue-400 hover:bg-slate-800 cursor-pointer font-medium"
                                            >
                                                View All 
                                            </div>
                                        </div>
                                        
                                    </div>
                                )}
                        </div>
  
            </div>
            <div  className='h-10 w-10 hover:cursor-pointer rounded-full border border-gray-500 font-bold' onClick={()=>handleNavigate("profile")}  >
                <User className="h-full w-full opacity-60 " />
            </div>
       </div>
    </div>
  )

}

export default Navbar;