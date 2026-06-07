import type { DetailedHTMLProps, HTMLAttributes } from "react";

type ModelViewerElement = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  src?: string;
  alt?: string;
  poster?: string;
  "auto-rotate"?: boolean | string;
  "camera-controls"?: boolean | string;
  "camera-orbit"?: string;
  "field-of-view"?: string;
  "interaction-prompt"?: string;
  exposure?: string;
  "shadow-intensity"?: string;
  "environment-image"?: string;
  loading?: "auto" | "lazy" | "eager";
  reveal?: "auto" | "interaction" | "manual";
  ar?: boolean | string;
  "ar-modes"?: string;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerElement;
    }
  }
}

export {};
