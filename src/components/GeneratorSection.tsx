"use client";

import { useState } from "react";

export default function GeneratorSection() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [blueprint, setBlueprint] = useState<any>(null);
  const [exporting, setExporting] = useState(false);

  async function buildApp() {
    if (!prompt.trim()) return;

    setLoading(true);
    setBlueprint(null);

    try {
      const res = await fetch("/api/scaffold", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unknown scaffold error");
      }

      setBlueprint(data.blueprint);
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function downloadZip() {
    if (!blueprint) return;

    setExporting(true);
    try {
      const res = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ files: blueprint.files })
      });

      if (!res.ok) {
        throw new Error("Failed exporting ZIP");
      }

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "nextforge-app.zip";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      alert("Export error: " + err.message);
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-xl shadow-xl">
      <textarea
        className="w-full h-32 p-4 rounded-lg bg-black/40 border border-white/20 text-white focus:outline-none focus:border-blue-500"
        placeholder="Describe the app..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={buildApp}
        disabled={loading}
        className="w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition text-white font-semibold disabled:opacity-50"
      >
        {loading ? "Building..." : "Build My App"}
      </button>

      {blueprint && (
        <div className="mt-6 p-4 bg-white/10 rounded-lg border border-white/20">
          <h2 className="font-semibold text-xl mb-2">Blueprint Ready</h2>

          <pre className="text-sm bg-black/30 p-3 rounded-lg overflow-x-auto">
            {JSON.stringify(blueprint, null, 2)}
          </pre>

          <button
            onClick={downloadZip}
            disabled={exporting}
            className="w-full mt-4 py-3 rounded-lg bg-green-600 hover:bg-green-700 transition text-white font-semibold disabled:opacity-50"
          >
            {exporting ? "Generating ZIP..." : "Download ZIP"}
          </button>
        </div>
      )}
    </div>
  );
}
