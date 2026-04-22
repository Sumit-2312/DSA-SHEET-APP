import { ErrorBoundary } from "react-error-boundary";
import SheetFallback from "../FallbackUI/SheetPage-fallback";
import {  useEffect, useRef, useState } from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import Questions from "../util-components/QuestionComponents/Questions";
import AddNewFolderComponent from "../util-components/FolderComponents/addNewFolderComponent";
import AddQuestionModal from "../util-components/QuestionComponents/addQuestionComponent";
import AddResourceModal from "../util-components/QuestionComponents/addResourceModal";
import NotesModal from "../util-components/QuestionComponents/notesModal";
import Folders from "../util-components/FolderComponents/Folders";
import { currentSheetContent } from "../../recoilstates/sheet/currentSheetContent";
import { addFolderModalState } from "../../recoilstates/folders/addFolderModalState";
import { useNavigate, useParams } from "react-router-dom";
import axios, { type AxiosResponse } from "axios";
import type { getSheetDataResponseType, SheetDataType } from "@repo/types/apiResponse/getSheetDataResponseType";
import { toast } from "react-toastify";



const NAVBAR_HEIGHT = 56; // px
const sheetPageHeight = `calc(100vh - ${NAVBAR_HEIGHT}px)`;

const MIN_FOLDERS_WIDTH = 20; // vw
const MAX_FOLDERS_WIDTH = 50; // vw



function Sheet() {
  const [folder_width, setFolderWidth] = useState(MIN_FOLDERS_WIDTH);
  const [, setDragging] = useState(false);
  const [,setCurrentSheetContent] = useRecoilState(currentSheetContent);
  const containerRef = useRef(null);
  const [IsOpenAddFoldelModal,openAddFolderModal] = useRecoilState(addFolderModalState);
  const Navigate = useNavigate();
  const {id} = useParams();

  const handleDrag = (e) => {
    e.preventDefault();
    setDragging(true);

    const onMouseMove = (ev) => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const mouseX = ev.clientX - containerRect.left;

      // convert to vw
      let newWidth = (mouseX / window.innerWidth) * 100;

      // clamp
      newWidth = Math.max(
        MIN_FOLDERS_WIDTH,
        Math.min(MAX_FOLDERS_WIDTH, newWidth)
      );

      setFolderWidth(newWidth);
    };

    const onMouseUp = () => {
      setDragging(false);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  useEffect(()=>{
    const fetchSheetData = async()=>{
      try{
          const response:AxiosResponse<getSheetDataResponseType> = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/sheet/SheetData`,{
            params:{id}, // will be passed as query 
            headers:{
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          const data =response.data;
          if( !data.success ){
            throw new Error(data.error);
          }
          if(data.redirect){
            Navigate(data.redirect);
          }

          setCurrentSheetContent((prev:SheetDataType)=>{
            return {
              id: data.id,
              name: data.name,
              Folders:data.Folders,
              solvedQuestionsCount: data.solvedQuestionsCount,
              solvedQuestionsIds: data.solvedQuestionsIds
            }
          })

          console.log("Fetched the sheet data successfully");
      }catch(err:any){
        console.log("error occured while fetching the sheet content ",err);
        toast.error(err.message || err);
      }
    }
    fetchSheetData();
  },[id]);


  return (
    <div
      ref={containerRef}
      style={{ height: sheetPageHeight }}
      className=" w-screen flex"
    >
      {/* left side */}
      <div
        style={{ width: `${folder_width}vw` }}
        className="h-full flex relative "
      >
        {/* Folders */}
        <div className=" px-[10px] h-full font-font2 flex flex-col  bg-gray-950 w-full py-2 pb-10 gap-4 ">
          <div className="flex h-fit ">
                <div className="w-full text-xl  h-10 flex flex-col">
                  <p className="text-xl font-Sekuya text-white font-bold " >Dsa Sheet</p>
                  <p className="text-sm text-gray-300  ">Track your progress</p>
                </div>
 
          </div>
          <div className="min-h-0 flex-1 ">
              <Folders />
          </div>
        </div>

        {/* draggable */}
        <div
          onMouseDown={handleDrag}
          className="group h-full w-[10px] flex-shrink-0 bg-[#1e2739] border-y border-[#2653a0] cursor-ew-resize flex items-center justify-center hover:bg-[#1e293b] transition-colors"
        >
          <div className="flex flex-col gap-[3px] opacity-30 group-hover:opacity-80 transition-opacity">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-[3px] h-[3px] rounded-full bg-slate-500"
              />
            ))}
          </div>
        </div>

        {/* Add folder button */}
        <div 
            style={{
              width: `calc(${folder_width}vw - 20px )`
            }} 
            className="absolute bottom-0 left-0 h-10 flex justify-start items-end px-6 py-2  bg-gray-900 "
          >
            <button
              onClick={() => openAddFolderModal(true)}
              className="border font-font2 h-fit px-4 rounded-sm hover:bg-gray-700"
            >
              Add Folder
            </button>
        </div>
      </div>

      {/* right side */}
      <div className="h-full flex-1 ">
            <Questions />
      </div>

        {/* Modals */}
          { IsOpenAddFoldelModal &&
            <AddNewFolderComponent/>
          }
          <AddResourceModal/>
          <NotesModal/>
          <AddQuestionModal />
    </div>
  );
}

function SheetWrapper() {
  return (
    // @ts-ignore
    <ErrorBoundary FallbackComponent={SheetFallback}>
      <Sheet />
    </ErrorBoundary>
  );
}

export default SheetWrapper;