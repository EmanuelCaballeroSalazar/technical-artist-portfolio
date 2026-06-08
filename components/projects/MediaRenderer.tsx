import Image from "next/image";

type MediaRendererProps = {
  youtube?: string;
  video?: string;
  image?: string;
  gif?: string;
  glb?: string;
  title: string;
};

function getYoutubeEmbedUrl(url: string) {
  const videoId = url.includes("youtu.be")
    ? url.split("/").pop()?.split("?")[0]
    : url.split("v=")[1]?.split("&")[0];

  return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
}

export function MediaRenderer({
  youtube,
  video,
  image,
  gif,
  glb,
  title,
}: MediaRendererProps) {
  if (youtube) {
    const embedUrl = getYoutubeEmbedUrl(youtube);

    return (
      <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-800 bg-black">
        <iframe
          className="aspect-video w-full"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (video) {
    return (
      <video
        className="mt-6 aspect-video w-full rounded-2xl border border-zinc-800 object-cover"
        src={video}
        title={title}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    );
  }

  if (gif || image) {
    return (
      <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-2xl border border-zinc-800 bg-black">
        <Image
          src={gif || image || ""}
          alt={title}
          fill
          unoptimized={Boolean(gif)}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  if (glb) {
    return (
      <div className="mt-6 rounded-2xl border border-dashed border-zinc-800 p-6 text-sm text-zinc-600">
        Asset review placeholder: {glb}
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-2xl border border-dashed border-zinc-800 p-6 text-sm text-zinc-600">
      Media coming soon: optimized MP4 loop, YouTube embed, image, GIF or GLB.
    </div>
  );
}
