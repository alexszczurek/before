"use client";

import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import type { App } from "@/data/apps";
import { playClick } from "@/lib/sounds";

interface MobileAppSwitcherProps {
  apps: App[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function MobileAppSwitcher({
  apps,
  selectedId,
  onSelect,
}: MobileAppSwitcherProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);
  const hasDragged = useRef(false);
  const hasUserScrolled = useRef(false);

  /* Center selected icon on mount and selection change */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const activeBtn = el.querySelector<HTMLElement>(
      `[data-app-id="${selectedId}"]`
    );
    if (!activeBtn) return;
    activeBtn.scrollIntoView({
      inline: "nearest",
      behavior: hasUserScrolled.current ? "smooth" : "instant",
      block: "nearest",
    });
  }, [selectedId]);

  /* ---- drag-to-scroll (touch + mouse) ---- */

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.clientX;
    startScroll.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const el = scrollRef.current;
    if (!el) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 3) hasDragged.current = true;
    el.scrollLeft = startScroll.current - dx;
  }, []);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleClick = useCallback(
    (appId: string) => {
      if (hasDragged.current) return;
      hasUserScrolled.current = true;
      playClick();
      onSelect(appId);
    },
    [onSelect]
  );

  return (
    <div className="fixed bottom-4 left-4 z-50 md:hidden pb-[env(safe-area-inset-bottom)]">
      <div className="bg-white rounded-2xl pt-2 pb-1 px-2 shadow-[0_2px_12px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.04)] max-w-[calc(100vw-32px)] overflow-hidden">
        <div
          ref={scrollRef}
          className="mobile-switcher-scroll flex items-end gap-3 overflow-x-auto touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {apps.map((app) => {
            const isActive = app.id === selectedId;
            return (
              <button
                key={app.id}
                data-app-id={app.id}
                onClick={() => handleClick(app.id)}
                className="shrink-0 flex flex-col items-center gap-1.5"
              >
                <div
                  className="relative overflow-hidden shrink-0 squircle transition-all duration-200 ease-out"
                  style={{
                    width: isActive ? 48 : 45.6,
                    height: isActive ? 48 : 45.6,
                    opacity: isActive ? 1 : 0.64,
                  }}
                >
                  <Image
                    src={app.icon}
                    alt={app.name}
                    fill
                    className="object-cover pointer-events-none"
                    sizes="48px"
                    unoptimized
                  />
                </div>
                {/* Active indicator dot */}
                <div
                  className="size-1 rounded-full transition-colors duration-200"
                  style={{
                    backgroundColor: isActive ? "#000" : "transparent",
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
