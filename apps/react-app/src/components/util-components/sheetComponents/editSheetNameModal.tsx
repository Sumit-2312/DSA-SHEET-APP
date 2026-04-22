import React from 'react'
import { useRecoilState } from 'recoil'
import { editSheetNameModalOpen } from '../../../recoilstates/sheet/editSheetNameModal';
import { X } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { allSheetsState } from '../../../recoilstates/sheet/allSheetsState';

function EditSheetNameModal() {

    const [state, setState] = useRecoilState(editSheetNameModalOpen);
    const [allSheets, setAllSheets] = useRecoilState(allSheetsState);
    const handleSave = async()=>{
        try{
            console.log("Saving new name for sheet id ", state.id, " with name ", state.name);
            const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/sheet/Sheet`,{
                id: state.id,
                name: state.name
            },{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            
            const data = response.data;
            if(!data.success){
                throw new Error(data.error || "Failed to edit sheet name");
            }
            
            setState({...state, isOpen: false});
            // also update in the all sheets state
            setAllSheets(allSheets.map(sheet => sheet.id === state.id ? {...sheet, name: state.name} : sheet));

            console.log("Name updated successfully");
        } catch (error) {
            console.error("Error updating sheet name:", error); 
            toast.error(error instanceof Error ? error.message : "Failed to update sheet name");
        }
        console.log("Saving new name...");
    }


  if(!state.isOpen) return null;
  return (
    <div className='absolute inset-0 z-[100] h-screen w-screen backdrop-blur-md flex justify-center items-center'>
        <div className='min-h-[50vh] min-w-[40vw] flex flex-col '>
           <div className='flex justify-between items-center mb-5'>
             <h2 className='text-xl font-semibold text-white'>
               Edit Sheet Name
             </h2>
                <button 
                    onClick={()=>setState({...state, isOpen: false})}
                    className="p-2 rounded-full hover:bg-gray-800 transition"
                >
                    <X className="text-gray-400 hover:text-white" />
                </button>
           </div>
           <div>
                <input
                    type="text"
                    placeholder='Enter new sheet name'
                    className='w-full h-11 px-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
                    value={state.name}
                    onChange={(e) => setState({...state, name: e.target.value})}
                />
           </div>
           <div className='flex justify-end mt-5 gap-3'>
                <button
                    onClick={()=>setState({...state, isOpen: false})}
                    className='px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition'
                >
                    Cancel
                </button>
                <button
                    onClick={()=>handleSave()}
                    className='px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 active:scale-95 transition'
                >   
                    Save
                </button>
           </div>
        </div>
    </div>
  )
}
export default EditSheetNameModal