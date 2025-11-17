"use client";

import { useState } from "react";

export default function GeneratorPage() {
  const [idea, setIdea] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");
  const [framework, setFramework] = useState("nextjs");
  const [output, setOutput] = useState("both");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function generate() {
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({
        idea,
        description,
        features: features.split(",").map(f => f.trim()),
        framework,
        output
      })
    });

    const data = await res.json();
    setLoading(false);
    setResult(data);
  }

  function downloadZip() {
    if (!result?.zip) return;

    const link = document.createElement("a");
    link.href = `data:application/zip;base64,${result.zip}`;
    link.download = `${idea.replace(/\s+/g, "-").toLowerCase()}-nextforge.zip`;
    link.click();
  }

  return (
    <div className="p-10 text-white max-w-4xl mx-auto space-y-6">

      <h1 className="text-3xl font-bold">⚡ NextForge Pro+ Generator</h1>

      <input
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="SaaS Idea"
        className="w-full p-3 bg-black/40 rounded-lg border border-white/10"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe your SaaS"
        className="w-full p-3 bg-black/40 rounded-lg border border-white/10"
      />

      <textarea
        value={features}
        onChange={(e) => setFeatures(e.target.value)}
        placeholder="Features (comma-separated)"
        className="w-full p-3 bg-black/40 rounded-lg border border-white/10"
      />

      <select
        value={framework}
        onChange={(e) => setFramework(e.target.value)}
        className="w-full p-3 bg-black/40 rounded-lg border border-white/10"
      >
        <option value="nextjs">Next.js</option>
        <option value="react">React</option>
        <option value="html">HTML</option>
        <option value="node">Node.js API</option>
      </select>

      <select
        value={output}
        onChange={(e) => setOutput(e.target.value)}
        className="w-full p-3 bg-black/40 rounded-lg border border-white/10"
      >
        <option value="source">Source Code Only</option>
        <option value="instructions">Instructions Only</option>
        <option value="both">Both</option>
      </select>

      <button
        onClick={generate}
        disabled={loading}
        className="w-full p-4 bg-yellow-400 text-black rounded-xl font-bold hover:bg-yellow-500"
      >
        {loading ? "Generating..." : "Generate SaaS"}
      </button>

      {result && (
        <div className="p-6 bg-black/40 border border-white/10 rounded-xl space-y-4">

          <div className="text-lg font-semibold">
            {result.success ? "Generation Complete" : "Generation Failed"}
          </div>

          <pre className="whitespace-pre-wrap text-sm max-h-[350px] overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>

          {result.zip && (
            <button
              onClick={downloadZip}
              className="w-full p-4 bg-green-400 text-black rounded-xl font-bold hover:bg-green-500"
            >
              📦 Download ZIP Package
            </button>
          )}
        </div>
      )}
    </div>
  );
}
