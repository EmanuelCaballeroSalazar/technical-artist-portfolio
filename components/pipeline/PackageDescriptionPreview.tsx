"use client";

import { useEffect, useState } from "react";

import { gameReadyPipeline } from "@/data/pipelines/game-ready-pipeline";

export function PackageDescriptionPreview() {
  const [jsonData, setJsonData] = useState<object | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadJson() {
      try {
        const response = await fetch(gameReadyPipeline.packageDescriptionPath);

        if (!response.ok) {
          throw new Error(`Could not load ${gameReadyPipeline.packageDescriptionPath}`);
        }

        const data = (await response.json()) as object;

        setJsonData(data);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "Unknown error");
      }
    }

    loadJson();
  }, []);

  const formattedJson = jsonData
    ? JSON.stringify(jsonData, null, 2)
    : errorMessage || "Loading package_description.json...";

  return (
    <div className="overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/80">
      <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#45C7C5]">
          Package Description
        </p>

        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
          {gameReadyPipeline.packageDescriptionPath}
        </p>
      </div>

      <pre className="max-h-[28rem] overflow-auto p-6 text-xs leading-relaxed text-zinc-300 md:text-sm">
        <code>{formattedJson}</code>
      </pre>
    </div>
  );
}
