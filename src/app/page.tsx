"use client";

import { useState } from "react";
import FormatToggle from "@/components/FormatToggle";
import BuildOutput from "@/components/BuildOutput";

export default function Home() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [formats, setFormats] = useState({
    nextjs: true,       // always ON
    microapp: true,     // always ON
    node: false,        // optional
    flutter: false,     // optional
  });

  const [result, setResult] = useState(null);

  async function handleBuild() {
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({
        description,
        formats,
      }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <main className="builder-wrapper">
      <h1 className="builder-title">NextForge Pro+ Generator</h1>
      <p className="builder-sub">Your upgraded multi-format SaaS factory.</p>

      <textarea
        className="builder-textbox"
        placeholder="Describe the app you want..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <FormatToggle formats={formats} setFormats={setFormats} />

      <button
        className="builder-button"
        disabled={loading || !description}
        onClick={handleBuild}
      >
        {loading ? "Building…" : "Build My App"}
      </button>

      {result && <BuildOutput result={result} />}
    </main>
  );
}
