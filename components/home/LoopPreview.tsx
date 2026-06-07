type LoopPreviewProps = {
  src?: string;
  title: string;
  className?: string;
};

export function LoopPreview({
  src,
  title,
  className = "",
}: LoopPreviewProps) {
  if (!src) {
    return (
      <div
        className={`flex min-h-[700px] w-full items-center justify-center rounded-[2rem] border border-dashed border-zinc-800 bg-zinc-950 text-sm text-zinc-600 ${className}`}
      >
        Loop preview coming soon
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/40 ${className}`}
    >
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
    </div>
  );
}
