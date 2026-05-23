import  { useState } from "react";
import { ChevronDown, Ellipsis } from "lucide-react";
import type { Folder, Folder as FolderType } from "@repo/types/apiResponse/getSheetDataResponseType";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { currentFolder } from "../../../recoilstates/folders/currentFolder";
import { addFolderModalState } from "../../../recoilstates/folders/addFolderModalState";
import { addQuestionModalState } from "../../../recoilstates/question/questionModalStates";
import { toast } from "react-toastify";
import axios from "axios";
import { foldersState, questionsState, sheetMetaState } from "../../../recoilstates/sheet/currentSheetContent";
import { renameFolderState } from "../../../recoilstates/sheet/renameFolder";

type Props = {
  folder: FolderType;
  onSelect: (folder: FolderType) => void;
};





function FolderItem({ folder, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [curr_folder,setCurrFolder] = useRecoilState(currentFolder);
  const [renameAndRemoveOpen,setRenameAndRemoveOpen] = useState(false);
  const [,setAddFolderModalOpenState] = useRecoilState(addFolderModalState);
  const setAddQuestionModalOpenState = useSetRecoilState(addQuestionModalState);
  const [,setRenameFolderModalState] = useRecoilState(renameFolderState);
  const [foldersMap,setFoldersMap] = useRecoilState(foldersState);
  const [,setQuestionMap] = useRecoilState(questionsState);
  const sheetDetails = useRecoilValue(sheetMetaState);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
    onSelect(folder);
  };

  const removeFolder=(folderId:string)=>{
    if(!folderId) return;

    const foldersToDelete:string[]=[];
    const questionsToDelete:string[]=[];

    const collect=(id:string)=>{
        const folder = foldersMap[id];

        if(!folder) return;

        foldersToDelete.push(id);

        questionsToDelete.push(...folder.questionIds);

        folder.childFolderIds.forEach(collect);
    }

    collect(folderId);

    setQuestionMap(prev=>{
        const newMap={...prev};

        questionsToDelete.forEach(id=>{
          delete newMap[id];
        });

        return newMap;
    });

    setFoldersMap(prev=>{
        const newMap={...prev};

        const parentId=prev[folderId]?.parentFolderId;

        if(parentId){
          newMap[parentId]={
              ...newMap[parentId],
              childFolderIds:
                newMap[parentId].childFolderIds.filter(
                    id=>id!==folderId
                )
          }
        }

        foldersToDelete.forEach(id=>{
          delete newMap[id];
        });

        return newMap;
    });
  }

  const handleDeleteFolder = async () => {
      const confirmDelete = window.confirm(
        "⚠️ Deleting this folder will remove ALL its data including subfolders and questions. This action cannot be undone.\n\nDo you want to continue?"
      );

      if (!confirmDelete) return;

      try {
        const token = localStorage.getItem("token");

        const res = await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/sheet/folder`,
          {
            data: {
              folderId: folder.id,
            },
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

        // remove folder from folder map with all child folders and their question recursively
        removeFolder(folder?.id);

        setCurrFolder(null);
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
        {folder.childFolderIds && folder.childFolderIds.length > 0 && (
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
            
            {/* Rename */}
            {
              folder.id != sheetDetails?.id &&
              <div onClick={()=>{
                  setRenameFolderModalState({
                    isOpen: true,
                    folderId: folder.id,
                    folderName: folder.name
                  })
                }} className="hover:bg-gray-600 w-full px-5 py-2">
                  Rename
              </div>
            }

            {/* Delete */}
           { folder.id != sheetDetails.id  &&  <div 
              onClick={()=>{
                handleDeleteFolder();
                setRenameAndRemoveOpen(false);
              }}
              className="hover:bg-gray-600 w-full px-5 py-2"
            >
              Delete
            </div>}

              {/* Add Folder */}
             { folder.questionIds.length === 0 &&
                <div 
                    onClick={()=>{
                      setAddFolderModalOpenState(true);
                      setRenameAndRemoveOpen(false);
                    }} 
                    className="hover:bg-gray-600 w-full px-5 py-2"
                  >
                    Add Folder
                  </div>
              }

              {/* Add Question */}
              { folder.childFolderIds.length === 0 &&
                <div 
                onClick={()=>{
                  setAddQuestionModalOpenState(true);
                  setRenameAndRemoveOpen(false);
                }} 
                className="hover:bg-gray-600 w-full px-5 py-2"
              >
                  Add Question
              </div>}
          </div>
        }

      </div>

      {/* Children (Recursive) */}
      {isOpen && folder.childFolderIds && folder.childFolderIds.length > 0 && (
        <div className="ml-4 border-l border-gray-700 pl-2">
          {folder.childFolderIds.map((childId) => {
            if( !foldersMap[childId] ) return null;
           return (
            <FolderItem
              key={childId}  
              folder={foldersMap[childId]}
              onSelect={onSelect}
            />
          )}
          )}
        </div>
      )}
    </div>
  );
}

export default FolderItem;