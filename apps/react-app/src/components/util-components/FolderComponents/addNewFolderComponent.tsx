import { useState } from "react";
import { useRecoilState } from "recoil";

import { X } from "lucide-react";
import { addFolderModalState } from "../../../recoilstates/folders/addFolderModalState";
import { toast } from "react-toastify";
import { currentFolder } from "../../../recoilstates/folders/currentFolder";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { foldersState } from "../../../recoilstates/sheet/currentSheetContent";
import type {addFolderResponseType} from '@repo/types/apiResponse/addFolderResponseType'
import type { Folder } from "@repo/types/apiResponse/getSheetDataResponseType";


function AddNewFolderComponent() {
  const [isOpen, setIsOpen] = useRecoilState(addFolderModalState);
  const [folderName, setFolderName] = useState("");
  const [curr_folder,] = useRecoilState(currentFolder);
  const [,setFolderMap] = useRecoilState(foldersState);
  const Navigate = useNavigate()
  const {id} = useParams()



  const handleClose = () => {
    setIsOpen(false);
    setFolderName("");
  };

  const handleSubmit = async() => {
    console.log("handle submit started");
    if (!folderName.trim()) {
      toast.info("Must have folderName");
    }
    if(!curr_folder){
      toast.info("Must select the folder");
    }
    if(curr_folder.childFolderIds.length > 0 ){
      toast.error("SubFolders can only be added in folders which doesn't have any question, Please move questions to other folder or create subfolder to add question");
      return;
    }

    console.log(`new folder name : ${folderName} \n ParentFolderName: ${curr_folder.name}`);
    console.log(`name: ${folderName} \n parentFolderId: ${curr_folder.id} \n sheetId: ${id}`)
    
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/sheet/addFolder`,{
      name: folderName,
      parentFolderId: curr_folder?.id,
      sheetId: id
    },{
      headers:{
        Authorization: `Beared ${localStorage.getItem("token")}`
      }
    });

    const data:addFolderResponseType = response.data;

    if(!data.success){
      console.log("entered in !data.success")
      toast.error(data.error);
      if( data.redirect){
        Navigate(data.redirect);
      }
      return;
    }

    toast.success("Added folder successFully");

    // update the folder state with the new folder
    const newFolder: Folder = data.Folder;
    setFolderMap((prev) => ({ ...prev, [newFolder.id]: newFolder }));

    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute  flex h-screen w-screen  items-center justify-center inset-0 z-50 backdrop-blur-sm bg-black/50">
      
      {/* Modal Box */}
      <div className="bg-gray-900 text-white w-[350px] rounded-lg p-5 shadow-lg">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add New Folder</h2>
          <button onClick={handleClose}>
            <X size={18} />
          </button>
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="Enter folder name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={handleClose}
            className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-500"
          >
            Add
          </button>
        </div>
      </div>

    </div>
  );
}

export default AddNewFolderComponent;