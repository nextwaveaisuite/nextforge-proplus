"use client";

export default function FormatToggle({ formats, setFormats }) {
  function toggle(k) {
    setFormats((prev) => ({ ...prev, [k]: !prev[k] }));
  }

  return (
    <div className="format-panel">
      <h3>Choose Output Formats</h3>

      <div className="format-item locked">
        <span>Next.js SaaS App</span>
        <span className="tag">Always On</span>
      </div>

      <div className="format-item locked">
        <span>HTML/JS Micro App</span>
        <span className="tag">Always On</span>
      </div>

      <div className="format-item" onClick={() => toggle("node")}>
        <span>Node.js Backend</span>
        <input type="checkbox" checked={formats.node} readOnly />
      </div>

      <div className="format-item" onClick={() => toggle("flutter")}>
        <span>Flutter Mobile App</span>
        <input type="checkbox" checked={formats.flutter} readOnly />
      </div>
    </div>
  );
}
