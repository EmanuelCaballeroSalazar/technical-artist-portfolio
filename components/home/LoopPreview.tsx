import { ControlledVideo } from "@/components/video/ControlledVideo";

type LoopPreviewProps = {
  src?: string;
  title: string;
  className?: string;
  withControls?: boolean;
};

export function LoopPreview({
  src,
  title,
  className = "",
  withControls = false,
}: LoopPreviewProps) {
  if (!src) {
    return (
      <div
        className={`flex min-h-[18rem] w-full items-center justify-center rounded-[1.5rem] border border-dashed border-zinc-800 bg-zinc-950 px-6 text-center text-sm text-zinc-600 md:min-h-[700px] md:rounded-[2rem] ${className}`}
      >
        Loop preview coming soon
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-[1.5rem] border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/40 md:rounded-[2rem] ${className}`}
    >
      {withControls ? (
        <ControlledVideo
          src={src}
          title={title}
          className="w-full"
          videoClassName="w-full bg-black object-cover"
        />
      ) : (
        <video
          className="w-full bg-black object-cover"
          src={src}
          title={title}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      )}
    </div>
  );
}
