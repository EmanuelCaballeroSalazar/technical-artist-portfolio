"use client";

import { useEffect, useState } from "react";

import { fallbackPackageDescription } from "@/data/pipelines/fallback-package-description";
import { gameReadyPipeline } from "@/data/pipelines/game-ready-pipeline";

async function fetchJsonWithFallback(path: string) {
  try {
    const url = new URL(path, window.location.origin);

    url.searchParams.set("v", "portfolio-pipeline-asset");

    const response = await fetch(url.toString(), {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Could not load ${path}`);
    }

    return (await response.json()) as object;
  } catch {
    return fallbackPackageDescription;
  }
}

export function PackageDescriptionPreview() {
  const [jsonData, setJsonData] = useState<object | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadJson() {
      const data = await fetchJsonWithFallback(
        gameReadyPipeline.packageDescriptionPath,
      );

      if (isMounted) {
        setJsonData(data);
      }
    }

    loadJson();

    return () => {
      isMounted = false;
    };
  }, []);

  const formattedJson = jsonData
    ? JSON.stringify(jsonData, null, 2)
    : "Loading package_description.json...";

  return (
    <div className="overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/80">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 px-6 py-4">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#45C7C5]">
          Package Description
        </p>

        <p className="break-all font-mono text-xs uppercase tracking-[0.12em] text-zinc-500">
          {gameReadyPipeline.packageDescriptionPath}
        </p>
      </div>

      <pre className="max-h-[28rem] overflow-auto p-6 text-xs leading-relaxed text-zinc-300 md:text-sm">
        <code>{formattedJson}</code>
      </pre>
    </div>
  );
}
