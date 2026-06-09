"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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
  if (!Number.isFinite(value) || value < 0) {
    return "0:00";
  }

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function getSafeDuration(video: HTMLVideoElement) {
  if (!Number.isFinite(video.duration) || video.duration <= 0) {
    return 0;
  }

  return video.duration;
}

function getSafeCurrentTime(video: HTMLVideoElement) {
  if (!Number.isFinite(video.currentTime) || video.currentTime < 0) {
    return 0;
  }

  return video.currentTime;
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
  const animationFrameRef = useRef<number | null>(null);
  const isSeekingRef = useRef(false);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);

  const cancelTimelineSync = useCallback(() => {
    if (animationFrameRef.current === null) {
      return;
    }

    window.cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = null;
  }, []);

  const syncVideoState = useCallback(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    setDuration(getSafeDuration(video));

    if (!isSeekingRef.current) {
      setCurrentTime(getSafeCurrentTime(video));
    }
  }, []);

  const syncTimelineFrame = useCallback(() => {
    syncVideoState();

    const video = videoRef.current;

    if (!video || video.paused || video.ended) {
      animationFrameRef.current = null;
      return;
    }

    animationFrameRef.current = window.requestAnimationFrame(syncTimelineFrame);
  }, [syncVideoState]);

  const startTimelineSync = useCallback(() => {
    cancelTimelineSync();
    animationFrameRef.current = window.requestAnimationFrame(syncTimelineFrame);
  }, [cancelTimelineSync, syncTimelineFrame]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const handleLoadedMetadata = () => {
      syncVideoState();
    };

    const handleDurationChange = () => {
      setDuration(getSafeDuration(video));
    };

    const handlePlay = () => {
      setIsPlaying(true);
      startTimelineSync();
    };

    const handlePause = () => {
      setIsPlaying(false);
      syncVideoState();
      cancelTimelineSync();
    };

    const handleEnded = () => {
      setIsPlaying(false);
      syncVideoState();
      cancelTimelineSync();
    };

    const handleTimeUpdate = () => {
      syncVideoState();
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("durationchange", handleDurationChange);
    video.addEventListener("canplay", handleLoadedMetadata);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("timeupdate", handleTimeUpdate);

    syncVideoState();

    if (!video.paused) {
      startTimelineSync();
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("durationchange", handleDurationChange);
      video.removeEventListener("canplay", handleLoadedMetadata);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      cancelTimelineSync();
    };
  }, [cancelTimelineSync, startTimelineSync, syncVideoState]);

  const togglePlayback = async () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      try {
        await video.play();
      } catch {
        setIsPlaying(false);
      }

      return;
    }

    video.pause();
  };

  const seekVideo = (value: string) => {
    const video = videoRef.current;
    const nextTime = Number(value);

    if (!video || Number.isNaN(nextTime)) {
      return;
    }

    const safeDuration = getSafeDuration(video);
    const clampedTime = safeDuration > 0
      ? Math.min(Math.max(nextTime, 0), safeDuration)
      : Math.max(nextTime, 0);

    video.currentTime = clampedTime;
    setCurrentTime(clampedTime);
  };

  const handleTimelineInput = (value: string) => {
    isSeekingRef.current = true;
    seekVideo(value);
  };

  const handleTimelineCommit = (value: string) => {
    seekVideo(value);
    isSeekingRef.current = false;

    if (isPlaying) {
      startTimelineSync();
    }
  };

  const toggleMute = () => {
    setIsMuted((currentValue) => !currentValue);
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

  const rangeMax = duration > 0 ? duration : 0;
  const rangeValue = rangeMax > 0
    ? Math.min(currentTime, rangeMax)
    : 0;

  return (
    <div ref={containerRef} className={`group relative overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        className={`${videoClassName} cursor-pointer`}
        src={src}
        title={title}
        autoPlay={autoPlay}
        muted={isMuted}
        loop={loop}
        playsInline
        preload={preload}
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
            max={rangeMax}
            step="0.05"
            value={rangeValue}
            onPointerDown={() => {
              isSeekingRef.current = true;
            }}
            onPointerUp={(event) => {
              handleTimelineCommit(event.currentTarget.value);
            }}
            onTouchEnd={(event) => {
              handleTimelineCommit(event.currentTarget.value);
            }}
            onInput={(event) => {
              handleTimelineInput(event.currentTarget.value);
            }}
            onChange={(event) => {
              handleTimelineCommit(event.currentTarget.value);
            }}
            aria-label="Video timeline"
            className="h-1 w-full cursor-pointer accent-[#FF4D5A]"
          />

          <span className="hidden min-w-12 text-right text-xs font-semibold text-zinc-500 sm:inline">
            {formatVideoTime(duration)}
          </span>

          <button
            type="button"
            onClick={toggleMute}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-xs font-black text-zinc-300 transition hover:border-[#FF4D5A] hover:text-[#FF4D5A]"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? "🔇" : "🔊"}
          </button>

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
