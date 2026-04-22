import  { useState } from "react";
import { ChevronDown, Ellipsis } from "lucide-react";
import type { Folder, Folder as FolderType } from "@repo/types/apiResponse/getSheetDataResponseType";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { currentFolder } from "../../../recoilstates/folders/currentFolder";
import { addFolderModalState } from "../../../recoilstates/folders/addFolderModalState";
import { addQuestionModalState } from "../../../recoilstates/question/questionModalStates";
import { toast } from "react-toastify";
import axios from "axios";
import { currentSheetContent } from "../../../recoilstates/sheet/currentSheetContent";

type Props = {
  folder: FolderType;
  onSelect: (folder: FolderType) => void;
};





function FolderItem({ folder, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const curr_folder = useRecoilValue(currentFolder);
  const [renameAndRemoveOpen,setRenameAndRemoveOpen] = useState(false);
  const [,setAddFolderModalOpenState] = useRecoilState(addFolderModalState);
  const setAddQuestionModalOpenState = useSetRecoilState(addQuestionModalState);
  const [sheetData,setSheetData] = useRecoilState(currentSheetContent);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
    onSelect(folder);
  };

    const removeFolderFromTree = (
      folders: Folder[],
      folderId: string
    ): Folder[] => {
      return folders
        //  remove the folder
        .filter((folder) => folder.id !== folderId)

        // recursively update children
        .map((folder) => ({
          ...folder,
          childFolders: removeFolderFromTree(folder.childFolders, folderId),
        }));
    };

  const handleDeleteFolder = async () => {
      const confirmDelete = window.confirm(
        "⚠️ Deleting this folder will remove ALL its data including subfolders and questions. This action cannot be undone.\n\nDo you want to continue?"
      );

      if (!confirmDelete) return;

      try {
        const token = localStorage.getItem("token");

        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/sheet/removeFolder`,
            {
              folderId: folder.id,
            },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
          }
        );

        const data = res.data;

        if (!data.success) {
          toast.error(data.error || "Failed to delete folder");
          return;
        }

        toast.success("Folder deleted successfully");
        if (!sheetData) return;

        const updatedFolders = removeFolderFromTree(
          sheetData.Folders,
          folder.id
        );

        setSheetData((prev) => {
          if (!prev) return prev;

          return {
            ...prev,
            Folders: updatedFolders,
          };
        });
      } catch (error) {
        console.error(error);
        toast.error(error.res.data.error);
      }
  };


  return (
    <div className="flex flex-col">

      {/* Folder Header */}
      <div
        onClick={handleClick}
        className={`${folder.id === curr_folder?.id ? "bg-blue-900":""}  group relative flex items-center gap-2 cursor-pointer hover:bg-gray-800 px-2 py-1 rounded transition-colors`}
      >
        {/* Arrow */}
        {folder.childFolders && folder.childFolders.length > 0 && (
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        )}

        {/* Folder Name */}
        <span className="text-sm select-none">{folder.name}</span>

        {/* options in each folder itsm */}
        <div className="absolute right-4   top-1/2 -translate-y-1/2 group-hover:block hidden  ">
          <Ellipsis onClick={(e)=>{
            setRenameAndRemoveOpen((prev)=>!prev)
          }} />
        </div>

        {
          renameAndRemoveOpen && 
          <div onMouseLeave={()=>setRenameAndRemoveOpen(false)} className=" bg-black py-2 select-none absolute top-[100%] right-1 z-[400] flex flex-col">
            <div className="hover:bg-gray-600 w-full px-5 py-2">Rename</div>
            <div 
              onClick={()=>{
                handleDeleteFolder();
                setRenameAndRemoveOpen(false);
              }}
              className="hover:bg-gray-600 w-full px-5 py-2"
            >
              Delete
            </div>
              <div 
                  onClick={()=>{
                    setAddFolderModalOpenState(true);
                    setRenameAndRemoveOpen(false);
                  }} 
                  className="hover:bg-gray-600 w-full px-5 py-2"
                >
                  Add Folder
                </div>
              <div 
                onClick={()=>{
                  setAddQuestionModalOpenState(true);
                  setRenameAndRemoveOpen(false);
                }} 
                className="hover:bg-gray-600 w-full px-5 py-2"
              >
                  Add Question
              </div>
          </div>
        }

      </div>

      {/* Children (Recursive) */}
      {isOpen && folder.childFolders && folder.childFolders.length > 0 && (
        <div className="ml-4 border-l border-gray-700 pl-2">
          {folder.childFolders.map((child) => (
            <FolderItem
              key={child.id}  
              folder={child}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FolderItem;