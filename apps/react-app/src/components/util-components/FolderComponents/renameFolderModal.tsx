
import { useRecoilState } from 'recoil';
import { renameFolderState } from '../../../recoilstates/sheet/renameFolder';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { foldersState } from '../../../recoilstates/sheet/currentSheetContent';

function RenameFolderModal() {

    const [renameFoderState,setRenameFolderModalState] = useRecoilState(renameFolderState);
    const [newName,setNewName] = useState(renameFoderState.folderName);
    const [,setFolderMap] = useRecoilState(foldersState);
    const Navigate = useNavigate();


    const handleRenameFolder = async()=>{
        if(!newName.trim()){
            toast.info("Must have folderName");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/sheet/folder`,{
                folderId: renameFoderState.folderId,
                newName
            },{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });

            const data = response.data;

            if( !data.success ){
                toast.error(data.error || "Failed to rename folder");
                return;
            }
            if( data.redirect){
                Navigate(data.redirect);
            }
            toast.success(data.message || "Folder renamed successfully");
            setRenameFolderModalState({ isOpen: false, folderId: null, folderName: "" });

            // update the folder name in folderMap
            setFolderMap((prev)=>{
                const FolderToUpdate = prev[renameFoderState.folderId || ""];
                if(!FolderToUpdate) return prev;

                const updatedFolder = {
                    ...FolderToUpdate,
                    name: newName
                }
                return {...prev,[renameFoderState.folderId || ""]: updatedFolder}
            })

        } catch (error) {
            console.error("Error renaming folder:", error);
            toast.error("Failed to rename folder");
        }
    };

    if(!renameFoderState.isOpen){
        return null;
    }

  return (
    <div className='absolute inset-0 flex items-center justify-center h-screen w-screen backdrop-blur-sm '>
        <div className='flex flex-col items-center gap-4 bg-gray-900 rounded-md '>            
            <h2 className='text-xl font-bold'>Rename Folder</h2>
            <input 
                value={newName} 
                type="text" 
                className='bg-gray-800 px-4 py-2 rounded focus:outline-none'
                onChange={(e) => setNewName(e.target.value)} 
            />
           <div className='flex gap-3'>
             <button  
                className='bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition-colors'
                onClick={handleRenameFolder}
             >
                Rename
            </button>
             <button 
                className='bg-gray-600 px-4 py-2 rounded hover:bg-gray-700 transition-colors'
                onClick={() => setRenameFolderModalState({ isOpen: false, folderId: null, folderName: "" })}
            >
                Cancel
            </button>
           </div>
        </div>
    </div>
  )
}

export default RenameFolderModal