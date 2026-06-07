export type PipelineTreeNode = {
  name: string;
  defaultOpen?: boolean;
  children?: PipelineTreeNode[];
};

export const gameReadyPipeline = {
  title: "Game Ready Asset Pipeline",
  packageDescriptionPath: "/package-descriptions/package_description.json",
  glbFolderPath: "/glb",
  viewerAsset: {
    name: "Auto from package_description.json",
    path: "",
    fallbackLabel:
      "Place the GLB in public/glb using the same base name as the model in package_description.json.",
  },
  folderTree: [],
};

export const packageDescription = {
  packageDescriptionPath: gameReadyPipeline.packageDescriptionPath,
  glbFolderPath: gameReadyPipeline.glbFolderPath,
};
