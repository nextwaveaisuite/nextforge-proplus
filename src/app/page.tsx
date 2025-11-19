"use client";

import GeneratorSection from "@/components/GeneratorSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#030018] to-black text-white flex flex-col items-center px-6 py-16">
      <div className="max-w-3xl w-full">
        <h1 className="text-center text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
          NextForge Pro+ Generator
        </h1>

        <p className="text-center text-lg text-gray-300 mb-10">
          Describe the app you want, and NextForge Pro+ will design and build
          the structure instantly.
        </p>

        <GeneratorSection />
      </div>
    </main>
  );
}
