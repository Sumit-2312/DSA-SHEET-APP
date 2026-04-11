import React from "react";

function SheetFallback({ error, resetErrorBoundary }) {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-[#0f172a] text-white">
      
      <div className="bg-[#1e293b] border border-red-500/30 rounded-xl p-6 w-[420px] shadow-xl">
        
        {/* Title */}
        <h2 className="text-lg font-semibold text-red-400 mb-2">
          ⚠️ Sheet Failed to Load
        </h2>

        {/* Description */}
        <p className="text-sm text-slate-300 mb-4">
          There was an issue loading your sheet data. You can try again or reset the state.
        </p>

        {/* Error */}
        <div className="bg-black/40 border border-slate-700 rounded p-3 text-xs text-red-300 mb-4 overflow-auto max-h-[120px]">
          {error?.message || "Unknown error"}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          
          <button
            onClick={resetErrorBoundary}
            className="px-4 py-1.5 text-sm rounded bg-purple-500/10 border border-purple-500/30 text-purple-400 hover:bg-purple-500/20 transition"
          >
            Retry
          </button>

          <button
            onClick={() => window.location.reload()}
            className="px-4 py-1.5 text-sm rounded bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 transition"
          >
            Reload Sheet
          </button>

        </div>
      </div>

    </div>
  );
}

export default SheetFallback;