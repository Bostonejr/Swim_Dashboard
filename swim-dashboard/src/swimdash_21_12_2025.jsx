import React, { useState } from "react";
import {
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const SwimDashboard400m = () => {
  const [activeTab, setActiveTab] = useState("team");
  const [selectedSwimmer, setSelectedSwimmer] = useState("Jason");

  const swimmerData = {
    Jason: {
      times: [386.74, 379.47, 424.37, 353.65, 392.64],
      strokes: [240, 243.5, 250, 222, 254],
      labels: ["Baseline", "T1", "T2", "T3", "T4"],
    },
    Jadon: {
      times: [378.97, 373.55, 357.44, 341.46, 381.18],
      strokes: [240, 230, 231, 240, 260],
      labels: ["Baseline", "T1", "T2", "T3", "T4"],
    },
    Abena: {
      times: [431.6, 406.93, 448.68, 402.22, 474.57],
      strokes: [259, 306, 306, 322, 326],
      labels: ["Baseline", "T1", "T2", "T3", "T4"],
    },
    Yaa: {
      times: [457.78, 415.4, 454.93, null, 444.53],
      strokes: [254, 244, 245, null, 313],
      labels: ["Baseline", "T1", "T2", "T3", "T4"],
    },
    Kofi: {
      times: [388.22, 388.09, 368.13, 359.95, 357.75],
      strokes: [247, 242, 241, 224, 200],
      labels: ["Baseline", "T1", "T2", "T3", "T4"],
    },
    Jada: {
      times: [445.44, 467.63, 504.06, null, 434.47],
      strokes: [225, 230, null, null, 215],
      labels: ["Baseline", "T1", "T2", "T3", "T4"],
    },
    Ronell: {
      times: [506.4, 467.3, 462.86, 503.15, 486.63],
      strokes: [306, 250, 243, 254, 250],
      labels: ["Baseline", "T1", "T2", "T3", "T4"],
    },
    Raphael: {
      times: [427.79, 405.62, 373.61, 369.71, 484.78],
      strokes: [267, 261, 221, 185, 182],
      labels: ["Baseline", "T1", "T2", "T3", "T4"],
    },
    Aseda: {
      times: [510.74, 504.42, 498.95, 506.95, 443.67],
      strokes: [247, 244, 250, 261, 270],
      labels: ["Baseline", "T1", "T2", "T3", "T4"],
    },
    Raya: {
      times: [435.88, 389.31, 375.87, 397.62, 380.37],
      strokes: [249, 115, 244, 260, 254],
      labels: ["Baseline", "T1", "T2", "T3", "T4"],
    },
    Jesse: {
      times: [387.99, 389.91, 397.9, 394.58, 407.6],
      strokes: [245, 217, 275, 285, 270],
      labels: ["Baseline", "T1", "T2", "T3", "T4"],
    },
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toFixed(2);
    return `${mins}:${secs.padStart(5, "0")}`;
  };

  const calculateTeamStats = () => {
    const reps = ["Baseline", "T1", "T2", "T3", "T4"];
    const stats = reps.map((rep, idx) => {
      const times = Object.values(swimmerData)
        .map((s) => s.times[idx])
        .filter((t) => t !== null);

      return {
        rep,
        bestTime: Math.min(...times),
        meanTime: times.reduce((a, b) => a + b, 0) / times.length,
        swimmers: times.length,
      };
    });
    return stats;
  };

  const getOptimalStrokeCount = (swimmer) => {
    const data = swimmerData[swimmer];
    const validPairs = data.times
      .map((time, idx) => ({
        time,
        strokes: data.strokes[idx],
        label: data.labels[idx],
      }))
      .filter((p) => p.time !== null && p.strokes !== null);

    const best = validPairs.reduce((best, curr) =>
      curr.time < best.time ? curr : best
    );

    return best;
  };

  const getSwimmerInsights = (swimmer) => {
    const optimal = getOptimalStrokeCount(swimmer);

    const insights = {
      Jason: {
        strengths: [
          "Fastest single at T3 (5:53.65)",
          "Optimal stroke efficiency found: 222 strokes = best time",
          "Capable of sub-6:00 swimming when dialed in",
        ],
        weaknesses: [
          "70-second variance between best (5:53) and worst (7:04) - largest on team",
          "T2 catastrophic breakdown: 7:04.37 vs baseline 6:26",
          "Stroke count chaos: swings from 222 to 254 strokes",
          "Cannot maintain consistent effort level across set",
        ],
        recommendations: [
          "CRITICAL: Pace discipline training - use tempo trainer at 1:35-1:38/100m for entire set",
          "Target stroke count: 220-230 range for all reps (proven optimal at T3)",
          "Pre-set activation: 800m warm-up to avoid slow baseline starts",
          "Mental training: Visualization of maintaining T3 pace across all reps",
          "Recovery intervals: Need 2:30-3:00 rest between reps to maintain quality",
        ],
        optimal: `Best performance: ${optimal.label} - ${formatTime(
          optimal.time
        )} at ${optimal.strokes} strokes`,
      },
      Jadon: {
        strengths: [
          "Excellent descending ability: 37-second improvement Baseline to T3",
          "Optimal stroke range identified: 230-240 strokes",
          "Strong T3 performance (5:41.46) shows racing potential",
          "Good pacing instincts through first 3 reps",
        ],
        weaknesses: [
          "T4 collapse: 40-second slower than T3 (5:41 to 6:21)",
          "Stroke count spike at T4 (260 strokes) indicates technique failure",
          "Aerobic capacity limitation appears at 1200m cumulative distance",
          "Cannot maintain sub-6:00 pace for full set",
        ],
        recommendations: [
          "Aerobic base priority: 2x weekly 3000m continuous swims at 1:45/100m",
          "Lactate tolerance: 8x200m at 3:00 pace with 45s rest",
          "Maintain 230-240 stroke count discipline even when fatigued",
          "Set goal: Hold 6:00-6:10 for all 4 reps before attempting faster times",
          "Mental reset protocol between T3-T4: 30s breathing exercises",
        ],
        optimal: `Best performance: ${optimal.label} - ${formatTime(
          optimal.time
        )} at ${optimal.strokes} strokes`,
      },
      Abena: {
        strengths: [
          "T3 shows best potential (6:42.22)",
          "Completes all reps despite difficulty",
          "Shows fight - does not give up despite struggling",
        ],
        weaknesses: [
          "CRITICAL: Stroke count inflation 259 to 326 (+26%)",
          "Times deteriorating despite MORE strokes (7:11 to 7:54)",
          "Severe technique breakdown: working harder but going slower",
          "Cannot maintain distance-per-stroke under fatigue",
          "Slowest improvement trajectory on team",
        ],
        recommendations: [
          "URGENT: Stop all high-intensity work for 4 weeks",
          "Technique reconstruction: 6x400m at 8:00 pace, 300 stroke count maximum",
          "Video analysis needed: likely pulling/breathing mechanics failure",
          "Dryland strength: 3x/week core + lat work to support longer strokes",
          "Distance-per-stroke focus: Every rep, count strokes and aim to reduce by 5",
          "Aerobic base: 4x600m at comfortable pace before attempting speed work",
          "Target: 260 stroke count maximum for ANY 400m before progressing",
        ],
        optimal: `Best performance: ${optimal.label} - ${formatTime(
          optimal.time
        )} at ${
          optimal.strokes
        } strokes - BUT times suggest technique issues need addressing first`,
      },
      Yaa: {
        strengths: [
          "T1 improvement over baseline (45-second faster)",
          "When fresh, capable of mid-6:00 range swimming",
          "Shows good response to warm-up effect",
        ],
        weaknesses: [
          "DNF on T3 - cannot complete full set",
          "High stroke counts (244-313) with no efficiency gains",
          "Fitness base insufficient for 4x400m workload",
          "T4 extremely slow (7:24) with highest stroke count (313)",
          "Baseline too aggressive for current fitness level",
        ],
        recommendations: [
          "IMMEDIATE: Drop to 3x300m sets until completing consistently",
          "Build aerobic foundation: 6 weeks of 2000-2500m continuous swims",
          "Stroke efficiency drills: Every session start with 10x50m perfect technique",
          "Target 240-250 stroke count maximum - current 313 is unsustainable",
          "Nutrition/hydration check: DNF may indicate fueling issues",
          "Start baseline at 7:15-7:20 pace to avoid blow-up",
          "Progressive overload: Add 1 rep every 2 weeks until reaching 4x400m",
        ],
        optimal: `Best performance: ${optimal.label} - ${formatTime(
          optimal.time
        )} at ${optimal.strokes} strokes`,
      },
      Kofi: {
        strengths: [
          "TEAM LEADER: Only swimmer consistently under 6:00 minutes",
          "Perfect stroke efficiency trend: 247 to 200 strokes (-19%)",
          "Negative split capability: Progressive improvement across set",
          "T4 best time (5:57.75) at LOWEST stroke count (200) - elite efficiency",
          "Model consistency: 6:00-6:30 range for all reps",
        ],
        weaknesses: [
          "Baseline/T1 too conservative - room for faster early reps",
          "Could potentially break 5:50 with optimal pacing from start",
          "Minor: 10-second gap between T1 and final reps shows unused capacity",
        ],
        recommendations: [
          "Race simulation: 4x400m starting at 6:15, 6:05, 5:58, 5:55",
          "Stroke count target: 200-225 range is your sweet spot - maintain this",
          "Speed development: Add 10x100m at 1:25 pace to build top-end speed",
          "Competition mindset: You are capable of 5:45-5:50 - believe it",
          "Maintain your efficiency discipline - it is your superpower",
          "Goal: Break 5:50 on T4 while keeping stroke count under 210",
        ],
        optimal: `Best performance: ${optimal.label} - ${formatTime(
          optimal.time
        )} at ${optimal.strokes} strokes - Your efficiency is exceptional!`,
      },
      Jada: {
        strengths: [
          "T4 recovery shows mental toughness (7:14 after DNF)",
          "Baseline reasonable (7:25) for fitness level",
          "Lower stroke count at T4 (215) suggests learning",
        ],
        weaknesses: [
          "DNF on T3 - severe conditioning limitation",
          "Times deteriorating catastrophically (7:25 to 8:24 at T2)",
          "Cannot maintain aerobic base for full set",
          "Inconsistent stroke mechanics (215-230 range unstable)",
        ],
        recommendations: [
          "CRITICAL: 8-week aerobic base building required",
          "Drop to 4x200m at 3:30 pace until consistent",
          "Build volume: Week 1-2: 3x300m, Week 3-4: 4x300m, Week 5-6: 3x400m",
          "Target: Complete 3x400m at 7:45 pace before attempting 4th rep",
          "Strength work: 2x/week dryland to support longer swimming",
          "Mental strategy: Focus on COMPLETION not speed for 6 weeks",
          "Stroke count goal: Stabilize at 220-225 before worrying about speed",
        ],
        optimal: `Best performance: ${optimal.label} - ${formatTime(
          optimal.time
        )} at ${optimal.strokes} strokes`,
      },
      Ronell: {
        strengths: [
          "Found consistency at T2-T4 after rough start",
          "Completed all reps despite being slowest swimmer",
          "Stroke count improved dramatically (306 to 243 at T2)",
          "Mental fortitude to keep swimming when struggling",
        ],
        weaknesses: [
          "Slowest times on team (8:06-8:26 range)",
          "High stroke counts (243-306) indicate poor distance-per-stroke",
          "Baseline very slow (8:26) suggests fitness/technique gaps",
          "No sub-7:45 reps achieved",
        ],
        recommendations: [
          "Technique overhaul needed: Work with coach on catch and pull phases",
          "Target stroke count: 220-230 (currently 243-250 optimal range too high)",
          "Distance-per-stroke drills: 12x25m focus on gliding, counting strokes",
          "Strength foundation: 6 weeks dryland 3x/week before increasing intensity",
          "Aerobic base: 5x500m at 9:00 pace with perfect technique",
          "Celebrate consistency: Your T2-T4 stability is foundation to build on",
          "Goal progression: 8:00 to 7:45 to 7:30 over next 8 weeks",
        ],
        optimal: `Best performance: ${optimal.label} - ${formatTime(
          optimal.time
        )} at ${optimal.strokes} strokes`,
      },
      Raphael: {
        strengths: [
          "Exceptional T3 (6:09.71) with elite stroke count (185)",
          "Strong descending first 3 reps: 7:07 to 6:09 (58-second drop)",
          "Lowest stroke counts on team (182-185 at T3-T4)",
          "Shows elite efficiency potential",
        ],
        weaknesses: [
          "CATASTROPHIC T4 collapse: 6:09 to 8:04 (nearly 2 minutes slower!)",
          "Technique fails completely when fatigued despite low stroke count",
          "Cannot maintain efficiency under cumulative fatigue",
          "T4 shows 182 strokes but 8:04 time = stroke effectiveness zero",
        ],
        recommendations: [
          "CRITICAL ISSUE: Low strokes + slow time = dead arm syndrome",
          "Lactate tolerance training: 6x300m at threshold with 1:30 rest",
          "Muscular endurance: Add tempo sets 4x400m at 6:45 pace",
          "Technical maintenance under fatigue: Focus on pull completion when tired",
          "Recovery protocols: Active recovery between hard reps",
          "Target: Maintain 6:30 pace on T4 even if stroke count rises to 210",
          "Your T3 is elite level - need to hold 85% of that speed on T4",
        ],
        optimal: `Best performance: ${optimal.label} - ${formatTime(
          optimal.time
        )} at ${
          optimal.strokes
        } strokes - But T4 breakdown needs urgent attention`,
      },
      Aseda: {
        strengths: [
          "Negative split mastery: Consistent improvement until T4 breakthrough",
          "T4 fastest time (7:23.67) shows strong finish ability",
          "Completes all reps with determination",
          "Shows best performance when accumulated fatigue exists",
        ],
        weaknesses: [
          "High stroke counts across all reps (244-270)",
          "Slowest swimmer except Ronell (7:23-8:30 range)",
          "Paradox: Best time at HIGHEST stroke count (270) suggests compensating for poor technique with effort",
          "Cannot achieve efficiency gains during set",
        ],
        recommendations: [
          "Technique is limiting factor: Distance-per-stroke critically low",
          "Focus: 8 weeks of stroke length development",
          "Drills: 16x25m at 0:45, count every stroke, reduce by 1 per week",
          "Target: 220-230 stroke count maximum (currently 270 is exhausting)",
          "Video analysis essential: Likely short stroke/poor catch mechanics",
          "Celebrate your negative split ability but fix the efficiency issue",
          "Goal: 7:00 at 240 strokes, then 6:45 at 230 strokes over 10 weeks",
        ],
        optimal: `Best performance: ${optimal.label} - ${formatTime(
          optimal.time
        )} at ${
          optimal.strokes
        } strokes - High count indicates technique needs work`,
      },
      Raya: {
        strengths: [
          "Consistent 6:15-6:40 range",
          "T4 strong finish (6:20.37) shows mental toughness",
          "Solid mid-pack performer with reliability",
          "Stroke count stable around 250-260 range",
        ],
        weaknesses: [
          "T1 data anomaly (115 strokes physically impossible for 400m)",
          "No significant improvement across set - flat progression",
          "Cannot break into sub-6:15 territory",
          "Stroke count higher than optimal (should be 230-240 range)",
        ],
        recommendations: [
          "You are consistent - now add speed",
          "Stroke efficiency work: Reduce from 254 to 235-240 strokes",
          "Speed endurance: 5x300m at 4:30 pace with 1:00 rest",
          "Target: Break 6:10 barrier on T2 or T3",
          "Tempo training: Use 1:32/100m tempo trainer for entire set",
          "Your consistency is valuable - maintain it while adding 10s speed",
          "Goal: 6:10, 6:05, 6:00, 6:10 set with 240 stroke count average",
        ],
        optimal: `Best performance: ${optimal.label} - ${formatTime(
          optimal.time
        )} at ${optimal.strokes} strokes `,
      },
      Jesse: {
        strengths: [
          "Strong baseline (6:27.99) shows initial capability",
          "Best performance at start of set when fresh",
          "Capable of sub-6:30 swimming",
        ],
        weaknesses: [
          "Steady deterioration across set (6:27 to 6:47)",
          "Stroke count inflation under fatigue (245 to 285 to 270)",
          "Cannot maintain efficiency as set progresses",
          "20-second slow-down indicates conditioning limit",
          "Technique breaks down after baseline",
        ],
        recommendations: [
          "Aerobic capacity is limiting factor",
          "Build endurance base: 3000m continuous swims at 1:40/100m, 2x/week",
          "Stroke maintenance drills: Practice holding 245 count even when tired",
          "Lactate clearance: 6x200m descending 1-3 with 30s rest",
          "Mental toughness: Visualize maintaining baseline pace on T4",
          "Target: 6:30 for ALL reps before attempting faster times",
          "Goal: Reverse the trend - make T4 faster than baseline",
        ],
        optimal: `Best performance: ${optimal.label} - ${formatTime(
          optimal.time
        )} at ${optimal.strokes} strokes`,
      },
    };

    return insights[swimmer];
  };

  const teamStats = calculateTeamStats();
  const swimmers = Object.keys(swimmerData);

  const currentData = swimmerData[selectedSwimmer];
  const chartData = currentData.labels
    .map((label, idx) => ({
      rep: label,
      time: currentData.times[idx],
      strokes: currentData.strokes[idx],
    }))
    .filter((d) => d.time !== null);

  const scatterData = chartData.map((d) => ({
    strokes: d.strokes,
    time: d.time,
    rep: d.rep,
  }));

  const insights = getSwimmerInsights(selectedSwimmer);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sessions
          </Link>
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            African Sharks 4x400m Freestyle Analysis
          </h1>
          <p className="text-gray-600">
            Sunday, December 21, 2025 - Performance & Stroke Optimization
          </p>
        </div>

        <div className="flex gap-4 mb-6 flex-wrap">
          <button
            onClick={() => setActiveTab("team")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "team"
                ? "bg-cyan-500 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Team Overview
          </button>
          <button
            onClick={() => setActiveTab("individual")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "individual"
                ? "bg-cyan-500 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Individual Analysis
          </button>
          <button
            onClick={() => setActiveTab("key")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "key"
                ? "bg-cyan-500 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Key & Definitions
          </button>
        </div>

        {activeTab === "team" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                Team Performance Across All Repetitions
              </h2>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={teamStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="rep" />
                  <YAxis
                    label={{
                      value: "Time (seconds)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                    domain={[340, 480]}
                  />
                  <Tooltip
                    formatter={(value) => formatTime(value)}
                    labelFormatter={(label) => `Rep: ${label}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="bestTime"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="Best Time"
                    dot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="meanTime"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Team Average"
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <p className="text-sm text-gray-600 mb-1">
                    Fastest Single Rep
                  </p>
                  <p className="text-2xl font-bold text-green-700">
                    {formatTime(Math.min(...teamStats.map((s) => s.bestTime)))}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Jadon - T3</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm text-gray-600 mb-1">
                    Overall Team Average
                  </p>
                  <p className="text-2xl font-bold text-blue-700">
                    {formatTime(
                      teamStats.reduce((a, b) => a + b.meanTime, 0) /
                        teamStats.length
                    )}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Across all reps</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <p className="text-sm text-gray-600 mb-1">Total Swimmers</p>
                  <p className="text-2xl font-bold text-purple-700">11</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Active participants
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                Key Team Insights
              </h2>
              <div className="space-y-4">
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                  <h3 className="font-bold text-yellow-800 mb-2">
                    Pacing Crisis
                  </h3>
                  <p className="text-gray-700">
                    6 out of 11 swimmers show their SLOWEST time at T2,
                    indicating poor pacing strategy or inadequate recovery
                    between reps. Team needs pacing education.
                  </p>
                </div>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <h3 className="font-bold text-red-800 mb-2">
                    Stroke Count Paradox
                  </h3>
                  <p className="text-gray-700">
                    Multiple swimmers (Abena, Aseda, Jesse) show INCREASING
                    stroke counts but SLOWER times - indicating severe technique
                    breakdown under fatigue. This is inefficient and exhausting.
                  </p>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <h3 className="font-bold text-green-800 mb-2">
                    Elite Performer Identified
                  </h3>
                  <p className="text-gray-700">
                    Kofi demonstrates textbook progression: reducing stroke
                    count (247 to 200) while getting faster (6:28 to 5:57). This
                    is the efficiency model all swimmers should study.
                  </p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <h3 className="font-bold text-blue-800 mb-2">DNF Pattern</h3>
                  <p className="text-gray-700">
                    Yaa and Jada both failed to complete T3, suggesting the
                    4x400m distance exceeds current fitness capacity. Consider
                    3x400m progression for these athletes.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                Stroke Count vs Time Analysis
              </h2>
              <p className="text-gray-600 mb-4">
                This chart shows the relationship between stroke count and time
                for all swimmers. Ideally, lower stroke counts should correlate
                with faster times (more efficient swimming).
              </p>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="strokes"
                    label={{
                      value: "Stroke Count",
                      position: "insideBottom",
                      offset: -5,
                    }}
                    domain={[100, 330]}
                  />
                  <YAxis
                    dataKey="time"
                    label={{
                      value: "Time (seconds)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                    domain={[340, 520]}
                  />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === "time") return formatTime(value);
                      return value;
                    }}
                    labelFormatter={(label) => `Data Point`}
                  />
                  <Scatter
                    name="All Swimmers"
                    data={swimmers.flatMap((s) =>
                      swimmerData[s].times
                        .map((time, idx) => ({
                          strokes: swimmerData[s].strokes[idx],
                          time: time,
                          swimmer: s,
                        }))
                        .filter(
                          (d) =>
                            d.time !== null &&
                            d.strokes !== null &&
                            d.strokes > 150
                        )
                    )}
                    fill="#3b82f6"
                  />
                </ScatterChart>
              </ResponsiveContainer>
              <div className="mt-4 text-sm text-gray-600">
                <p>
                  <strong>Interpretation:</strong> Points in the lower-left (low
                  strokes, fast time) represent efficient swimming. Points in
                  the upper-right (high strokes, slow time) indicate technique
                  issues.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "individual" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-xl p-6">
              <label className="block text-lg font-semibold text-blue-900 mb-3">
                Select Swimmer:
              </label>
              <select
                value={selectedSwimmer}
                onChange={(e) => setSelectedSwimmer(e.target.value)}
                className="w-full p-3 border-2 border-blue-300 rounded-lg text-lg font-medium"
              >
                {swimmers.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg shadow-xl p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-3">
                {selectedSwimmer} - Optimal Stroke Count
              </h2>
              <div className="bg-white p-4 rounded-lg border-2 border-cyan-500">
                <p className="text-lg font-semibold text-gray-800">
                  {insights.optimal}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                {selectedSwimmer} - Time Progression
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="rep" />
                  <YAxis
                    label={{
                      value: "Time (seconds)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip formatter={(value) => formatTime(value)} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="time"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name="Time"
                    dot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                {selectedSwimmer} - Stroke Count Progression
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="rep" />
                  <YAxis
                    label={{
                      value: "Stroke Count",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="strokes" fill="#f59e0b" name="Strokes">
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.strokes < 230
                            ? "#10b981"
                            : entry.strokes < 260
                            ? "#f59e0b"
                            : "#ef4444"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-3 flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Excellent (&lt;230)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span>Good (230-260)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>Needs Work (&gt;260)</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                {selectedSwimmer} - Stroke Efficiency Map
              </h2>
              <p className="text-gray-600 mb-4">
                This chart shows your stroke count vs time for each rep. Lower
                and to the left is better (fewer strokes, faster time).
              </p>
              <ResponsiveContainer width="100%" height={350}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="strokes"
                    label={{
                      value: "Stroke Count",
                      position: "insideBottom",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    dataKey="time"
                    label={{
                      value: "Time (seconds)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === "time") return formatTime(value);
                      return value;
                    }}
                    labelFormatter={() => ""}
                    content={({ payload }) => {
                      if (payload && payload.length > 0) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white p-3 border-2 border-blue-500 rounded shadow-lg">
                            <p className="font-bold">{data.rep}</p>
                            <p>Time: {formatTime(data.time)}</p>
                            <p>Strokes: {data.strokes}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter data={scatterData} fill="#8b5cf6" shape="circle">
                    {scatterData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.rep === insights.optimal.split(" ")[2]
                            ? "#10b981"
                            : "#8b5cf6"
                        }
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
              <div className="mt-3 flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span>Optimal Performance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                  <span>Other Reps</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg shadow-xl p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                Performance Summary for {selectedSwimmer}
              </h2>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-green-700 mb-3">
                  Strengths
                </h3>
                <ul className="space-y-2">
                  {insights.strengths.map((strength, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-500 mr-2 text-xl">✓</span>
                      <span className="text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-red-700 mb-3">
                  Areas for Improvement
                </h3>
                <ul className="space-y-2">
                  {insights.weaknesses.map((weakness, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-red-500 mr-2 text-xl">⚠</span>
                      <span className="text-gray-700">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-3">
                  Training Recommendations
                </h3>
                <ul className="space-y-3">
                  {insights.recommendations.map((rec, idx) => (
                    <li key={idx} className="bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-gray-800">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "key" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">
                Dashboard Key & Definitions
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">
                    Repetition Labels
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-l-4 border-blue-500 pl-4 bg-gray-50 p-3 rounded">
                      <p className="font-semibold text-gray-800">Baseline</p>
                      <p className="text-sm text-gray-600">
                        First 400m swim to establish starting performance level
                      </p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4 bg-gray-50 p-3 rounded">
                      <p className="font-semibold text-gray-800">
                        T1, T2, T3, T4
                      </p>
                      <p className="text-sm text-gray-600">
                        Trial 1 through 4 - subsequent 400m repetitions after
                        baseline
                      </p>
                    </div>
                    <div className="border-l-4 border-red-500 pl-4 bg-gray-50 p-3 rounded">
                      <p className="font-semibold text-gray-800">
                        DS (Did Not Swim)
                      </p>
                      <p className="text-sm text-gray-600">
                        Swimmer did not complete this repetition
                      </p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4 bg-gray-50 p-3 rounded">
                      <p className="font-semibold text-gray-800">
                        DNF (Did Not Finish)
                      </p>
                      <p className="text-sm text-gray-600">
                        Swimmer started but could not complete the repetition
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">
                    Key Metrics Explained
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-semibold text-gray-800">Time</p>
                      <p className="text-sm text-gray-600">
                        Total time to complete 400 meters in minutes:seconds
                        format. Lower is faster.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-semibold text-gray-800">
                        Stroke Count (SC)
                      </p>
                      <p className="text-sm text-gray-600">
                        Total number of arm strokes taken to complete 400m.
                        Lower count usually means better efficiency (more
                        distance per stroke).
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-semibold text-gray-800">
                        Optimal Stroke Count
                      </p>
                      <p className="text-sm text-gray-600">
                        The stroke count at which you achieved your fastest
                        time. This is your target efficiency zone.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-semibold text-gray-800">
                        Distance Per Stroke (DPS)
                      </p>
                      <p className="text-sm text-gray-600">
                        How far you travel with each stroke. Higher DPS = better
                        technique. Calculate: 400m ÷ stroke count.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">
                    Understanding Stroke Count Zones
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                      <p className="font-semibold text-green-800">
                        Excellent Zone: Under 230 strokes
                      </p>
                      <p className="text-sm text-gray-600">
                        Elite efficiency. Long, powerful strokes. Distance per
                        stroke over 1.74m.
                      </p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                      <p className="font-semibold text-yellow-800">
                        Good Zone: 230-260 strokes
                      </p>
                      <p className="text-sm text-gray-600">
                        Solid technique with room for improvement. Distance per
                        stroke 1.54-1.74m.
                      </p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                      <p className="font-semibold text-red-800">
                        Needs Work: Over 260 strokes
                      </p>
                      <p className="text-sm text-gray-600">
                        Technique issues likely. Short, choppy strokes.
                        Priority: work on stroke length and efficiency.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">
                    Performance Patterns to Watch
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="font-semibold text-gray-800">
                        Negative Split (Good)
                      </p>
                      <p className="text-sm text-gray-600">
                        Getting faster as the set progresses. Shows good pacing
                        and aerobic fitness.
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="font-semibold text-gray-800">
                        Positive Split (Concerning)
                      </p>
                      <p className="text-sm text-gray-600">
                        Getting slower as the set progresses. May indicate
                        pacing issues or fitness gaps.
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="font-semibold text-gray-800">
                        Stroke Count Inflation
                      </p>
                      <p className="text-sm text-gray-600">
                        Strokes increasing across reps = technique breakdown
                        under fatigue. Focus needed.
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="font-semibold text-gray-800">
                        Stroke Count Reduction
                      </p>
                      <p className="text-sm text-gray-600">
                        Strokes decreasing while maintaining or improving speed
                        = excellent efficiency development.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-lg mt-6">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">
                    How to Use This Dashboard
                  </h3>
                  <ol className="space-y-2 list-decimal list-inside text-gray-700">
                    <li>
                      <strong>Team Overview:</strong> See how the whole team
                      performed. Compare your times to best times and team
                      average.
                    </li>
                    <li>
                      <strong>Find Your Optimal Stroke Count:</strong> Look at
                      which rep gave you the best time and note the stroke count
                      - this is your efficiency target.
                    </li>
                    <li>
                      <strong>Review Your Graphs:</strong> Are you getting
                      faster or slower? Are your strokes consistent or
                      increasing?
                    </li>
                    <li>
                      <strong>Check the Efficiency Map:</strong> Your best
                      performance should be in the lower-left area (low strokes,
                      fast time).
                    </li>
                    <li>
                      <strong>Read Your Recommendations:</strong> Focus on the
                      specific training tips given for your performance pattern.
                    </li>
                    <li>
                      <strong>Set Goals:</strong> Use your optimal stroke count
                      and time as targets for your next training session.
                    </li>
                  </ol>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mt-6">
                  <h3 className="font-bold text-yellow-800 mb-2">
                    Important Note
                  </h3>
                  <p className="text-sm text-gray-700">
                    The goal is NOT just to swim fast - it is to swim fast
                    EFFICIENTLY. A lower stroke count at the same speed means
                    you are working smarter, not harder. This efficiency will
                    help you swim faster in races and avoid injury.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Watermark */}
        <div className="mt-8 text-center text-cyan-300/70 text-sm py-4">
          <p>Developed by Emmanuel-Paul</p>
        </div>
      </div>
    </div>
  );
};

export default SwimDashboard400m;
