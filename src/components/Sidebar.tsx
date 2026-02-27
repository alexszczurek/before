"use client";

import Image from "next/image";
import type { App } from "@/data/apps";
import { playClick } from "@/lib/sounds";

interface SidebarProps {
  apps: App[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function Sidebar({ apps, selectedId, onSelect }: SidebarProps) {
  return (
    <aside className="shrink-0 flex flex-col gap-4">
      <p className="text-base font-medium tracking-tight text-black">
        before
      </p>
      <p className="text-[10px] font-medium tracking-tight text-[#a1a1a1]">
        Applications
      </p>
      <nav className="flex flex-col">
        {apps.map((app) => {
          const isActive = app.id === selectedId;
          return (
            <button
              key={app.id}
              onClick={() => {
                playClick();
                onSelect(app.id);
              }}
              className="sidebar-item flex items-center gap-2 text-left min-h-11 -mx-1.5 px-1.5 rounded-lg"
            >
              <div className="relative squircle-sm shrink-0 size-6 overflow-hidden">
                <Image
                  src={app.icon}
                  alt={app.name}
                  fill
                  className="object-cover"
                  sizes="24px"
                  unoptimized
                />
              </div>
              <p
                className={`text-base font-medium tracking-tight whitespace-nowrap transition-colors duration-150 ease ${
                  isActive ? "text-black" : "text-[#a1a1a1]"
                }`}
              >
                {app.id === "family" ? "family" : app.name}
              </p>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
