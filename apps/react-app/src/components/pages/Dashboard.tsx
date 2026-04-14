import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { ErrorBoundary } from 'react-error-boundary';
import DashboardFallback from '../FallbackUI/Dashboard-fallback';

function DashboardWrapper(){
  return (
    // @ts-ignore
    <ErrorBoundary FallbackComponent={DashboardFallback}>
      <Dashboard />
    </ErrorBoundary>
  );
}

function FeatureCard({ title, desc, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:scale-[1.02] transition"
    >
      <div className="text-2xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{desc}</p>
    </motion.div>
  );
}

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold">Welcome Back 👋</h1>
          <p className="text-gray-400 text-sm mt-1">
            Master Data Structures & Algorithms with a structured approach
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-gray-800 px-3 py-2 rounded-xl">
            <Search className="w-4 h-4 mr-2" />
            <input
              placeholder="Search problems..."
              className="bg-transparent outline-none text-sm"
            />
          </div>
          <button className="bg-white text-black px-4 py-2 rounded-xl font-medium hover:opacity-80 transition">
            Get Started
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">🚀 Features of Your DSA Sheet App</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon="🧩"
            title="Customizable DSA Sheets"
            desc="Start from base DSA sheets or create your own from scratch based on your learning needs."
          />

          <FeatureCard
            icon="💻"
            title="Code Editor"
            desc="Write and run your code directly inside the app without switching between platforms."
          />

          <FeatureCard
            icon="📌"
            title="Snippet Manager"
            desc="Save useful snippets and reuse them to solve coding problems faster and more efficiently."
          />
        </div>
      </div>

      {/* Call To Action */}
      <div className="bg-gray-800 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-semibold mb-3">Start Practicing Today 💪</h2>
        <p className="text-gray-400 mb-6">
          Pick a sheet, solve problems, and become interview ready step by step.
        </p>
        <button className="bg-white text-black px-6 py-3 rounded-xl font-medium hover:opacity-80 transition">
          Explore Sheets
        </button>
      </div>
    </div>
  );
}

export default DashboardWrapper;
