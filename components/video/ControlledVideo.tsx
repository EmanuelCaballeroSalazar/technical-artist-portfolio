"use client";

import { useEffect, useRef, useState } from "react";

type ControlledVideoProps = {
  src: string;
  title: string;
  className?: string;
  videoClassName?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  preload?: "none" | "metadata" | "auto";
};

function formatVideoTime(value: number) {
  if (!Number.isFinite(value)) {
    return "0:00";
  }

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function ControlledVideo({
  src,
  title,
  className = "",
  videoClassName = "",
  autoPlay = true,
  muted = true,
  loop = true,
  preload = "metadata",
}: ControlledVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const syncPlaybackState = () => {
      setIsPlaying(!video.paused);
    };

    video.addEventListener("play", syncPlaybackState);
    video.addEventListener("pause", syncPlaybackState);

    return () => {
      video.removeEventListener("play", syncPlaybackState);
      video.removeEventListener("pause", syncPlaybackState);
    };
  }, []);

  const togglePlayback = async () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      await video.play();
      setIsPlaying(true);
      return;
    }

    video.pause();
    setIsPlaying(false);
  };

  const updateDuration = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    setDuration(video.duration || 0);
  };

  const updateCurrentTime = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    setCurrentTime(video.currentTime || 0);
  };

  const seekVideo = (value: string) => {
    const video = videoRef.current;
    const nextTime = Number(value);

    if (!video || Number.isNaN(nextTime)) {
      return;
    }

    video.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const openFullscreen = async () => {
    const container = containerRef.current;

    if (!container || !document.fullscreenEnabled) {
      return;
    }

    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await container.requestFullscreen();
  };

  return (
    <div ref={containerRef} className={`group relative overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        className={`${videoClassName} cursor-pointer`}
        src={src}
        title={title}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline
        preload={preload}
        onLoadedMetadata={updateDuration}
        onTimeUpdate={updateCurrentTime}
        onClick={togglePlayback}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-4 pb-4 pt-16 opacity-100 transition md:opacity-0 md:group-hover:opacity-100">
        <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-white/10 bg-black/65 px-3 py-2 backdrop-blur-xl">
          <button
            type="button"
            onClick={togglePlayback}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF4D5A] text-xs font-black text-black transition hover:bg-white"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? "Ⅱ" : "▶"}
          </button>

          <span className="hidden min-w-12 text-xs font-semibold text-zinc-300 sm:inline">
            {formatVideoTime(currentTime)}
          </span>

          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={Math.min(currentTime, duration || currentTime)}
            onChange={(event) => seekVideo(event.target.value)}
            aria-label="Video timeline"
            className="h-1 w-full cursor-pointer accent-[#FF4D5A]"
          />

          <span className="hidden min-w-12 text-right text-xs font-semibold text-zinc-500 sm:inline">
            {formatVideoTime(duration)}
          </span>

          <button
            type="button"
            onClick={openFullscreen}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-xs font-black text-zinc-300 transition hover:border-[#FF4D5A] hover:text-[#FF4D5A]"
            aria-label="Open video fullscreen"
          >
            ⛶
          </button>
        </div>
      </div>
    </div>
  );
}
