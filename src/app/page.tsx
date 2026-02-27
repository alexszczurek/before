"use client";

import { useState, useCallback, useEffect } from "react";
import { apps as initialApps } from "@/data/apps";
import type { App } from "@/data/apps";
import Sidebar from "@/components/Sidebar";
import AppDetail from "@/components/AppDetail";

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

  const handleNameChange = useCallback((id: string, newName: string) => {
    setApps((prev) =>
      prev.map((app) => (app.id === id ? { ...app, name: newName } : app))
    );
  }, []);

  return (
    <div className="flex min-h-screen bg-[#fafafa] px-24 py-16 gap-24">
      <Sidebar
        apps={apps}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
      <AppDetail app={selectedApp} onNameChange={handleNameChange} />
    </div>
  );
}
