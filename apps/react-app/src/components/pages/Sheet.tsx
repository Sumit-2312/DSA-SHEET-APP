import { ErrorBoundary } from "react-error-boundary";
import SheetFallback from "../FallbackUI/SheetPage-fallback";
import { useEffect, useRef, useState } from "react";

import { useRecoilState } from "recoil";
import Questions from "../util-components/QuestionComponents/Questions";
import AddNewFolderComponent from "../util-components/FolderComponents/addNewFolderComponent";
import AddQuestionModal from "../util-components/QuestionComponents/addQuestionComponent";
import AddResourceModal from "../util-components/QuestionComponents/addResourceModal";
import NotesModal from "../util-components/QuestionComponents/notesModal";
import Folders from "../util-components/FolderComponents/Folders";
import {sheetMetaState,rootFolderIdState,foldersState,questionsState,solvedQuestionIdsState,} from "../../recoilstates/sheet/currentSheetContent";
import { addFolderModalState } from "../../recoilstates/folders/addFolderModalState";
import { useNavigate, useParams } from "react-router-dom";
import axios, { type AxiosResponse } from "axios";
import type { getSheetDataResponseType } from "@repo/types/apiResponse/getSheetDataResponseType";
import { toast } from "react-toastify";
import RenameFolderModal from "../util-components/FolderComponents/renameFolderModal";
import IsOpenSidebarState from "../../recoilstates/sheet/sideBarState";
import { Code2, TrendingUp } from "lucide-react";

const NAVBAR_HEIGHT = 60;
const MIN_FOLDERS_WIDTH = 20;
const MAX_FOLDERS_WIDTH = 50;

function Sheet() {
  const [folder_width, setFolderWidth] = useState(MIN_FOLDERS_WIDTH);
  const [, setDragging] = useState(false);
  const [, setSheetDetails] = useRecoilState(sheetMetaState);
  const [, setRootFolderId] = useRecoilState(rootFolderIdState);
  const [, setFoldersState] = useRecoilState(foldersState);
  const [, setQuestionsState] = useRecoilState(questionsState);
  const [, setSolvedQuestionIds] = useRecoilState(solvedQuestionIdsState);
  const containerRef = useRef(null);
  const [IsOpenAddFoldelModal] = useRecoilState(addFolderModalState);
  const [sideBarOpen, setSideBarOpen] = useRecoilState(IsOpenSidebarState);
  const Navigate = useNavigate();
  const { id } = useParams();

  const handleDrag = (e) => {
    e.preventDefault();
    setDragging(true);

    const onMouseMove = (ev) => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const mouseX = ev.clientX - containerRect.left;
      let newWidth = (mouseX / window.innerWidth) * 100;
      newWidth = Math.max(MIN_FOLDERS_WIDTH, Math.min(MAX_FOLDERS_WIDTH, newWidth));
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

  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        const response: AxiosResponse<getSheetDataResponseType> = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/sheet/SheetData`,
          {
            params: { id },
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        const data = response.data;
        if (!data.success) throw new Error(data.error);
        if (data.redirect) Navigate(data.redirect);

        setSheetDetails(data.sheetDetails);
        setRootFolderId(data.rootFolderId);
        setFoldersState(data.Folders || {});
        setQuestionsState(data.Questions || {});
        setSolvedQuestionIds(data.solvedQuestionsIds || []);
      } catch (err: any) {
        toast.error(err.message || err);
      }
    };
    fetchSheetData();
  }, [id]);

  useEffect(() => {
    const media = window.matchMedia("(max-width:639px)");
    const handleChange = (e: any) => {
      setSideBarOpen(!e.matches);
    };
    handleChange(media);
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  return (
    <div ref={containerRef} style={{ height: `calc(100vh - ${NAVBAR_HEIGHT}px)` }} className=" hide-scrollbar w-screen flex bg-[#080c14] overflow-hidden">
      {/* ── Sidebar ─────────────────────────────────────────── */}
      {sideBarOpen && (
        <div
          style={{ width: `${folder_width}vw` }}
          className="h-full fixed sm:relative z-30 flex shadow-2xl shadow-black/60"
        >
          {/* Panel */}
          <div className="h-full w-full flex flex-col bg-gradient-to-b from-[#0d1117] to-[#090d14] border-r border-white/[0.06] overflow-hidden">

            {/* Header */}
            <div className="px-5 pt-5 pb-4 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-900/40 flex-shrink-0">
                  <Code2 size={14} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold tracking-widest uppercase text-blue-400/80 leading-none">
                    DSA Sheet
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                    <TrendingUp size={9} />
                    Track your progress
                  </p>
                </div>
              </div>
            </div>

            {/* Folders list */}
            <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <Folders />
            </div>

            {/* Bottom glow accent */}
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
          </div>

          {/* Drag handle */}
          <div
            onMouseDown={handleDrag}
            className="group h-full w-[6px] flex-shrink-0 bg-transparent border-r border-white/[0.04] cursor-ew-resize flex items-center justify-center hover:bg-blue-500/10 hover:border-blue-500/40 transition-all duration-200"
          >
            <div className="flex flex-col gap-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-[3px] h-[3px] rounded-full bg-blue-400/70" />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Main content ────────────────────────────────────── */}
      <div className="h-full flex-1 min-w-0 bg-[#080c14] overflow-auto">
        <div className="h-full">
          <Questions />
        </div>
      </div>

      {/* ── Modals ──────────────────────────────────────────── */}
      {IsOpenAddFoldelModal && <AddNewFolderComponent />}
      <AddResourceModal />
      <NotesModal />
      <AddQuestionModal />
      <RenameFolderModal />
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