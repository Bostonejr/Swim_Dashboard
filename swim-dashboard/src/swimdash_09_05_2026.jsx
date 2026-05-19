import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
} from "recharts";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// ─── RESPONSIVE HOOK ─────────────────────────────────────────────────────────
const useWindowWidth = () => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024,
  );
  useEffect(() => {
    const h = () => setWidth(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return width;
};

// ─── DATA ────────────────────────────────────────────────────────────────────
// Raw times: null = DNS. All times verified against corrected PDF (09/05/2026).
// Raphael T5 corrected from 4.21s (recording error) to 32.51s per updated source document.
const SWIMMERS = {
  Kofi: {
    color: "#f59e0b",
    times: [
      36.03, 35.56, 34.62, 36.16, 33.18, 33.69, 33.43, 36.76, 40.13, 33.57,
    ],
    strokes: [17, 17, 17, 18, 18, 18, 19, 19, 20, 17],
    avg: 35.31,
    best: 33.18,
    worst: 40.13,
    std: 2.02,
    range: 6.95,
    bestRep: 5,
    worstRep: 9,
    t1VsAvg: 2.0,
    t10VsAvg: -4.9,
    fatigueIndex: 4.0,
    first3Avg: 35.4,
    last3Avg: 36.82,
    improvements: 5,
    slowdowns: 4,
    avgStrokes: 18.0,
    strokeTrend: 0.206,
    dps: 2.79,
    closestToAvg: [
      { rep: 2, time: 35.56, diff: 0.25 },
      { rep: 3, time: 34.62, diff: 0.69 },
      { rep: 1, time: 36.03, diff: 0.72 },
    ],
    avgRepPosition: 2.0,
    zone: "Early",
    dns: [],
    anomalyNote:
      "Rep 9 (40.13s) sits 2.4σ above the mean — a statistically confirmed outlier. Likely a breathing disruption or poor wall touch. Fixing this single rep improves the average by ~0.5s.",
    insight: {
      note: "Kofi is the squad's best closer in this session — his T10 was 4.9% faster than his average, the strongest finish relative to average on the team. His average zone is Early (Reps 1–3), meaning he reached his sustainable pace almost immediately. The significant Rep 9 spike (40.13s, 2.4σ above mean) is a confirmed outlier that needs investigation. Stroke count is the most disciplined of all full-set swimmers (σ = 1.0 strokes).",
      strengths: [
        "T10 was 4.9% below average — the best closing performance on the team. A genuine, data-confirmed closer.",
        "Stroke count discipline: avg 18.0, σ = 1.0 — near-perfect stroke consistency across all 10 reps.",
        "5 rep-to-rep improvements vs 4 slowdowns — competitive, balanced set trajectory.",
        "Distance per stroke: 2.79m — solid for a full-set swimmer sustaining 10 reps.",
      ],
      weaknesses: [
        "Rep 9 outlier (40.13s, +4.82s above mean) is 2.4σ away — statistically anomalous. One bad rep significantly distorts the average.",
        "Average zone is EARLY (Reps 1–3): he hits his average pace immediately with no warm-up buffer and no room to improve from there.",
        "Stroke count trend: +0.21/rep — subtle but continuous. By Rep 9 he's at 20 strokes, signalling late-set technique fatigue.",
        "Fatigue index: +4.0% — first 3 avg (35.40s) vs last 3 avg (36.82s). Mild but confirms some aerobic drop-off.",
      ],
      recs: [
        "INVESTIGATE REP 9: Was it breathing, a bad wall, a lane hazard? One anomalous rep is costing ~0.5s off the average. Review and replicate conditions to find the cause.",
        "NEGATIVE SPLIT TRAINING: Deliberately start Reps 1–3 at 37s, then descend. This gives a warm-up buffer, trains race intelligence, and breaks the 'average from Rep 1' plateau.",
        "STROKE COUNT CEILING: When count reaches 20 (as in Rep 9), technique is breaking. Drill: 6×25m counting every stroke, hold ≤18. Reinforces the discipline already shown.",
        "AEROBIC TOP-UP: Fatigue index +4.0% is mild. Add 2×400m easy continuous freestyle per week to extend the aerobic ceiling and prevent the late-set stroke creep.",
      ],
    },
  },
  Abena: {
    color: "#e11d48",
    times: [
      39.12, 38.29, 40.56, 37.87, 41.13, 40.68, 40.47, 52.5, 40.74, 46.26,
    ],
    strokes: [21, 21, 21, 20, 20, 24, 24, 24, 20, 27],
    avg: 41.76,
    best: 37.87,
    worst: 52.5,
    std: 4.19,
    range: 14.63,
    bestRep: 4,
    worstRep: 8,
    t1VsAvg: -6.3,
    t10VsAvg: 10.8,
    fatigueIndex: 18.3,
    first3Avg: 39.32,
    last3Avg: 46.5,
    improvements: 5,
    slowdowns: 4,
    avgStrokes: 22.2,
    strokeTrend: 0.473,
    dps: 2.27,
    closestToAvg: [
      { rep: 5, time: 41.13, diff: 0.63 },
      { rep: 9, time: 40.74, diff: 1.02 },
      { rep: 6, time: 40.68, diff: 1.08 },
    ],
    avgRepPosition: 6.7,
    zone: "Middle",
    dns: [],
    anomalyNote:
      "Rep 8 (52.5s) is the largest outlier in the entire team — 2.6σ above mean. Stroke count also spiked to 24. Without this rep, Abena's average would be ~40.4s. This single rep drove the team mean to its worst rep (38.78s).",
    insight: {
      note: "Abena's Rep 8 (52.5s) is the most extreme outlier of the session — 2.6σ above her own mean and the primary driver of the team's worst rep average. Without it her average is a strong ~40.4s. She also has the steepest stroke count trend on the team (+0.47/rep) and the highest fatigue index (+18.3%). These three data points together signal a critical endurance and technique-under-fatigue problem.",
      strengths: [
        "Average zone is Middle (avg rep pos 6.7) — reaches typical pace in the right part of the set, not peaking too early.",
        "T1 was 6.3% below her average (39.12s vs 41.76s avg) — she started conservatively. Good pacing instinct.",
        "5 rep-to-rep improvements — responds well to rhythm when the set is flowing normally.",
        "Best time (37.87s on Rep 4) shows genuine speed capability well under her average.",
      ],
      weaknesses: [
        "Rep 8 (52.5s, +10.74s above mean) is a catastrophic outlier — 2.6σ. Stroke count spiked to 24 simultaneously. This is a complete technique collapse.",
        "Fatigue index: +18.3% — the highest on the team. Last 3 reps averaged 46.50s vs first 3 at 39.32s. That is a 7.18s regression.",
        "Stroke trend: +0.47/rep — the steepest deterioration on the team. By Rep 10 she was at 27 strokes, 35% more than her Rep 4 low of 20.",
        "T10 was 10.8% above average — she finished significantly slower than her own typical pace.",
      ],
      recs: [
        "PRIORITY 1 — INVESTIGATE REP 8: A 52.5s rep is a different swimmer. Was it a cramp, breathing issue, or lane problem? Address the specific cause before any training changes.",
        "ENDURANCE FOUNDATION: A +18.3% fatigue index demands aerobic base work. Add 3× weekly: 600m continuous easy freestyle at comfortable pace. No intervals — pure aerobic base.",
        "STROKE COUNT DISCIPLINE: Target ≤21 strokes throughout. When count rises above 24, technique is gone. Drill: 8×25m holding stroke count ≤20 every rep.",
        "PACING STRATEGY: T1 at 39.12s is actually ideal. The problem is the back half. Aim to hold 40–41s through all 10 reps — never allow more than 43s on any rep.",
        "LACTATE TOLERANCE: 4×100m freestyle at 85% effort with 90s rest. Builds the capacity to maintain form under fatigue — directly targets the Rep 7–10 collapse.",
      ],
    },
  },
  Ronell: {
    color: "#6366f1",
    times: [
      39.97, 39.13, 41.12, 41.26, 40.74, 39.81, 43.71, 42.18, 42.26, 40.96,
    ],
    strokes: [23, 17, 14, 14.5, 16, 21, 28, 22, 16.5, 21],
    avg: 41.11,
    best: 39.13,
    worst: 43.71,
    std: 1.28,
    range: 4.58,
    bestRep: 2,
    worstRep: 7,
    t1VsAvg: -2.8,
    t10VsAvg: -0.4,
    fatigueIndex: 4.3,
    first3Avg: 40.07,
    last3Avg: 41.8,
    improvements: 5,
    slowdowns: 4,
    avgStrokes: 19.3,
    strokeTrend: 0.388,
    dps: 2.71,
    closestToAvg: [
      { rep: 3, time: 41.12, diff: 0.01 },
      { rep: 4, time: 41.26, diff: 0.15 },
      { rep: 10, time: 40.96, diff: 0.15 },
    ],
    avgRepPosition: 5.7,
    zone: "Middle",
    dns: [],
    anomalyNote:
      "Stroke count range of 14–28 within a single set is a 100% swing. Rep 7 (28 strokes) coincides with his worst time (43.71s, 2.0σ above mean). The times look consistent but the technique underneath is not.",
    insight: {
      note: "Ronell presents a fascinating paradox: the best time consistency on the team (σ = 1.28s — Excellent rating) combined with the most volatile stroke count (range 14–28, σ = 4.21 strokes). His times are flat because he compensates for inefficient strokes with increased muscular effort — masking a real technical problem. This is unsustainable and will directly limit future improvement.",
      strengths: [
        "σ = 1.28s — the best consistency rating among full-set swimmers. His times barely move despite wild technique variation underneath.",
        "Average zone: Middle (avg rep pos 5.7) — a balanced set without early peaking or collapse.",
        "T10 nearly equal to T1 (−0.4% vs avg) — maintained his exact opening pace all the way to Rep 10.",
        "5 rep-to-rep improvements — actively competitive throughout the set.",
      ],
      weaknesses: [
        "Stroke count range: 14–28 within one set is a 100% swing — the most volatile stroke pattern on the team. Stable times are hiding deeply unstable technique.",
        "Stroke trend: +0.39/rep — second steepest on the team. Adding nearly 1 extra stroke every 2.5 reps.",
        "Rep 7 (43.71s, 28 strokes) — clear technique breakdown rep. Times look okay; stroke count tells the real story.",
        "DPS: 2.71m/stroke vs Jadon's 3.70m — 27% less distance per stroke despite competing at a similar intensity level.",
      ],
      recs: [
        "STROKE COUNT TARGET: Every rep should be 18–20 strokes. Currently swinging between 14 (too glide-heavy, loses momentum) and 28 (too choppy, wastes energy). Drill: 10×25m counting every rep, stay 18–20.",
        "TEMPO TRAINER: Use a tempo trainer set to 1.3s per stroke cycle for 4 weeks. Eliminates the wild swing between glide-heavy and chop-heavy reps.",
        "DPS IMPROVEMENT: Target 2.8m+ per stroke (50m ÷ 18 strokes). Focus on hand entry, catch, and full arm extension on the pull. The consistency is there — now unlock the efficiency.",
        "REP 7 INVESTIGATION: What changed on Rep 7 to produce 28 strokes? If fatigue-driven, the aerobic base needs work. Add 2×300m aerobic swims weekly.",
      ],
    },
  },
  Raphael: {
    color: "#8b5cf6",
    times: [
      34.03, 34.1, 32.85, 33.29, 32.51, 32.51, 32.99, 33.84, 33.99, 33.82,
    ],
    strokes: [17, 16, 16, 17, 16, 16, 16, 17, 17, 17],
    avg: 33.39,
    best: 32.51,
    worst: 34.1,
    std: 0.61,
    range: 1.59,
    bestRep: 5,
    worstRep: 2,
    t1VsAvg: 1.9,
    t10VsAvg: 1.3,
    fatigueIndex: 0.7,
    first3Avg: 33.66,
    last3Avg: 33.88,
    improvements: 3,
    slowdowns: 6,
    avgStrokes: 16.5,
    strokeTrend: 0.055,
    dps: 3.03,
    closestToAvg: [
      { rep: 4, time: 33.29, diff: 0.1 },
      { rep: 7, time: 32.99, diff: 0.4 },
      { rep: 10, time: 33.82, diff: 0.43 },
    ],
    avgRepPosition: 7.0,
    zone: "Middle",
    dns: [],
    anomalyNote: null,
    insight: {
      note: "With T5 corrected to 32.51s, Raphael now has a complete 10-rep set and his metrics sharpen considerably. His average drops slightly to 33.39s and he gains a third rep-to-rep improvement. His average zone shifts to Middle (avg rep pos 7.0) — no longer artificially late. The core finding stands: σ = 0.61s is still the best consistency on the team, but 6 out of 9 rep transitions are slowdowns. He reaches his pace early and holds it, but has not yet developed the ability to descend. His speed ceiling is the primary limiter.",
      strengths: [
        "σ = 0.61s — the best consistency on the team across a full, clean 10-rep set. A 1.59s range from best to worst is exceptional.",
        "Complete set: all 10 reps swum with corrected data. The clean dataset confirms all metrics without any DNS asterisk.",
        "Fatigue index: +0.7% — essentially flat. First 3 avg (33.66s) vs last 3 avg (33.88s) is a 0.22s difference. Near-perfect endurance.",
        "Stroke count near-perfectly stable: avg 16.5, range 16–17, σ = 0.50 — immaculate, robot-like technique control across all 10 reps.",
      ],
      weaknesses: [
        "6 out of 9 rep transitions are slowdowns — he drifts slightly slower each rep and is bumping against a performance plateau. No descending pattern.",
        "Best time (32.51s on Rep 5) is only 0.88s faster than his average — tiny upside. Sprint and top-end speed capability has not been developed.",
        "T1 and T10 are both above average (+1.9% and +1.3%) — he starts and finishes above his own mean, meaning his fastest reps are concentrated in the middle. No warm-up benefit, no closing kick.",
        "DPS: 3.03m/stroke is good but below Jadon's 3.70m — 18% less distance per stroke highlights a gap in power generation.",
      ],
      recs: [
        "SPRINT UNLOCKING: The consistency is elite — now chase raw speed. Add 6×25m all-out freestyle sprints weekly, full recovery between reps. The neuromuscular system needs overloading to break the ceiling.",
        "NEGATIVE SPLIT TRAINING: Deliberately start Reps 1–3 at 35s, then descend to 32s by Rep 10. Currently his best reps cluster in the middle (Reps 4–7). The goal is to move that peak to Reps 8–10.",
        "DPS IMPROVEMENT: Target 3.3m/stroke (50m ÷ 15 strokes, down from 16.5 avg). Drill: 10×25m catch-and-pull, focusing on high elbow catch and full arm extension at entry.",
        "RACE STRATEGY: Raphael's data shows he is a natural even-pacer. In competition, leverage this — aim for 33.5s splits across all 50s. The improvement goal is to hold 33.5s while building the ability to drop to 32s on demand.",
      ],
    },
  },
  Jesse: {
    color: "#10b981",
    times: [33.79, null, 34.18, 33.28, 34.82, null, 33.53, 34.65, 36.81, 35.35],
    strokes: [15, null, 14, 15, 14, null, 13, 15, 14, 16],
    avg: 34.55,
    best: 33.28,
    worst: 36.81,
    std: 1.07,
    range: 3.53,
    bestRep: 4,
    worstRep: 9,
    t1VsAvg: -2.2,
    t10VsAvg: 2.3,
    fatigueIndex: 5.5,
    first3Avg: 33.75,
    last3Avg: 35.6,
    improvements: 2,
    slowdowns: 3,
    avgStrokes: 14.5,
    strokeTrend: 0.036,
    dps: 3.46,
    closestToAvg: [
      { rep: 8, time: 34.65, diff: 0.1 },
      { rep: 5, time: 34.82, diff: 0.27 },
      { rep: 3, time: 34.18, diff: 0.37 },
    ],
    avgRepPosition: 5.3,
    zone: "Middle",
    dns: [2, 6],
    anomalyNote:
      "Rep 9 (36.81s) is 2.1σ above mean — a notable late-set outlier. Combined with DNS on Reps 2 and 6, the broken rhythm likely compounds late-set fatigue. The two missed reps also make the true fatigue profile incomplete.",
    insight: {
      note: "Jesse has the second-best stroke efficiency on the team — 14.5 strokes per 50m and 3.46m per stroke. However, two DNS reps (2 and 6) represent 20% of the workout missed, breaking rhythm and making the full fatigue picture incomplete. The Rep 9 outlier (36.81s, 2.1σ) suggests a late-set fatigue wall that is masked by the incomplete rep count. His fatigue index of +5.5% is the second highest among the three full-set swimmers.",
      strengths: [
        "DPS: 3.46m/stroke — second best on the team. Each stroke is powerful and covers exceptional distance.",
        "Stroke count: avg 14.5, range 13–16, σ = 0.87 — very controlled technique on the reps he completed.",
        "σ = 1.07s on valid reps — Excellent consistency when swimming.",
        "Average zone: Middle (avg rep pos 5.3) — balanced pacing on completed reps.",
      ],
      weaknesses: [
        "DNS on Reps 2 and 6 — two missed reps means 20% of the set was incomplete. This must be the primary focus before any other analysis.",
        "Rep 9 outlier (36.81s, 2.1σ) — late-set fatigue emerging even on reps completed.",
        "T10 was 2.3% above average — finished slower than own mean. Endurance is the limiting factor.",
        "With only 8 valid reps, the true average and fatigue picture are incomplete — all current metrics carry an asterisk.",
      ],
      recs: [
        "DNS PRIORITY: Completing all 10 reps is the first and most important goal. Without a complete set, no metric is trustworthy. Add 2×300m easy freestyle per week to build the conditioning to finish.",
        "BREATHING PATTERN: Rep 9 spike (36.81s) after a DNS Rest on Rep 6 suggests oxygen debt accumulates late. Ensure bilateral breathing every 3 strokes throughout to prevent late-set oxygen debt.",
        "POWER DEVELOPMENT: Jesse has excellent efficiency (14.5 strokes) but averages 34.55s — slower than Raphael (33.39s) despite fewer strokes. The issue is power-per-stroke. Add 3×10 dumbbell pull-throughs weekly.",
        "CONSISTENCY CHALLENGE: Once DNS reps are eliminated, target all 10 reps within 34–36s. The underlying talent is clearly there.",
      ],
    },
  },
  Jadon: {
    color: "#06b6d4",
    times: [30.82, 32.03, 29.53, 31.87, 29.03, null, 34.28, 32.74, 31.85, 35.9],
    strokes: [13, 13, 13, 13, 13, null, 15, 14, 15, 13],
    avg: 32.01,
    best: 29.03,
    worst: 35.9,
    std: 2.04,
    range: 6.87,
    bestRep: 5,
    worstRep: 10,
    t1VsAvg: -3.7,
    t10VsAvg: 12.2,
    fatigueIndex: 8.8,
    first3Avg: 30.79,
    last3Avg: 33.5,
    improvements: 4,
    slowdowns: 3,
    avgStrokes: 13.6,
    strokeTrend: 0.155,
    dps: 3.7,
    closestToAvg: [
      { rep: 2, time: 32.03, diff: 0.02 },
      { rep: 4, time: 31.87, diff: 0.14 },
      { rep: 9, time: 31.85, diff: 0.16 },
    ],
    avgRepPosition: 5.0,
    zone: "Middle",
    dns: [6],
    anomalyNote:
      "T10 (35.9s) is 1.9σ above mean — a significant fade on the final rep. Rep 7 (34.28s) also shows a post-DNS slowdown: after missing Rep 6, he came back 2s slower, suggesting the rest break disrupted rather than helped his rhythm.",
    insight: {
      note: "Jadon is the fastest swimmer in this session and the team's most talented freestyler — 29.03s best time with 13 strokes (3.70m per stroke) on a converted 50m is elite-level. But his T10 was 12.2% above his average — the worst closing performance relative to average on the team. He is running on speed reserves, not aerobic capacity. His first 3 rep average (30.79s) vs last 3 (33.50s) is a 2.71s regression — significant for a swimmer of this calibre.",
      strengths: [
        "Fastest swimmer in the squad: avg 32.01s, best 29.03s — 1.5+ seconds clear of the next swimmer (Raphael at 33.39s).",
        "DPS: 3.70m/stroke — the best on the team. 13 strokes per 50m is exceptional technique for the distance.",
        "Stroke count: avg 13.6, range 13–15, σ = 0.83 — near-perfect technical consistency on completed reps.",
        "Average zone: Middle (avg rep pos 5.0) — balanced through the set on reps completed.",
      ],
      weaknesses: [
        "T10 (35.9s) was 12.2% above his average — the worst closing performance relative to average on the team. Hard fade at the end.",
        "Fatigue index: +8.8%. First 3 avg = 30.79s vs last 3 avg = 33.50s — a 2.71s regression over 10 reps.",
        "DNS Rep 6 disrupted the set. Rep 7 (34.28s) was his slowest non-final rep, suggesting the break broke rather than restored rhythm.",
        "T10 (35.9s) is 1.9σ above mean — a data-confirmed late-set fade.",
      ],
      recs: [
        "ENDURANCE IS THE PRIORITY: Jadon's speed is not the issue — his aerobic engine runs out. Add 3× weekly: 500m continuous easy freestyle at 70% effort. Build the base to hold 30–31s for all 10 reps.",
        "T10 TARGET: Goal is T10 ≤ 32.5s (below average). Currently 35.9s. Negative split sets: 6×50m starting at 33s, descending to 31s.",
        "DNS ELIMINATION: Rep 6 must be completed. If fatigue is the reason, reduce effort on Reps 4–5 slightly to carry through Rep 6 without breaking rhythm.",
        "RACE INTELLIGENCE: In competition, a 31s/30s split beats a 29s/35s split every time. Practice controlled opening pace. The speed is there — the discipline is what needs training.",
        "LACTATE THRESHOLD: 4×200m at 85% effort with 90s rest. Trains the body to hold fast speeds under fatigue — directly targets the Rep 7–10 regression.",
      ],
    },
  },
};

const TEAM_STATS = [
  { rep: 1, best: 30.82, mean: 35.63 },
  { rep: 2, best: 32.03, mean: 35.82 },
  { rep: 3, best: 29.53, mean: 35.48 },
  { rep: 4, best: 31.87, mean: 35.62 },
  { rep: 5, best: 29.03, mean: 35.23 },
  { rep: 6, best: 32.51, mean: 36.67 },
  { rep: 7, best: 32.99, mean: 36.4 },
  { rep: 8, best: 32.74, mean: 38.78 },
  { rep: 9, best: 31.85, mean: 37.63 },
  { rep: 10, best: 33.57, mean: 37.64 },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const fmt = (s) => {
  if (s == null) return "—";
  const m = Math.floor(s / 60);
  const sec = (s % 60).toFixed(2);
  return m > 0 ? `${m}:${sec.padStart(5, "0")}` : `${Number(sec).toFixed(2)}s`;
};

const pctSign = (v) => (v > 0 ? "+" : "") + v.toFixed(1) + "%";

const consistencyGrade = (std) => {
  if (std < 1) return { grade: "A+", label: "Excellent", color: "#10b981" };
  if (std < 2) return { grade: "A", label: "Excellent", color: "#10b981" };
  if (std < 4) return { grade: "B", label: "Good", color: "#f59e0b" };
  if (std < 6) return { grade: "C", label: "Moderate", color: "#f97316" };
  return { grade: "D", label: "Poor", color: "#ef4444" };
};

const zoneColor = (zone) =>
  zone === "Early" ? "#f59e0b" : zone === "Middle" ? "#06b6d4" : "#10b981";
const zoneBg = (zone) =>
  zone === "Early"
    ? "bg-amber-900/30 border-amber-500/40"
    : zone === "Middle"
      ? "bg-cyan-900/30 border-cyan-500/40"
      : "bg-emerald-900/30 border-emerald-500/40";

// ─── CUSTOM TOOLTIP ──────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm shadow-xl">
      <p className="text-slate-400 mb-1 text-xs">Rep {label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="font-semibold">
          {p.name}: {typeof p.value === "number" ? p.value.toFixed(2) : p.value}
          {p.name === "Time" || p.name === "Best" || p.name === "Mean"
            ? "s"
            : ""}
        </p>
      ))}
    </div>
  );
};

// ─── TEAM TAB ─────────────────────────────────────────────────────────────────
const TeamTab = () => {
  const sortedSwimmers = Object.entries(SWIMMERS).sort(
    (a, b) => a[1].avg - b[1].avg,
  );

  return (
    <div className="space-y-5">
      {/* Team chart */}
      <div className="bg-slate-800 rounded-2xl p-6">
        <h2 className="text-slate-100 text-xl font-bold mb-1">
          Team performance — all 10 reps
        </h2>
        <p className="text-slate-400 text-sm mb-5">
          Best time (green) vs team mean (blue) per rep. Mean only counts
          swimmers who swam that rep.
        </p>
        <div className="flex gap-4 mb-4 flex-wrap">
          <span className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-4 h-0.5 bg-emerald-500 inline-block" /> Best time
          </span>
          <span className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-4 h-0.5 bg-blue-500 inline-block border-dashed" />{" "}
            Team mean
          </span>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={TEAM_STATS}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="rep"
              stroke="#475569"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              label={{
                value: "Repetition",
                position: "insideBottom",
                offset: -2,
                fill: "#64748b",
                fontSize: 12,
              }}
            />
            <YAxis
              stroke="#475569"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              domain={[26, 42]}
              label={{
                value: "Time (s)",
                angle: -90,
                position: "insideLeft",
                fill: "#64748b",
                fontSize: 12,
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="mean"
              fill="#1e40af22"
              stroke="#3b82f6"
              strokeWidth={2}
              strokeDasharray="6 3"
              name="Mean"
              dot={{ r: 4, fill: "#3b82f6" }}
            />
            <Line
              type="monotone"
              dataKey="best"
              stroke="#10b981"
              strokeWidth={3}
              name="Best"
              dot={{ r: 5, fill: "#10b981" }}
            />
          </ComposedChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
          {[
            {
              label: "Overall best",
              val: "29.03s",
              sub: "Jadon · Rep 5",
              color: "#10b981",
            },
            {
              label: "Team mean (all reps)",
              val: `${(TEAM_STATS.reduce((s, d) => s + d.mean, 0) / TEAM_STATS.length).toFixed(2)}s`,
              sub: "Across 10 reps",
              color: "#3b82f6",
            },
            {
              label: "Best mean rep",
              val: `Rep ${TEAM_STATS.reduce((m, d) => (d.mean < m.mean ? d : m)).rep}`,
              sub: `${TEAM_STATS.reduce((m, d) => (d.mean < m.mean ? d : m)).mean.toFixed(2)}s avg`,
              color: "#f59e0b",
            },
            {
              label: "Worst mean rep",
              val: "Rep 8",
              sub: "38.78s — fatigue wall",
              color: "#ef4444",
            },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-slate-900 rounded-xl p-4"
              style={{ borderTop: `3px solid ${s.color}` }}
            >
              <p className="text-slate-500 text-xs mb-1">{s.label}</p>
              <p className="font-bold text-xl" style={{ color: s.color }}>
                {s.val}
              </p>
              <p className="text-slate-500 text-xs mt-1">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Swimmer comparison */}
      <div className="bg-slate-800 rounded-2xl p-6">
        <h2 className="text-slate-100 text-xl font-bold mb-1">
          Swimmer average comparison
        </h2>
        <p className="text-slate-400 text-sm mb-5">
          Ordered fastest → slowest. All times verified against corrected PDF.
        </p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={sortedSwimmers.map(([name, d]) => ({
              name,
              avg: d.avg,
              best: d.best,
              color: d.color,
            }))}
            layout="vertical"
            margin={{ left: 16, right: 40 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
              horizontal={false}
            />
            <XAxis
              type="number"
              stroke="#475569"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              domain={[0, 55]}
            />
            <YAxis
              type="category"
              dataKey="name"
              stroke="#475569"
              tick={{ fill: "#94a3b8", fontSize: 13 }}
              width={65}
            />
            <Tooltip
              content={({ active, payload, label }) =>
                active && payload?.length ? (
                  <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm">
                    <p className="text-slate-100 font-bold">{label}</p>
                    <p className="text-blue-400">
                      Avg: {payload[0]?.value?.toFixed(2)}s
                    </p>
                    {payload[1] && (
                      <p className="text-emerald-400">
                        Best: {payload[1]?.value?.toFixed(2)}s
                      </p>
                    )}
                  </div>
                ) : null
              }
            />
            <Bar dataKey="avg" name="Average" radius={[0, 4, 4, 0]}>
              {sortedSwimmers.map(([name, d], i) => (
                <rect key={i} fill={d.color + "bb"} />
              ))}
            </Bar>
            <Bar dataKey="best" name="Best" radius={[0, 4, 4, 0]}>
              {sortedSwimmers.map(([name, d], i) => (
                <rect key={i} fill={d.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex gap-4 mt-2 flex-wrap">
          <span className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-3 h-3 rounded-sm inline-block bg-slate-500 opacity-70" />{" "}
            Average time
          </span>
          <span className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-3 h-3 rounded-sm inline-block bg-slate-500" />{" "}
            Best time
          </span>
        </div>
      </div>

      {/* Swimmer cards */}
      <div className="bg-slate-800 rounded-2xl p-6">
        <h2 className="text-slate-100 text-xl font-bold mb-4">
          All swimmers — at a glance
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sortedSwimmers.map(([name, d]) => {
            const cg = consistencyGrade(d.std);
            const validCount = d.times.filter(
              (t) => t !== null && t > 10,
            ).length;
            return (
              <div
                key={name}
                className="bg-slate-900 rounded-xl p-4"
                style={{ borderTop: `3px solid ${d.color}` }}
              >
                <div className="flex justify-between items-start mb-3">
                  <p className="font-bold text-base" style={{ color: d.color }}>
                    {name}
                  </p>
                  {d.dns?.length > 0 && (
                    <span className="text-xs bg-amber-900/40 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded">
                      DNS ×{d.dns.length}
                    </span>
                  )}
                </div>
                <div className="space-y-1.5">
                  {[
                    { k: "Average", v: fmt(d.avg), c: "#f1f5f9" },
                    { k: "Best time", v: fmt(d.best), c: "#10b981" },
                    {
                      k: "Consistency",
                      v: `${cg.label} (σ ${d.std.toFixed(2)}s)`,
                      c: cg.color,
                    },
                    {
                      k: "Fatigue index",
                      v: pctSign(d.fatigueIndex),
                      c: d.fatigueIndex < 0 ? "#10b981" : "#ef4444",
                    },
                    {
                      k: "DPS",
                      v: `${d.dps.toFixed(2)}m/stroke`,
                      c: "#94a3b8",
                    },
                  ].map(({ k, v, c }) => (
                    <div key={k} className="flex justify-between text-xs">
                      <span className="text-slate-500">{k}</span>
                      <span className="font-medium" style={{ color: c }}>
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Team insights */}
      <div className="bg-slate-800 rounded-2xl p-6">
        <h2 className="text-slate-100 text-xl font-bold mb-4">
          Coach's team-level observations
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-emerald-950/40 border border-emerald-800/40 rounded-xl p-5">
            <p className="text-emerald-400 font-bold text-sm mb-3">
              Team strengths
            </p>
            <ul className="space-y-2 text-emerald-100 text-sm leading-relaxed list-disc list-inside">
              <li>
                Kofi finished T10 4.9% faster than average — only closer on the
                team
              </li>
              <li>
                Raphael's σ = 0.56s — one of the best consistency readings the
                squad has produced
              </li>
              <li>
                Jadon's 29.03s best time at 13 strokes (3.70m DPS) is
                elite-level
              </li>
              <li>
                Jesse's 14.5 avg strokes and 3.46m DPS shows excellent technique
                per stroke
              </li>
            </ul>
          </div>
          <div className="bg-red-950/40 border border-red-800/40 rounded-xl p-5">
            <p className="text-red-400 font-bold text-sm mb-3">Team concerns</p>
            <ul className="space-y-2 text-red-100 text-sm leading-relaxed list-disc list-inside">
              <li>
                Rep 8 fatigue wall: team mean spiked to 38.78s — worst rep of
                the session
              </li>
              <li>
                Jesse (DNS Reps 2 & 6) and Jadon (DNS Rep 6) — incomplete sets
                undermine analysis
              </li>
              <li>
                Ronell's stroke count range: 14–28 in one session — technique
                instability masked by flat times
              </li>
              <li>
                Abena's Rep 8 (52.5s) is the largest outlier in the session —
                2.6σ from her own mean
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── INDIVIDUAL TAB ───────────────────────────────────────────────────────────
const IndividualTab = () => {
  const [selected, setSelected] = useState("Jadon");
  const d = SWIMMERS[selected];
  const ins = d.insight;
  const cg = consistencyGrade(d.std);
  const validTimes = d.times.filter((t) => t !== null && t > 10);

  const chartData = d.times.map((t, i) => ({
    rep: i + 1,
    time: t && t > 10 ? t : null,
    strokes: d.strokes[i],
    avg: d.avg,
  }));

  const t1 = d.times[0];
  const t10 = d.times[9];
  const t1Pct = d.t1VsAvg;
  const t10Pct = d.t10VsAvg;
  const fatigueGood = d.fatigueIndex < 0;

  return (
    <div className="space-y-5">
      {/* Swimmer picker */}
      <div className="bg-slate-800 rounded-2xl p-5">
        <label className="block text-slate-400 text-xs mb-2 uppercase tracking-wide">
          Select swimmer
        </label>
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="w-full bg-slate-900 border border-slate-600 rounded-xl text-slate-100 text-base px-4 py-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          {Object.keys(SWIMMERS).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      {/* Anomaly / data warning */}
      {d.dns?.length > 0 && (
        <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl p-4 text-sm text-amber-200 leading-relaxed">
          <span className="font-bold text-amber-400">Data note — </span>
          {`DNS on Rep${d.dns.length > 1 ? "s" : ""} ${d.dns.join(" & ")} — metrics computed on ${validTimes.length}/10 valid reps.`}
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          {
            label: "Average time",
            val: fmt(d.avg),
            sub: `${validTimes.length}/10 valid reps`,
            color: d.color,
          },
          {
            label: "Best time",
            val: fmt(d.best),
            sub: `Rep ${d.bestRep}`,
            color: "#10b981",
          },
          {
            label: "Consistency (σ)",
            val: `±${d.std.toFixed(2)}s`,
            sub: `Grade: ${cg.grade}`,
            color: cg.color,
          },
          {
            label: "Fatigue index",
            val: pctSign(d.fatigueIndex),
            sub: fatigueGood ? "Got faster" : "Slowed down",
            color: fatigueGood ? "#10b981" : "#ef4444",
          },
        ].map((s, i) => (
          <div
            key={i}
            className="bg-slate-800 rounded-2xl p-4"
            style={{ borderTop: `3px solid ${s.color}` }}
          >
            <p className="text-slate-500 text-xs mb-1">{s.label}</p>
            <p className="font-bold text-2xl" style={{ color: s.color }}>
              {s.val}
            </p>
            <p className="text-slate-500 text-xs mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Time chart */}
      <div className="bg-slate-800 rounded-2xl p-6">
        <h2 className="text-slate-100 text-lg font-bold mb-1">
          {selected} — time per rep
        </h2>
        <p className="text-slate-400 text-sm mb-4">
          Dashed line = average ({fmt(d.avg)}). Points{" "}
          <span className="text-emerald-400">below</span> the line are faster.{" "}
          <span className="text-red-400">Red dots</span> are outlier reps
          (&gt;1.5σ from mean). DNS reps show as gaps.
        </p>
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="rep"
              stroke="#475569"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              label={{
                value: "Repetition",
                position: "insideBottom",
                offset: -2,
                fill: "#64748b",
                fontSize: 12,
              }}
            />
            <YAxis
              stroke="#475569"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              domain={[Math.max(24, d.best - 5), d.worst + 4]}
              tickFormatter={(v) => Number(v).toFixed(2)}
              label={{
                value: "Time (s)",
                angle: -90,
                position: "insideLeft",
                fill: "#64748b",
                fontSize: 12,
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={d.avg}
              stroke="#475569"
              strokeDasharray="6 3"
              label={{
                value: "avg",
                fill: "#475569",
                fontSize: 11,
                position: "right",
              }}
            />
            <Area
              type="monotone"
              dataKey="time"
              fill={d.color + "18"}
              stroke={d.color}
              strokeWidth={2.5}
              name="Time"
              connectNulls={false}
              dot={({ cx, cy, payload }) => {
                if (!payload.time)
                  return <circle key={`dot-${payload.rep}`} r={0} />;
                const isOutlier = Math.abs(payload.time - d.avg) > 1.5 * d.std;
                return (
                  <circle
                    key={`dot-${payload.rep}`}
                    cx={cx}
                    cy={cy}
                    r={isOutlier ? 7 : 5}
                    fill={isOutlier ? "#ef4444" : d.color}
                    stroke={isOutlier ? "#fca5a5" : "none"}
                    strokeWidth={1.5}
                  />
                );
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>

        {/* T1 → Avg → T10 correlation */}
        <div className="mt-5">
          <p className="text-slate-400 text-sm font-medium mb-3">
            T1 → Average → T10 correlation
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                label: "T1 (opening rep)",
                val: fmt(t1),
                pct: t1Pct,
                note:
                  t1Pct > 0
                    ? "Started slower — good pacing"
                    : "Started faster than avg",
              },
              {
                label: "Average",
                val: fmt(d.avg),
                pct: 0,
                note: "Sustainable baseline",
              },
              {
                label: "T10 (final rep)",
                val: fmt(t10),
                pct: t10Pct,
                note:
                  t10Pct < 0
                    ? "Finished faster — great closer!"
                    : "Finished slower — fatigue factor",
              },
            ].map((item, i) => (
              <div key={i} className="bg-slate-900 rounded-xl p-4 text-center">
                <p className="text-slate-500 text-xs mb-2">{item.label}</p>
                <p className="text-slate-100 font-bold text-xl">{item.val}</p>
                {item.pct !== 0 && (
                  <p
                    className="text-sm font-semibold mt-1"
                    style={{ color: item.pct < 0 ? "#10b981" : "#ef4444" }}
                  >
                    {item.pct < 0 ? "▼" : "▲"} {Math.abs(item.pct).toFixed(1)}%
                    vs avg
                  </p>
                )}
                <p className="text-slate-500 text-xs mt-1">{item.note}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 bg-slate-900 rounded-xl p-4 text-sm text-slate-400 leading-relaxed">
            <span className="text-slate-200 font-medium">{selected}: </span>
            {t1Pct > 0 && t10Pct < 0
              ? "Started conservatively and finished fast — textbook negative split pacing. Ideal race strategy."
              : t1Pct < 0 && t10Pct > 0
                ? "Started too fast and faded — classic over-pacing. Start the next set 2s slower than instinct."
                : t10Pct < 0
                  ? "Finished faster than average — solid endurance. Build on this with more targeted closing reps."
                  : "Finished slower than average — fatigue accumulated by the final rep. Endurance training is the priority."}
          </div>
        </div>
      </div>

      {/* Stroke chart */}
      <div className="bg-slate-800 rounded-2xl p-6">
        <h2 className="text-slate-100 text-lg font-bold mb-1">
          {selected} — stroke count per rep
        </h2>
        <p className="text-slate-400 text-sm mb-4">
          Fewer strokes = more efficient. Target: hold a consistent count every
          rep. Trend:{" "}
          {d.strokeTrend > 0.1
            ? "📈 rising (efficiency dropping)"
            : d.strokeTrend < -0.1
              ? "📉 falling (improving)"
              : "→ stable (good control)"}
        </p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="rep"
              stroke="#475569"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />
            <YAxis stroke="#475569" tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <Tooltip
              content={({ active, payload, label }) =>
                active && payload?.length ? (
                  <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm">
                    <p className="text-slate-400 text-xs">Rep {label}</p>
                    <p style={{ color: "#f59e0b" }} className="font-semibold">
                      Strokes: {payload[0]?.value || "DNS"}
                    </p>
                  </div>
                ) : null
              }
            />
            <Bar dataKey="strokes" name="Strokes" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, i) => {
                const s = entry.strokes;
                const col = !s
                  ? "#334155"
                  : s > d.avgStrokes + 3
                    ? "#ef444488"
                    : s < d.avgStrokes - 3
                      ? "#10b98188"
                      : d.color + "99";
                return <rect key={i} fill={col} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {[
            {
              label: "Avg stroke count",
              val: `${d.avgStrokes.toFixed(1)}/50m`,
              sub:
                d.avgStrokes < 15
                  ? "Elite efficiency"
                  : d.avgStrokes < 20
                    ? "Very good"
                    : d.avgStrokes < 25
                      ? "Good — room to improve"
                      : "High — technique work needed",
            },
            {
              label: "Distance per stroke",
              val: `${d.dps.toFixed(2)}m`,
              sub:
                d.dps >= 3.5
                  ? "Elite DPS"
                  : d.dps >= 2.8
                    ? "Good DPS"
                    : "Below average DPS",
            },
            {
              label: "Stroke trend",
              val:
                d.strokeTrend > 0
                  ? `+${d.strokeTrend.toFixed(2)}/rep`
                  : `${d.strokeTrend.toFixed(2)}/rep`,
              sub:
                d.strokeTrend > 0.1
                  ? "Rising — fatigue signal"
                  : "Stable — good control",
            },
            {
              label: "Stroke range",
              val: `${Math.min(...d.strokes.filter(Boolean))}–${Math.max(...d.strokes.filter(Boolean))}`,
              sub: "Min to max across set",
            },
          ].map((m, i) => (
            <div key={i} className="bg-slate-900 rounded-xl p-3">
              <p className="text-slate-500 text-xs mb-1">{m.label}</p>
              <p className="text-slate-100 font-bold text-base">{m.val}</p>
              <p className="text-slate-500 text-xs mt-1">{m.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Average zone */}
      <div className="bg-slate-800 rounded-2xl p-6">
        <h2 className="text-slate-100 text-lg font-bold mb-1">
          When did {selected} hit their "average pace"?
        </h2>
        <p className="text-slate-400 text-sm mb-4">
          The 3 reps closest to {selected}'s average of{" "}
          <span className="text-slate-200 font-medium">{fmt(d.avg)}</span> —
          shows when their typical pace happened.
        </p>
        <div className="grid grid-cols-3 gap-3">
          {d.closestToAvg.map((item, i) => (
            <div
              key={i}
              className="bg-slate-900 rounded-xl p-4 text-center border"
              style={{ borderColor: d.color + "44" }}
            >
              <p className="font-bold text-2xl" style={{ color: d.color }}>
                Rep {item.rep}
              </p>
              <p className="text-slate-100 text-lg font-medium mt-1">
                {fmt(item.time)}
              </p>
              <p className="text-slate-500 text-xs mt-1">
                Δ{item.diff.toFixed(2)}s from avg
              </p>
            </div>
          ))}
        </div>
        <div
          className={`mt-4 border rounded-xl p-4 text-sm leading-relaxed ${zoneBg(d.zone)}`}
        >
          <span className="font-bold mr-2" style={{ color: zoneColor(d.zone) }}>
            Average zone: {d.zone}
          </span>
          {d.zone === "Early"
            ? `${selected}'s typical pace appeared in the opening reps — no warm-up buffer and no room to improve from the start.`
            : d.zone === "Middle"
              ? `${selected}'s typical pace was in the middle of the set — a balanced, well-distributed performance.`
              : `${selected}'s typical pace appeared in the final reps — started below average and built into the set. Outstanding endurance pattern.`}
        </div>
        {d.anomalyNote && (
          <div className="mt-3 bg-amber-950/30 border border-amber-500/30 rounded-xl p-4 text-xs text-amber-200 leading-relaxed">
            <span className="text-amber-400 font-bold">Outlier note — </span>
            {d.anomalyNote}
          </div>
        )}
      </div>

      {/* Detailed metrics */}
      <div className="bg-slate-800 rounded-2xl p-6">
        <h2 className="text-slate-100 text-lg font-bold mb-4">
          Detailed performance metrics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            {
              label: "First 3 rep avg",
              val: fmt(d.first3Avg),
              sub: "Opening pace",
              color: "#f59e0b",
            },
            {
              label: "Last 3 rep avg",
              val: fmt(d.last3Avg),
              sub: "Closing pace",
              color: fatigueGood ? "#10b981" : "#ef4444",
            },
            {
              label: "Time range",
              val: `${d.range.toFixed(2)}s`,
              sub: "Best to worst spread",
              color:
                d.range < 5 ? "#10b981" : d.range < 10 ? "#f59e0b" : "#ef4444",
            },
            {
              label: "Reps improved",
              val: `${d.improvements}/${d.improvements + d.slowdowns}`,
              sub: "Rep-to-rep faster",
              color: d.improvements >= 6 ? "#10b981" : "#f59e0b",
            },
            {
              label: "Best time",
              val: fmt(d.best),
              sub: `Rep ${d.bestRep}`,
              color: "#10b981",
            },
            {
              label: "Worst time",
              val: fmt(d.worst),
              sub: `Rep ${d.worstRep}`,
              color: "#ef4444",
            },
          ].map((m, i) => (
            <div key={i} className="bg-slate-900 rounded-xl p-4">
              <p className="text-slate-500 text-xs mb-1">{m.label}</p>
              <p className="font-bold text-lg" style={{ color: m.color }}>
                {m.val}
              </p>
              <p className="text-slate-500 text-xs mt-1">{m.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Coach analysis */}
      <div className="bg-slate-800 rounded-2xl p-6">
        <h2 className="text-slate-100 text-lg font-bold mb-4">
          Coach's analysis — {selected}
        </h2>
        <div
          className="bg-slate-900 rounded-xl p-5 border-l-4 mb-5"
          style={{ borderColor: d.color }}
        >
          <p className="text-slate-300 text-sm leading-relaxed">{ins.note}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-5">
          <div>
            <p className="text-emerald-400 font-bold text-sm mb-3">Strengths</p>
            <div className="space-y-2">
              {ins.strengths.map((s, i) => (
                <div
                  key={i}
                  className="bg-emerald-950/40 border border-emerald-800/40 rounded-xl p-3 text-sm text-emerald-100 leading-relaxed"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-red-400 font-bold text-sm mb-3">
              Areas to improve
            </p>
            <div className="space-y-2">
              {ins.weaknesses.map((w, i) => (
                <div
                  key={i}
                  className="bg-red-950/40 border border-red-800/40 rounded-xl p-3 text-sm text-red-100 leading-relaxed"
                >
                  {w}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-blue-400 font-bold text-sm mb-3">
          Training recommendations
        </p>
        <div className="space-y-2">
          {ins.recs.map((r, i) => (
            <div
              key={i}
              className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm text-slate-200 leading-relaxed"
              style={{ borderLeft: `3px solid ${d.color}` }}
            >
              <span className="font-bold" style={{ color: d.color }}>
                {i + 1}.{" "}
              </span>
              {r}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── KEY TAB ──────────────────────────────────────────────────────────────────
const KeyTab = () => (
  <div className="space-y-5">
    <div className="bg-slate-800 rounded-2xl p-6">
      <h2 className="text-slate-100 text-xl font-bold mb-4">
        Session information
      </h2>
      {[
        ["Workout", "10 × 50m freestyle — Best Average Set"],
        ["Pool", "34m pool (times converted to 50m equivalents)"],
        ["Date", "Saturday, 9 May 2026"],
        ["Goal", "Find each swimmer's sustainable best average over 10 reps"],
        ["0:0 in raw data", "Did not swim (DNS) that rep"],
      ].map(([k, v]) => (
        <div
          key={k}
          className="flex justify-between items-start py-3 border-b border-slate-700 last:border-0 text-sm gap-4"
        >
          <span className="text-slate-400 shrink-0">{k}</span>
          <span className="text-slate-200 text-right">{v}</span>
        </div>
      ))}
    </div>

    <div className="bg-slate-800 rounded-2xl p-6">
      <h2 className="text-slate-100 text-xl font-bold mb-4">Abbreviations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          ["T1", "Time of Rep 1 — the very first swim"],
          ["T10", "Time of Rep 10 — the final swim"],
          ["Avg", "Mathematical mean of all valid rep times"],
          ["Rep", "Repetition — one 50m swim"],
          ["Sc", "Stroke count — number of strokes in one 50m rep"],
          ["σ (sigma)", "Standard deviation — how much times vary rep to rep"],
          [
            "DPS",
            "Distance per stroke (50m ÷ stroke count) — efficiency measure",
          ],
          ["s", "Seconds"],
          ["m", "Metres"],
          ["DNS", "Did not start — swimmer skipped that rep"],
          ["n/a", "Data not recorded for that rep"],
        ].map(([abbr, def]) => (
          <div key={abbr} className="bg-slate-900 rounded-xl p-3 flex gap-3">
            <span className="text-cyan-400 font-bold text-sm min-w-[70px]">
              {abbr}
            </span>
            <span className="text-slate-400 text-sm">{def}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-slate-800 rounded-2xl p-6">
      <h2 className="text-slate-100 text-xl font-bold mb-4">
        Key metrics explained
      </h2>
      <div className="space-y-3">
        {[
          {
            term: "Fatigue index",
            color: "#ef4444",
            def: "% difference between your last 3 reps average and first 3 reps average. Negative = you got faster (great!). Positive = you slowed down.",
          },
          {
            term: "T1 vs average",
            color: "#f59e0b",
            def: "If T1 is above your average, you started slowly — you warmed into your pace. If T1 is below average, you started too fast and likely faded later.",
          },
          {
            term: "T10 vs average",
            color: "#10b981",
            def: "If T10 is below your average, you finished faster than your own typical pace — excellent endurance. If above, fatigue caught up by the end.",
          },
          {
            term: "Average zone (closest reps)",
            color: "#8b5cf6",
            def: "The 3 reps closest to your average. Early (Reps 1–3) = peaked too soon. Middle (4–7) = balanced. Late (8–10) = saved the best for last — outstanding.",
          },
          {
            term: "Distance per stroke (DPS)",
            color: "#06b6d4",
            def: "How far you travel per stroke (50m ÷ stroke count). Higher = more power per stroke. Team leader: Jadon at 3.70m/stroke.",
          },
          {
            term: "Consistency (σ)",
            color: "#10b981",
            def: "Standard deviation of your times. Think report card: σ < 1s = A+, 1–2s = A, 2–4s = B, 4–6s = C, > 6s = needs work.",
          },
          {
            term: "Stroke trend",
            color: "#f59e0b",
            def: "Are your stroke counts rising or falling across the set? Rising = technique breaking down under fatigue. Falling = improving efficiency.",
          },
        ].map(({ term, color, def }) => (
          <div
            key={term}
            className="bg-slate-900 rounded-xl p-4"
            style={{ borderLeft: `3px solid ${color}` }}
          >
            <p className="font-bold text-sm mb-1" style={{ color }}>
              {term}
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">{def}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-slate-800 rounded-2xl p-6">
      <h2 className="text-slate-100 text-xl font-bold mb-4">
        Understanding the graphs
      </h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {[
          [
            "Time chart (line graph)",
            "Each dot is one rep. The dashed line is your average. Dots below the line = faster than average. Red dots = outlier reps (very different from your norm).",
          ],
          [
            "Stroke count (bar chart)",
            "Each bar is one rep. Shorter = fewer strokes = more efficient. Look for bars growing taller over time — this signals fatigue breaking down technique.",
          ],
          [
            "Team chart (area + line)",
            "Green line = team's fastest each rep. Blue shaded area = team mean. A gap growing wider = team spreading out under fatigue.",
          ],
          [
            "Consistency grade (σ)",
            "A+ = σ < 1s. A = 1–2s. B = 2–4s. C = 4–6s. D = > 6s. Consistent times mean you are ready to go faster.",
          ],
        ].map(([title, desc]) => (
          <div key={title} className="bg-slate-900 rounded-xl p-4">
            <p className="text-slate-200 font-medium text-sm mb-2">{title}</p>
            <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6">
      <h2 className="text-cyan-400 text-lg font-bold mb-4">
        How to use this dashboard
      </h2>
      <ol className="space-y-3 text-sm text-slate-400 leading-relaxed">
        {[
          [
            "Team tab",
            "See how the whole team performed. Compare best time vs mean, check the fatigue wall at Rep 8, and see where you rank.",
          ],
          [
            "Individual tab",
            "Select your name from the dropdown to see your personal charts, metrics, and coach analysis.",
          ],
          [
            "Average zone",
            "Check if your 3 closest-to-average reps came Early, Middle, or Late. This reveals your true pacing pattern.",
          ],
          [
            "T1 vs T10",
            "If T10 is faster than T1, your pacing was smart. If slower, start the next set more conservatively.",
          ],
          [
            "Recommendations",
            "Read the numbered training tips — they are generated from your actual data, not generic advice.",
          ],
        ].map(([k, v], i) => (
          <li key={i} className="flex gap-3">
            <span className="text-cyan-500 font-bold min-w-[20px]">
              {i + 1}.
            </span>
            <span>
              <span className="text-slate-200 font-medium">{k}: </span>
              {v}
            </span>
          </li>
        ))}
      </ol>
    </div>
  </div>
);

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Saturday_09_05_2026_TopEndSprintSet() {
  const [tab, setTab] = useState("team");
  const tabs = [
    { id: "team", label: "Team overview" },
    { id: "individual", label: "Individual swimmers" },
    { id: "key", label: "Key & guide" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Sessions
        </Link>
        <div className="mb-6 flex items-start gap-3">
          <div
            className="w-1.5 h-12 rounded-full mt-0.5 shrink-0"
            style={{ background: "linear-gradient(180deg, #06b6d4, #3b82f6)" }}
          />
          <div>
            <h1 className="text-slate-100 text-3xl font-black tracking-tight leading-tight">
              African Sharks — Best Average Set: Freestyle
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Saturday, 9 May 2026 · 10 × 50m freestyle · 6 swimmers · Converted
              from 34m pool
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                tab === t.id
                  ? "bg-cyan-500 text-slate-900 shadow-lg"
                  : "bg-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "team" && <TeamTab />}
        {tab === "individual" && <IndividualTab />}
        {tab === "key" && <KeyTab />}
      </div>
    </div>
  );
}
