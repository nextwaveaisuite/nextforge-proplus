"use client";

import { useState, useEffect } from "react";
import { loadTheme, toggleTheme } from "@/src/lib/theming";

export default function Home() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [blueprint, setBlueprint] = useState(null);
  const [activeTab, setActiveTab] = useState("nextjs");

  const [includeBackend, setIncludeBackend] = useState(false);
  const [includeFlutter, setIncludeFlutter] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

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
      {/* THEME SWITCH */}
      <button className="theme-switch" onClick={toggleTheme}>
        🌓
      </button>

      <h1 className="builder-title">NextForge Pro+ Generator</h1>
      <p className="builder-subtitle">
        Describe the app you want, and NextForge Pro+ will build all formats instantly.
      </p>

      <div className="builder-main">
        {/* Left Side - Controls */}
        <div className="left-panel">
          <textarea
            className="builder-textarea"
            placeholder="Describe your app idea here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* FORMAT SELECTOR */}
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

          {loading && (
            <div className="progress-box">
              <div className="progress-loader"></div>
              <p className="loading-dots">Building<span>.</span><span>.</span><span>.</span></p>
            </div>
          )}
        </div>

        {/* Right Side - Live Preview */}
        <div className="preview-panel">
          <h3>Live Preview</h3>
          <div className="preview-box">
            {blueprint ? (
              <pre>{JSON.stringify(blueprint.blueprint, null, 2)}</pre>
            ) : (
              <p className="preview-placeholder">
                The output preview will appear here after you generate a build.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* GENERATED RESULTS */}
      {blueprint && (
        <div className="result-area">
          <h2>Build Results</h2>

          {/* TABS */}
          <div className="tabs">
            <button
              className={activeTab === "nextjs" ? "tab active" : "tab"}
              onClick={() => setActiveTab("nextjs")}
            >
              Next.js SaaS
            </button>

            <button
              className={activeTab === "micro" ? "tab active" : "tab"}
              onClick={() => setActiveTab("micro")}
            >
              Micro App
            </button>

            {blueprint.blueprint.formats.backend && (
              <button
                className={activeTab === "backend" ? "tab active" : "tab"}
                onClick={() => setActiveTab("backend")}
              >
                Backend
              </button>
            )}

            {blueprint.blueprint.formats.flutter && (
              <button
                className={activeTab === "flutter" ? "tab active" : "tab"}
                onClick={() => setActiveTab("flutter")}
              >
                Flutter
              </button>
            )}
          </div>

          <div className="tab-panel">
            <pre>{JSON.stringify(blueprint.blueprint, null, 2)}</pre>
          </div>

          {/* DOWNLOAD BUTTON */}
          <a href={blueprint.zipUrl} download className="download-all-btn">
            ⬇ Download Full ZIP
          </a>
        </div>
      )}
    </div>
  );
}
