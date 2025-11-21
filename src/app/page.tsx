"use client";

import { useEffect, useState } from "react";
import { applyTheme, loadSavedTheme } from "@/lib/theming";
import { generateBlueprint } from "@/lib/ai-engine";

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [blueprint, setBlueprint] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Format selector state
  const [formats, setFormats] = useState({
    nextjs: true, // always enabled
    microapp: true, // always enabled
    backend: false,
    flutter: false,
  });

  useEffect(() => {
    loadSavedTheme();
  }, []);

  const handleThemeToggle = () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
  };

  async function handleBuild() {
    if (!prompt.trim()) return;

    setLoading(true);
    setBlueprint(null);

    try {
      const data = await generateBlueprint(prompt);

      setBlueprint({
        blueprint: data,
        formats,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to generate blueprint.");
    } finally {
      setLoading(false);
    }
  }

  function toggleFormat(key: string) {
    setFormats((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  return (
    <div className="builder-container">
      {/* Header */}
      <header className="builder-header">
        <h1 className="builder-title">NextForge Pro+ Generator</h1>
        <button onClick={handleThemeToggle} className="theme-toggle">
          Toggle Theme
        </button>
      </header>

      {/* Description */}
      <p className="builder-subtitle">
        Describe the app you want, and NextForge Pro+ will instantly generate
        the blueprint and formats.
      </p>

      {/* Input Box */}
      <textarea
        className="builder-input"
        placeholder="Describe the app..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      {/* Format Selector */}
      <div className="format-box">
        <h3>Choose Output Formats:</h3>

        <label className="format-item locked">
          <input type="checkbox" checked={true} disabled />
          Next.js SaaS App (Always Included)
        </label>

        <label className="format-item locked">
          <input type="checkbox" checked={true} disabled />
          HTML/JS Micro App (Always Included)
        </label>

        <label className="format-item">
          <input
            type="checkbox"
            checked={formats.backend}
            onChange={() => toggleFormat("backend")}
          />
          Node.js Backend (Optional)
        </label>

        <label className="format-item">
          <input
            type="checkbox"
            checked={formats.flutter}
            onChange={() => toggleFormat("flutter")}
          />
          Flutter Mobile App (Optional)
        </label>
      </div>

      {/* Build Button */}
      <button className="builder-btn" onClick={handleBuild} disabled={loading}>
        {loading ? "Building..." : "Build My App"}
      </button>

      {/* Output Section */}
      {blueprint && (
        <div className="output-box">
          <h2>Blueprint Ready</h2>

          <pre className="output-json">
            {JSON.stringify(blueprint, null, 2)}
          </pre>

          <a
            href="/api/download"
            className="download-btn"
            onClick={() =>
              localStorage.setItem("nf_build_data", JSON.stringify(blueprint))
            }
          >
            Download ZIP
          </a>
        </div>
      )}
    </div>
  );
}
