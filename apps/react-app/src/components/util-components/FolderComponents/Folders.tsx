import { useMemo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentSheetContent } from "../../../recoilstates/sheet/currentSheetContent";
import FolderItem from "../FolderComponents/FolderItem";
import { currentFolder } from "../../../recoilstates/folders/currentFolder";
import type { Folder as FolderType } from "@repo/types/apiResponse/getSheetDataResponseType";


function Folders() {
  const content = useRecoilValue(currentSheetContent);
  const setCurrFolder = useSetRecoilState(currentFolder);

  const folders: FolderType[] = useMemo(() => {
    if (!content) return [];
    return content.Folders || [];
  }, [content]);


  const handleSelect = (folder: FolderType) => {
    console.log("Selected Folder:", folder);
    setCurrFolder(folder);
  };

  return (
    <div className="flex flex-col gap-2 py-5 h-full bg-gray-900 text-white p-2 overflow-y-auto scrollbar-hide">
      {folders.map((folder) => (
        <FolderItem
          key={folder.id}   
          folder={folder}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
}

export default Folders;