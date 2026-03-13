import React, { useState, useEffect } from "react";
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
  AreaChart,
  ComposedChart,
} from "recharts";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// ─── RAW DATA ───────────────────────────────────────────────────────────────
const SWIMMERS = {
  Jadon: {
    stroke: "butterfly",
    times: [
      58.74, 62.31, 52.09, 53.17, 55.3, 54.44, 52.81, 44.45, 59.21, 45.04,
    ],
    strokes: [21, 22, 21, 22, 22, 23, 21, 19, 24, 25],
    avg: 53.76,
    best: 44.45,
    worst: 62.31,
    std: 5.45,
    range: 17.86,
    bestRep: 8,
    worstRep: 2,
    t1VsAvg: 9.3,
    t10VsAvg: -16.2,
    fatigueIndex: -14.1,
    first3Avg: 57.71,
    last3Avg: 49.57,
    closestToAvg: [
      { rep: 4, time: 53.17, diff: 0.59 },
      { rep: 6, time: 54.44, diff: 0.68 },
      { rep: 7, time: 52.81, diff: 0.95 },
    ],
    avgRepPosition: 5.7,
    avgStrokeEff: 2.45,
    strokeTrend: 0.23,
    improvements: 5,
    slowdowns: 4,
    avgStrokes: 22.0,
    color: "#06b6d4",
    insight: "elite_butterfly",
  },
  Kofi: {
    stroke: "breaststroke",
    times: [
      81.86, 79.3, 74.63, 78.08, 76.27, 73.63, 72.79, 70.95, 63.83, 73.56,
    ],
    strokes: [41, 35, 35, 35, 31, 32, 32, 32, 24, 31],
    avg: 74.49,
    best: 63.83,
    worst: 81.86,
    std: 4.73,
    range: 18.03,
    bestRep: 9,
    worstRep: 1,
    t1VsAvg: 9.9,
    t10VsAvg: -1.2,
    fatigueIndex: -11.6,
    first3Avg: 78.6,
    last3Avg: 69.45,
    closestToAvg: [
      { rep: 3, time: 74.63, diff: 0.14 },
      { rep: 6, time: 73.63, diff: 0.86 },
      { rep: 10, time: 73.56, diff: 0.93 },
    ],
    avgRepPosition: 6.3,
    avgStrokeEff: 2.29,
    strokeTrend: -1.152,
    improvements: 7,
    slowdowns: 2,
    avgStrokes: 32.8,
    color: "#f59e0b",
    insight: "strong_improver",
  },
  Raya: {
    stroke: "butterfly",
    times: [68.18, 69.21, 66.66, 67.36, 63.9, 62.3, 66.11, 66.36, 78.17, 62.37],
    strokes: [28, 22, 26, 29, 26, 20, null, 28, 32, 22],
    avg: 67.06,
    best: 62.3,
    worst: 78.17,
    std: 4.31,
    range: 15.87,
    bestRep: 6,
    worstRep: 9,
    t1VsAvg: 1.7,
    t10VsAvg: -7.0,
    fatigueIndex: 1.4,
    first3Avg: 68.02,
    last3Avg: 68.97,
    closestToAvg: [
      { rep: 4, time: 67.36, diff: 0.3 },
      { rep: 3, time: 66.66, diff: 0.4 },
      { rep: 8, time: 66.36, diff: 0.7 },
    ],
    avgRepPosition: 5.0,
    avgStrokeEff: 2.63,
    strokeTrend: 0.067,
    improvements: 4,
    slowdowns: 5,
    avgStrokes: 25.9,
    color: "#ec4899",
    insight: "volatile_butterfly",
  },
  Jesse: {
    stroke: "butterfly",
    times: [65.18, 66.39, 61.68, 61.77, 63.47, 61.97, 61.22, 61.1, 64.6, 59.41],
    strokes: [23, 26, 26, 27, 28, 26, 25, 25, 27, 28],
    avg: 62.68,
    best: 59.41,
    worst: 66.39,
    std: 2.05,
    range: 6.98,
    bestRep: 10,
    worstRep: 2,
    t1VsAvg: 4.0,
    t10VsAvg: -5.2,
    fatigueIndex: -4.2,
    first3Avg: 64.42,
    last3Avg: 61.7,
    closestToAvg: [
      { rep: 6, time: 61.97, diff: 0.71 },
      { rep: 5, time: 63.47, diff: 0.79 },
      { rep: 4, time: 61.77, diff: 0.91 },
    ],
    avgRepPosition: 5.0,
    avgStrokeEff: 2.41,
    strokeTrend: 0.236,
    improvements: 5,
    slowdowns: 4,
    avgStrokes: 26.1,
    range: 6.98,
    bestRep: 10,
    worstRep: 2,
    color: "#10b981",
    insight: "most_consistent",
  },
  Raphaell: {
    stroke: "breaststroke",
    times: [
      82.4, 78.31, 75.01, 74.04, 75.79, 73.36, 73.06, 70.58, 73.18, 73.08,
    ],
    strokes: [36, 34, 36, 34, 29, 34, 36, 28, 33, 34],
    avg: 74.88,
    best: 70.58,
    worst: 82.4,
    std: 3.16,
    range: 11.82,
    bestRep: 8,
    worstRep: 1,
    t1VsAvg: 10.0,
    t10VsAvg: -2.4,
    fatigueIndex: -8.0,
    first3Avg: 78.57,
    last3Avg: 72.28,
    closestToAvg: [
      { rep: 3, time: 75.01, diff: 0.13 },
      { rep: 4, time: 74.04, diff: 0.84 },
      { rep: 5, time: 75.79, diff: 0.91 },
    ],
    avgRepPosition: 4.0,
    avgStrokeEff: 2.25,
    strokeTrend: -0.327,
    improvements: 7,
    slowdowns: 2,
    avgStrokes: 33.4,
    color: "#8b5cf6",
    insight: "early_peaker",
  },
  Jada: {
    stroke: "breaststroke",
    times: [
      95.72, 88.09, 95.77, 86.99, 93.25, 92.86, 95.17, 94.39, 95.68, 90.23,
    ],
    strokes: [50, 51, 51, 55, 51, 52, 54, 57, 52, 51],
    avg: 92.81,
    best: 86.99,
    worst: 95.77,
    std: 3.11,
    range: 8.78,
    bestRep: 4,
    worstRep: 3,
    t1VsAvg: 3.1,
    t10VsAvg: -2.8,
    fatigueIndex: 0.3,
    first3Avg: 93.19,
    last3Avg: 93.43,
    closestToAvg: [
      { rep: 6, time: 92.86, diff: 0.05 },
      { rep: 5, time: 93.25, diff: 0.44 },
      { rep: 8, time: 94.39, diff: 1.58 },
    ],
    avgRepPosition: 6.3,
    avgStrokeEff: 1.77,
    strokeTrend: 0.267,
    improvements: 5,
    slowdowns: 4,
    avgStrokes: 52.4,
    color: "#f97316",
    insight: "high_stroke_count",
  },
  Afia: {
    stroke: "breaststroke",
    times: [
      96.66, 95.16, 95.07, 96.59, 95.97, 97.55, 101.49, 97.68, 100.93, 99.54,
    ],
    strokes: [30, 31, 34, 30, 32, 35, 33, 36, 37, 37],
    avg: 97.66,
    best: 95.07,
    worst: 101.49,
    std: 2.16,
    range: 6.42,
    bestRep: 3,
    worstRep: 7,
    t1VsAvg: -1.0,
    t10VsAvg: 1.9,
    fatigueIndex: 3.9,
    first3Avg: 95.63,
    last3Avg: 99.38,
    closestToAvg: [
      { rep: 8, time: 97.68, diff: 0.02 },
      { rep: 6, time: 97.55, diff: 0.11 },
      { rep: 1, time: 96.66, diff: 1.0 },
    ],
    avgRepPosition: 5.0,
    avgStrokeEff: 2.93,
    strokeTrend: 0.77,
    improvements: 5,
    slowdowns: 4,
    avgStrokes: 33.5,
    color: "#14b8a6",
    insight: "negative_trend",
  },
  Abena: {
    stroke: "breaststroke",
    times: [79.63, 75.91, 73.49, 76.15, 83.88, 82.6, 84.7, 75.85, 72.56, 80.82],
    strokes: [29, 28, 29, 29, 31, 31, 33, 30, 27, 30],
    avg: 78.56,
    best: 72.56,
    worst: 84.7,
    std: 4.13,
    range: 12.14,
    bestRep: 9,
    worstRep: 7,
    t1VsAvg: 1.4,
    t10VsAvg: 2.9,
    fatigueIndex: 0.1,
    first3Avg: 76.34,
    last3Avg: 76.41,
    closestToAvg: [
      { rep: 1, time: 79.63, diff: 1.07 },
      { rep: 10, time: 80.82, diff: 2.26 },
      { rep: 4, time: 76.15, diff: 2.41 },
    ],
    avgRepPosition: 5.0,
    avgStrokeEff: 2.65,
    strokeTrend: 0.115,
    improvements: 5,
    slowdowns: 4,
    avgStrokes: 29.7,
    color: "#e11d48",
    insight: "mid_collapse",
  },
  Ronell: {
    stroke: "butterfly",
    times: [
      93.92, 84.46, 78.17, 75.71, 75.16, 68.92, 65.68, 65.46, 69.39, 58.35,
    ],
    strokes: [34, 38, 40, 41, 37, 39, 36, 40, 39, null],
    avg: 73.52,
    best: 58.35,
    worst: 93.92,
    std: 9.8,
    range: 35.57,
    bestRep: 10,
    worstRep: 1,
    t1VsAvg: 27.7,
    t10VsAvg: -20.6,
    fatigueIndex: -24.7,
    first3Avg: 85.52,
    last3Avg: 64.4,
    closestToAvg: [
      { rep: 5, time: 75.16, diff: 1.64 },
      { rep: 4, time: 75.71, diff: 2.19 },
      { rep: 9, time: 69.39, diff: 4.13 },
    ],
    avgRepPosition: 6.0,
    avgStrokeEff: 1.98,
    strokeTrend: 0.267,
    improvements: 8,
    slowdowns: 1,
    avgStrokes: 38.2,
    color: "#6366f1",
    insight: "explosive_improver",
  },
};

const TEAM_STATS = [
  { rep: 1, best: 58.74, mean: 80.25 },
  { rep: 2, best: 62.31, mean: 77.68 },
  { rep: 3, best: 52.09, mean: 74.73 },
  { rep: 4, best: 53.17, mean: 74.43 },
  { rep: 5, best: 55.3, mean: 75.89 },
  { rep: 6, best: 54.44, mean: 74.18 },
  { rep: 7, best: 52.81, mean: 74.78 },
  { rep: 8, best: 44.45, mean: 71.87 },
  { rep: 9, best: 59.21, mean: 75.28 },
  { rep: 10, best: 45.04, mean: 71.38 },
];

const fmt = (s) => {
  const m = Math.floor(s / 60);
  const sec = (s % 60).toFixed(2);
  return m > 0 ? `${m}:${sec.padStart(5, "0")}` : `${Number(sec).toFixed(2)}s`;
};

const pctColor = (v) => (v < 0 ? "#10b981" : v > 0 ? "#ef4444" : "#6b7280");
const pctArrow = (v) => (v < 0 ? "▼" : v > 0 ? "▲" : "—");

const INSIGHTS = {
  elite_butterfly: {
    note: 'Jadon is the team\'s fastest butterfly swimmer — but his Rep 9 crash (59.21s) after a blazing Rep 8 (44.45s) is a red flag. This pattern suggests he "goes all out" then pays a heavy price before recovering on Rep 10.',
    strengths: [
      "Best time on team in butterfly: 44.45s (Rep 8) — elite level for the squad",
      "Negative splitter: last 3 reps averaged 49.57s, nearly 8s faster than first 3 (57.71s)",
      "T10 was 16.2% faster than average — strong closer",
    ],
    weaknesses: [
      "Rep 9 crash: went from 44.45s (Rep 8) to 59.21s — a 14.76s regression (+33.2%). Classic over-pacing",
      "Rising stroke count (trend +0.23/rep) — technique deteriorates under cumulative fatigue",
      "Inconsistency: 17.86s range between best and worst rep",
    ],
    recs: [
      "PACING: Practice 'negative split' butterfly sets — aim for Rep 1 around 57s, building to 48s on Rep 10. Do NOT sprint Rep 8 and die on Rep 9",
      "STROKE CONTROL: Count strokes every rep; target ≤22. When count rises to 24+, it means early fatigue is creeping in",
      "ENERGY MANAGEMENT: Add 6×50m butterfly at 85% effort with 45s rest — learn to sustain high effort without crashing",
      "DRILL: 10×25m butterfly with fins focusing on hip drive rhythm — builds sustainable power",
    ],
  },
  strong_improver: {
    note: "Kofi had the most consistent progressive improvement of any breaststroke swimmer — 7 out of 9 rep transitions were faster. His stroke count dropped by ~17 strokes across the set, which is remarkable technique refinement.",
    strengths: [
      "7 out of 9 rep transitions were improvements — most progressive breaststroke swimmer",
      "Stroke count: dropped from 41 to 24 strokes by Rep 9 — strongest stroke efficiency gain on team",
      "Fatigue index: -11.6% — got meaningfully faster across the set",
    ],
    weaknesses: [
      "Rep 10 bounce: 63.83s (Rep 9) jumped back to 73.56s — lost 9.73s on final rep",
      "T1 was 9.9% above average — still starting too cautiously despite improvement",
      "High initial stroke count (41 strokes Rep 1) indicates warm-up inefficiency",
    ],
    recs: [
      "FINAL REP FOCUS: Practice 'finishing strong' — the Rep 9→10 collapse is costing you a great set. Mental reset before Rep 10",
      "WARM-UP: Add 400m easy swim before the main set — get stroke count to 32-34 from Rep 1 instead of 41",
      "STROKE CONSISTENCY: Target keeping stroke count between 28-32 for all reps. Rep 9's 24 strokes is actually too few — find the sweet spot",
      "BUILD: 4×100m breaststroke descending 1-4 (each 100m faster) — trains progressive race pace",
    ],
  },
  volatile_butterfly: {
    note: "Raya is the team's second-best butterfly swimmer by average, but the Rep 9 crash (78.17s — her worst time) is alarming. She shares Jadon's 'crash on Rep 9' pattern, suggesting a team-wide mid-set fatigue wall around Rep 9.",
    strengths: [
      "Solid average of 67.06s — second best butterfly swimmer on team",
      "T10 was 7.0% faster than average — finished well when recovered",
      "Low stroke count on Rep 6 (20 strokes) shows elite efficiency potential",
    ],
    weaknesses: [
      "Rep 9 worst time (78.17s): a 11.81s drop after Rep 8. Identical crash pattern to Jadon",
      "5 out of 9 rep transitions were slowdowns — more deterioration than improvement during the set",
      "Fatigue index: +1.4% — essentially flat, not a true negative splitter like Ronell",
    ],
    recs: [
      "ENERGY CURVE: The Rep 8→9 crash is a pacing signal. Either slow down on Rep 7-8 to prevent Rep 9 crash, or treat Rep 9 as a 'recovery rep' intentionally",
      "STROKE COUNT DISCIPLINE: Counts jumped from 20 to 32 between Reps 6 and 9 — technique collapses under fatigue. Drill in stroke counts during practice",
      "ENDURANCE BASE: 3×400m continuous swim weekly — extend the distance before speed can hold",
      "BREATHING: In butterfly, add 2×200m breathing every 3 strokes to reduce oxygen debt — this is likely causing the Rep 9 crash",
    ],
  },
  most_consistent: {
    note: "Jesse is the team's most consistent performer — a standard deviation of just 2.05s across 10 reps of butterfly is exceptional. He never cracked, never spiked, and still managed to close his fastest on Rep 10.",
    strengths: [
      "Lowest std deviation on team: 2.05s — exceptional consistency across 10 reps",
      "Smallest range: 6.98s between best and worst rep — the team's most reliable swimmer",
      "T10 was 5.2% faster than average — genuine closer who saved something for the end",
      "5 improvements, 4 slowdowns — excellent balance under fatigue",
    ],
    weaknesses: [
      "Rising stroke count (trend +0.236/rep) — subtle but continuous. By Rep 10 he's at 28 vs 23 in Rep 1",
      "Rep 2 was his slowest (66.39s) — suggests a consistent warm-up period needed before reaching speed",
      "Average of 62.68s is good but there's speed ceiling not yet reached (best 59.41s is achievable more often)",
    ],
    recs: [
      "SPEED CEILING: You're consistent — now chase your best. Add 6×25m ALL-OUT butterfly sprint sets weekly to unlock higher top-end speed",
      "STROKE COUNT: Rising from 23 to 28 strokes across the set needs attention. Target ≤26 every rep",
      "WARM-UP PROTOCOL: Rep 2 slump suggests your body takes one rep to 'switch on.' Add 4×25m race-pace butterfly into warm-up",
      "RACE STRATEGY: You are a natural negative splitter — lean into this. Start at 65s in races and close at 59s",
    ],
  },
  early_peaker: {
    note: "Raphaell's 'average zone' reps were 3, 4, and 5 — the earliest clustering of any swimmer, meaning his plateau was established by the middle of the set. He didn't fall apart, but he stopped improving mid-way through.",
    strengths: [
      "7 out of 9 rep transitions were improvements — very progressive early in the set",
      "Stroke trend: -0.327/rep — only breaststroke swimmer actively reducing stroke count over time",
      "T10 only 2.4% below average — held his pace well through the end",
    ],
    weaknesses: [
      "Average zone settled early (Reps 3-5) — improvement stalled after Rep 4",
      "T1 was 10.0% above average — highest among breaststroke swimmers. Rough start",
      "Stroke count inconsistency: oscillates between 28 (Rep 8) and 36 (Rep 7) — unstable technique under pressure",
    ],
    recs: [
      "SECOND WIND TRAINING: After reaching comfort zone, practice 'surging' — deliberately swim faster on Reps 6-8 to break the plateau pattern",
      "START QUALITY: 10.0% slow T1 is too costly. Add breaststroke race-start drills; aim for T1 within 5% of average",
      "STROKE STABILIZATION: The 8-stroke swing (28→36) between reps must be corrected. Use a tempo trainer — set to 0.65s per stroke cycle",
      "POWER SET: 6×50m breaststroke descending on 1:30 — trains you to maintain speed in the back half",
    ],
  },
  high_stroke_count: {
    note: "Jada's stroke counts (50-57 per 50m) are the highest on the team and double the most efficient swimmers. This is the most critical technical finding in this session — every stroke is not pulling enough water.",
    strengths: [
      "Excellent consistency: std dev 3.11s despite very high stroke counts — determined and controlled",
      "T10 was 2.8% below average — finished slightly faster than average pace",
      "Fatigue index: +0.3% — essentially neutral, showing strong endurance",
    ],
    weaknesses: [
      "CRITICAL: Avg 52.4 strokes/50m — approximately 2× the efficient swimmers. Each stroke covers half the distance",
      "Rising stroke trend (+0.267/rep) — stroke count increases under fatigue, reaching 57 on Rep 8",
      "Best time 86.99s is 50s slower than Jadon's best. Stroke technique is the primary limiter",
    ],
    recs: [
      "URGENT PRIORITY — STROKE TECHNIQUE: Must reduce from 52 to 35 strokes. Spend 30% of every session on: 6×50m breaststroke PULL-ONLY with buoy, counting strokes",
      "UNDERWATER: 10×25m breaststroke focusing ONLY on the pull — reach forward, catch water wide, pull in a heart-shape. Power comes from here",
      "GLIDE PHASE: Breaststroke has a glide. Hold it for 0.5 seconds after each kick. This alone cuts strokes. Practice: 10×25m 'slow breaststroke' counting under 30",
      "KICK POWER: 12×25m with kick board — stronger kick means each stroke goes further. This directly reduces stroke count",
      "VIDEO REVIEW: One-on-one technique session essential. The gains from fixing stroke count will be dramatic",
    ],
  },
  negative_trend: {
    note: "Afia is the only swimmer whose times worsened across the set — a positive fatigue index of +3.9%. Her T10 was 1.9% above average and rising stroke counts confirm accumulating fatigue with no recovery.",
    strengths: [
      "T1 was 1.0% below average — excellent start, right at sustainable pace",
      "Stroke count held relatively stable early (30-34 through Rep 6)",
      "Consistent performer overall (std dev 2.16s) — never catastrophically falls apart",
    ],
    weaknesses: [
      "Only swimmer with a positive fatigue index (+3.9%) — gets meaningfully slower over time",
      "T10 was 1.9% above average — finished slower than her own pace",
      "Stroke count jumped: 30 (Rep 1) to 37 (Rep 10) — +7 strokes, a 23% increase under fatigue",
      "Rep 7 (101.49s) — worst time of the set, right in the fatigue window",
    ],
    recs: [
      "AEROBIC BASE: This is an endurance issue. Add 2×20min continuous easy breaststroke per week — base building is the priority",
      "PACING ADJUSTMENT: Start slightly slower (target 98s for Rep 1) to preserve energy for Reps 7-10",
      "STROKE SURVIVAL: When tired, focus on the GLIDE — let momentum carry you rather than increasing stroke rate",
      "THRESHOLD TRAINING: 4×200m breaststroke at 90% effort with 90s rest — teaches your body to hold pace under fatigue",
      "KICK STRENGTH: Weak kick late in set forces higher stroke rate. 3×200m kick with board, focusing on hip flexibility",
    ],
  },
  mid_collapse: {
    note: "Abena shows a dramatic mid-set collapse — her times from Reps 1-4 (avg 76.3s) and Reps 8-10 (avg 76.4s) are nearly identical, but Reps 5-7 all exceeded 82s. This is a unique 'valley' pattern not seen in any other swimmer.",
    strengths: [
      "Recovered from mid-set collapse — Reps 8-10 returned to her opening pace",
      "Low stroke count potential: 27 strokes on Rep 9 — shows efficiency is achievable",
      "T1 was only 1.4% above average — realistic opening pace",
    ],
    weaknesses: [
      "UNUSUAL PATTERN: Reps 5-7 all 82-84s — a 10s+ regression in the middle of the set. Possible fatigue wall or distraction",
      "T10 was 2.9% above average — despite recovery, still finished slower than her average",
      "Stroke count hit 33 (Rep 7) — highest of the set, matching the time regression perfectly",
    ],
    recs: [
      "INVESTIGATE: The Reps 5-7 collapse is unusual — discuss with coach. Could be breathing pattern disruption, a specific technical breakdown, or pacing error",
      "MENTAL RESET: Practice mid-set refocus techniques. Between Reps 4-5, take a full 30-second recovery and mentally restart",
      "EVEN PACING: 8×50m breaststroke on 1:45, targeting the same time every rep. Consistency training directly targets the valley pattern",
      "BREATHING: In breaststroke, breathing should be every stroke. If you're skipping breaths when tired, this creates the Rep 5-7 wall",
      "STRENGTH: The stroke count spike to 33 on Rep 7 means leg/core fatigue. Add 3×15 breaststroke kick sets and dryland core work",
    ],
  },
  explosive_improver: {
    note: "Ronell is the team's most dramatic transformer — a 35.57-second range from worst (93.92s) to best (58.35s) is the largest on the team. He started in last place among butterfly swimmers and finished first. T1 was 27.7% above average — the team's most cautious or under-warmed starter.",
    strengths: [
      "8 out of 9 rep transitions were improvements — best improvement rate on the team",
      "Fatigue index: -24.7% — most dramatic improvement in the set (last3 avg 64.40s vs first3 avg 85.52s)",
      "Final rep 58.35s — matched Jadon's speed level by the end",
      "T10 was 20.6% below average — outstanding closer",
    ],
    weaknesses: [
      "T1 (93.92s) was 27.7% above average — the worst opening rep relative to average on the team",
      "Largest std deviation on team (9.80s) — massive inconsistency",
      "Stroke count data missing for Rep 10 — hard to confirm technique at peak speed",
      "Slow first 4 reps (average 83s) means spending too much time in fatigue-building zone early",
    ],
    recs: [
      "WARM-UP: The brutal T1 (93.92s) is the issue — 10-15min warm-up with 4×50m butterfly is essential before the main set",
      "RACE START: Practice fast starts — if you're swimming 58s by Rep 10, you CAN swim 65s from Rep 1. Aim for T1 under 75s",
      "PACING DISCIPLINE: Controlled acceleration strategy — Reps 1-3: 78-80s, Reps 4-7: 72-75s, Reps 8-10: 65s and under",
      "CONSISTENCY: When you can start at 70s instead of 94s, your average drops to ~64s. This is within reach with proper warm-up",
      "STROKE COUNT: Rising counts (34→41 by Rep 4) during slow reps suggests technique collapsing when going slow. Even in slow reps, maintain form",
    ],
  },
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#0f172a",
          border: "1px solid #334155",
          borderRadius: 8,
          padding: "10px 14px",
        }}
      >
        <p style={{ color: "#94a3b8", fontSize: 12, marginBottom: 4 }}>
          Rep {label}
        </p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color, fontSize: 13, fontWeight: 600 }}>
            {p.name}:{" "}
            {typeof p.value === "string"
              ? p.value
              : p.value != null && p.value % 1 !== 0
                ? Number(p.value).toFixed(2)
                : p.value}
            {p.name === "Time" || p.name === "Best" || p.name === "Average"
              ? "s"
              : ""}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ─── TEAM TAB ─────────────────────────────────────────────────────────────
const TeamTab = () => {
  const butterflySummary = ["Jadon", "Jesse", "Raya", "Ronell"];
  const breastSummary = ["Kofi", "Raphaell", "Jada", "Afia", "Abena"];

  const comparData = Object.entries(SWIMMERS)
    .map(([name, d]) => ({
      name: name === "NanaAma" ? "Nana Ama" : name,
      avg: d.avg,
      best: d.best,
      fatigueIndex: d.fatigueIndex,
      color: d.color,
    }))
    .sort((a, b) => a.avg - b.avg);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Overall team chart */}
      <div style={{ background: "#1e293b", borderRadius: 16, padding: 24 }}>
        <h2
          style={{
            color: "#f1f5f9",
            fontSize: 20,
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          Team Performance Across All 10 Reps
        </h2>
        <p style={{ color: "#64748b", fontSize: 13, marginBottom: 20 }}>
          Best time (green) vs. Team average (blue) per rep — Sunday, March 8,
          2026 · Fly/Breaststroke Set (10 × 50m)
        </p>
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
              label={{
                value: "Time (seconds)",
                angle: -90,
                position: "insideLeft",
                fill: "#64748b",
                fontSize: 12,
              }}
              domain={[40, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 13 }} />
            <Area
              type="monotone"
              dataKey="mean"
              fill="#1e40af22"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Average"
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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
            marginTop: 20,
          }}
        >
          {[
            {
              label: "Overall Best Time",
              val: "44.45s",
              sub: "Jadon · Rep 8",
              color: "#10b981",
            },
            {
              label: "Team Mean (all reps)",
              val: `${(TEAM_STATS.reduce((s, d) => s + d.mean, 0) / TEAM_STATS.length).toFixed(2)}s`,
              sub: "Across 10 reps",
              color: "#3b82f6",
            },
            {
              label: "Best Rep (mean)",
              val: `Rep ${TEAM_STATS.reduce((m, d) => (d.mean < m.mean ? d : m)).rep}`,
              sub: `${TEAM_STATS.reduce((m, d) => (d.mean < m.mean ? d : m)).mean.toFixed(2)}s avg`,
              color: "#f59e0b",
            },
            {
              label: "Swimmers in Set",
              val: "9",
              sub: "4 Fly · 5 Breast",
              color: "#8b5cf6",
            },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                background: "#0f172a",
                borderRadius: 10,
                padding: 16,
                borderLeft: `3px solid ${s.color}`,
              }}
            >
              <p style={{ color: "#64748b", fontSize: 11, marginBottom: 4 }}>
                {s.label}
              </p>
              <p style={{ color: s.color, fontSize: 22, fontWeight: 800 }}>
                {s.val}
              </p>
              <p style={{ color: "#475569", fontSize: 11, marginTop: 2 }}>
                {s.sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Average comparison bar chart */}
      <div style={{ background: "#1e293b", borderRadius: 16, padding: 24 }}>
        <h2
          style={{
            color: "#f1f5f9",
            fontSize: 20,
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          Swimmer Average Time Comparison
        </h2>
        <p style={{ color: "#64748b", fontSize: 13, marginBottom: 20 }}>
          Lower bar = faster swimmer. Ordered fastest → slowest.
        </p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={comparData}
            layout="vertical"
            margin={{ left: 20, right: 40 }}
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
              domain={[0, 110]}
            />
            <YAxis
              type="category"
              dataKey="name"
              stroke="#475569"
              tick={{ fill: "#94a3b8", fontSize: 13 }}
              width={70}
            />
            <Tooltip
              content={({ active, payload, label }) =>
                active && payload?.length ? (
                  <div
                    style={{
                      background: "#0f172a",
                      border: "1px solid #334155",
                      borderRadius: 8,
                      padding: "10px 14px",
                    }}
                  >
                    <p style={{ color: "#f1f5f9", fontWeight: 700 }}>{label}</p>
                    <p style={{ color: "#10b981" }}>
                      Avg: {payload[0]?.value?.toFixed(2)}s
                    </p>
                  </div>
                ) : null
              }
            />
            <Bar dataKey="avg" name="Average Time (s)" radius={[0, 4, 4, 0]}>
              {comparData.map((entry, index) => (
                <rect key={index} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Stroke groups */}
      {[
        { label: "🦋 Butterfly Swimmers", names: butterflySummary },
        { label: "🏊 Breaststroke Swimmers", names: breastSummary },
      ].map(({ label, names }) => (
        <div
          key={label}
          style={{ background: "#1e293b", borderRadius: 16, padding: 24 }}
        >
          <h2
            style={{
              color: "#f1f5f9",
              fontSize: 20,
              fontWeight: 700,
              marginBottom: 16,
            }}
          >
            {label}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 12,
            }}
          >
            {names.map((name) => {
              const d = SWIMMERS[name];
              return (
                <div
                  key={name}
                  style={{
                    background: "#0f172a",
                    borderRadius: 10,
                    padding: 16,
                    borderTop: `3px solid ${d.color}`,
                  }}
                >
                  <p
                    style={{
                      color: d.color,
                      fontWeight: 700,
                      fontSize: 16,
                      marginBottom: 8,
                    }}
                  >
                    {name}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 4,
                    }}
                  >
                    <span style={{ color: "#64748b", fontSize: 12 }}>
                      Average
                    </span>
                    <span
                      style={{
                        color: "#f1f5f9",
                        fontWeight: 600,
                        fontSize: 12,
                      }}
                    >
                      {fmt(d.avg)}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 4,
                    }}
                  >
                    <span style={{ color: "#64748b", fontSize: 12 }}>Best</span>
                    <span
                      style={{
                        color: "#10b981",
                        fontWeight: 600,
                        fontSize: 12,
                      }}
                    >
                      {fmt(d.best)}
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ color: "#64748b", fontSize: 12 }}>
                      Fatigue
                    </span>
                    <span
                      style={{
                        color: d.fatigueIndex < 0 ? "#10b981" : "#ef4444",
                        fontWeight: 600,
                        fontSize: 12,
                      }}
                    >
                      {d.fatigueIndex > 0 ? "+" : ""}
                      {d.fatigueIndex.toFixed(1)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Team insight box */}
      <div
        style={{
          background: "linear-gradient(135deg, #1e293b, #0f172a)",
          border: "1px solid #334155",
          borderRadius: 16,
          padding: 24,
        }}
      >
        <h2
          style={{
            color: "#f1f5f9",
            fontSize: 20,
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          🔍 Coach's Team-Level Observations
        </h2>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          <div
            style={{
              background: "#0f1f0f",
              border: "1px solid #166534",
              borderRadius: 10,
              padding: 16,
            }}
          >
            <p style={{ color: "#86efac", fontWeight: 700, marginBottom: 10 }}>
              ✅ Team Strengths
            </p>
            <ul
              style={{
                color: "#d1fae5",
                fontSize: 13,
                lineHeight: 1.8,
                paddingLeft: 16,
              }}
            >
              <li>
                7 of 9 swimmers improved from T1 to T10 — team trends faster
                overall
              </li>
              <li>
                Rep 8 produced the best team mean (71.87s) — good mid-set
                momentum
              </li>
              <li>
                Ronell & Kofi showed the highest absolute improvement rates
              </li>
              <li>
                Jesse's 2.05s std dev sets a consistency benchmark for the team
              </li>
            </ul>
          </div>
          <div
            style={{
              background: "#1f0f0f",
              border: "1px solid #991b1b",
              borderRadius: 10,
              padding: 16,
            }}
          >
            <p style={{ color: "#fca5a5", fontWeight: 700, marginBottom: 10 }}>
              ⚠️ Team Concerns
            </p>
            <ul
              style={{
                color: "#fee2e2",
                fontSize: 13,
                lineHeight: 1.8,
                paddingLeft: 16,
              }}
            >
              <li>
                Rep 9 "crash" pattern visible in Jadon & Raya — possible
                team-wide fatigue wall
              </li>
              <li>
                Wide avg time gap: Jadon (53.76s) vs Afia (97.66s) — 44s team
                spread
              </li>
              <li>
                Jada's avg stroke count (52/50m) is 2× the efficient swimmers
              </li>
              <li>
                Afia is the only swimmer who got slower across the set (+3.9%
                fatigue index)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── INDIVIDUAL TAB ────────────────────────────────────────────────────────
const IndividualTab = () => {
  const [selected, setSelected] = useState("Jadon");
  const d = SWIMMERS[selected];
  const insight = INSIGHTS[d.insight];

  const chartData = d.times.map((t, i) => ({
    rep: i + 1,
    time: t,
    strokes: d.strokes[i],
    avg: d.avg,
  }));

  const fatigueGood = d.fatigueIndex < 0;
  const t1Good = d.t1VsAvg > 0; // started ABOVE avg = started slow = pacing
  const t10Good = d.t10VsAvg < 0; // finished BELOW avg = finished fast

  const avgRepPos = d.avgRepPosition;
  const avgZone =
    avgRepPos <= 3.5
      ? "Early (Reps 1-3)"
      : avgRepPos <= 7
        ? "Middle (Reps 4-7)"
        : "Late (Reps 8-10)";
  const avgZoneColor =
    avgRepPos <= 3.5 ? "#f59e0b" : avgRepPos <= 7 ? "#3b82f6" : "#10b981";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Swimmer picker */}
      <div style={{ background: "#1e293b", borderRadius: 16, padding: 24 }}>
        <label
          style={{
            color: "#94a3b8",
            fontSize: 13,
            display: "block",
            marginBottom: 8,
          }}
        >
          SELECT SWIMMER
        </label>
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            background: "#0f172a",
            border: "1px solid #334155",
            borderRadius: 10,
            color: "#f1f5f9",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          {Object.keys(SWIMMERS).map((n) => (
            <option key={n} value={n}>
              {n} ({SWIMMERS[n].stroke})
            </option>
          ))}
        </select>
      </div>

      {/* Stat cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
        }}
      >
        {[
          {
            label: "Average Time",
            val: fmt(d.avg),
            sub: `Over 10 reps`,
            color: d.color,
          },
          {
            label: "Best Time",
            val: fmt(d.best),
            sub: `Rep ${d.bestRep}`,
            color: "#10b981",
          },
          {
            label: "Worst Time",
            val: fmt(d.worst),
            sub: `Rep ${d.worstRep}`,
            color: "#ef4444",
          },
          {
            label: "Consistency",
            val: `±${(d.std || 0).toFixed(1)}s`,
            sub:
              d.std < 2
                ? "Excellent"
                : d.std < 4
                  ? "Good"
                  : d.std < 6
                    ? "Moderate"
                    : "Poor",
            color: d.std < 4 ? "#10b981" : d.std < 6 ? "#f59e0b" : "#ef4444",
          },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              background: "#1e293b",
              borderRadius: 12,
              padding: 16,
              borderTop: `3px solid ${s.color}`,
            }}
          >
            <p style={{ color: "#64748b", fontSize: 11, marginBottom: 4 }}>
              {s.label}
            </p>
            <p style={{ color: s.color, fontSize: 22, fontWeight: 800 }}>
              {s.val}
            </p>
            <p style={{ color: "#475569", fontSize: 11, marginTop: 2 }}>
              {s.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Time performance chart */}
      <div style={{ background: "#1e293b", borderRadius: 16, padding: 24 }}>
        <h2
          style={{
            color: "#f1f5f9",
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          {selected} — Time Per Rep
        </h2>
        <p style={{ color: "#64748b", fontSize: 13, marginBottom: 20 }}>
          Dashed line = average ({fmt(d.avg)}). Times below the line are{" "}
          <span style={{ color: "#10b981" }}>above average</span>.
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
              label={{ value: "Avg", fill: "#475569", fontSize: 11 }}
            />
            <Area
              type="monotone"
              dataKey="time"
              fill={`${d.color}22`}
              stroke={d.color}
              strokeWidth={3}
              name="Time"
              dot={{ r: 5, fill: d.color, strokeWidth: 0 }}
            />
          </ComposedChart>
        </ResponsiveContainer>

        {/* T1 / T10 / Avg correlation */}
        {(() => {
          const t1 = d.times[0];
          const t10 = d.times[d.times.length - 1];
          const t1VsAvg = ((t1 - d.avg) / d.avg) * 100;
          const t10VsAvg = ((t10 - d.avg) / d.avg) * 100;
          const corrItems = [
            {
              label: "T1 (Opening Rep)",
              val: fmt(t1),
              diff: t1VsAvg,
              note:
                t1VsAvg > 0
                  ? "Started slower than avg"
                  : "Started faster than avg",
            },
            {
              label: "Average",
              val: fmt(d.avg),
              diff: 0,
              note: "Baseline pace",
            },
            {
              label: "T10 (Final Rep)",
              val: fmt(t10),
              diff: t10VsAvg,
              note:
                t10VsAvg < 0
                  ? "✓ Finished faster — great closer!"
                  : "Finished slower — fatigue factor",
            },
          ];
          return (
            <div
              style={{
                marginTop: 20,
                background: "#0f172a",
                borderRadius: 12,
                padding: 16,
              }}
            >
              <p
                style={{
                  color: "#94a3b8",
                  fontWeight: 700,
                  fontSize: 13,
                  marginBottom: 12,
                }}
              >
                T1 → Average → T10 Correlation
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 12,
                }}
              >
                {corrItems.map((item, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <p
                      style={{
                        color: "#475569",
                        fontSize: 11,
                        marginBottom: 4,
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        color: "#f1f5f9",
                        fontWeight: 800,
                        fontSize: 18,
                      }}
                    >
                      {item.val}
                    </p>
                    {item.diff !== 0 && (
                      <p
                        style={{
                          color: pctColor(item.diff),
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                      >
                        {pctArrow(item.diff)} {Math.abs(item.diff).toFixed(1)}%
                        vs avg
                      </p>
                    )}
                    <p style={{ color: "#475569", fontSize: 11, marginTop: 2 }}>
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>
              <div
                style={{
                  marginTop: 12,
                  borderTop: "1px solid #1e293b",
                  paddingTop: 12,
                }}
              >
                <p style={{ color: "#64748b", fontSize: 13 }}>
                  <strong style={{ color: "#94a3b8" }}>What this means:</strong>{" "}
                  {t1VsAvg > 2 && t10VsAvg < -2
                    ? `${selected} started conservatively and finished fast — a textbook negative split. This is ideal pacing.`
                    : t1VsAvg < -2 && t10VsAvg > 2
                      ? `${selected} started too fast and faded at the end — classic over-pacing. Needs to start more conservatively.`
                      : t10VsAvg < 0
                        ? `${selected} finished faster than average — good closer with solid endurance.`
                        : `${selected} finished slower than average — some fatigue accumulation by Rep 10.`}
                </p>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Stroke count chart */}
      {d.strokes.some((s) => s !== null) && (
        <div style={{ background: "#1e293b", borderRadius: 16, padding: 24 }}>
          <h2
            style={{
              color: "#f1f5f9",
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            {selected} — Stroke Count Per Rep
          </h2>
          <p style={{ color: "#64748b", fontSize: 13, marginBottom: 20 }}>
            Number of strokes per 50m. Lower = more efficient. Trend:{" "}
            {d.strokeTrend < 0
              ? "📉 Improving (reducing strokes)"
              : "📈 Increasing (more strokes over time)"}
          </p>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart
              data={chartData.map((x) => ({ ...x, strokes: x.strokes ?? 0 }))}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                dataKey="rep"
                stroke="#475569"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <YAxis
                stroke="#475569"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <Tooltip
                content={({ active, payload, label }) =>
                  active && payload?.length ? (
                    <div
                      style={{
                        background: "#0f172a",
                        border: "1px solid #334155",
                        borderRadius: 8,
                        padding: "10px 14px",
                      }}
                    >
                      <p style={{ color: "#94a3b8", fontSize: 12 }}>
                        Rep {label}
                      </p>
                      <p style={{ color: "#f59e0b", fontWeight: 600 }}>
                        Strokes: {payload[0]?.value || "n/a"}
                      </p>
                    </div>
                  ) : null
                }
              />
              <Bar
                dataKey="strokes"
                fill="#f59e0b"
                name="Stroke Count"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
          <div
            style={{
              marginTop: 12,
              background: "#0f172a",
              borderRadius: 10,
              padding: 12,
            }}
          >
            <p style={{ color: "#64748b", fontSize: 13 }}>
              <strong style={{ color: "#94a3b8" }}>
                Avg strokes:{" "}
                {d.avgStrokes != null ? d.avgStrokes.toFixed(1) : "n/a"}/50m.
              </strong>{" "}
              {d.avgStrokes < 25
                ? "Excellent stroke efficiency — each stroke covers maximum distance."
                : d.avgStrokes < 35
                  ? "Good stroke efficiency — small improvements in reach/pull will help."
                  : d.avgStrokes < 45
                    ? "Moderate efficiency — technique work on stroke length recommended."
                    : "High stroke count is a priority area — see recommendations below."}
            </p>
          </div>
        </div>
      )}

      {/* Closest to average analysis */}
      <div style={{ background: "#1e293b", borderRadius: 16, padding: 24 }}>
        <h2
          style={{
            color: "#f1f5f9",
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          When Did {selected} Hit "Average Pace"?
        </h2>
        <p style={{ color: "#64748b", fontSize: 13, marginBottom: 16 }}>
          The 3 reps closest to {selected}'s average of{" "}
          <strong style={{ color: "#f1f5f9" }}>{fmt(d.avg)}</strong>. Shows when
          their "typical" pace happens.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
          }}
        >
          {d.closestToAvg.map((item, i) => (
            <div
              key={i}
              style={{
                background: "#0f172a",
                borderRadius: 10,
                padding: 16,
                textAlign: "center",
                border: `1px solid ${d.color}44`,
              }}
            >
              <p style={{ color: d.color, fontSize: 28, fontWeight: 800 }}>
                Rep {item.rep}
              </p>
              <p
                style={{
                  color: "#f1f5f9",
                  fontSize: 18,
                  fontWeight: 600,
                  marginTop: 4,
                }}
              >
                {fmt(item.time)}
              </p>
              <p style={{ color: "#475569", fontSize: 12, marginTop: 4 }}>
                Only {item.diff.toFixed(2)}s from avg
              </p>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 16,
            background: "#0f172a",
            borderRadius: 10,
            padding: 14,
          }}
        >
          <p style={{ color: "#64748b", fontSize: 13 }}>
            <strong style={{ color: avgZoneColor }}>
              Average zone: {avgZone}
            </strong>{" "}
            (avg rep position: {(d.avgRepPosition || 0).toFixed(1)}) —{" "}
            {d.avgRepPosition <= 3.5
              ? `${selected}'s typical pace appeared early. They plateaued and couldn't sustain or improve later.`
              : d.avgRepPosition <= 7
                ? `${selected}'s typical pace was in the middle of the set — balanced performance throughout.`
                : `${selected}'s typical pace appeared late — meaning they were below average early and saved their best for last. Outstanding endurance pattern.`}
          </p>
        </div>
      </div>

      {/* Key metrics */}
      <div style={{ background: "#1e293b", borderRadius: 16, padding: 24 }}>
        <h2
          style={{
            color: "#f1f5f9",
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 16,
          }}
        >
          Performance Metrics
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
          }}
        >
          {[
            {
              label: "Fatigue Index",
              val: `${d.fatigueIndex > 0 ? "+" : ""}${(d.fatigueIndex || 0).toFixed(1)}%`,
              sub: fatigueGood ? "✓ Got faster" : "✗ Slowed down",
              color: fatigueGood ? "#10b981" : "#ef4444",
            },
            {
              label: "First 3 Rep Avg",
              val: fmt(d.first3Avg),
              sub: "Opening pace",
              color: "#f59e0b",
            },
            {
              label: "Last 3 Rep Avg",
              val: fmt(d.last3Avg),
              sub: "Closing pace",
              color: fatigueGood ? "#10b981" : "#ef4444",
            },
            {
              label: "Reps Improved",
              val: `${d.improvements}/9`,
              sub: "Rep-to-rep faster",
              color: d.improvements >= 6 ? "#10b981" : "#f59e0b",
            },
            {
              label: "Time Range",
              val: `${(d.range || 0).toFixed(1)}s`,
              sub: "Best vs Worst",
              color:
                d.range < 8 ? "#10b981" : d.range < 15 ? "#f59e0b" : "#ef4444",
            },
            {
              label: "Stroke Efficiency",
              val: d.avgStrokeEff
                ? `${d.avgStrokeEff.toFixed(2)}s/stroke`
                : "n/a",
              sub: "Avg time per stroke",
              color: d.color,
            },
          ].map((m, i) => (
            <div
              key={i}
              style={{ background: "#0f172a", borderRadius: 10, padding: 14 }}
            >
              <p style={{ color: "#475569", fontSize: 11, marginBottom: 4 }}>
                {m.label}
              </p>
              <p style={{ color: m.color, fontWeight: 700, fontSize: 18 }}>
                {m.val}
              </p>
              <p style={{ color: "#475569", fontSize: 11, marginTop: 2 }}>
                {m.sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Coach insight + recs */}
      <div style={{ background: "#1e293b", borderRadius: 16, padding: 24 }}>
        <h2
          style={{
            color: "#f1f5f9",
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          Coach's Analysis for {selected}
        </h2>
        <div
          style={{
            background: "#0f172a",
            borderRadius: 10,
            padding: 14,
            borderLeft: `3px solid ${d.color}`,
            marginBottom: 20,
          }}
        >
          <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7 }}>
            {insight.note}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginBottom: 20,
          }}
        >
          <div>
            <p
              style={{
                color: "#86efac",
                fontWeight: 700,
                fontSize: 14,
                marginBottom: 10,
              }}
            >
              ✅ Strengths
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {insight.strengths.map((s, i) => (
                <li
                  key={i}
                  style={{
                    background: "#0f1f0f",
                    border: "1px solid #166534",
                    borderRadius: 8,
                    padding: "10px 12px",
                    color: "#d1fae5",
                    fontSize: 13,
                    lineHeight: 1.5,
                  }}
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p
              style={{
                color: "#fca5a5",
                fontWeight: 700,
                fontSize: 14,
                marginBottom: 10,
              }}
            >
              ⚠️ Areas to Improve
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {insight.weaknesses.map((w, i) => (
                <li
                  key={i}
                  style={{
                    background: "#1f0f0f",
                    border: "1px solid #991b1b",
                    borderRadius: 8,
                    padding: "10px 12px",
                    color: "#fee2e2",
                    fontSize: 13,
                    lineHeight: 1.5,
                  }}
                >
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p
          style={{
            color: "#60a5fa",
            fontWeight: 700,
            fontSize: 14,
            marginBottom: 10,
          }}
        >
          🎯 Training Recommendations
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {insight.recs.map((r, i) => (
            <div
              key={i}
              style={{
                background: "#0f172a",
                border: "1px solid #1e3a5f",
                borderRadius: 8,
                padding: "12px 16px",
                borderLeft: `3px solid ${d.color}`,
                color: "#e2e8f0",
                fontSize: 13,
                lineHeight: 1.6,
              }}
            >
              <span style={{ color: d.color, fontWeight: 700 }}>{i + 1}.</span>{" "}
              {r}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── KEY TAB ──────────────────────────────────────────────────────────────
const KeyTab = () => (
  <div
    style={{
      background: "#1e293b",
      borderRadius: 16,
      padding: 24,
      display: "flex",
      flexDirection: "column",
      gap: 24,
    }}
  >
    <div>
      <h2
        style={{
          color: "#f1f5f9",
          fontSize: 22,
          fontWeight: 800,
          marginBottom: 4,
        }}
      >
        Dashboard Key & Guide
      </h2>
      <p style={{ color: "#64748b", fontSize: 13 }}>
        Everything you need to understand the data — no swimming jargon left
        unexplained.
      </p>
    </div>

    <div>
      <h3
        style={{
          color: "#93c5fd",
          fontSize: 16,
          fontWeight: 700,
          marginBottom: 12,
        }}
      >
        Session Information
      </h3>
      <div
        style={{
          background: "#0f172a",
          borderRadius: 10,
          padding: 16,
          color: "#94a3b8",
          fontSize: 13,
          lineHeight: 2,
        }}
      >
        <div>
          <strong style={{ color: "#f1f5f9" }}>Workout:</strong> 10 × 50m Fly or
          Breaststroke (each swimmer swam their designated stroke)
        </div>
        <div>
          <strong style={{ color: "#f1f5f9" }}>Date:</strong> Sunday, March 8,
          2026
        </div>
        <div>
          <strong style={{ color: "#f1f5f9" }}>Butterfly swimmers:</strong>{" "}
          Jesse, Jadon, Ronell, Raya
        </div>
        <div>
          <strong style={{ color: "#f1f5f9" }}>Breaststroke swimmers:</strong>{" "}
          Abena, Afia, Kofi, Raphael, Jada
        </div>
        <div>
          <strong style={{ color: "#f1f5f9" }}>Goal:</strong> Test race-stroke
          endurance, technique under fatigue, and pacing strategy across 10
          repetitions
        </div>
      </div>
    </div>

    <div>
      <h3
        style={{
          color: "#93c5fd",
          fontSize: 16,
          fontWeight: 700,
          marginBottom: 12,
        }}
      >
        Abbreviations
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 8,
        }}
      >
        {[
          ["T1", "Time of Rep 1 — the very first swim"],
          ["T10", "Time of Rep 10 — the final swim"],
          ["Avg / Average", "Mathematical mean: add all times, divide by 10"],
          ["Rep", "Repetition — one 50m swim"],
          ["Sc", "Stroke Count — number of strokes in one 50m"],
          ["σ (StdDev)", "Standard Deviation — how much times vary"],
          ["s", "Seconds"],
          ["m", "Meters"],
          ["Fly", "Butterfly stroke"],
          ["Breast", "Breaststroke"],
          ["n/a", "Data not recorded for that rep"],
          ["DNS", "Did Not Start (swimmer stopped early)"],
        ].map(([abbr, def]) => (
          <div
            key={abbr}
            style={{
              background: "#0f172a",
              borderRadius: 8,
              padding: "10px 14px",
              display: "flex",
              gap: 10,
            }}
          >
            <span
              style={{
                color: "#60a5fa",
                fontWeight: 700,
                minWidth: 80,
                fontSize: 13,
              }}
            >
              {abbr}
            </span>
            <span style={{ color: "#94a3b8", fontSize: 13 }}>{def}</span>
          </div>
        ))}
      </div>
    </div>

    <div>
      <h3
        style={{
          color: "#93c5fd",
          fontSize: 16,
          fontWeight: 700,
          marginBottom: 12,
        }}
      >
        Key Metrics Explained
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          {
            term: "Fatigue Index",
            color: "#ef4444",
            def: "The % difference between your last 3 reps average and first 3 reps average. NEGATIVE = you got faster (great!). POSITIVE = you slowed down.",
          },
          {
            term: "T1 vs Average",
            color: "#f59e0b",
            def: "If T1 is ABOVE average, you started slowly — you warmed into your pace. If T1 is BELOW average, you started too fast and likely faded later.",
          },
          {
            term: "T10 vs Average",
            color: "#10b981",
            def: "If T10 is BELOW average, you finished faster than your own typical pace — a sign of excellent endurance. If above, fatigue caught up.",
          },
          {
            term: "Average Zone (Closest Reps)",
            color: "#8b5cf6",
            def: "The 3 reps closest to your average. If they fall early (Reps 1-4), you peaked early. Middle (5-7) = balanced. Late (8-10) = your best effort came at the end — outstanding.",
          },
          {
            term: "Stroke Efficiency (s/stroke)",
            color: "#06b6d4",
            def: "Seconds per stroke. Higher means each stroke travels further. But it must be balanced — too slow per stroke = poor overall time.",
          },
          {
            term: "Stroke Trend",
            color: "#f59e0b",
            def: "Are your stroke counts going up or down across the set? Decreasing = improving technique. Increasing = fatigue breaking down form.",
          },
          {
            term: "Rep-to-Rep Improvements",
            color: "#10b981",
            def: "How many consecutive rep pairs were faster than the previous. Out of 9 transitions, 7+ improvements = strong progressive performance.",
          },
        ].map(({ term, color, def }) => (
          <div
            key={term}
            style={{
              background: "#0f172a",
              borderRadius: 10,
              padding: 14,
              borderLeft: `3px solid ${color}`,
            }}
          >
            <p
              style={{ color, fontWeight: 700, marginBottom: 4, fontSize: 14 }}
            >
              {term}
            </p>
            <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.6 }}>
              {def}
            </p>
          </div>
        ))}
      </div>
    </div>

    <div>
      <h3
        style={{
          color: "#93c5fd",
          fontSize: 16,
          fontWeight: 700,
          marginBottom: 12,
        }}
      >
        Understanding the Graphs
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[
          [
            "Time Chart (line graph)",
            "Each dot is one rep. The dashed line is your average. Dots below the line = faster than your average. Dots above = slower.",
          ],
          [
            "Stroke Count (bar chart)",
            "Each bar is one rep. Shorter bars = fewer strokes = better efficiency. Look for bars growing taller over time — this signals fatigue.",
          ],
          [
            "Team Best vs Average (area chart)",
            "The top line shows the team's fastest time each rep. The lower shaded area tracks the team's average. A narrowing gap = team getting more consistent.",
          ],
          [
            "Consistency (σ)",
            "Think of it like a report card for steadiness. Under 2s = A+. 2-4s = B. 4-6s = C. Over 6s = needs work.",
          ],
        ].map(([title, desc]) => (
          <div
            key={title}
            style={{ background: "#0f172a", borderRadius: 10, padding: 14 }}
          >
            <p
              style={{
                color: "#f1f5f9",
                fontWeight: 700,
                fontSize: 13,
                marginBottom: 6,
              }}
            >
              {title}
            </p>
            <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6 }}>
              {desc}
            </p>
          </div>
        ))}
      </div>
    </div>

    <div
      style={{
        background: "linear-gradient(135deg, #1e3a5f, #0f172a)",
        border: "1px solid #1e3a5f",
        borderRadius: 12,
        padding: 20,
      }}
    >
      <h3
        style={{
          color: "#93c5fd",
          fontSize: 16,
          fontWeight: 700,
          marginBottom: 10,
        }}
      >
        💡 How to Use This Dashboard
      </h3>
      <ol
        style={{
          color: "#94a3b8",
          fontSize: 13,
          lineHeight: 2.2,
          paddingLeft: 20,
        }}
      >
        <li>
          <strong style={{ color: "#f1f5f9" }}>Team tab:</strong> See how
          everyone performed together. Compare your average to the team average.
        </li>
        <li>
          <strong style={{ color: "#f1f5f9" }}>Individual tab:</strong> Select
          your name to see only your data — times, strokes, and your personal
          insights.
        </li>
        <li>
          <strong style={{ color: "#f1f5f9" }}>Average Zone:</strong> Check if
          your best swims happen early, middle, or late — and what it tells you
          about your pacing.
        </li>
        <li>
          <strong style={{ color: "#f1f5f9" }}>T1 vs T10:</strong> If your T10
          is faster, you paced well. If slower, you need to start more
          conservatively.
        </li>
        <li>
          <strong style={{ color: "#f1f5f9" }}>Recommendations:</strong> Read
          the numbered training tips under your profile — they are based on your
          actual data.
        </li>
      </ol>
    </div>
  </div>
);

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function BestAverageSet_Fly_Breast() {
  const [tab, setTab] = useState("team");

  const tabs = [
    { id: "team", label: "Team Overview" },
    { id: "individual", label: "Individual Swimmers" },
    { id: "key", label: "Key & Guide" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        padding: 24,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                width: 6,
                height: 40,
                background: "linear-gradient(180deg, #06b6d4, #3b82f6)",
                borderRadius: 3,
              }}
            />
            <div>
              <Link
                to="/"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sessions
              </Link>
              <h1
                style={{
                  color: "#f1f5f9",
                  fontSize: 28,
                  fontWeight: 900,
                  margin: 0,
                  letterSpacing: "-0.5px",
                }}
              >
                African Sharks — Best Average Set: Butterfly & Breaststroke
              </h1>
              <p style={{ color: "#475569", fontSize: 13, margin: 0 }}>
                March 8, 2026 · Butterfly & Breaststroke · 10 × 50m
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: "10px 20px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 14,
                transition: "all 0.2s",
                background: tab === t.id ? "#06b6d4" : "#1e293b",
                color: tab === t.id ? "#0f172a" : "#64748b",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {tab === "team" && <TeamTab />}
        {tab === "individual" && <IndividualTab />}
        {tab === "key" && <KeyTab />}
      </div>
    </div>
  );
}
