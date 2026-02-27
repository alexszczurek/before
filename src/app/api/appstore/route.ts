import { NextResponse } from "next/server";

function truncate(text: string): string {
  if (!text) return "";
  const sentences = text.match(/[^.!?]+[.!?]+/g);
  if (!sentences) return text;
  return sentences.slice(0, 2).join("").trim();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get("ids");

  if (!ids) {
    return NextResponse.json({ error: "Missing ids parameter" }, { status: 400 });
  }

  const res = await fetch(
    `https://itunes.apple.com/lookup?id=${ids}&country=us`,
    { next: { revalidate: 86400 } } // cache for 24h
  );

  const data = await res.json();

  const apps = data.results?.map((r: Record<string, unknown>) => ({
    trackId: r.trackId,
    trackName: r.trackName,
    description: truncate(r.description as string),
    category: r.primaryGenreName,
  })) ?? [];

  return NextResponse.json(apps);
}
