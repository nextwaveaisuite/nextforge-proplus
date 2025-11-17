"use client";

import { useState } from "react";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [status, setStatus] = useState("");
  const [files, setFiles] = useState({});
  const [downloadUrl, setDownloadUrl] = useState("");

  async function generateApp() {
    try {
      setStatus("Classifying idea...");
      setFiles({});
      setDownloadUrl("");

      // --- Step 1: Classify ---
      const classifyRes = await fetch("/api/classify", {
        method: "POST",
        body: JSON.stringify({ idea }),
      });
      const classifier = await classifyRes.json();

      setStatus("Generating blueprint...");

      // --- Step 2: Blueprint ---
      const blueprintRes = await fetch("/api/blueprint", {
        method: "POST",
        body: JSON.stringify(classifier),
      });
      const blueprint = await blueprintRes.json();

      setStatus("Scaffolding code...");

      // --- Step 3: Scaffold ---
      const scaffoldRes = await fetch("/api/scaffold", {
        method: "POST",
        body: JSON.stringify({ blueprint }),
      });
      const scaffold = await scaffoldRes.json();

      setFiles(scaffold.files);
      setStatus("Preparing ZIP...");

      // --- Step 4: ZIP Export ---
      const exportRes = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ files: scaffold.files }),
      });

      const blob = await exportRes.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);

      setStatus("App ready!");

    } catch (error) {
      console.error(error);
      setStatus("Error generating app.");
    }
  }

  return (
    <main className="p-10 max-w-4xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-4">NextForge Pro+ Generator</h1>

      <textarea
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="Describe the app you want to build..."
        className="w-full p-4 rounded-lg bg-neutral-900 border border-neutral-700 text-white mb-4"
        rows={5}
      />

      <button
        onClick={generateApp}
        className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
      >
        Build My App
      </button>

      {status && (
        <p className="mt-6 text-blue-300 text-lg">{status}</p>
      )}

      {Object.keys(files).length > 0 && (
        <>
          <h2 className="text-2xl mt-10 font-bold">Generated Files</h2>

          <div className="mt-4 p-4 bg-neutral-900 rounded-xl border border-neutral-700 max-h-[300px] overflow-auto">
            {Object.keys(files).map((file) => (
              <p key={file} className="text-sm text-gray-300">
                {file}
              </p>
            ))}
          </div>
        </>
      )}

      {downloadUrl && (
        <a
          href={downloadUrl}
          download="nextforge_app.zip"
          className="inline-block mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl"
        >
          Download ZIP
        </a>
      )}
    </main>
  );
}
