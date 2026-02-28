"use client";

import { useState, useEffect } from "react";
import { apps as initialApps } from "@/data/apps";
import type { App } from "@/data/apps";
import Sidebar from "@/components/Sidebar";
import AppDetail from "@/components/AppDetail";
import MobileAppSwitcher from "@/components/MobileAppSwitcher";

interface AppStoreMeta {
  trackId: number;
  trackName: string;
  description: string;
  category: string;
}

export default function Home() {
  const [apps, setApps] = useState<App[]>(initialApps);
  const [selectedId, setSelectedId] = useState(initialApps[0].id);

  const selectedApp = apps.find((a) => a.id === selectedId) ?? apps[0];

  useEffect(() => {
    const ids = initialApps.map((a) => a.appStoreId).join(",");
    fetch(`/api/appstore?ids=${ids}`)
      .then((r) => r.json())
      .then((meta: AppStoreMeta[]) => {
        setApps((prev) =>
          prev.map((app) => {
            const m = meta.find((x) => x.trackId === app.appStoreId);
            if (!m) return app;
            return {
              ...app,
              category: m.category,
              description: m.description,
            };
          })
        );
      })
      .catch(() => {});
  }, []);

  return (
    <>
      {/* Desktop layout */}
      <div className="hidden md:flex h-screen bg-[#fafafa] pl-24 gap-24 overflow-hidden">
        <div className="shrink-0 py-16 overflow-y-auto sidebar-scroll">
          <Sidebar
            apps={apps}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>
        <div className="flex-1 min-h-0 flex flex-col py-16">
          <AppDetail app={selectedApp} />
        </div>
      </div>

      {/* Mobile layout */}
      <div className="flex flex-col min-h-screen bg-white md:hidden">
        <div className="flex-1 px-6 pt-7 pb-24">
          <AppDetail app={selectedApp} />
        </div>
        <MobileAppSwitcher
          apps={apps}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>
    </>
  );
}
