import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  X, Bold, Italic, List, Heading2,
  Code, Quote, Undo2, Redo2, Strikethrough,
} from "lucide-react";
import { activeQuestionState, notesModalState } from "../../../recoilstates/question/questionModalStates";
import axios from "axios";
import { toast } from "react-toastify";
import { questionsState } from "../../../recoilstates/sheet/currentSheetContent";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// TipTap renders its own DOM nodes (p, ul, h2, strong…) that Tailwind
// utility classes cannot reach from the outside. This minimal scoped block
// is the ONLY <style> tag and is strictly limited to .nm-editor children.
const EDITOR_CSS = `
  .nm-editor { outline: none; caret-color: #f59e0b; }
  .nm-editor p               { margin: 0 0 0.65em; color: #cbd5e1; font-size: 14px; line-height: 1.8; }
  .nm-editor p:last-child    { margin-bottom: 0; }
  .nm-editor strong          { color: #f1f5f9; font-weight: 600; }
  .nm-editor em              { color: #94a3b8; }
  .nm-editor s               { color: #475569; }
  .nm-editor h2              { font-size: 1.1em; font-weight: 600; color: #f8fafc; margin: 1em 0 0.4em;
                               border-bottom: 1px solid rgba(255,255,255,0.07); padding-bottom: 0.28em; }
  .nm-editor ul              { list-style: disc; padding-left: 1.4em; margin: 0.4em 0; }
  .nm-editor ul li           { color: #cbd5e1; margin-bottom: 0.28em; font-size: 14px; line-height: 1.8; }
  .nm-editor ul li::marker   { color: #f59e0b; }
  .nm-editor ol              { list-style: decimal; padding-left: 1.4em; margin: 0.4em 0; }
  .nm-editor ol li           { color: #cbd5e1; margin-bottom: 0.28em; font-size: 14px; line-height: 1.8; }
  .nm-editor ol li::marker   { color: #f59e0b; }
  .nm-editor blockquote      { border-left: 2px solid #f59e0b; padding-left: 1em; margin: 0.65em 0;
                               color: #64748b; font-style: italic; }
  .nm-editor code            { font-family: 'Fira Code', monospace; font-size: 0.82em;
                               background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.09);
                               border-radius: 4px; padding: 0.1em 0.36em; color: #fbbf24; }
  .nm-editor pre             { background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.07);
                               border-radius: 7px; padding: 0.85em 1em; overflow-x: auto; margin: 0.85em 0; }
  .nm-editor pre code        { background: none; border: none; padding: 0; color: #94a3b8; }
  .nm-editor .ProseMirror-focused { outline: none; }
`;

// ── Toolbar Button ─────────────────────────────────────────────────────────────
function ToolbarBtn({
  onClick,
  active = false,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onMouseDown={(e) => {
        e.preventDefault(); // keep editor focused
        onClick();
      }}
      title={title}
      className={[
        "flex items-center justify-center w-[30px] h-[30px] rounded-lg",
        "border-none cursor-pointer transition-all duration-150 shrink-0",
        active
          ? "bg-amber-400/15 text-amber-400"
          : "bg-transparent text-slate-500 hover:bg-white/[0.06] hover:text-slate-200",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function ToolbarDivider() {
  return <div className="w-px h-[18px] bg-white/10 mx-1 shrink-0" />;
}

// ── Main Modal ─────────────────────────────────────────────────────────────────
function NotesModal() {
  const [open, setOpen]           = useRecoilState(notesModalState);
  const question                  = useRecoilValue(activeQuestionState);
  const [questionMap, setQuestionMap] = useRecoilState(questionsState);

  const [notes, setNotes]     = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // keep component mounted during exit animation
  const [mounted, setMounted] = useState(false);
  const [animIn, setAnimIn]   = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimIn(true)));
    } else {
      setAnimIn(false);
      timerRef.current = setTimeout(() => setMounted(false), 220);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [open]);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => setNotes(editor.getHTML()),
    editorProps: { attributes: { class: "nm-editor" } },
  });

  useEffect(() => {
    if (!open) return;
    const saved = questionMap[question?.id]?.notes || "";
    setNotes(saved);
    if (editor && saved !== editor.getHTML()) {
      editor.commands.setContent(saved, false);
    }
  }, [question?.id, open]);

  const close = () => setOpen(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/sheet/question`,
        {
          questionId: question?.id,
          folderId:   question?.folderId,
          sheetId:    question?.sheetId,
          fieldToBeUpdated: { notes },
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      const data = response.data;
      if (!data.success) throw new Error(data.error || "Failed to update notes");

      toast.success("Notes saved");
      setQuestionMap((prev) => {
        if (!question?.id) return prev;
        return { ...prev, [question.id]: { ...prev[question.id], notes } };
      });
      close();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "Failed to update notes");
      } else {
        toast.error("Unexpected error");
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (!mounted) return null;

  const wordCount = editor?.getText().trim().split(/\s+/).filter(Boolean).length ?? 0;

  return (
    <>
      <style>{EDITOR_CSS}</style>

      {/* ── Backdrop ── */}
      <div
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        className={[
          "fixed inset-0 z-50 flex items-center justify-center",
          "bg-[rgba(2,6,23,0.82)] backdrop-blur-md",
          "transition-opacity duration-200",
          animIn ? "opacity-100" : "opacity-0",
        ].join(" ")}
      >
        {/* ── Panel ── */}
        <div
          className={[
            "relative flex flex-col",
            "w-[min(72vw,860px)] h-[min(78vh,640px)]",
            "rounded-[18px] border border-white/[0.07]",
            "bg-gradient-to-br from-[#0d1629] to-[#090e1c]",
            "shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_40px_80px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.06)]",
            "transition-all duration-[240ms]",
            animIn
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-[0.97] translate-y-2",
          ].join(" ")}
          style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
        >
          {/* top amber glow line */}
          <div className="absolute inset-x-0 top-0 h-px rounded-t-[18px] pointer-events-none bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

          {/* ── Header ── */}
          <div className="flex items-center justify-between px-7 py-[14px] border-b border-white/[0.06] shrink-0">
            <div className="flex items-center gap-3">
              {/* amber accent bar */}
              <span className="inline-block w-[3px] h-[22px] rounded-full shrink-0 bg-gradient-to-b from-amber-400 to-amber-600" />
              <div>
                <p className="text-[9px] font-semibold tracking-[0.12em] uppercase text-slate-500 leading-none mb-[5px]">
                  Notes
                </p>
                <h2 className="m-0 text-[13px] font-medium text-slate-100 leading-none tracking-tight truncate max-w-[400px]">
                  {question?.title || "Untitled Question"}
                </h2>
              </div>
            </div>

            <button
              onClick={close}
              className="flex items-center justify-center w-[30px] h-[30px] rounded-lg border-none bg-transparent text-slate-500 cursor-pointer transition-all duration-150 hover:bg-red-500/10 hover:text-red-400"
            >
              <X size={14} strokeWidth={2} />
            </button>
          </div>

          {/* ── Toolbar ── */}
          <div className="flex items-center flex-wrap gap-0.5 px-5 py-2 border-b border-white/[0.06] shrink-0">
            <ToolbarBtn title="Bold (Ctrl+B)"   active={editor?.isActive("bold")}              onClick={() => editor?.chain().focus().toggleBold().run()}>
              <Bold size={13} strokeWidth={2.2} />
            </ToolbarBtn>
            <ToolbarBtn title="Italic (Ctrl+I)" active={editor?.isActive("italic")}            onClick={() => editor?.chain().focus().toggleItalic().run()}>
              <Italic size={13} strokeWidth={2.2} />
            </ToolbarBtn>
            <ToolbarBtn title="Strikethrough"   active={editor?.isActive("strike")}            onClick={() => editor?.chain().focus().toggleStrike().run()}>
              <Strikethrough size={13} strokeWidth={2.2} />
            </ToolbarBtn>

            <ToolbarDivider />

            <ToolbarBtn title="Heading H2"      active={editor?.isActive("heading",{level:2})} onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>
              <Heading2 size={13} strokeWidth={2.2} />
            </ToolbarBtn>
            <ToolbarBtn title="Bullet List"     active={editor?.isActive("bulletList")}        onClick={() => editor?.chain().focus().toggleBulletList().run()}>
              <List size={13} strokeWidth={2.2} />
            </ToolbarBtn>
            <ToolbarBtn title="Blockquote"      active={editor?.isActive("blockquote")}        onClick={() => editor?.chain().focus().toggleBlockquote().run()}>
              <Quote size={13} strokeWidth={2.2} />
            </ToolbarBtn>
            <ToolbarBtn title="Inline Code"     active={editor?.isActive("code")}              onClick={() => editor?.chain().focus().toggleCode().run()}>
              <Code size={13} strokeWidth={2.2} />
            </ToolbarBtn>

            <ToolbarDivider />

            <ToolbarBtn title="Undo (Ctrl+Z)"   onClick={() => editor?.chain().focus().undo().run()}>
              <Undo2 size={13} strokeWidth={2.2} />
            </ToolbarBtn>
            <ToolbarBtn title="Redo (Ctrl+Y)"   onClick={() => editor?.chain().focus().redo().run()}>
              <Redo2 size={13} strokeWidth={2.2} />
            </ToolbarBtn>
          </div>

          {/* ── Editor ── */}
          <div className="flex-1 overflow-y-auto px-7 py-5 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.07)_transparent]">
            <EditorContent editor={editor} className="min-h-full h-full" />
          </div>

          {/* ── Footer ── */}
          <div className="flex items-center justify-between px-7 py-3 border-t border-white/[0.06] shrink-0">
            <span className="text-[11px] text-slate-600 tabular-nums">
              {wordCount} {wordCount === 1 ? "word" : "words"}
            </span>

            <div className="flex items-center gap-2.5">
              <button
                onClick={close}
                className="px-4 py-[7px] text-xs font-medium text-slate-500 bg-transparent border border-white/[0.07] rounded-[9px] cursor-pointer transition-all duration-150 hover:text-slate-200 hover:border-white/20"
              >
                Discard
              </button>

              <button
                onClick={handleSave}
                disabled={isSaving}
                className={[
                  "px-5 py-[7px] text-xs font-semibold rounded-[9px] border-none cursor-pointer",
                  "transition-opacity duration-150",
                  isSaving
                    ? "opacity-60 cursor-not-allowed bg-amber-800/40 text-amber-900"
                    : "bg-gradient-to-br from-amber-400 to-amber-600 text-amber-950 shadow-[0_2px_10px_rgba(245,158,11,0.3),inset_0_1px_0_rgba(255,255,255,0.18)] hover:brightness-110",
                ].join(" ")}
              >
                {isSaving ? "Saving…" : "Save Notes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotesModal;