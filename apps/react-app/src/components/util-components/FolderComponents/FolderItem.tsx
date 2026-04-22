import  { useState } from "react";
import { ChevronDown, Ellipsis } from "lucide-react";
import type { Folder as FolderType } from "@repo/types/apiResponse/getSheetDataResponseType";
import { useRecoilValue } from "recoil";
import { currentFolder } from "../../../recoilstates/folders/currentFolder";

type Props = {
  folder: FolderType;
  onSelect: (folder: FolderType) => void;
};



function FolderItem({ folder, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const curr_folder = useRecoilValue(currentFolder);
  const [renameAndRemoveOpen,setRenameAndRemoveOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
    onSelect(folder);
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
          <Ellipsis onClick={()=>setRenameAndRemoveOpen((prev)=>!prev)} />
        </div>

        {
          renameAndRemoveOpen && 
          <div onMouseLeave={()=>setRenameAndRemoveOpen(false)} className=" bg-black py-2 select-none absolute top-[100%] right-1 z-[400] flex flex-col">
            <div className="hover:bg-gray-600 w-full px-5 py-2">Rename</div>
            <div className="hover:bg-gray-600 w-full px-5 py-2">Delete</div>
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