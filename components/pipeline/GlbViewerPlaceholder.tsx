"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import { fallbackPackageDescription } from "@/data/pipelines/fallback-package-description";
import { gameReadyPipeline } from "@/data/pipelines/game-ready-pipeline";

type ViewerMode =
  | "asset"
  | "textures"
  | "pbr"
  | "statistics"
  | "animation";

type TextureInfo = {
  slot: string;
  filename: string;
  channels: string;
};

type PackageTexture = {
  Filename?: string;
  Channels?: string[];
  Inverted?: boolean;
};

type PackageParameter = {
  Textures?: PackageTexture[];
  Values?: unknown[];
};

type PackageMaterial = {
  Name?: string;
  PbrParameters?: Record<string, PackageParameter | null>;
  MiscParameters?: Record<string, PackageParameter | null>;
};

type PackageLod = {
  Index?: number;
  Shapes?: string[];
  VtxCount?: number;
  TriCount?: number;
};

type PackageNode = {
  Path?: string;
  IsMesh?: boolean;
  Visible?: boolean;
};

type PackageModel = {
  Filename?: string;
  Nodes?: PackageNode[];
  Materials?: PackageMaterial[];
  Lods?: PackageLod[];
};

type PackageDescription = {
  Models?: PackageModel[];
};

type ModelViewerElement = HTMLElement & {
  play?: () => void;
  pause?: () => void;
};

type ModelViewerProps =
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    src: string;
    alt: string;
    "camera-controls"?: boolean;
    "auto-rotate"?: boolean;
    autoplay?: boolean;
    "animation-name"?: string;
    "shadow-intensity"?: string;
    exposure?: string;
    loading?: "auto" | "lazy" | "eager";
    reveal?: "auto" | "interaction" | "manual";
    "camera-orbit"?: string;
    "field-of-view"?: string;
    "interaction-prompt"?: "auto" | "none" | "when-focused";
  };

const ModelViewer = React.forwardRef<ModelViewerElement, ModelViewerProps>(
  function ModelViewerComponent(props, ref) {
    return React.createElement("model-viewer", {
      ...props,
      ref,
    });
  },
);

const viewerModes: {
  id: ViewerMode;
  label: string;
  title: string;
  description: string;
  cameraOrbit: string;
  fieldOfView: string;
}[] = [
  {
    id: "asset",
    label: "Asset",
    title: "Final GLB Review",
    description:
      "Final model loaded automatically from the package description model name.",
    cameraOrbit: "0deg 75deg 105%",
    fieldOfView: "30deg",
  },
  {
    id: "textures",
    label: "Textures",
    title: "Texture Inputs",
    description:
      "Texture files and channel usage parsed directly from package_description.json.",
    cameraOrbit: "-25deg 72deg 92%",
    fieldOfView: "26deg",
  },
  {
    id: "pbr",
    label: "PBR",
    title: "Material Channels",
    description:
      "PBR channel mapping for base color, normal, metallic, roughness and ambient occlusion.",
    cameraOrbit: "30deg 72deg 88%",
    fieldOfView: "24deg",
  },
  {
    id: "statistics",
    label: "Stats",
    title: "Pipeline Statistics",
    description:
      "Lightweight package statistics for the selected pipeline asset.",
    cameraOrbit: "0deg 70deg 105%",
    fieldOfView: "30deg",
  },
  {
    id: "animation",
    label: "Animation",
    title: "Animation Playback",
    description:
      "Toggle embedded animation playback inside the web portfolio viewer.",
    cameraOrbit: "0deg 75deg 105%",
    fieldOfView: "30deg",
  },
];

function getModel(packageDescription: PackageDescription | null) {
  return packageDescription?.Models?.[0];
}

function getMaterial(packageDescription: PackageDescription | null) {
  return getModel(packageDescription)?.Materials?.[0];
}

function getPrimaryModelName(packageDescription: PackageDescription | null) {
  return getModel(packageDescription)?.Filename ?? "Waiting for package_description.json";
}

function getMaterialName(packageDescription: PackageDescription | null) {
  return getMaterial(packageDescription)?.Name ?? "Material";
}

function getBaseNameFromModelFilename(modelFilename: string) {
  const filename = modelFilename.split("/").pop()?.split("\\").pop() ?? "";
  const extensionIndex = filename.lastIndexOf(".");

  return extensionIndex >= 0 ? filename.slice(0, extensionIndex) : filename;
}

function getGlbPathFromPackageDescription(packageDescription: PackageDescription | null) {
  const modelFilename = getModel(packageDescription)?.Filename;

  if (!modelFilename) {
    return "";
  }

  const baseName = getBaseNameFromModelFilename(modelFilename);

  return `${gameReadyPipeline.glbFolderPath}/${baseName}.glb`;
}

function collectTextures(packageDescription: PackageDescription | null) {
  const textureMap = new Map<string, TextureInfo>();

  packageDescription?.Models?.forEach((model) => {
    model.Materials?.forEach((material) => {
      const parameterGroups = [
        material.PbrParameters ?? {},
        material.MiscParameters ?? {},
      ];

      parameterGroups.forEach((parameters) => {
        Object.entries(parameters).forEach(([slot, parameter]) => {
          parameter?.Textures?.forEach((texture) => {
            if (!texture.Filename) {
              return;
            }

            const channels = texture.Channels?.join("") || "-";
            const key = `${slot}-${texture.Filename}-${channels}`;

            textureMap.set(key, {
              slot,
              filename: texture.Filename,
              channels,
            });
          });
        });
      });
    });
  });

  return Array.from(textureMap.values());
}

function getStatistics(packageDescription: PackageDescription | null) {
  const models = packageDescription?.Models ?? [];
  const nodes = models.flatMap((model) => model.Nodes ?? []);
  const materials = models.flatMap((model) => model.Materials ?? []);
  const lods = models.flatMap((model) => model.Lods ?? []);
  const meshes = nodes.filter((node) => node.IsMesh).length;
  const triangles = lods.reduce((total, lod) => total + (lod.TriCount ?? 0), 0);
  const vertices = lods.reduce((total, lod) => total + (lod.VtxCount ?? 0), 0);

  return {
    models: models.length,
    meshes,
    materials: materials.length,
    lods: lods.length,
    vertices,
    triangles,
  };
}

function groupTexturesByFile(textures: TextureInfo[]) {
  const textureMap = new Map<string, TextureInfo[]>();

  textures.forEach((texture) => {
    const items = textureMap.get(texture.filename) ?? [];
    textureMap.set(texture.filename, [...items, texture]);
  });

  return Array.from(textureMap.entries());
}

function TexturePanel({ textures }: { textures: TextureInfo[] }) {
  const groupedTextures = groupTexturesByFile(textures);

  return (
    <div className="border-t border-zinc-800 bg-zinc-950/80 p-5">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#45C7C5]">
            Texture Inputs
          </p>

          <p className="mt-2 text-sm text-zinc-500">
            Parsed from package_description.json.
          </p>
        </div>

        <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
          {textures.length} channel links
        </p>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        {groupedTextures.map(([filename, textureSlots]) => (
          <article
            key={filename}
            className="rounded-2xl border border-zinc-800 bg-black/50 p-4"
          >
            <p className="break-all font-mono text-sm text-zinc-100">
              {filename}
            </p>

            <div className="mt-4 space-y-2">
              {textureSlots.map((texture) => (
                <div
                  key={`${texture.slot}-${texture.channels}`}
                  className="flex items-center justify-between gap-3 rounded-xl bg-zinc-950 px-3 py-2"
                >
                  <span className="text-xs text-zinc-400">{texture.slot}</span>
                  <span className="font-mono text-xs text-[#45C7C5]">
                    {texture.channels}
                  </span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function PbrPanel({ textures }: { textures: TextureInfo[] }) {
  const pbrSlots = [
    "BaseColor",
    "GeometryNormal",
    "AmbientOcclusion",
    "SpecularRoughness",
    "BaseMetalness",
  ];

  return (
    <div className="border-t border-zinc-800 bg-zinc-950/80 p-5">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#45C7C5]">
        PBR Channel Mapping
      </p>

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {pbrSlots.map((slot) => {
          const texture = textures.find((item) => item.slot === slot);

          return (
            <article
              key={slot}
              className="rounded-2xl border border-zinc-800 bg-black/50 p-4"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
                {slot}
              </p>

              <p className="mt-3 break-all font-mono text-xs text-zinc-200">
                {texture?.filename ?? "Not assigned"}
              </p>

              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[#45C7C5]">
                Channels: {texture?.channels ?? "-"}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function StatisticsPanel({
  packageDescription,
}: {
  packageDescription: PackageDescription | null;
}) {
  const stats = getStatistics(packageDescription);

  const items = [
    ["Models", stats.models],
    ["Meshes", stats.meshes],
    ["Materials", stats.materials],
    ["LODs", stats.lods],
    ["Vertices", stats.vertices],
    ["Triangles", stats.triangles],
  ];

  return (
    <div className="border-t border-zinc-800 bg-zinc-950/80 p-5">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#45C7C5]">
        Pipeline Statistics
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {items.map(([label, value]) => (
          <article
            key={label}
            className="rounded-2xl border border-zinc-800 bg-black/50 p-4"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
              {label}
            </p>

            <p className="mt-3 text-2xl font-black text-white">{value}</p>
          </article>
        ))}
      </div>
    </div>
  );
}


async function fetchPackageDescription(path: string) {
  try {
    const url = new URL(path, window.location.origin);

    url.searchParams.set("v", "portfolio-pipeline-asset");

    const response = await fetch(url.toString(), {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Unable to load ${path}`);
    }

    return (await response.json()) as PackageDescription;
  } catch {
    return fallbackPackageDescription as PackageDescription;
  }
}

export function GlbViewerPlaceholder() {
  const { packageDescriptionPath } = gameReadyPipeline;

  useEffect(() => {
    import("@google/model-viewer");
  }, []);

  const modelViewerRef = useRef<ModelViewerElement | null>(null);
  const [activeMode, setActiveMode] = useState<ViewerMode>("asset");
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(true);
  const [packageDescription, setPackageDescription] =
    useState<PackageDescription | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadPackageDescription() {
      const data = await fetchPackageDescription(packageDescriptionPath);

      if (isMounted) {
        setPackageDescription(data);
        setErrorMessage("");
      }
    }

    loadPackageDescription();

    return () => {
      isMounted = false;
    };
  }, [packageDescriptionPath]);

  const textureList = useMemo(
    () => collectTextures(packageDescription),
    [packageDescription],
  );

  const glbPath = getGlbPathFromPackageDescription(packageDescription);
  const glbName = glbPath.split("/").pop() || "Waiting for GLB";
  const currentMode =
    viewerModes.find((mode) => mode.id === activeMode) ?? viewerModes[0];

  function handleModeClick(mode: ViewerMode) {
    setActiveMode(mode);

    if (mode !== "animation") {
      return;
    }

    if (isAnimationPlaying) {
      modelViewerRef.current?.pause?.();
      setIsAnimationPlaying(false);
      return;
    }

    modelViewerRef.current?.play?.();
    setIsAnimationPlaying(true);
  }

  return (
    <div className="rounded-[2rem] border border-zinc-800 bg-zinc-950/80 p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#45C7C5]">
            GLB Pipeline Inspector
          </p>

          <h3 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white md:text-5xl">
            Interactive Asset Review
          </h3>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
            Asset source:{" "}
            <span className="font-mono text-zinc-200">
              {glbPath || "Waiting for package_description.json"}
            </span>
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {viewerModes.map((mode) => {
            const isActive = activeMode === mode.id;
            const label =
              mode.id === "animation" && !isAnimationPlaying
                ? "Play"
                : mode.label;

            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => handleModeClick(mode.id)}
                className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition ${
                  isActive
                    ? "border-[#45C7C5] bg-[#45C7C5] text-black"
                    : "border-zinc-700 text-zinc-300 hover:border-[#45C7C5] hover:text-[#45C7C5]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="overflow-hidden rounded-[1.5rem] border border-zinc-800 bg-black">
        <div className="relative">
          {glbPath ? (
            <ModelViewer
              ref={modelViewerRef}
              src={glbPath}
              alt={glbName}
              camera-controls
              auto-rotate={activeMode !== "animation"}
              autoplay
              animation-name="*"
              shadow-intensity="1"
              exposure="1"
              loading="eager"
              reveal="auto"
              interaction-prompt="none"
              camera-orbit={currentMode.cameraOrbit}
              field-of-view={currentMode.fieldOfView}
              className="h-[26rem] w-full md:h-[34rem]"
            />
          ) : (
            <div className="flex h-[26rem] items-center md:h-[34rem]" justify-center p-8 text-center text-zinc-500">
              {errorMessage || "Loading package_description.json..."}
            </div>
          )}

          <div className="pointer-events-none absolute bottom-5 left-5 max-w-md rounded-2xl border border-white/10 bg-black/70 p-4 backdrop-blur-xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#45C7C5]">
              {currentMode.title}
            </p>

            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              {currentMode.description}
            </p>

            <div className="mt-4 grid gap-2 text-xs text-zinc-500">
              <p>
                Model:{" "}
                <span className="font-mono text-zinc-300">
                  {getPrimaryModelName(packageDescription)}
                </span>
              </p>

              <p>
                Material:{" "}
                <span className="font-mono text-zinc-300">
                  {getMaterialName(packageDescription)}
                </span>
              </p>
            </div>
          </div>
        </div>

        {activeMode === "textures" && <TexturePanel textures={textureList} />}

        {activeMode === "pbr" && <PbrPanel textures={textureList} />}

        {activeMode === "statistics" && (
          <StatisticsPanel packageDescription={packageDescription} />
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-800 px-5 py-4">
          <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
            {glbName}
          </p>

          {glbPath && (
            <a
              href={glbPath}
              className="rounded-full border border-zinc-700 px-5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-zinc-300 transition hover:border-[#45C7C5] hover:text-[#45C7C5]"
            >
              Open GLB File
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
