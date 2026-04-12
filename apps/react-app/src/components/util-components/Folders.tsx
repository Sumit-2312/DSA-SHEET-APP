import React, { useMemo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentSheetContent } from "../../recoilstates/currentSheetContent";
import FolderItem from "./FolderItem";
import { currentFolder } from "../../recoilstates/currentFolder";
import type { folders } from "@repo/types/sheet/sheetContentType";

function Folders() {
  const content = useRecoilValue(currentSheetContent);
  const setCurrFolder = useSetRecoilState(currentFolder);

  // Extract only folders
  const folders:folders[] = useMemo(() => {
    if (!content || Array.isArray(content) || !content.tree) return [];
    return content.tree.map((folder) => ({
      _id: folder._id,
      name: folder.name,
      parentFolderId: folder.parentFolderId,
      children: folder.children || [],
      order: folder.order,
      questions: folder.questions
    }));
  }, [content]);

  // Handle folder click
  const handleSelect = (folder:folders) => {
    console.log("Selected Folder:", folder);
    setCurrFolder(folder)
  };

  return (
    <div className="flex flex-col gap-2 py-5 h-full bg-gray-900 text-white p-2 overflow-y-auto scrollbar-hide ">
      {folders.map((folder) => (
        <FolderItem
          key={folder._id}
          folder={folder}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
}

export default Folders;