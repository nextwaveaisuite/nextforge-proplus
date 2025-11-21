"use client";

import { useState } from "react";

// Correct component import paths
import GeneratorSection from "@/app/components/GeneratorSection";
import BuildOutput from "@/components/BuildOutput";
import { FormatToggle } from "@/components/FormatToggle";

// Correct AI engine import
import { generateBlueprint } from "@/lib/ai-engine";

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [blueprint, setBlueprint] = useState<any>(null);

  const [formats, setFormats] = useState({
    nextjs: true,
    microapp: true,
    backend: false,
    flutter: false,
  });

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setBlueprint(null);

    try {
      const data = await generateBlueprint(prompt, formats);

      setBlueprint({
        blueprint: data,
        formats,
      });
    } catch (err) {
      console.error(err);
      alert("Blueprint generation failed.");
    }

    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-start w-full p-6 max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mt-8 mb-2 text-white glow-text">
        NextForge Pro+ Generator
      </h1>

      <p className="text-gray-300 mb-6">
        Describe the app you want, and NextForge Pro+ will design and build the structure instantly.
      </p>

      <GeneratorSection
        prompt={prompt}
        setPrompt={setPrompt}
        onGenerate={handleGenerate}
        loading={loading}
      />

      <FormatToggle formats={formats} setFormats={setFormats} />

      <BuildOutput blueprint={blueprint} loading={loading} />
    </main>
  );
}
