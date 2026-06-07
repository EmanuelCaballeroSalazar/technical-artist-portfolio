"use client";

import { useEffect, useState } from "react";

import { fallbackPackageDescription } from "@/data/pipelines/fallback-package-description";
import {
  gameReadyPipeline,
  type PipelineTreeNode,
} from "@/data/pipelines/game-ready-pipeline";

type PackageTexture = {
  Filename?: string;
};

type PackageParameter = {
  Textures?: readonly PackageTexture[];
};

type PackageMaterial = {
  PbrParameters?: Record<string, PackageParameter | null>;
  MiscParameters?: Record<string, PackageParameter | null>;
};

type PackageModel = {
  Filename?: string;
  Materials?: readonly PackageMaterial[];
};

type PackageDescription = {
  Models?: readonly PackageModel[];
};

function getNodeIcon(node: PipelineTreeNode) {
  if (node.children?.length) {
    return "📁";
  }

  const lowerName = node.name.toLowerCase();

  if (lowerName.endsWith(".glb")) {
    return "🧊";
  }

  if (
    lowerName.endsWith(".png") ||
    lowerName.endsWith(".jpg") ||
    lowerName.endsWith(".jpeg") ||
    lowerName.endsWith(".webp")
  ) {
    return "🖼️";
  }

  if (
    lowerName.endsWith(".ma") ||
    lowerName.endsWith(".mb") ||
    lowerName.endsWith(".fbx") ||
    lowerName.endsWith(".usd")
  ) {
    return "📦";
  }

  if (lowerName.endsWith(".json")) {
    return "📄";
  }

  return "•";
}

function getFilenameFromPath(path: string) {
  return path.split("/").pop()?.split("\\").pop() ?? path;
}

function removeExtension(filename: string) {
  const extensionIndex = filename.lastIndexOf(".");

  return extensionIndex >= 0 ? filename.slice(0, extensionIndex) : filename;
}

function getModelFilename(packageDescription: PackageDescription | null) {
  return packageDescription?.Models?.[0]?.Filename ?? "";
}

function getAssetBaseName(packageDescription: PackageDescription | null) {
  const modelFilename = getModelFilename(packageDescription);

  if (!modelFilename) {
    return "Waiting for package_description";
  }

  return removeExtension(getFilenameFromPath(modelFilename));
}

function collectTextureFilenames(packageDescription: PackageDescription | null) {
  const textures = new Set<string>();

  packageDescription?.Models?.forEach((model) => {
    model.Materials?.forEach((material) => {
      const parameterGroups = [
        material.PbrParameters ?? {},
        material.MiscParameters ?? {},
      ];

      parameterGroups.forEach((parameters) => {
        Object.values(parameters).forEach((parameter) => {
          parameter?.Textures?.forEach((texture) => {
            if (texture.Filename) {
              textures.add(getFilenameFromPath(texture.Filename));
            }
          });
        });
      });
    });
  });

  return Array.from(textures);
}

function buildDynamicFolderTree(
  packageDescription: PackageDescription | null,
): PipelineTreeNode[] {
  const assetBaseName = getAssetBaseName(packageDescription);
  const modelFilename = getFilenameFromPath(getModelFilename(packageDescription));
  const glbFilename = `${assetBaseName}.glb`;
  const textureFilenames = collectTextureFilenames(packageDescription);

  return [
    {
      name: assetBaseName,
      defaultOpen: true,
      children: [
        {
          name: "GameReadyFiles",
          defaultOpen: true,
          children: [
            {
              name: `textures (${textureFilenames.length})`,
              defaultOpen: false,
              children: textureFilenames.map((texture) => ({ name: texture })),
            },
            {
              name: "meshes (2)",
              defaultOpen: false,
              children: [
                ...(modelFilename ? [{ name: modelFilename }] : []),
                { name: glbFilename },
              ],
            },
          ],
        },
        {
          name: "Metadata",
          defaultOpen: false,
          children: [{ name: "package_description.json" }],
        },
        {
          name: "Preview",
          defaultOpen: false,
          children: [{ name: glbFilename }],
        },
      ],
    },
  ];
}

function TreeItem({
  node,
  depth = 0,
}: {
  node: PipelineTreeNode;
  depth?: number;
}) {
  const hasChildren = Boolean(node.children?.length);
  const icon = getNodeIcon(node);

  if (!hasChildren) {
    return (
      <div
        className="flex items-center gap-3 py-1.5 text-sm text-zinc-300"
        style={{ paddingLeft: `${depth * 1.25}rem` }}
      >
        <span>{icon}</span>
        <span>{node.name}</span>
      </div>
    );
  }

  return (
    <details open={node.defaultOpen} className="group">
      <summary
        className="flex cursor-pointer list-none items-center gap-3 py-1.5 text-sm font-semibold text-white transition hover:text-[#45C7C5]"
        style={{ paddingLeft: `${depth * 1.25}rem` }}
      >
        <span className="text-xs text-[#45C7C5] transition group-open:rotate-90">
          ▶
        </span>
        <span>{icon}</span>
        <span>{node.name}</span>
      </summary>

      <div className="border-l border-zinc-800/80">
        {node.children?.map((child) => (
          <TreeItem
            key={`${node.name}-${child.name}`}
            node={child}
            depth={depth + 1}
          />
        ))}
      </div>
    </details>
  );
}

export function FolderTreePreview() {
  const [folderTree, setFolderTree] = useState<PipelineTreeNode[]>([
    {
      name: "Loading package_description",
      defaultOpen: true,
      children: [{ name: "package_description.json" }],
    },
  ]);

  useEffect(() => {
    let isMounted = true;

    async function loadPackageDescription() {
      try {
        const url = new URL(
          gameReadyPipeline.packageDescriptionPath,
          window.location.origin,
        );

        url.searchParams.set("v", "portfolio-pipeline-asset");

        const response = await fetch(url.toString(), {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            `Unable to load ${gameReadyPipeline.packageDescriptionPath}`,
          );
        }

        const data = (await response.json()) as PackageDescription;

        if (isMounted) {
          setFolderTree(buildDynamicFolderTree(data));
        }
      } catch {
        if (isMounted) {
          setFolderTree(
            buildDynamicFolderTree(fallbackPackageDescription as unknown as PackageDescription),
          );
        }
      }
    }

    loadPackageDescription();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="rounded-[2rem] border border-zinc-800 bg-zinc-950/80 p-8">
      <div className="mb-6 flex items-center justify-between border-b border-zinc-800 pb-4">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#45C7C5]">
          Dynamic Folders
        </p>

        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
          Auto from package
        </p>
      </div>

      <div className="font-mono">
        {folderTree.map((folder) => (
          <TreeItem key={folder.name} node={folder} />
        ))}
      </div>
    </div>
  );
}
