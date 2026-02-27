"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { App } from "@/data/apps";
import ScreenshotGallery from "./ScreenshotGallery";

interface AppDetailProps {
  app: App;
}

export default function AppDetail({ app }: AppDetailProps) {
  const [expanded, setExpanded] = useState(false);
  const MAX_CHARS = 120;
  const isTruncatable = app.description.length > MAX_CHARS;

  useEffect(() => {
    setExpanded(false);
  }, [app.id]);

  const displayText = !expanded && isTruncatable
    ? app.description.slice(0, MAX_CHARS).trimEnd() + " "
    : app.description + " ";

  return (
      <div key={app.id} className="content-enter flex-1 flex flex-col gap-5 md:gap-8 min-w-0">
        <div className="flex flex-col gap-3.5 max-w-lg">
          <div className="flex items-center gap-4">
            <div className="relative squircle shrink-0 size-16 overflow-hidden">
              <Image
                src={app.icon}
                alt={app.name}
                fill
                className="object-cover"
                sizes="64px"
                unoptimized
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-2xl font-medium tracking-tight text-black">
                {app.name}
              </p>
              <p className="text-sm font-medium tracking-tight text-[#a1a1a1]">
                {app.category}
              </p>
            </div>
          </div>
          <p className="text-sm font-medium tracking-[-0.16px] text-[#a1a1a1]">
            {displayText}
            {isTruncatable && (
              <button
                onClick={() => setExpanded((v) => !v)}
                className="text-sm font-medium tracking-[-0.16px] inline"
                style={{ color: app.accentColor }}
              >
                {expanded ? "read less" : "read more..."}
              </button>
            )}
          </p>
        </div>

        <ScreenshotGallery
          screenshots={app.screenshots}
          appName={app.name}
        />
      </div>
  );
}
