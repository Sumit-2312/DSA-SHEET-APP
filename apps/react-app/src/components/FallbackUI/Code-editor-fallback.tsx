import React from "react";

function CodeEditorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-[#0f172a] text-white">
      
      <div className="bg-[#1e293b] border border-red-500/30 rounded-xl p-6 w-[400px] shadow-xl">
        
        {/* Title */}
        <h2 className="text-lg font-semibold text-red-400 mb-2">
          ⚠️ Editor Crashed
        </h2>

        {/* Description */}
        <p className="text-sm text-slate-300 mb-4">
          Something went wrong while rendering the code editor.
        </p>

        {/* Error Message */}
        <div className="bg-black/40 border border-slate-700 rounded p-3 text-xs text-red-300 mb-4 overflow-auto max-h-[120px]">
          {error?.message || "Unknown error"}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          
          <button
            onClick={resetErrorBoundary}
            className="px-4 py-1.5 text-sm rounded bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20 transition"
          >
            Reload Editor
          </button>

        </div>
      </div>

    </div>
  );
}

export default CodeEditorFallback;