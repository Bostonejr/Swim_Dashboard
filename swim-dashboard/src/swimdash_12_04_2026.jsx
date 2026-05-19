import React, { useState, useEffect } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine, Area, ComposedChart
} from "recharts";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// ─── RESPONSIVE HOOK ────────────────────────────────────────────────────────
const useWindowWidth = () => {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
};

// ─── RAW DATA (all times in seconds) ────────────────────────────────────────
const SWIMMERS = {
  Jason: {
    times: [79,86,86,86,87,90,88,90,89,86,91,null,null,null,null,null,null,86,102,99],
    avg: 88.9, best: 79, worst: 102, bestRep: 1, worstRep: 19,
    std: 5.5, range: 23, fatigueIndex: 14.3, first3Avg: 83.7, last3Avg: 95.7,
    t1VsAvg: -11.2, t20VsAvg: 11.3, improvements: 4, slowdowns: 6,
    h1avg: 87, h2avg: 95, halfDiff: 9.0,
    closestToAvg: [{rep:9,time:89,diff:0.1},{rep:7,time:88,diff:0.9},{rep:6,time:90,diff:1.1}],
    avgRepPosition: 7.3, avgStrokes: null,
    color: "#06b6d4",
    note: "⚠ Muscle pull sustained between Reps 12–17. Times T12–T17 excluded from averages.",
    insight: "jason"
  },
  Jadon: {
    times: [87,92,88,91,89,85,92,88,91,87,91,93,89,87,88,93,83,114,92,84],
    avg: 90.2, best: 83, worst: 114, bestRep: 17, worstRep: 18,
    std: 6.2, range: 31, fatigueIndex: 8.6, first3Avg: 89.0, last3Avg: 96.7,
    t1VsAvg: -3.5, t20VsAvg: -6.9, improvements: 10, slowdowns: 9,
    h1avg: 89, h2avg: 91, halfDiff: 2.7,
    closestToAvg: [{rep:4,time:91,diff:0.8},{rep:9,time:91,diff:0.8},{rep:11,time:91,diff:0.8}],
    avgRepPosition: 8.0, avgStrokes: null,
    color: "#f59e0b",
    note: "Rep 18 (1:54) is a clear outlier — 27s above average. T17 (1:23) was a personal best, suggesting Rep 18 fatigue was a direct consequence.",
    insight: "jadon"
  },
  Kofi: {
    times: [95,95,93,97,94,92,96,94,94,90,93,96,93,93,98,96,90,97,93,87],
    avg: 93.8, best: 87, worst: 98, bestRep: 20, worstRep: 15,
    std: 2.6, range: 11, fatigueIndex: -2.1, first3Avg: 94.3, last3Avg: 92.3,
    t1VsAvg: 1.3, t20VsAvg: -7.2, improvements: 10, slowdowns: 6,
    h1avg: 94, h2avg: 94, halfDiff: -0.4,
    closestToAvg: [{rep:5,time:94,diff:0.2},{rep:8,time:94,diff:0.2},{rep:9,time:94,diff:0.2}],
    avgRepPosition: 7.3, avgStrokes: null,
    color: "#10b981",
    note: "Most consistent swimmer of the session. Only 11s between best and worst rep across 20 reps. Negative fatigue index shows he actually got slightly faster by the end.",
    insight: "kofi"
  },
  Raphael: {
    times: [95,104,104,102,99,109,102,97,104,98,null,132,null,97,98,100,85,120,111,108],
    avg: 103.6, best: 85, worst: 132, bestRep: 17, worstRep: 12,
    std: 10.0, range: 47, fatigueIndex: 11.9, first3Avg: 101.0, last3Avg: 113.0,
    t1VsAvg: -8.3, t20VsAvg: 4.2, improvements: 8, slowdowns: 6,
    h1avg: 101, h2avg: 106, halfDiff: 4.9,
    closestToAvg: [{rep:2,time:104,diff:0.4},{rep:3,time:104,diff:0.4},{rep:9,time:104,diff:0.4}],
    avgRepPosition: 4.7, avgStrokes: null,
    color: "#8b5cf6",
    note: "Rep 12 (2:12) and T17 (1:25) are extreme outliers — a 47-second performance range suggests severe inconsistency. Rep 11 is also n/a, coinciding with Jason's injury window.",
    insight: "raphael"
  },
  Jesse: {
    times: [97,107,108,102,105,110,110,106,110,100,95,98,98,99,98,102,104,109,125,107],
    avg: 104.5, best: 95, worst: 125, bestRep: 11, worstRep: 19,
    std: 6.7, range: 30, fatigueIndex: 9.3, first3Avg: 104.0, last3Avg: 113.7,
    t1VsAvg: -7.2, t20VsAvg: 2.4, improvements: 6, slowdowns: 11,
    h1avg: 106, h2avg: 104, halfDiff: -1.9,
    closestToAvg: [{rep:5,time:105,diff:0.5},{rep:17,time:104,diff:0.5},{rep:8,time:106,diff:1.5}],
    avgRepPosition: 10.0, avgStrokes: null,
    color: "#ec4899",
    note: "Rep 11 (1:35) was his best — a sharp reset suggesting a rest interval between the two halves. Rep 19 (2:05) was his worst, showing late-set fatigue. His 11 slowdowns vs 6 improvements reveals a gradual decline pattern.",
    insight: "jesse"
  },
  Jada: {
    times: [107,110,107,113,115,120,115,110,117,124,106,116,116,120,130,125,130,150,149,155],
    avg: 121.8, best: 106, worst: 155, bestRep: 11, worstRep: 20,
    std: 14.2, range: 49, fatigueIndex: 40.1, first3Avg: 108.0, last3Avg: 151.3,
    t1VsAvg: -12.1, t20VsAvg: 27.3, improvements: 6, slowdowns: 12,
    h1avg: 114, h2avg: 130, halfDiff: 14.0,
    closestToAvg: [{rep:6,time:120,diff:1.8},{rep:14,time:120,diff:1.8},{rep:10,time:124,diff:2.3}],
    avgRepPosition: 10.0, avgStrokes: null,
    color: "#f97316",
    note: "Severe fatigue curve: 40.1% fatigue index, the highest among healthy swimmers. Reps 18–20 (2:30, 2:29, 2:35) show she was swimming nearly a full minute slower per 100m than her opening reps.",
    insight: "jada"
  },
  Aseda: {
    times: [111,120,122,131,155,158,180,194,207,217,118,140,183,218,190,255,290,259,289,249],
    avg: 189.3, best: 111, worst: 290, bestRep: 1, worstRep: 17,
    std: 56.3, range: 179, fatigueIndex: 125.8, first3Avg: 117.7, last3Avg: 265.7,
    t1VsAvg: -41.4, t20VsAvg: 31.5, improvements: 4, slowdowns: 15,
    h1avg: 160, h2avg: 219, halfDiff: 37.4,
    closestToAvg: [{rep:15,time:190,diff:0.7},{rep:8,time:194,diff:4.7},{rep:13,time:183,diff:6.3}],
    avgRepPosition: 12.0, avgStrokes: null,
    color: "#ef4444",
    note: "CRITICAL: 125.8% fatigue index is the highest on the team. T1 (1:51) vs T20 (4:09) reveals the swimmer nearly doubled their time over 20 reps. The set was too long for current conditioning level.",
    insight: "aseda"
  },
  Ronell: {
    times: [117,112,115,130,131,129,139,136,137,140,105,114,121,127,130,131,150,153,150,156],
    avg: 131.2, best: 105, worst: 156, bestRep: 11, worstRep: 20,
    std: 14.0, range: 51, fatigueIndex: 33.4, first3Avg: 114.7, last3Avg: 153.0,
    t1VsAvg: -10.8, t20VsAvg: 18.9, improvements: 5, slowdowns: 14,
    h1avg: 129, h2avg: 134, halfDiff: 4.0,
    closestToAvg: [{rep:5,time:131,diff:0.2},{rep:16,time:131,diff:0.2},{rep:4,time:130,diff:1.2}],
    avgRepPosition: 8.3, avgStrokes: null,
    color: "#6366f1",
    note: "Rep 11 (1:45) is a dramatic 25-second improvement from Rep 10 (2:20), confirming a significant rest period between halves. Despite this reset, times continue to worsen to 2:36 by Rep 20.",
    insight: "ronell"
  },
  Afia: {
    times: [110,130,137,147,159,170,195,215,234,239,120,137,156,179,207,236,213,151,187,214],
    avg: 176.8, best: 110, worst: 239, bestRep: 1, worstRep: 10,
    std: 39.7, range: 129, fatigueIndex: 46.4, first3Avg: 125.7, last3Avg: 184.0,
    t1VsAvg: -37.8, t20VsAvg: 21.0, improvements: 3, slowdowns: 16,
    h1avg: 174, h2avg: 180, halfDiff: 3.7,
    closestToAvg: [{rep:14,time:179,diff:2.2},{rep:6,time:170,diff:6.8},{rep:19,time:187,diff:10.2}],
    avgRepPosition: 13.0, avgStrokes: null,
    color: "#14b8a6",
    note: "Most dramatic first-half collapse: Rep 10 (3:59) is 129s slower than Rep 1 (1:50). Rep 11 reset to 2:00 shows rest interval benefit, but the swimmer still reached 3:56 by Rep 16. Only 3 rep-to-rep improvements in the entire set.",
    insight: "afia"
  }
};

const TEAM_STATS = [
  {rep:1,best:79.0,mean:99.8},{rep:2,best:86.0,mean:106.2},{rep:3,best:86.0,mean:106.7},
  {rep:4,best:86.0,mean:111.0},{rep:5,best:87.0,mean:114.9},{rep:6,best:85.0,mean:118.1},
  {rep:7,best:88.0,mean:124.1},{rep:8,best:88.0,mean:125.6},{rep:9,best:89.0,mean:131.4},
  {rep:10,best:86.0,mean:131.2},{rep:11,best:91.0,mean:102.4},{rep:12,best:93.0,mean:115.8},
  {rep:13,best:89.0,mean:122.3},{rep:14,best:87.0,mean:127.5},{rep:15,best:88.0,mean:129.9},
  {rep:16,best:93.0,mean:142.3},{rep:17,best:83.0,mean:143.1},{rep:18,best:86.0,mean:137.7},
  {rep:19,best:92.0,mean:144.2},{rep:20,best:84.0,mean:139.9}
];

const INSIGHTS = {
  jason: {
    note: "Jason opened with a blistering 1:19 — 11.2% faster than his average — and was the fastest swimmer of the session. His injury (muscle pull, Reps 12–17) makes full analysis impossible, but Reps 18–20 post-injury reveal a steep 13–23s deficit versus pre-injury times. His 14.3% fatigue index is heavily skewed by the injury disruption.",
    strengths: [
      "Fastest swimmer on the team: 1:19 on Rep 1 — elite opening speed",
      "Strong pre-injury consistency: Reps 1–11 ranged only 12s (1:19–1:31)",
      "Good average time of 1:29 despite an injury-shortened set",
      "Rep 18 post-injury (1:26) shows remarkable resilience — matched his Rep 2-4 times"
    ],
    weaknesses: [
      "Injury (muscle pull R12–R17) broke race continuity and inflated fatigue stats",
      "Post-injury Reps 19–20 (1:42, 1:39) were 13–23s above pre-injury average — shows incomplete recovery",
      "Jason's injury likely had a pacing cause. He opened 11.2% faster than his sustainable average (1:19 vs 1:29 avg). On a 20-rep set, opening that aggressively increases muscular strain risk. Dry-land and pre-pool workouts should also be taken seriously",
      "Only 4 rep-to-rep improvements vs 6 slowdowns in completed reps"
    ],
    recs: [
      "INJURY PROTOCOL: Full recovery assessment before next long-set session. Do not return to 20×100m until muscle pull is confirmed healed",
      "PACING: Opening 1:19 was too fast — target T1 within 5% of average (around 1:24) to reduce injury risk on long sets",
      "WARM-UP: Add targeted dynamic stretching and activation for the affected muscle group before sessions",
      "BUILD BACK: Start with 10×100m sets at controlled pace, then 15×100m, before returning to full 20-rep sets"
    ]
  },
  jadon: {
    note: "Jadon is the team's most balanced performer: 10 improvements, 9 slowdowns over 20 reps, showing true even-effort pacing. His Rep 18 crash (1:54, 27s above average) after a personal best on Rep 17 (1:23) is the clearest over-pacing penalty in the session. His T20 (1:24) being 6.9% FASTER than average shows exceptional closing strength when paced correctly.",
    strengths: [
      "Only swimmer to finish T20 significantly faster than their average (-6.9%) — elite closer",
      "10 rep-to-rep improvements — highest improvement count among fast swimmers",
      "T1 at 1:27 was only 3.5% below average — near-perfect opening pace",
      "Rep 17 personal best (1:23) shows sprint capability when fresh"
    ],
    weaknesses: [
      "Rep 18 crash (1:54) after Rep 17 sprint — a textbook over-exertion penalty (+27s in one rep)",
      "Second-half average (91s) is only marginally slower than first (89s), but spike outliers inflate the gap",
      "8.6% fatigue index — room to improve end-set endurance",
      "Reps 12, 16 (1:33s) represent recurring mid-set fatigue pockets"
    ],
    recs: [
      "REP 17–18 TRAP: Never sprint Rep 17 on a 20-rep set — you're guaranteed to crash on 18. Practice controlled acceleration only in Reps 18-20",
      "PACING STRATEGY: Aim for even splits of 1:28–1:30 for Reps 1–17, then build on 18–20. Your T20 of 1:24 proves you CAN close fast",
      "SPRINT TRAINING: 6×50m all-out with 60s rest — improve top-end speed so 1:23 becomes the ceiling, not the floor",
      "ENDURANCE BASE: Add 2×800m continuous swim weekly — reduce the fatigue index below 5%"
    ]
  },
  kofi: {
    note: "Kofi is the session's standout performer for consistency: a 2.6s standard deviation across 20 reps of 100m freestyle is exceptional. His negative fatigue index (-2.1%) makes him the only swimmer — besides Jesse — to maintain or improve pace across the full set. His T20 (1:27) was 7.2% faster than his average, placing him firmly in the elite closer category.",
    strengths: [
      "Lowest standard deviation on team: ±2.6s — exceptional race pacing discipline",
      "Negative fatigue index (-2.1%) — one of only two swimmers who got slightly FASTER overall",
      "T20 (1:27) was 7.2% faster than average — strong closer across a grueling 20-rep set",
      "10 rep-to-rep improvements — equal-best improvement count on the team",
      "Perfect half-split: H1 avg (94s) ≈ H2 avg (94s) — almost zero half-to-half degradation"
    ],
    weaknesses: [
      "Average of 1:34 is 4th fastest — his consistency is excellent but raw speed has room to grow",
      "Rep 15 (1:38) represents a periodic fatigue pocket in the second half",
      "T1 (1:35) was 1.3% above average — he starts slightly slower and gradually builds"
    ],
    recs: [
      "SPEED CEILING: Your consistency is elite — now chase faster. Add 4×25m all-out freestyle weekly to build top-end speed",
      "RACE STRATEGY: Your natural negative split (starting slightly slower, finishing faster) is ideal. Lock in this approach for competition",
      "TARGET: Push average below 1:30 over the next 6 weeks using your current pacing discipline",
      "STRENGTH: Upper-body pull sets — 8×50m pull-only with buoy — to add propulsive power per stroke"
    ]
  },
  raphael: {
    note: "Raphael's 47-second performance range (1:25–2:12) is the widest among swimmers with mostly complete data. His Rep 12 crash (2:12) coincides with the injury window around Rep 11, suggesting possible psychological or physical disruption. Rep 17 (1:25) was his best time — mid-second-half — which is an unusual peak pattern for an endurance set.",
    strengths: [
      "Rep 17 personal best (1:25) shows elite speed is accessible even mid-second-half",
      "8 rep-to-rep improvements despite missing reps — progressive improvement tendency",
      "T1 (1:35) only 8.3% below average — reasonable opening pace",
      "H1 average (101s) shows competitive first-half performance"
    ],
    weaknesses: [
      "Widest performance range: 47s between best (1:25) and worst (2:12) — unacceptable inconsistency",
      "Rep 12 (2:12) and missing reps create a suspicious pattern near Jason's injury period",
      "Fatigue index of 11.9% — significant second-half deterioration",
      "Average zone falls in Reps 2-3-9 — his 'typical' pace was early-set, suggesting he can't sustain it"
    ],
    recs: [
      "CRITICAL — CONSISTENCY: A 47s range means you are swimming two completely different races. Focus: 12×100m at FIXED target pace (1:44) every rep before attempting speed work",
      "INVESTIGATE REP 12: The 2:12 outlier needs explanation — was it a technique collapse, breathing issue, or external disruption? Film analysis recommended",
      "PACING CONTROL: Use a tempo trainer — set to maintain even stroke rate throughout. Stop varying effort dramatically",
      "AEROBIC BASE: 3×600m continuous easy swim weekly — build the endurance base that makes your 1:25 more sustainable"
    ]
  },
  jesse: {
    note: "Jesse presents an interesting paradox: 11 slowdowns vs 6 improvements, yet his second-half average (104s) is actually marginally BETTER than his first half (106s). This is entirely explained by Rep 11 (1:35) — his best rep and a clear rest-interval reset. He is a swimmer who needs rest to perform but struggles to sustain speed under continuous fatigue.",
    strengths: [
      "Best Rep 11 (1:35) shows strong reset capability after rest — can produce quality swims when recovered",
      "Second-half average (104s) marginally better than first half (106s) — holds up well overall",
      "Average zone position 10.0 — his 'typical' pace sits in the mid-to-late set, showing endurance",
      "Consistent mid-range performer: std dev 6.7s despite 20 tough reps"
    ],
    weaknesses: [
      "11 slowdowns vs 6 improvements — more deterioration rep-to-rep than any other top-5 swimmer",
      "Rep 19 (2:05) was worst time — severe late-set collapse just 2 reps from finish",
      "Fatigue index 9.3% — consistent downward drift across the set",
      "First-half average (106s) is slower than his theoretical capability shown in Rep 11"
    ],
    recs: [
      "CONTINUOUS SWIM TRAINING: Jesse thrives on rest — build aerobic endurance with 4×400m continuous swims, no rest between, weekly",
      "REP 17-19 FOCUS: The late-set collapse (Reps 17-20) is your Achilles heel. Practice 'race-finish' psychology: every session, swim the final 3 reps as if they're the most important",
      "PACING: First-half reps 1–3 should be SLOWER than average, not faster — let the body warm up rather than fight it",
      "TEMPO WORK: 6×100m descending (each 100m 2s faster) — trains the body to run negative splits naturally"
    ]
  },
  jada: {
    note: "Jada's 40.1% fatigue index is the highest among swimmers with complete data. Her opening reps (1:47–1:50) were competitive, but a catastrophic second-half collapse saw Reps 18–20 exceed 2:29. The 14% gap between H1 (114s) and H2 (130s) averages reveals this is a pure aerobic conditioning issue, not technique.",
    strengths: [
      "Competitive opening pace: T1 (1:47) and T3 (1:47) show she can start at a strong pace",
      "Rep 11 recovery (1:46) was her best — demonstrates resetting ability",
      "Completed all 20 reps — shows determination and commitment to finishing"
    ],
    weaknesses: [
      "40.1% fatigue index — highest among complete-data swimmers (second only to Aseda)",
      "T20 (2:35) is 27.3% slower than her average — catastrophic end-set collapse",
      "Reps 18–20 average 2:31 — swimming 44 seconds slower per 100m than opening reps",
      "12 slowdowns vs 6 improvements — consistent downward trend throughout",
      "H2 average (130s) is 14% slower than H1 (114s)"
    ],
    recs: [
      "URGENT — AEROBIC BASE: This is a pure conditioning deficit. Begin 3×/week continuous distance work: 400m, 600m, 800m at easy pace",
      "SET REDUCTION: Drop to 12×100m sets until fatigue index is below 15%, then build to 16, then 20",
      "LACTATE THRESHOLD: 4×200m at 75% effort with 90s rest — teaches the body to clear lactic acid efficiently",
      "HYDRATION & NUTRITION: A 44s/100m late-set drop can indicate fueling issues. Check pre-session nutrition",
      "MENTAL PACING: Start Rep 1 SLOWER than feels natural — aim for 1:55 T1 to preserve energy for the second half"
    ]
  },
  aseda: {
    note: "Aseda's 125.8% fatigue index is the most extreme data point of the entire session. He effectively swam a different event by Rep 20 (4:09) vs Rep 1 (1:51).",
    strengths: [
      "T1 (1:51) shows he has reasonable base speed when fresh",
      "Completed all 20 reps — exceptional mental toughness given the deterioration",
      "Rep 11 reset (1:58) from Rep 10 (3:37) shows recovery ability over longer rest"
    ],
    weaknesses: [
      "125.8% fatigue index — the most severe fatigue response in the dataset",
      "T20 (4:09) vs T1 (1:51): nearly doubled swim time over the set",
      "Second-half average (219s) is 37.4% slower than first half (160s)",
      "15 slowdowns, only 4 improvements — continuous deterioration",
      "Standard deviation of 56.3s — performance is inconsistent"
    ],
    recs: [
      "CRITICAL — SET DISTANCE MISMATCH: 20×100m is currently too long. Begin with 8×100m and build by 1 rep per week",
      "AEROBIC PRIORITY: This swimmer needs 6–8 weeks of pure aerobic base building before attempting endurance sets",
      "TECHNIQUE PRESERVATION: Under extreme fatigue, technique completely breaks down. Set a 'stop' threshold — if any rep exceeds 2× T1, finish early rather than swimming poorly",
      "CONTINUOUS SWIM: 3×/week: 200m, then 400m, then 600m continuous easy swim — build the aerobic engine",
      "GOAL SETTING: A realistic 4-week target is to complete 12×100m with a fatigue index under 30%"
    ]
  },
  ronell: {
    note: "Ronell's Rep 11 improvement (1:45, from 2:20 on Rep 10) was the most dramatic rest-interval reset: a 25-second drop that confirms a significant rest was given between the two halves. Despite this advantage, she still deteriorated to 2:36 by Rep 20 — a 33.4% fatigue index. Her average zone spans the full set (Reps 4-5, 16), suggesting her pace degraded steadily throughout.",
    strengths: [
      "Rep 11 bounce (1:45) from 2:20 on Rep 10 — shows recovery ability given adequate rest",
      "Even distribution of average-pace reps across the set (Reps 4, 5, 16) — no early peak",
      "Completed all 20 reps despite significant fatigue"
    ],
    weaknesses: [
      "33.4% fatigue index — significant endurance deficit",
      "T20 (2:36) is 18.9% slower than average — fading hard at the end",
      "14 slowdowns vs 5 improvements — steady decline throughout",
      "The 25s Rep 11 reset was quickly erased, returning to decline by Rep 14"
    ],
    recs: [
      "AEROBIC ENDURANCE: 3×/week continuous swim building from 400m to 800m over 6 weeks",
      "EVEN PACING DRILL: 8×100m with a target time — practice holding the same split every rep. Consistency before speed",
      "SECOND-HALF FOCUS: Your second half collapses despite a rest advantage — add 4×100m 'back-half' practice sets starting from fatigue",
      "GOAL: Reduce fatigue index below 20% within 6 weeks — this is achievable with aerobic base work"
    ]
  },
  afia: {
    note: "Afia and Aseda share the session's most extreme fatigue patterns. Afia's Rep 10 (3:59) was the slowest single rep of the entire session from any swimmer. Her only 3 improvements in 20 reps reveals nearly continuous decline. The Rep 11 reset (2:00) from Rep 10 (3:59) shows a massive rest interval but she still degraded to 3:56 by Rep 16 — suggesting the aerobic deficit is too large for rest alone to overcome.",
    strengths: [
      "T1 (1:50) shows competitive base speed when fully fresh",
      "Rep 11 reset (2:00) after 3:59 shows the ability to recover given long rest",
      "Completed all 20 reps — significant mental resilience"
    ],
    weaknesses: [
      "46.4% fatigue index — severe aerobic deficit",
      "Rep 10 (3:59) is the slowest individual rep of the entire session",
      "Only 3 improvements across 20 reps — virtually continuous deterioration",
      "T20 (3:34) is 21% above average — couldn't maintain even the degraded second-half pace",
      "129s range between best and worst rep — largest absolute swing on the team"
    ],
    recs: [
      "CRITICAL — START SLOWER: T1 (1:50) is 37.8% below average. Opening this fast on a 20-rep set guarantees collapse. Target T1 at 2:20 to distribute energy across the set",
      "SET DISTANCE: Like Aseda, 20×100m is too long. Begin with 8×100m, building 1 rep/week",
      "AEROBIC BASE: 6–8 weeks of base building: 3×/week easy continuous swims (300m, 500m, 700m)",
      "TECHNIQUE UNDER FATIGUE: When reps exceed 3:00, stroke breaks down completely. Learn to identify your 'collapse threshold' and reduce intensity before reaching it",
      "GOAL: Complete 10×100m with no rep exceeding 2× T1 — currently this target is not being met"
    ]
  }
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const fmt = (s) => {
  if (s === null || s === undefined || isNaN(s)) return "n/a";
  const m = Math.floor(s / 60);
  const sec = Math.round(s % 60);
  return m > 0 ? `${m}:${sec.toString().padStart(2, "0")}` : `${sec}s`;
};

const pctColor = (v) => (v < 0 ? "#10b981" : v > 0 ? "#ef4444" : "#6b7280");
const pctArrow = (v) => (v < 0 ? "▼" : v > 0 ? "▲" : "—");

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 8, padding: "10px 14px" }}>
        <p style={{ color: "#94a3b8", fontSize: 12, marginBottom: 4 }}>Rep {label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color || "#f1f5f9", fontSize: 13, fontWeight: 600 }}>
            {p.name}: {p.value !== null && p.value !== undefined ? fmt(Number(p.value)) : "n/a"}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ─── TEAM TAB ─────────────────────────────────────────────────────────────────
const TeamTab = () => {
  const w = useWindowWidth();
  const topSwimmers = ["Jason","Jadon","Kofi","Raphael","Jesse"];
  const developingSwimmers = ["Jada","Ronell","Afia","Aseda"];

  const comparData = Object.entries(SWIMMERS)
    .map(([name, d]) => ({ name, avg: d.avg, best: d.best, fatigueIndex: d.fatigueIndex, color: d.color }))
    .sort((a, b) => a.avg - b.avg);

  const cols = (desktop, tablet, mobile) =>
    w < 480 ? mobile || "1fr" : w < 768 ? tablet || desktop : desktop;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* Session info banner */}
      <div style={{ background: "linear-gradient(135deg, #1e3a5f, #0f172a)", border: "1px solid #1e3a5f", borderRadius: 16, padding: 20 }}>
        <h2 style={{ color: "#93c5fd", fontSize: 16, fontWeight: 700, marginBottom: 8 }}>📋 Session: Best Average Set — 20 × 100m Freestyle</h2>
        <div style={{ display: "grid", gridTemplateColumns: cols("repeat(3,1fr)","repeat(2,1fr)","1fr"), gap: 12, color: "#94a3b8", fontSize: 13 }}>
          <div><span style={{ color:"#f1f5f9", fontWeight:700 }}>Date:</span> Sunday, 12 April 2026</div>
          <div><span style={{ color:"#f1f5f9", fontWeight:700 }}>Stroke:</span> Freestyle throughout</div>
          <div><span style={{ color:"#f1f5f9", fontWeight:700 }}>Reps:</span> T1 → T20 (100m each)</div>
          <div><span style={{ color:"#f1f5f9", fontWeight:700 }}>Swimmers:</span> 9 total</div>
          <div><span style={{ color:"#f1f5f9", fontWeight:700 }}>Total Distance:</span> 2,000m per swimmer</div>
          <div><span style={{ color:"#f1f5f9", fontWeight:700 }}>Special Note:</span> Jason injured Rep 12–17</div>
        </div>
        <div style={{ marginTop: 12, background: "#1a0000", border: "1px solid #7f1d1d", borderRadius: 8, padding: 10 }}>
          <p style={{ color: "#fca5a5", fontSize: 12, margin: 0 }}>⚠ <strong>Key observation:</strong> A significant rest interval appears to have occurred between Reps 10 and 11 — nearly every swimmer (Jada, Ronell, Afia, Jesse, Aseda) posted their best or near-best Rep 11 times. This "reset" effect must be accounted for when interpreting second-half data.</p>
        </div>
      </div>

      {/* Team chart */}
      <div style={{ background: "#1e293b", borderRadius: 16, padding: 24 }}>
        <h2 style={{ color: "#f1f5f9", fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Team Performance — All 20 Reps</h2>
        <p style={{ color: "#64748b", fontSize: 13, marginBottom: 20 }}>Best time (green) vs. team mean (blue) per rep. Dotted line marks the Rep 10→11 rest interval.</p>
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={TEAM_STATS}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="rep" stroke="#475569" tick={{ fill: "#94a3b8", fontSize: 11 }}
              label={{ value: "Repetition", position: "insideBottom", offset: -2, fill: "#64748b", fontSize: 12 }} />
            <YAxis stroke="#475569" tick={{ fill: "#94a3b8", fontSize: 11 }}
              label={{ value: "Time (seconds)", angle: -90, position: "insideLeft", fill: "#64748b", fontSize: 12 }}
              tickFormatter={(v) => fmt(v)} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 13 }} />
            <ReferenceLine x={10.5} stroke="#f59e0b" strokeDasharray="6 3" label={{ value: "Rest", fill: "#f59e0b", fontSize: 11, position: "top" }} />
            <Area type="monotone" dataKey="mean" fill="#1e40af22" stroke="#3b82f6" strokeWidth={2} name="Team Average" dot={{ r: 4, fill: "#3b82f6" }} />
            <Line type="monotone" dataKey="best" stroke="#10b981" strokeWidth={3} name="Best Time" dot={{ r: 5, fill: "#10b981" }} />
          </ComposedChart>
        </ResponsiveContainer>

        <div style={{ display: "grid", gridTemplateColumns: cols("repeat(4,1fr)","repeat(2,1fr)","repeat(2,1fr)"), gap: 12, marginTop: 20 }}>
          {[
            { label: "Session Best", val: "1:19", sub: "Jason · Rep 1", color: "#10b981" },
            { label: "Team Mean (all reps)", val: fmt(Math.round(TEAM_STATS.reduce((s,d)=>s+d.mean,0)/TEAM_STATS.length)), sub: "Across 20 reps", color: "#3b82f6" },
            { label: "Hardest Rep (mean)", val: `Rep ${TEAM_STATS.reduce((m,d)=>d.mean>m.mean?d:m).rep}`, sub: `${fmt(Math.round(TEAM_STATS.reduce((m,d)=>d.mean>m.mean?d:m).mean))} avg`, color: "#ef4444" },
            { label: "Fastest Rep (mean)", val: `Rep ${TEAM_STATS.reduce((m,d)=>d.mean<m.mean?d:m).rep}`, sub: `${fmt(Math.round(TEAM_STATS.reduce((m,d)=>d.mean<m.mean?d:m).mean))} avg`, color: "#f59e0b" }
          ].map((s, i) => (
            <div key={i} style={{ background: "#0f172a", borderRadius: 10, padding: 16, borderLeft: `3px solid ${s.color}` }}>
              <p style={{ color: "#64748b", fontSize: 11, marginBottom: 4 }}>{s.label}</p>
              <p style={{ color: s.color, fontSize: 20, fontWeight: 800 }}>{s.val}</p>
              <p style={{ color: "#475569", fontSize: 11, marginTop: 2 }}>{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Average comparison */}
      <div style={{ background: "#1e293b", borderRadius: 16, padding: 24 }}>
        <h2 style={{ color: "#f1f5f9", fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Swimmer Average Time Comparison</h2>
        <p style={{ color: "#64748b", fontSize: 13, marginBottom: 20 }}>Shorter bar = faster swimmer. Sorted fastest → slowest.</p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={comparData} layout="vertical" margin={{ left: 20, right: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
            <XAxis type="number" stroke="#475569" tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={fmt} />
            <YAxis type="category" dataKey="name" stroke="#475569" tick={{ fill: "#94a3b8", fontSize: 13 }} width={70} />
            <Tooltip content={({ active, payload, label }) =>
              active && payload?.length ? (
                <div style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 8, padding: "10px 14px" }}>
                  <p style={{ color: "#f1f5f9", fontWeight: 700 }}>{label}</p>
                  <p style={{ color: "#10b981" }}>Avg: {fmt(payload[0]?.value)}</p>
                </div>
              ) : null
            } />
            <Bar dataKey="avg" name="Average Time" radius={[0, 4, 4, 0]}>
              {comparData.map((entry, i) => (
                <rect key={i} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Group cards */}
      {[
        { label: "🏆 Top Pace", names: topSwimmers },
        { label: "🔥 Developing Pace", names: developingSwimmers }
      ].map(({ label, names }) => (
        <div key={label} style={{ background: "#1e293b", borderRadius: 16, padding: 24 }}>
          <h2 style={{ color: "#f1f5f9", fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{label}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
            {names.map(name => {
              const d = SWIMMERS[name];
              return (
                <div key={name} style={{ background: "#0f172a", borderRadius: 10, padding: 16, borderTop: `3px solid ${d.color}` }}>
                  <p style={{ color: d.color, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{name}</p>
                  {[
                    ["Average", fmt(Math.round(d.avg)), "#f1f5f9"],
                    ["Best", fmt(d.best), "#10b981"],
                    ["Fatigue", `${d.fatigueIndex > 0 ? "+" : ""}${d.fatigueIndex}%`, d.fatigueIndex < 0 ? "#10b981" : d.fatigueIndex > 20 ? "#ef4444" : "#f59e0b"]
                  ].map(([k, v, c]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ color: "#64748b", fontSize: 12 }}>{k}</span>
                      <span style={{ color: c, fontWeight: 600, fontSize: 12 }}>{v}</span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Fatigue Ranking */}
      <div style={{ background: "#1e293b", borderRadius: 16, padding: 24 }}>
        <h2 style={{ color: "#f1f5f9", fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Fatigue Index Ranking</h2>
        <p style={{ color: "#64748b", fontSize: 13, marginBottom: 16 }}>How much slower (or faster) did each swimmer get from their first 3 reps to their last 3 reps?</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {Object.entries(SWIMMERS).sort((a,b)=>a[1].fatigueIndex-b[1].fatigueIndex).map(([name, d]) => {
            const pct = Math.abs(d.fatigueIndex);
            const isGood = d.fatigueIndex <= 0;
            const barWidth = Math.min(Math.abs(d.fatigueIndex) / 1.3, 100);
            return (
              <div key={name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ color: d.color, fontWeight: 700, width: 70, fontSize: 13 }}>{name}</span>
                <div style={{ flex: 1, background: "#0f172a", borderRadius: 4, height: 20, overflow: "hidden" }}>
                  <div style={{ width: `${barWidth}%`, height: "100%", background: isGood ? "#10b981" : d.fatigueIndex > 30 ? "#ef4444" : "#f59e0b", borderRadius: 4, transition: "width 0.5s" }} />
                </div>
                <span style={{ color: isGood ? "#10b981" : d.fatigueIndex > 30 ? "#ef4444" : "#f59e0b", fontWeight: 700, fontSize: 13, width: 55, textAlign: "right" }}>
                  {d.fatigueIndex > 0 ? "+" : ""}{d.fatigueIndex}%
                </span>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 12, display: "flex", gap: 16, flexWrap: "wrap" }}>
          <span style={{ color: "#10b981", fontSize: 12 }}>● Negative = got faster (ideal)</span>
          <span style={{ color: "#f59e0b", fontSize: 12 }}>● 0–20% = mild fatigue (acceptable)</span>
          <span style={{ color: "#ef4444", fontSize: 12 }}>● 20%+ = significant fatigue concern</span>
        </div>
      </div>

      {/* Team observations */}
      <div style={{ background: "linear-gradient(135deg, #1e293b, #0f172a)", border: "1px solid #334155", borderRadius: 16, padding: 24 }}>
        <h2 style={{ color: "#f1f5f9", fontSize: 20, fontWeight: 700, marginBottom: 12 }}>🔍 Coach's Team-Level Observations</h2>
        <div style={{ display: "grid", gridTemplateColumns: cols("1fr 1fr","1fr","1fr"), gap: 16 }}>
          <div style={{ background: "#0f1f0f", border: "1px solid #166534", borderRadius: 10, padding: 16 }}>
            <p style={{ color: "#86efac", fontWeight: 700, marginBottom: 10 }}>✅ Team Strengths</p>
            <ul style={{ color: "#d1fae5", fontSize: 13, lineHeight: 1.9, paddingLeft: 16 }}>
              <li>Kofi set the consistency benchmark: ±2.6s over 20 reps — world-class pacing</li>
              <li>Jadon is the only swimmer with T20 faster than average (-6.9%) — elite closer</li>
              <li>All 9 swimmers completed at least 14 of 20 reps — commitment to the set</li>
              <li>The Rep 11 reset confirms the team responds well to adequate rest — useful tactical knowledge</li>
            </ul>
          </div>
          <div style={{ background: "#1f0f0f", border: "1px solid #991b1b", borderRadius: 10, padding: 16 }}>
            <p style={{ color: "#fca5a5", fontWeight: 700, marginBottom: 10 }}>⚠️ Team Concerns</p>
            <ul style={{ color: "#fee2e2", fontSize: 13, lineHeight: 1.9, paddingLeft: 16 }}>
              <li>4 swimmers (Aseda, Afia, Jada, Ronell) have fatigue indices above 30% — aerobic base is the team's #1 priority</li>
              <li>Jason's injury during the set is a red flag — more physical preparation (good stretches and significant dryland) needed </li>
              <li>Team mean almost doubled from Rep 1 (99.8s) to Rep 17 (143.1s) — a 43% team-wide fatigue spike</li>
              
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── INDIVIDUAL TAB ───────────────────────────────────────────────────────────
const IndividualTab = () => {
  const w = useWindowWidth();
  const [selected, setSelected] = useState("Jadon");
  const d = SWIMMERS[selected];
  const insight = INSIGHTS[d.insight];
  const cols = (desktop, tablet, mobile) =>
    w < 480 ? mobile || "1fr" : w < 768 ? tablet || desktop : desktop;

  const chartData = d.times.map((t, i) => ({
    rep: i + 1,
    time: t,
    avg: d.avg
  }));

  const fatigueGood = d.fatigueIndex <= 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Swimmer picker */}
      <div style={{ background: "#1e293b", borderRadius: 16, padding: 24 }}>
        <label style={{ color: "#94a3b8", fontSize: 13, display: "block", marginBottom: 8 }}>SELECT SWIMMER</label>
        <select value={selected} onChange={(e) => setSelected(e.target.value)}
          style={{ width: "100%", padding: "12px 16px", background: "#0f172a", border: "1px solid #334155", borderRadius: 10, color: "#f1f5f9", fontSize: 16, cursor: "pointer" }}>
          {Object.keys(SWIMMERS).map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: cols("repeat(4,1fr)","repeat(2,1fr)","repeat(2,1fr)"), gap: 12 }}>
        {[
          { label: "Average Time", val: fmt(Math.round(d.avg)), sub: `Over ${d.times.filter(t=>t!==null).length} valid reps`, color: d.color },
          { label: "Best Time", val: fmt(d.best), sub: `Rep ${d.bestRep}`, color: "#10b981" },
          { label: "Worst Time", val: fmt(d.worst), sub: `Rep ${d.worstRep}`, color: "#ef4444" },
          { label: "Consistency", val: `±${d.std.toFixed(1)}s`, sub: d.std < 5 ? "Excellent" : d.std < 10 ? "Good" : d.std < 20 ? "Moderate" : "Poor", color: d.std < 5 ? "#10b981" : d.std < 10 ? "#f59e0b" : "#ef4444" }
        ].map((s, i) => (
          <div key={i} style={{ background: "#1e293b", borderRadius: 12, padding: 16, borderTop: `3px solid ${s.color}` }}>
            <p style={{ color: "#64748b", fontSize: 11, marginBottom: 4 }}>{s.label}</p>
            <p style={{ color: s.color, fontSize: 22, fontWeight: 800 }}>{s.val}</p>
            <p style={{ color: "#475569", fontSize: 11, marginTop: 2 }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Note banner */}
      {d.note && (
        <div style={{ background: "#1a1200", border: "1px solid #78350f", borderRadius: 12, padding: 14, borderLeft: `4px solid ${d.color}` }}>
          <p style={{ color: "#fde68a", fontSize: 13, lineHeight: 1.6, margin: 0 }}>💡 <strong>Coach's Note:</strong> {d.note}</p>
        </div>
      )}

      {/* Time performance chart */}
      <div style={{ background: "#1e293b", borderRadius: 16, padding: 24 }}>
        <h2 style={{ color: "#f1f5f9", fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{selected} — Time Per Rep (All 20 Reps)</h2>
        <p style={{ color: "#64748b", fontSize: 13, marginBottom: 20 }}>
          Dashed line = average ({fmt(Math.round(d.avg))}). Times <span style={{color:"#10b981"}}>below</span> the line are above-average swims. n/a reps appear as gaps.
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="rep" stroke="#475569" tick={{ fill: "#94a3b8", fontSize: 11 }}
              label={{ value: "Repetition", position: "insideBottom", offset: -2, fill: "#64748b", fontSize: 12 }} />
            <YAxis stroke="#475569" tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={fmt}
              label={{ value: "Time (s)", angle: -90, position: "insideLeft", fill: "#64748b", fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={d.avg} stroke="#475569" strokeDasharray="6 3" label={{ value: "Avg", fill: "#475569", fontSize: 11 }} />
            <ReferenceLine x={10.5} stroke="#f59e0b" strokeDasharray="4 2" label={{ value: "Rest", fill: "#f59e0b", fontSize: 10, position: "top" }} />
            <Area type="monotone" dataKey="time" fill={`${d.color}22`} stroke={d.color} strokeWidth={3} name="Time"
              dot={(props) => {
                const { cx, cy, payload } = props;
                if (payload.time === null) return <g key={`dot-${payload.rep}`}/>;
                return <circle key={`dot-${payload.rep}`} cx={cx} cy={cy} r={5} fill={d.color} strokeWidth={0} />;
              }}
              connectNulls={false}
            />
          </ComposedChart>
        </ResponsiveContainer>

        {/* T1/Avg/T20 correlation */}
        <div style={{ marginTop: 20, background: "#0f172a", borderRadius: 12, padding: 16 }}>
          <p style={{ color: "#94a3b8", fontWeight: 700, fontSize: 13, marginBottom: 12 }}>T1 → Average → T20 Correlation</p>
          <div style={{ display: "grid", gridTemplateColumns: cols("1fr 1fr 1fr","1fr 1fr 1fr","1fr"), gap: 12 }}>
            {[
              { label: "T1 (Opening Rep)", val: fmt(d.times[0]), diff: d.t1VsAvg, note: d.t1VsAvg < 0 ? "Started faster than avg" : "Started slower than avg" },
              { label: "Your Average", val: fmt(Math.round(d.avg)), diff: 0, note: "Baseline sustainable pace" },
              { label: "T20 (Final Rep)", val: fmt(d.times[19]), diff: d.t20VsAvg, note: d.t20VsAvg < 0 ? "✓ Finished faster — strong closer!" : "Finished slower — fatigue factor" }
            ].map((item, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <p style={{ color: "#475569", fontSize: 11, marginBottom: 4 }}>{item.label}</p>
                <p style={{ color: "#f1f5f9", fontWeight: 800, fontSize: 18 }}>{item.val}</p>
                {item.diff !== 0 && (
                  <p style={{ color: pctColor(item.diff), fontSize: 12, fontWeight: 600 }}>
                    {pctArrow(item.diff)} {Math.abs(item.diff).toFixed(1)}% vs avg
                  </p>
                )}
                <p style={{ color: "#475569", fontSize: 11, marginTop: 2 }}>{item.note}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, borderTop: "1px solid #1e293b", paddingTop: 12 }}>
            <p style={{ color: "#64748b", fontSize: 13 }}>
              <strong style={{ color: "#94a3b8" }}>Verdict:</strong>{" "}
              {d.t1VsAvg < -5 && d.t20VsAvg < 0
                ? `${selected} opened fast AND closed faster than average — genuinely elite pacing range.`
                : d.t1VsAvg < -5 && d.t20VsAvg > 5
                  ? `${selected} opened too fast and paid for it at the end — over-pacing on a 20-rep set.`
                : d.t20VsAvg < 0
                  ? `${selected} closed faster than average — good endurance in the finish.`
                  : `${selected} faded toward the end — the set exposed an aerobic conditioning gap.`}
            </p>
          </div>
        </div>
      </div>

      {/* Half-split analysis */}
      <div style={{ background: "#1e293b", borderRadius: 16, padding: 24 }}>
        <h2 style={{ color: "#f1f5f9", fontSize: 18, fontWeight: 700, marginBottom: 12 }}>First Half vs Second Half</h2>
        <div style={{ display: "grid", gridTemplateColumns: cols("repeat(3,1fr)","repeat(3,1fr)","1fr"), gap: 12 }}>
          {[
            { label: "Reps 1–10 Average", val: fmt(d.h1avg), sub: "First half", color: "#3b82f6" },
            { label: "Reps 11–20 Average", val: fmt(d.h2avg), sub: "Second half", color: d.halfDiff < 0 ? "#10b981" : d.halfDiff > 10 ? "#ef4444" : "#f59e0b" },
            { label: "H2 vs H1 Change", val: `${d.halfDiff > 0 ? "+" : ""}${d.halfDiff.toFixed(1)}%`, sub: d.halfDiff < 0 ? "Got FASTER" : d.halfDiff < 5 ? "Held steady" : "Slowed significantly", color: d.halfDiff < 0 ? "#10b981" : d.halfDiff > 10 ? "#ef4444" : "#f59e0b" }
          ].map((s, i) => (
            <div key={i} style={{ background: "#0f172a", borderRadius: 10, padding: 14, textAlign: "center" }}>
              <p style={{ color: "#475569", fontSize: 11, marginBottom: 4 }}>{s.label}</p>
              <p style={{ color: s.color, fontWeight: 800, fontSize: 22 }}>{s.val}</p>
              <p style={{ color: "#475569", fontSize: 11, marginTop: 2 }}>{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Closest to average */}
      <div style={{ background: "#1e293b", borderRadius: 16, padding: 24 }}>
        <h2 style={{ color: "#f1f5f9", fontSize: 18, fontWeight: 700, marginBottom: 4 }}>When Did {selected} Hit "Average Pace"?</h2>
        <p style={{ color: "#64748b", fontSize: 13, marginBottom: 16 }}>
          The 3 reps closest to {selected}'s average of <strong style={{ color: "#f1f5f9" }}>{fmt(Math.round(d.avg))}</strong>. Shows when their "typical" pace occurs.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: cols("repeat(3,1fr)","repeat(3,1fr)","1fr"), gap: 12 }}>
          {d.closestToAvg.map((item, i) => (
            <div key={i} style={{ background: "#0f172a", borderRadius: 10, padding: 16, textAlign: "center", border: `1px solid ${d.color}44` }}>
              <p style={{ color: d.color, fontSize: 28, fontWeight: 800 }}>Rep {item.rep}</p>
              <p style={{ color: "#f1f5f9", fontSize: 18, fontWeight: 600, marginTop: 4 }}>{fmt(item.time)}</p>
              <p style={{ color: "#475569", fontSize: 12, marginTop: 4 }}>Only {item.diff.toFixed(1)}s from avg</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, background: "#0f172a", borderRadius: 10, padding: 14 }}>
          <p style={{ color: "#64748b", fontSize: 13 }}>
            <strong style={{ color: d.avgRepPosition <= 6 ? "#f59e0b" : d.avgRepPosition <= 13 ? "#3b82f6" : "#10b981" }}>
              Average zone: {d.avgRepPosition <= 6 ? "Early set (Reps 1-6)" : d.avgRepPosition <= 13 ? "Mid set (Reps 7-13)" : "Late set (Reps 14-20)"}
            </strong>
            {" "}(avg rep position: {d.avgRepPosition.toFixed(1)}) —{" "}
            {d.avgRepPosition <= 6
              ? `${selected} reached their typical pace early but couldn't sustain it through all 20 reps.`
              : d.avgRepPosition <= 13
                ? `${selected}'s typical pace was centred through the middle of the set — balanced performance.`
                : `${selected}'s typical pace appeared late — meaning they were slower than average early and couldn't recover by the end.`}
          </p>
        </div>
      </div>

      {/* Key metrics */}
      <div style={{ background: "#1e293b", borderRadius: 16, padding: 24 }}>
        <h2 style={{ color: "#f1f5f9", fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Performance Metrics</h2>
        <div style={{ display: "grid", gridTemplateColumns: cols("repeat(3,1fr)","repeat(2,1fr)","1fr"), gap: 12 }}>
          {[
            { label: "Fatigue Index", val: `${d.fatigueIndex > 0 ? "+" : ""}${d.fatigueIndex}%`, sub: fatigueGood ? "✓ Got faster!" : "✗ Slowed down", color: fatigueGood ? "#10b981" : d.fatigueIndex > 30 ? "#ef4444" : "#f59e0b" },
            { label: "First 3 Rep Avg", val: fmt(Math.round(d.first3Avg)), sub: "Opening pace", color: "#f59e0b" },
            { label: "Last 3 Rep Avg", val: fmt(Math.round(d.last3Avg)), sub: "Closing pace", color: fatigueGood ? "#10b981" : "#ef4444" },
            { label: "Reps Improved", val: `${d.improvements}/${d.times.filter(t=>t!==null).length - 1}`, sub: "Rep-to-rep faster", color: d.improvements >= 10 ? "#10b981" : "#f59e0b" },
            { label: "Time Range", val: `${d.range}s`, sub: "Best vs Worst", color: d.range < 15 ? "#10b981" : d.range < 40 ? "#f59e0b" : "#ef4444" },
            { label: "Slowdowns", val: `${d.slowdowns}`, sub: "Rep-to-rep slower", color: d.slowdowns > 12 ? "#ef4444" : "#f59e0b" }
          ].map((m, i) => (
            <div key={i} style={{ background: "#0f172a", borderRadius: 10, padding: 14 }}>
              <p style={{ color: "#475569", fontSize: 11, marginBottom: 4 }}>{m.label}</p>
              <p style={{ color: m.color, fontWeight: 700, fontSize: 18 }}>{m.val}</p>
              <p style={{ color: "#475569", fontSize: 11, marginTop: 2 }}>{m.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Coach analysis */}
      <div style={{ background: "#1e293b", borderRadius: 16, padding: 24 }}>
        <h2 style={{ color: "#f1f5f9", fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Coach's Analysis for {selected}</h2>
        <div style={{ background: "#0f172a", borderRadius: 10, padding: 14, borderLeft: `3px solid ${d.color}`, marginBottom: 20 }}>
          <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7 }}>{insight.note}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: cols("1fr 1fr","1fr","1fr"), gap: 16, marginBottom: 20 }}>
          <div>
            <p style={{ color: "#86efac", fontWeight: 700, fontSize: 14, marginBottom: 10 }}>✅ Strengths</p>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {insight.strengths.map((s, i) => (
                <li key={i} style={{ background: "#0f1f0f", border: "1px solid #166534", borderRadius: 8, padding: "10px 12px", color: "#d1fae5", fontSize: 13, lineHeight: 1.5 }}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <p style={{ color: "#fca5a5", fontWeight: 700, fontSize: 14, marginBottom: 10 }}>⚠️ Areas to Improve</p>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {insight.weaknesses.map((w, i) => (
                <li key={i} style={{ background: "#1f0f0f", border: "1px solid #991b1b", borderRadius: 8, padding: "10px 12px", color: "#fee2e2", fontSize: 13, lineHeight: 1.5 }}>{w}</li>
              ))}
            </ul>
          </div>
        </div>
        <p style={{ color: "#60a5fa", fontWeight: 700, fontSize: 14, marginBottom: 10 }}>🎯 Training Recommendations</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {insight.recs.map((r, i) => (
            <div key={i} style={{ background: "#0f172a", border: "1px solid #1e3a5f", borderRadius: 8, padding: "12px 16px", borderLeft: `3px solid ${d.color}`, color: "#e2e8f0", fontSize: 13, lineHeight: 1.6 }}>
              <span style={{ color: d.color, fontWeight: 700 }}>{i + 1}.</span> {r}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── KEY TAB ──────────────────────────────────────────────────────────────────
const KeyTab = () => {
  const w = useWindowWidth();
  const cols = (desktop, tablet, mobile) =>
    w < 480 ? mobile || "1fr" : w < 768 ? tablet || desktop : desktop;

  return (
    <div style={{ background: "#1e293b", borderRadius: 16, padding: w < 480 ? 16 : 24, display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h2 style={{ color: "#f1f5f9", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Dashboard Key & Guide</h2>
        <p style={{ color: "#64748b", fontSize: 13 }}>Every metric explained — no jargon left behind.</p>
      </div>

      <div>
        <h3 style={{ color: "#93c5fd", fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Session Information</h3>
        <div style={{ background: "#0f172a", borderRadius: 10, padding: 16, color: "#94a3b8", fontSize: 13, lineHeight: 2 }}>
          <div><strong style={{ color: "#f1f5f9" }}>Workout:</strong> Best Average Set — 20 × 100m Freestyle</div>
          <div><strong style={{ color: "#f1f5f9" }}>Date:</strong> Sunday, 12 April 2026</div>
          <div><strong style={{ color: "#f1f5f9" }}>Stroke:</strong> Freestyle (all 20 reps)</div>
          <div><strong style={{ color: "#f1f5f9" }}>Goal:</strong> Find each swimmer's best sustainable average pace over 2,000m total distance</div>
          <div><strong style={{ color: "#f1f5f9" }}>Rest Interval:</strong> A rest was given between Reps 10 and 11 — this explains why Rep 11 is often faster than Rep 10</div>
          <div><strong style={{ color: "#f1f5f9" }}>Jason Note:</strong> Sustained a muscle pull between Reps 12–17; those reps are marked n/a</div>
        </div>
      </div>

      <div>
        <h3 style={{ color: "#93c5fd", fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Abbreviations</h3>
        <div style={{ display: "grid", gridTemplateColumns: cols("repeat(2,1fr)","repeat(2,1fr)","1fr"), gap: 8 }}>
          {[
            ["T1", "Time of Rep 1 — your very first 100m swim"],
            ["T20", "Time of Rep 20 — your very last 100m swim"],
            ["Avg / Average", "Add all your valid times together, then divide by the number of swims"],
            ["Rep", "Repetition — one 100m swim in the set"],
            ["H1", "First half of the set: Reps 1–10"],
            ["H2", "Second half of the set: Reps 11–20"],
            ["σ / StdDev", "Standard Deviation — how spread out your times are (lower = more consistent)"],
            ["s", "Seconds"],
            ["m", "Metres"],
            ["n/a", "Not available — that rep was not completed or data was missing"],
            ["DNS", "Did Not Start — swimmer did not complete remaining reps"],
            ["Fatigue Index", "% difference between last 3 and first 3 reps (negative = you got faster!)"]
          ].map(([abbr, def]) => (
            <div key={abbr} style={{ background: "#0f172a", borderRadius: 8, padding: "10px 14px", display: "flex", gap: 10 }}>
              <span style={{ color: "#60a5fa", fontWeight: 700, minWidth: 80, fontSize: 13 }}>{abbr}</span>
              <span style={{ color: "#94a3b8", fontSize: 13 }}>{def}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ color: "#93c5fd", fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Key Metrics Explained</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { term: "Fatigue Index", color: "#ef4444", def: "The % change between your last 3 reps average and first 3 reps average. NEGATIVE = you got faster — that's the goal! POSITIVE = you slowed down over the set." },
            { term: "T1 vs Average", color: "#f59e0b", def: "If T1 is ABOVE average, you started slowly and warmed into pace. If T1 is BELOW average, you started too fast and likely faded. On a 20-rep set, starting too fast is a common mistake." },
            { term: "T20 vs Average", color: "#10b981", def: "If T20 is BELOW average, you finished faster than your own typical pace — excellent! If it's above, fatigue built up and you slowed. Finishing faster than your average is the gold standard." },
            { term: "Average Zone (Closest Reps)", color: "#8b5cf6", def: "The 3 reps closest to your average time. If they fall in Reps 1-6 (early), you peaked too soon. Mid set (7-13) = balanced pacing. Late set (14-20) = you improved throughout — outstanding!" },
            { term: "First Half vs Second Half", color: "#06b6d4", def: "Compares your Reps 1-10 average to Reps 11-20 average. Note: Rep 11 had a rest interval, so second-half times naturally benefited from recovery. A small gap means great endurance." },
            { term: "Rep-to-Rep Improvements", color: "#10b981", def: "Out of 19 possible transitions, how many were faster than the previous rep? 10+ improvements = excellent progressive pacing. Under 5 = times were mostly getting slower." },
            { term: "Standard Deviation (σ)", color: "#3b82f6", def: "How consistent your times were across all reps. Under 5s = Excellent. 5-10s = Good. 10-20s = Moderate. Over 20s = inconsistent — work on pacing." }
          ].map(({ term, color, def }) => (
            <div key={term} style={{ background: "#0f172a", borderRadius: 10, padding: 14, borderLeft: `3px solid ${color}` }}>
              <p style={{ color, fontWeight: 700, marginBottom: 4, fontSize: 14 }}>{term}</p>
              <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.6 }}>{def}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ color: "#93c5fd", fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Understanding the Graphs</h3>
        <div style={{ display: "grid", gridTemplateColumns: cols("1fr 1fr","1fr","1fr"), gap: 10 }}>
          {[
            ["Time Chart (line graph)", "Each dot is one rep. The dashed horizontal line is your average. Dots below the line = faster than average. Dots above = slower. Gaps in the line = n/a reps (no data)."],
            ["Fatigue Bar Chart", "The coloured bars show each swimmer's fatigue index. Green bars go left (negative = got faster). Red bars go right (positive = got slower). Longer bars = bigger change."],
            ["Team Best vs Average (area chart)", "The green line is the fastest time per rep. The blue shaded area tracks the team's average per rep. Look for the Rep 11 dip — that's the rest interval effect."],
            ["Half-Split Cards", "Three numbers: H1 average (Reps 1-10), H2 average (Reps 11-20), and the % change between them. A small positive % or negative % is good — it means you held or improved pace."]
          ].map(([title, desc]) => (
            <div key={title} style={{ background: "#0f172a", borderRadius: 10, padding: 14 }}>
              <p style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{title}</p>
              <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "linear-gradient(135deg, #1e3a5f, #0f172a)", border: "1px solid #1e3a5f", borderRadius: 12, padding: 20 }}>
        <h3 style={{ color: "#93c5fd", fontSize: 16, fontWeight: 700, marginBottom: 10 }}>💡 How to Use This Dashboard</h3>
        <ol style={{ color: "#94a3b8", fontSize: 13, lineHeight: 2.4, paddingLeft: 20 }}>
          <li><strong style={{ color: "#f1f5f9" }}>Team tab:</strong> Start here — see how the team performed as a whole across all 20 reps.</li>
          <li><strong style={{ color: "#f1f5f9" }}>Individual tab:</strong> Select your name to see your personal performance data, graphs, and analysis.</li>
          <li><strong style={{ color: "#f1f5f9" }}>Check T1 vs T20:</strong> Did you finish faster or slower than you started? This tells you about your pacing strategy.</li>
          <li><strong style={{ color: "#f1f5f9" }}>Average Zone:</strong> Look at which reps were closest to your average — early means you peaked too soon, late means you paced brilliantly.</li>
          <li><strong style={{ color: "#f1f5f9" }}>Fatigue Index:</strong> The most important number. Negative = great. High positive = aerobic conditioning is the priority.</li>
          <li><strong style={{ color: "#f1f5f9" }}>Recommendations:</strong> Read the numbered training tips — they are specific to YOUR data, not generic advice.</li>
        </ol>
      </div>

      <div style={{ background: "#1a1a00", border: "1px solid #78350f", borderRadius: 12, padding: 16 }}>
        <p style={{ color: "#fde68a", fontWeight: 700, fontSize: 14, marginBottom: 6 }}>⚡ Pro Tip for Swimmers</p>
        <p style={{ color: "#fef3c7", fontSize: 13, lineHeight: 1.7 }}>
          The "Best Average Set" is not about your fastest rep — it's about finding the pace you can hold for ALL reps. A swimmer who goes 1:30 every single rep beats a swimmer who goes 1:20 on Rep 1 and 1:45 by Rep 15. Consistency is the skill being trained here.
        </p>
      </div>
    </div>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function BestAverageSet20by100m() {
  const [tab, setTab] = useState("team");
  const tabs = [
    { id: "team", label: "Team Overview" },
    { id: "individual", label: "Individual Swimmers" },
    { id: "key", label: "Key & Guide" }
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", fontFamily: "'Segoe UI', system-ui, sans-serif", padding: 24 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
         <Link
                to="/"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sessions
              </Link>
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 8 }}>
           
            <div style={{ width: 6, height: 48, background: "linear-gradient(180deg, #10b981, #06b6d4)", borderRadius: 3, flexShrink: 0, marginTop: 4 }} />
            
            <div>
              <h1 style={{ color: "#f1f5f9", fontSize: 26, fontWeight: 900, margin: 0, letterSpacing: "-0.5px", lineHeight: 1.2 }}>
                African Sharks — Best Average Set
              </h1>
              <p style={{ color: "#475569", fontSize: 13, margin: "4px 0 0" }}>
                Sunday, 12 April 2026 · Freestyle · 20 × 100m · 9 Swimmers
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ padding: "10px 20px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14, transition: "all 0.2s",
                background: tab === t.id ? "#06b6d4" : "#1e293b", color: tab === t.id ? "#0f172a" : "#64748b" }}>
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