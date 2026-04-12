
import { useRecoilValue } from "recoil";
import { currentFolder } from "../../recoilstates/currentFolder";
import { ChevronDown } from "lucide-react";
import type { folders } from "@repo/types/sheet/sheetContentType";

function FolderItem({ folder , onSelect }:{folder:folders,onSelect:(folder:folders)=>void}) {
  const selectedFolder = useRecoilValue(currentFolder);
  return (
    <div className="ml-2">
      {/* Folder Name */}
      <div
        onClick={() => onSelect(folder)}
        className={` ${selectedFolder?._id === folder._id && "bg-gray-600" } flex justify-between items-center group cursor-pointer text-white hover:bg-gray-700 px-2 py-1 rounded`}
      >
        <div> 📁 {folder.name} </div>
        <div 
            className={`${ folder.children.length > 0 && "group-hover:block" } hidden `}
          >
             <ChevronDown  /> 
        </div>
      </div>

      {/* Children */}
      {folder.children && folder.children.length > 0 && (
        <div className="ml-4 border-l border-gray-600 pl-2">
          {folder.children.map((child) => (
            <FolderItem key={child._id} folder={child} onSelect={onSelect} />
          ))}
        </div>
      )}

    </div>
  );
}

export default FolderItem;