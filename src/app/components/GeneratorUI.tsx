"use client";
import { useState } from "react";

export default function GeneratorUI() {
  const [idea, setIdea] = useState("");
  const [output, setOutput] = useState("Waiting for input...");

  async function generate() {
    setOutput("Generating...");
    const res = await fetch("/api/generate?idea=" + encodeURIComponent(idea));
    const data = await res.json();
    setOutput(JSON.stringify(data, null, 2));
  }

  return (
    <div className="p-10 w-full">
      <h2 className="text-3xl font-bold mb-6">AI App Generator</h2>
      <textarea
        className="w-full h-40 p-4 border rounded-lg shadow"
        placeholder="Describe your app idea..."
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
      />
      <button
        onClick={generate}
        className="mt-4 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg"
      >
        Generate App Structure
      </button>
      <pre className="mt-6 p-4 bg-black text-green-400 text-sm rounded-lg min-h-[200px]">
        {output}
      </pre>
    </div>
  );
}
