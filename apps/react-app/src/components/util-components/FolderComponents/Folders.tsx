import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {foldersState, rootFolderIdState } from "../../../recoilstates/sheet/currentSheetContent";
import FolderItem from "../FolderComponents/FolderItem";
import { currentFolder } from "../../../recoilstates/folders/currentFolder";
import type { Folder as FolderType } from "@repo/types/apiResponse/getSheetDataResponseType";


function Folders() {
  const [rootFolderId,] = useRecoilState(rootFolderIdState);
  const folderState = useRecoilValue(foldersState);
  const setCurrFolder = useSetRecoilState(currentFolder);
  const RootFolder = folderState[rootFolderId || ""];

  const handleSelect = (folder: FolderType) => {
    console.log("Selected Folder:", folder);
    setCurrFolder(folder);
  };

  return (
    <div className="flex flex-col gap-2 py-5 h-full bg-gray-900 text-white p-2 overflow-y-auto scrollbar-hide">
      {
        RootFolder && <FolderItem folder={RootFolder} onSelect={handleSelect} />
      }
    </div>
  );
}

export default Folders;