import { ErrorBoundary } from "react-error-boundary";
import SheetFallback from "../FallbackUI/SheetPage-fallback";
import {  useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useRecoilState } from "recoil";
import { currentSheet } from "../../recoilstates/currentSheet";
import Folders from "../util-components/Folders";
import Questions from "../util-components/Questions";


const NAVBAR_HEIGHT = 56; // px
const sheetPageHeight = `calc(100vh - ${NAVBAR_HEIGHT}px)`;

const MIN_FOLDERS_WIDTH = 20; // vw
const MAX_FOLDERS_WIDTH = 50; // vw
type sheetType = "Fraz"|"Striver"|"Custom"
const Sheets:sheetType[] = ["Fraz","Striver","Custom"]


function Sheet() {
  const [folder_width, setFolderWidth] = useState(MIN_FOLDERS_WIDTH);
  const [dragging, setDragging] = useState(false);
  const [selectedSheet,setSelectedSheet] = useRecoilState(currentSheet);
  const containerRef = useRef(null);
  const [sheetsVisible,setSheetsVisible] = useState(false);

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

  const showSheets = ()=>{
    setSheetsVisible((prev)=>!prev);
  }

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
                <div 
                  onMouseLeave={showSheets}
                  onMouseEnter={showSheets}
                  className="relative group hover:cursor-pointer flex items-center gap-2 ">

                  <div className="pb-1 text-lg ">{selectedSheet}</div>
                  <div className="group-hover:block hidden ">
                    <ChevronDown size={15}  />
                  </div>

                  <div className="absolute top-[60%] flex flex-col gap-1 p-2  ">
                    { sheetsVisible &&
                      Sheets.map((sheet)=>{
                          return(
                            <div 
                              onClick={()=>setSelectedSheet(sheet)}
                              className={`${selectedSheet === sheet ? "bg-gray-800":""} bg-gray-700 hover:bg-gray-800 rounded-sm px-3 select-none `}>
                              {sheet}
                            </div>
                          )
                      })
                    }
                  </div>

                </div>
          </div>
          <div className="min-h-0 flex-1 ">
              <Folders/>
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
          <button className="border font-font2 h-fit px-4 rounded-sm hover:bg-gray-700 ">
            Add Folder
          </button>
        </div>
      </div>

      {/* right side */}
      <div className="h-full flex-1 ">
            <Questions />
      </div>
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