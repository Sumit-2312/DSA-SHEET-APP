import React from "react";

function DashboardFallback({ error, resetErrorBoundary }) {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-[#0f172a] text-white">
      
      <div className="bg-[#1e293b] border border-red-500/30 rounded-xl p-6 w-[420px] shadow-xl">
        
        {/* Title */}
        <h2 className="text-lg font-semibold text-red-400 mb-2">
          ⚠️ Dashboard Error
        </h2>

        {/* Description */}
        <p className="text-sm text-slate-300 mb-4">
          We couldn’t load your dashboard. Try refreshing or come back later.
        </p>

        {/* Error Box */}
        <div className="bg-black/40 border border-slate-700 rounded p-3 text-xs text-red-300 mb-4 overflow-auto max-h-[120px]">
          {error?.message || "Something unexpected happened"}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          
          <button
            onClick={resetErrorBoundary}
            className="px-4 py-1.5 text-sm rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 transition"
          >
            Retry
          </button>

          <button
            onClick={() => window.location.reload()}
            className="px-4 py-1.5 text-sm rounded bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20 transition"
          >
            Refresh Page
          </button>

        </div>
      </div>

    </div>
  );
}

export default DashboardFallback;