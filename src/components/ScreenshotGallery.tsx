"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { playPop } from "@/lib/sounds";

interface ScreenshotGalleryProps {
  screenshots: string[];
  appName: string;
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, transform: "translateY(10px)" },
  show: {
    opacity: 1,
    transform: "translateY(0px)",
    transition: {
      duration: 0.25,
      ease: [0.165, 0.84, 0.44, 1] as const,
    },
  },
};

function isVideoSrc(src: string) {
  return /\.(mp4|mov|webm)$/i.test(src);
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function imageToPngBlob(img: HTMLImageElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext("2d")!.drawImage(img, 0, 0);
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Failed to create blob"));
    }, "image/png");
  });
}

export default function ScreenshotGallery({
  screenshots,
  appName,
}: ScreenshotGalleryProps) {
  const shouldReduceMotion = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);
  const hasDragged = useRef(false);

  const [copyAllState, setCopyAllState] = useState<
    "idle" | "loading" | "done"
  >("idle");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const imageScreenshots = screenshots.filter((s) => !isVideoSrc(s));

  const copyAllToClipboard = useCallback(async () => {
    if (imageScreenshots.length === 0) return;
    setCopyAllState("loading");
    try {
      const images = await Promise.all(imageScreenshots.map(loadImage));
      const gap = 40;
      const totalWidth =
        images.reduce((sum, img) => sum + img.naturalWidth, 0) +
        gap * (images.length - 1);
      const maxHeight = Math.max(...images.map((img) => img.naturalHeight));

      const canvas = document.createElement("canvas");
      canvas.width = totalWidth;
      canvas.height = maxHeight;
      const ctx = canvas.getContext("2d")!;

      let x = 0;
      for (const img of images) {
        ctx.drawImage(img, x, (maxHeight - img.naturalHeight) / 2);
        x += img.naturalWidth + gap;
      }

      const blob = await new Promise<Blob>((resolve, reject) =>
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error("toBlob failed"))),
          "image/png"
        )
      );

      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);

      playPop();
      setCopyAllState("done");
      setTimeout(() => setCopyAllState("idle"), 2000);
    } catch {
      setCopyAllState("idle");
    }
  }, [imageScreenshots]);

  const copySingleToClipboard = useCallback(
    async (src: string, index: number) => {
      if (hasDragged.current) return;
      try {
        const img = await loadImage(src);
        const blob = await imageToPngBlob(img);
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        playPop();
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 1500);
      } catch {
        // silently fail
      }
    },
    []
  );

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.clientX;
    startScroll.current = el.scrollLeft;
    el.style.cursor = "grabbing";
    el.style.userSelect = "none";
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const el = scrollRef.current;
    if (!el) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 3) hasDragged.current = true;
    el.scrollLeft = startScroll.current - dx;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    const el = scrollRef.current;
    if (!el) return;
    el.style.cursor = "";
    el.style.userSelect = "";
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  return (
    <div className="flex flex-col gap-3 -mx-6 md:mx-0 md:flex-1 md:min-h-0">
      {imageScreenshots.length > 0 && (
        <div className="hidden md:flex justify-end pr-24">
          <button
            onClick={copyAllToClipboard}
            disabled={copyAllState === "loading"}
            className="flex items-center gap-1.5 text-xs font-medium tracking-tight text-[#a1a1a1] transition-colors duration-150 ease hover:text-black disabled:opacity-50"
          >
            {copyAllState === "idle" && (
              <>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy all
              </>
            )}
            {copyAllState === "loading" && "Copying..."}
            {copyAllState === "done" && (
              <>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copied!
              </>
            )}
          </button>
        </div>
      )}
      <motion.div
        ref={scrollRef}
        className="gallery-scroll flex gap-5 overflow-x-auto pb-4 cursor-grab pl-6 md:pl-0 md:flex-1 md:min-h-0 md:items-stretch"
        variants={container}
        initial={shouldReduceMotion ? "show" : "hidden"}
        animate="show"
        key={appName}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClickCapture={handleClick}
      >
        {screenshots.map((src, index) => {
          const isVideo = isVideoSrc(src);
          return (
            <motion.div
              key={`${appName}-${index}`}
              variants={shouldReduceMotion ? undefined : item}
              className="shrink-0 will-change-transform md:h-full"
              onClick={() => {
                if (!isVideo) copySingleToClipboard(src, index);
              }}
            >
              <div className="relative w-[274px] aspect-[274/594] md:w-auto md:h-full md:aspect-[274/594] rounded-[28px] overflow-hidden border border-[#e5e5e5]">
                {isVideo ? (
                  <video
                    src={src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />
                ) : (
                  <Image
                    src={src}
                    alt={`${appName} screenshot ${index + 1}`}
                    fill
                    className="object-cover pointer-events-none"
                    sizes="274px"
                    unoptimized
                  />
                )}
                {copiedIndex === index && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
