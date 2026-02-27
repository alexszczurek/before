#!/usr/bin/env node

import { readdir, writeFile, readFile } from "fs/promises";
import { join, extname } from "path";
import { argv } from "process";

const APPS_FILE = join(import.meta.dirname, "../src/data/apps.ts");
const PUBLIC_DIR = join(import.meta.dirname, "../public/appstore");

// Parse args
function parseArgs() {
  const args = argv.slice(2);
  let dir = null;
  let search = null;
  let accentColor = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--dir" && args[i + 1]) dir = args[++i];
    else if (args[i] === "--search" && args[i + 1]) search = args[++i];
    else if (args[i] === "--color" && args[i + 1]) accentColor = args[++i];
  }

  if (!dir || !search) {
    console.error("Usage: node scripts/add-app.mjs --dir <folder> --search <query> [--color <hex>]");
    console.error("  --dir     Folder name inside /public/appstore/");
    console.error("  --search  iTunes search query (app name)");
    console.error('  --color   Accent color hex (default: auto-picked)');
    process.exit(1);
  }

  return { dir, search, accentColor };
}

// Search iTunes API
async function searchItunes(query) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=software&limit=10`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results || [];
}

// Download icon
async function downloadIcon(url, destPath) {
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  await writeFile(destPath, Buffer.from(buffer));
}

// List screenshots in directory
async function listScreenshots(dirPath) {
  const files = await readdir(dirPath);
  const imageExts = [".webp", ".png", ".jpg", ".jpeg"];
  const videoExts = [".mp4", ".mov", ".webm"];
  const allExts = [...imageExts, ...videoExts];

  return files
    .filter((f) => {
      const ext = extname(f).toLowerCase();
      return allExts.includes(ext) && !f.startsWith("logo");
    })
    .sort((a, b) => {
      // Natural sort: 1.webp, 2.webp, ..., 10.webp
      const numA = parseInt(a.match(/\d+/)?.[0] || "0");
      const numB = parseInt(b.match(/\d+/)?.[0] || "0");
      return numA - numB;
    });
}

// Pick a default accent color based on category
function pickAccentColor(genre) {
  const map = {
    Productivity: "#6366f1",
    Education: "#f59e0b",
    Lifestyle: "#ec4899",
    "Health & Fitness": "#10b981",
    "Photo & Video": "#f97316",
    Sports: "#22c55e",
    Utilities: "#3b82f6",
    Entertainment: "#a855f7",
    Games: "#ef4444",
    Finance: "#14b8a6",
    "Food & Drink": "#f43f5e",
    Music: "#8b5cf6",
    Social: "#06b6d4",
    Travel: "#0ea5e9",
    Weather: "#38bdf8",
  };
  return map[genre] || "#6366f1";
}

// Truncate description to a reasonable app-card length
function makeDescription(raw) {
  if (!raw) return "";
  // Take first 2 sentences or 200 chars
  const sentences = raw.split(/(?<=[.!?])\s+/);
  let desc = "";
  for (const s of sentences) {
    if ((desc + " " + s).length > 200) break;
    desc = desc ? desc + " " + s : s;
  }
  return desc || raw.slice(0, 200);
}

async function main() {
  const { dir, search, accentColor: userColor } = parseArgs();

  const appDir = join(PUBLIC_DIR, dir);

  // 1. Check directory exists and list screenshots
  let screenshots;
  try {
    screenshots = await listScreenshots(appDir);
  } catch {
    console.error(`Error: Directory /public/appstore/${dir}/ not found`);
    process.exit(1);
  }

  if (screenshots.length === 0) {
    console.error(`Error: No screenshot files found in /public/appstore/${dir}/`);
    process.exit(1);
  }

  console.log(`Found ${screenshots.length} screenshots in /public/appstore/${dir}/`);

  // 2. Search iTunes
  console.log(`Searching iTunes for: "${search}"...`);
  const results = await searchItunes(search);

  if (results.length === 0) {
    console.error("No results found on iTunes. You may need to add this app manually.");
    process.exit(1);
  }

  // Pick first result (or let user choose)
  const app = results[0];
  console.log(`Found: ${app.trackName} (${app.primaryGenreName}) - ID: ${app.trackId}`);

  // 3. Download icon
  const iconUrl = app.artworkUrl512 || app.artworkUrl100?.replace("100x100", "512x512");
  const iconExt = ".jpg";
  const iconPath = join(appDir, `logo${iconExt}`);
  console.log("Downloading icon...");
  await downloadIcon(iconUrl, iconPath);
  console.log(`Icon saved to /public/appstore/${dir}/logo${iconExt}`);

  // 4. Build the entry
  const id = dir;
  const name = app.trackName.split(/[:\-–]/)[0].trim(); // Use short name before colon/dash
  const category = app.primaryGenreName;
  const description = makeDescription(app.description);
  const accentColor = userColor || pickAccentColor(category);
  const appStoreId = app.trackId;

  const screenshotPaths = screenshots.map((f) => `/appstore/${dir}/${f}`);

  const entry = `  {
    id: "${id}",
    name: "${name}",
    icon: "/appstore/${dir}/logo${iconExt}",
    category: "${category}",
    description:
      ${JSON.stringify(description)},
    appStoreId: ${appStoreId},
    accentColor: "${accentColor}",
    screenshots: [
${screenshotPaths.map((p) => `      "${p}",`).join("\n")}
    ],
  },`;

  // 5. Insert into apps.ts before the closing ];
  const appsContent = await readFile(APPS_FILE, "utf-8");
  const insertPoint = appsContent.lastIndexOf("];");

  if (insertPoint === -1) {
    console.error("Could not find insertion point in apps.ts");
    process.exit(1);
  }

  const newContent = appsContent.slice(0, insertPoint) + entry + "\n" + appsContent.slice(insertPoint);
  await writeFile(APPS_FILE, newContent);

  console.log(`\n✅ Added "${name}" to apps.ts`);
  console.log(`   Category: ${category}`);
  console.log(`   Screenshots: ${screenshots.length}`);
  console.log(`   Accent: ${accentColor}`);
  console.log(`   App Store ID: ${appStoreId}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
