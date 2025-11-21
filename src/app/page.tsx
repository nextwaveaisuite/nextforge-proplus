"use client";

import { useState } from "react";

export default function Home() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [blueprint, setBlueprint] = useState(null);

  // Format options
  const [includeBackend, setIncludeBackend] = useState(false);
  const [includeFlutter, setIncludeFlutter] = useState(false);

  async function buildApp() {
    setLoading(true);
    setBlueprint(null);

    const res = await fetch("/api/build", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description,
        includeBackend,
        includeFlutter,
      }),
    });

    const data = await res.json();
    setBlueprint(data);
    setLoading(false);
  }

  return (
    <div className="builder-container">
      <h1 className="builder-title">NextForge Pro+ Generator</h1>
      <p className="builder-subtitle">
        Describe the app you want, and NextForge Pro+ will build all formats instantly.
      </p>

      <textarea
        className="builder-textarea"
        placeholder="Describe your app idea here..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* FORMAT SELECTOR PANEL */}
      <div className="format-box">
        <h3 className="format-title">Choose Output Formats</h3>

        <div className="format-option always-on">
          <input type="checkbox" checked readOnly />
          <label>Next.js SaaS App (Always On)</label>
        </div>

        <div className="format-option always-on">
          <input type="checkbox" checked readOnly />
          <label>HTML/JS Micro App (Always On)</label>
        </div>

        <div className="format-option">
          <input
            type="checkbox"
            checked={includeBackend}
            onChange={() => setIncludeBackend(!includeBackend)}
          />
          <label>Node.js Backend (Optional)</label>
        </div>

        <div className="format-option">
          <input
            type="checkbox"
            checked={includeFlutter}
            onChange={() => setIncludeFlutter(!includeFlutter)}
          />
          <label>Flutter Mobile App (Optional)</label>
        </div>
      </div>

      <button
        className="builder-button"
        disabled={loading}
        onClick={buildApp}
      >
        {loading ? "Building..." : "Build My App"}
      </button>

      {blueprint && (
        <div className="result-box">
          <h3>Blueprint Ready</h3>
          <pre>{JSON.stringify(blueprint, null, 2)}</pre>

          <a
            href={blueprint.zipUrl}
            className="download-button"
            download
          >
            Download ZIP
          </a>
        </div>
      )}
    </div>
  );
}
