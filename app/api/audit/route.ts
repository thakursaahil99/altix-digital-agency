import { NextResponse } from "next/server";

/**
 * Runs a real Lighthouse audit through Google PageSpeed Insights.
 * Set PSI_API_KEY in .env.local (free key from Google Cloud → "PageSpeed Insights API").
 */

type Audit = {
  title: string;
  score: number | null;
  displayValue?: string;
  details?: { type?: string; overallSavingsMs?: number; data?: string };
};

const METRICS = [
  ["first-contentful-paint", "First Contentful Paint"],
  ["largest-contentful-paint", "Largest Contentful Paint"],
  ["total-blocking-time", "Total Blocking Time"],
  ["cumulative-layout-shift", "Cumulative Layout Shift"],
  ["speed-index", "Speed Index"],
] as const;

function normalise(raw: string | null) {
  if (!raw) return null;
  try {
    const u = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
    if (!["http:", "https:"].includes(u.protocol) || !u.hostname.includes(".")) return null;
    return u.toString();
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const params = new URL(req.url).searchParams;
  const url = normalise(params.get("url"));
  const strategy = params.get("strategy") === "desktop" ? "desktop" : "mobile";
  if (!url) return NextResponse.json({ error: "Please enter a valid website address." }, { status: 400 });

  const api = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  api.searchParams.set("url", url);
  api.searchParams.set("strategy", strategy);
  for (const c of ["performance", "accessibility", "best-practices", "seo"]) api.searchParams.append("category", c);
  if (process.env.PSI_API_KEY) api.searchParams.set("key", process.env.PSI_API_KEY);

  let res: Response;
  try {
    res = await fetch(api, { signal: AbortSignal.timeout(90_000), next: { revalidate: 3600 } });
  } catch {
    return NextResponse.json({ error: "The audit timed out. Please try again." }, { status: 504 });
  }

  if (!res.ok) {
    const message =
      res.status === 429
        ? "Google's free audit quota is busy right now. Please try again in a few minutes."
        : "We couldn't audit that site. Check the address and make sure it's publicly reachable.";
    return NextResponse.json({ error: message }, { status: res.status });
  }

  const data = await res.json();
  const lh = data.lighthouseResult;
  const audits: Record<string, Audit> = lh.audits;
  const score = (k: string) => Math.round((lh.categories[k]?.score ?? 0) * 100);

  const opportunities = Object.values(audits)
    .filter((a) => a.details?.type === "opportunity" && a.score !== null && a.score < 0.9)
    .sort((a, b) => (b.details?.overallSavingsMs ?? 0) - (a.details?.overallSavingsMs ?? 0))
    .slice(0, 5)
    .map((a) => ({ title: a.title, savings: a.displayValue ?? "" }));

  return NextResponse.json({
    url: lh.finalDisplayedUrl ?? url,
    strategy,
    scores: {
      performance: score("performance"),
      accessibility: score("accessibility"),
      bestPractices: score("best-practices"),
      seo: score("seo"),
    },
    metrics: METRICS.map(([id, label]) => ({
      label,
      value: audits[id]?.displayValue ?? "–",
      score: audits[id]?.score ?? 0,
    })),
    opportunities,
    screenshot: audits["final-screenshot"]?.details?.data ?? null,
  });
}
