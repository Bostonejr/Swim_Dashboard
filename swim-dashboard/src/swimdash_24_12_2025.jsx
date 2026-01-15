import React, { useState } from "react";
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
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const WednesdayDashboard = () => {
  const [activeTab, setActiveTab] = useState("team");
  const [selectedSwimmer, setSelectedSwimmer] = useState("Jason");

  // Raw data from Wednesday session
  const rawData = {
    Jason: {
      times: [
        33.05, 33.89, 33.88, 32.15, 33.53, 33.61, 34.13, 33.14, 32.15, 33.99,
        32.49, 29.93,
      ],
      strokes: [19, 19.5, 19, 18.5, 18, 21, 19.5, 19.5, 19, 19, 19, 20.5],
    },
    Jadon: {
      times: [
        33.37, 34.09, 33.88, 32.47, 33.53, 33.9, 34.44, 33.35, 32.46, 34.19,
        32.17, 29.38,
      ],
      strokes: [18, 18.5, 18, 20, 19, 22, 21, 20.5, 20, 22, 20, 23],
    },
    Jada: {
      times: [
        40.65, 39.19, 39.22, 37.15, 40.37, 41.35, 41.98, 40.99, 41.05, 41.83,
        47.51, 39.78,
      ],
      strokes: [30, 30, 30, 25.5, 26, 26.5, 26, 25.5, 25, 26, 27, 22],
    },
    Yaa: {
      times: [38.64, 36.06, 38.36, 37.57, 38.88, 38.23],
      strokes: [23, 23, 25, 25, 26, 20],
      dns: true,
    },
    Abena: {
      times: [
        39.93, 34.45, 41.82, 35.93, 38.3, 36.6, 37.75, 43.22, 44.03, 39.96,
        35.48, 33.48,
      ],
      strokes: [20, 21, 20, 28, 26, 19, 20, 18, 29, 27, 20, 22],
    },
    Kofi: {
      times: [
        36.68, 37.71, 37.07, 35.54, 39.37, 39.54, 37.87, 37.52, 37.53, 36.99,
        38.07, 36.07,
      ],
      strokes: [20, 20.5, 20, 19, 20, 18, 20, 18, 21, 19, 18, 17],
    },
    Ronell: {
      times: [
        43.27, 40.99, 43.2, 40.82, 44.98, 46.13, 48.3, 44.95, 47.45, 47.59,
        50.01, 48.01,
      ],
      strokes: [33, 31, 55, 43, 16, 41, 40, 35, 41, 38.5, 44, 42],
    },
    Nyameye: {
      times: [
        42.16, 40.17, 44, 41.86, 44.23, 44.15, 44.96, 46.85, 46.95, 48.17,
        46.42, 44.42,
      ],
      strokes: [20, 24, 22, 24, 24, 22, 22, 22, 20, 20, 21, 20],
    },
    Nyametsease: {
      times: [
        55.33, 55.75, 59.01, 55.38, 58.69, 57.6, 56.67, 68.37, 59.53, 60.27,
        58.13, 56.13,
      ],
      strokes: [36, 34, 28, 28, 34, 30, 28, 30, 30, 26, 32, 36],
    },
    Adom: {
      times: [
        44.78, 44.63, 46.44, 42.58, 47.33, 48.08, 46.14, 47.92, 48.5, 49.62,
        60.12, 45.92,
      ],
      strokes: [28.5, 36, 33, 32, 33, 25, 31, 31, 32, 30.5, 45, 41],
    },
    Afia: {
      times: [
        45.75, 45.15, 48.95, 45.26, 48.15, 45.61, 49.07, 48.27, 51.08, 50.07,
        60.54, 47.05,
      ],
      strokes: [38, 46, 35, 40, 31, 37, 40, 41, 40, 40, 45, 42],
    },
    Pinaman: {
      times: [
        51.18, 48.05, 47.02, 46.97, 54.03, 53.27, 52.17, 55.38, 50.97, 47.49,
      ],
      strokes: [31, 31, 31, 30, 30, 30, 31, 29, 38, 27],
      dns: true,
    },
    Raya: {
      times: [
        38.2, 38.4, 38.6, 35.54, 37.63, 38.54, 38.49, 38.36, 40.04, 38.17,
        38.76, 18,
      ],
      strokes: [27, 36.5, 26, 22, 27, 29, 27.5, 28, 30, 25.5, 27.5, 18],
    },
    Soyara: {
      times: [62.88, 63.69, 63.97, 62.88, 66.67, 64.36, 70.82, 54.24, 63.88],
      strokes: [30, 31, 31, 34, 34, 34, 48, 42, 35],
      dns: true,
    },
    Naana: {
      times: [
        53.46, 49.02, 50.63, 49.21, 53.53, 55.44, 53.16, 52.14, 53.03, 51.31,
      ],
      strokes: [45, 41, 37, 21, 37, 45, 37, 37, 37, 36],
      dns: true,
    },
    NanaAma: {
      times: [
        71.76, 66.68, 71.23, 70.27, 65.18, 69.78, 66.72, 70.26, 72.78, 80.33,
      ],
      strokes: [46, 47, 31, 48, 38, 42, 44, 34, 45, 40],
      dns: true,
    },
    Aseda: {
      times: [
        42.46, 40.51, 37.91, 36.46, 43.85, 47.32, 46.12, 47.45, 46.67, 48.44,
        49.33, 41.43,
      ],
      strokes: [29.5, 25, 23, 27, 25, 23, 27, 27, 28, 29.5, 30, 28],
    },
    Raphaell: {
      times: [
        35.96, 35.75, 34.55, 34.62, 34.77, 35.56, 35.24, 33.25, 36.1, 36.5,
        34.71, 32.71,
      ],
      strokes: [25, 23, 23, 21, 21, 22, 19, 18, 26, 22, 17, 14],
    },
    Nora: {
      times: [
        64.88, 69.53, 68.62, 68.51, 82.67, 82.04, 76.0, 79.79, 84.4, 79.71,
      ],
      strokes: [30, 32, 33, 30, 29, 29, 39, 38, 39, 34],
      dns: true,
    },
  };

  // Calculate comprehensive metrics for each swimmer
  const calculateMetrics = (swimmer) => {
    const data = rawData[swimmer];
    const times = data.times;
    const strokes = data.strokes;
    const n = times.length;

    const avg = times.reduce((a, b) => a + b, 0) / n;
    const variance = times.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / n;
    const stdDev = Math.sqrt(variance);

    const t1 = times[0];
    const tFinal = times[n - 1];
    const avgVsT1 = (((avg - t1) / t1) * 100).toFixed(1);
    const avgVsTFinal = (((avg - tFinal) / tFinal) * 100).toFixed(1);

    // Find 3 closest times to average
    const closestToAvg = times
      .map((t, i) => ({ time: t, rep: i + 1, diff: Math.abs(t - avg) }))
      .sort((a, b) => a.diff - b.diff)
      .slice(0, 3);

    // Stroke efficiency
    const strokeEff = times.map((t, i) =>
      strokes[i] > 0 ? t / strokes[i] : 0
    );
    const avgStrokeEff =
      strokeEff.reduce((a, b) => a + b, 0) /
      strokeEff.filter((x) => x > 0).length;

    // Fatigue index (difference between first 3 and last 3 avg)
    const first3 = times.slice(0, 3).reduce((a, b) => a + b, 0) / 3;
    const last3 = times.slice(-3).reduce((a, b) => a + b, 0) / 3;
    const fatigueIndex = (((last3 - first3) / first3) * 100).toFixed(1);

    // Best and worst
    const best = Math.min(...times);
    const worst = Math.max(...times);
    const range = worst - best;

    return {
      avg: avg.toFixed(2),
      stdDev: stdDev.toFixed(2),
      t1,
      tFinal,
      avgVsT1,
      avgVsTFinal,
      closestToAvg,
      avgStrokeEff: avgStrokeEff.toFixed(2),
      fatigueIndex,
      best: best.toFixed(2),
      worst: worst.toFixed(2),
      range: range.toFixed(2),
      consistency:
        stdDev < 2
          ? "Excellent"
          : stdDev < 4
          ? "Good"
          : stdDev < 6
          ? "Moderate"
          : "Poor",
    };
  };

  // Calculate team statistics for each rep
  const calculateTeamStats = () => {
    const swimmers = Object.keys(rawData);
    const maxReps = 12;
    const stats = [];

    for (let rep = 0; rep < maxReps; rep++) {
      const repTimes = swimmers
        .map((s) => rawData[s].times[rep])
        .filter((t) => t !== undefined);

      if (repTimes.length > 0) {
        const best = Math.min(...repTimes);
        const mean = repTimes.reduce((a, b) => a + b, 0) / repTimes.length;
        stats.push({
          rep: rep + 1,
          best: best.toFixed(2),
          mean: mean.toFixed(2),
          count: repTimes.length,
        });
      }
    }
    return stats;
  };

  const teamStats = calculateTeamStats();

  // Generate insights for each swimmer
  const getSwimmerInsights = (swimmer) => {
    const metrics = calculateMetrics(swimmer);
    const data = rawData[swimmer];
    const insights = {
      strengths: [],
      weaknesses: [],
      recommendations: [],
    };

    // Analysis based on metrics
    if (parseFloat(metrics.avg) < 35) {
      insights.strengths.push(
        `Elite performer with ${metrics.avg}s average - top tier speed`
      );
    } else if (parseFloat(metrics.avg) < 40) {
      insights.strengths.push(
        `Strong competitive swimmer with ${metrics.avg}s average`
      );
    }

    if (metrics.consistency === "Excellent" || metrics.consistency === "Good") {
      insights.strengths.push(
        `${metrics.consistency} consistency (σ=${metrics.stdDev}s) - reliable pacing`
      );
    } else {
      insights.weaknesses.push(
        `${metrics.consistency} consistency (σ=${metrics.stdDev}s) - erratic performance`
      );
    }

    // Endurance analysis
    if (parseFloat(metrics.fatigueIndex) < 0) {
      insights.strengths.push(
        `Negative splitting champion - ${Math.abs(
          metrics.fatigueIndex
        )}% faster in final third`
      );
    } else if (parseFloat(metrics.fatigueIndex) < 5) {
      insights.strengths.push(
        `Excellent endurance - only ${metrics.fatigueIndex}% slower in final third`
      );
    } else if (parseFloat(metrics.fatigueIndex) > 10) {
      insights.weaknesses.push(
        `Severe fatigue - ${metrics.fatigueIndex}% slower in final third (${
          metrics.first3 || "N/A"
        }s → ${metrics.last3 || "N/A"}s)`
      );
    }

    // T1 vs Average vs TFinal analysis
    if (parseFloat(metrics.avgVsT1) < 0) {
      insights.strengths.push(
        `Started slower than average - shows warm-up intelligence`
      );
    } else if (parseFloat(metrics.avgVsT1) > 5) {
      insights.weaknesses.push(
        `Started ${metrics.avgVsT1}% faster than sustainable pace - poor pacing strategy`
      );
    }

    if (parseFloat(metrics.avgVsTFinal) > 0) {
      insights.strengths.push(
        `Finished ${Math.abs(
          metrics.avgVsTFinal
        )}% faster than average - strong closer`
      );
    } else if (parseFloat(metrics.avgVsTFinal) < -10) {
      insights.weaknesses.push(
        `Finished ${Math.abs(
          metrics.avgVsTFinal
        )}% slower than average - endurance deficit`
      );
    }

    // Peak performance timing
    const avgRep = metrics.closestToAvg.reduce((sum, x) => sum + x.rep, 0) / 3;
    if (avgRep <= 4) {
      insights.weaknesses.push(
        `Peak average times in early reps (${metrics.closestToAvg
          .map((x) => "R" + x.rep)
          .join(", ")}) - couldn't maintain`
      );
    } else if (avgRep >= 9) {
      insights.strengths.push(
        `Peak average times in final reps (${metrics.closestToAvg
          .map((x) => "R" + x.rep)
          .join(", ")}) - excellent endurance`
      );
    } else {
      insights.strengths.push(
        `Consistent average pace throughout (${metrics.closestToAvg
          .map((x) => "R" + x.rep)
          .join(", ")})`
      );
    }

    // Stroke efficiency
    const avgStroke =
      data.strokes.reduce((a, b) => a + b, 0) / data.strokes.length;
    if (avgStroke < 20) {
      insights.strengths.push(
        `Excellent stroke efficiency - ${avgStroke.toFixed(
          1
        )} avg strokes per 50m`
      );
    } else if (avgStroke > 30) {
      insights.weaknesses.push(
        `Poor stroke efficiency - ${avgStroke.toFixed(
          1
        )} avg strokes per 50m (target: <50)`
      );
    }

    // Specific swimmer patterns
    if (swimmer === "Ronell" && data.strokes.includes(55)) {
      insights.weaknesses.push(
        `CRITICAL: Stroke count spike to 55 strokes (Rep 3) - complete technique breakdown`
      );
    }

    // Recommendations based on analysis
    if (parseFloat(metrics.stdDev) > 4) {
      insights.recommendations.push(
        "Priority: Pacing discipline - use tempo trainer at consistent stroke rate (1.5s/stroke)"
      );
      insights.recommendations.push(
        "Practice even-split sets: 8x50m holding exact same time each rep, 45s rest"
      );
    }

    if (parseFloat(metrics.fatigueIndex) > 10) {
      insights.recommendations.push(
        "URGENT: Aerobic base building - add 3x400m easy pace continuous swims per week"
      );
      insights.recommendations.push(
        "Lactate threshold work: 6x100m at 80% effort with 90s rest, maintain form"
      );
    }

    if (avgStroke > 25) {
      insights.recommendations.push(
        "Stroke technique overhaul: 20x25m drill work focusing on catch and pull phases"
      );
      insights.recommendations.push(
        "Video analysis session needed - identify specific inefficiencies"
      );
    }

    if (parseFloat(metrics.best) < 35 && parseFloat(metrics.avg) > 40) {
      insights.recommendations.push(
        "High speed potential but inconsistent - mental training for focus maintenance"
      );
      insights.recommendations.push(
        "Practice race pace sets: 5x100m at goal pace with full recovery between"
      );
    }

    if (insights.strengths.length === 0) {
      insights.strengths.push(
        "Completed the full set - shows determination and commitment"
      );
    }

    if (data.dns) {
      insights.weaknesses.push(
        "Did not complete full set (DNS for final reps) - conditioning issue"
      );
      insights.recommendations.push(
        "Build endurance gradually: start with 8x50m sets, add 1 rep per week"
      );
    }

    return insights;
  };

  const swimmers = Object.keys(rawData).sort();
  const selectedData = rawData[selectedSwimmer];
  const metrics = calculateMetrics(selectedSwimmer);
  const insights = getSwimmerInsights(selectedSwimmer);

  // Prepare chart data
  const chartData = selectedData.times.map((time, i) => ({
    rep: i + 1,
    time: time,
    stroke: selectedData.strokes[i],
    efficiency:
      selectedData.strokes[i] > 0
        ? (time / selectedData.strokes[i]).toFixed(2)
        : 0,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sessions
          </Link>
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            African Sharks - Wednesday Session Analysis
          </h1>
          <p className="text-gray-600">
            Wednesday, December 24, 2025 - Long Endurance Set (12 x 50m
            Freestyle)
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-6 flex-wrap">
          <button
            onClick={() => setActiveTab("team")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "team"
                ? "bg-cyan-500 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Team Performance
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
            Key & Guide
          </button>
        </div>

        {/* Team Performance Tab */}
        {activeTab === "team" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                Team Performance Across All 12 Reps
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={teamStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="rep"
                    label={{
                      value: "Repetition Number",
                      position: "insideBottom",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    label={{
                      value: "Time (seconds)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="best"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="Best Time"
                    dot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="mean"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name="Team Average"
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <p className="text-sm text-gray-600 mb-1">
                    Overall Best Time
                  </p>
                  <p className="text-2xl font-bold text-green-700">29.38s</p>
                  <p className="text-xs text-gray-500 mt-1">Jadon - Rep 12</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm text-gray-600 mb-1">Team Average</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {(
                      teamStats.reduce((a, b) => a + parseFloat(b.mean), 0) /
                      teamStats.length
                    ).toFixed(2)}
                    s
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Across all reps</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                  <p className="text-sm text-gray-600 mb-1">Fastest Rep</p>
                  <p className="text-2xl font-bold text-orange-700">
                    Rep{" "}
                    {
                      teamStats.reduce((min, d) =>
                        parseFloat(d.mean) < parseFloat(min.mean) ? d : min
                      ).rep
                    }
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {
                      teamStats.reduce((min, d) =>
                        parseFloat(d.mean) < parseFloat(min.mean) ? d : min
                      ).mean
                    }
                    s avg
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <p className="text-sm text-gray-600 mb-1">Slowest Rep</p>
                  <p className="text-2xl font-bold text-purple-700">
                    Rep{" "}
                    {
                      teamStats.reduce((max, d) =>
                        parseFloat(d.mean) > parseFloat(max.mean) ? d : max
                      ).rep
                    }
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {
                      teamStats.reduce((max, d) =>
                        parseFloat(d.mean) > parseFloat(max.mean) ? d : max
                      ).mean
                    }
                    s avg
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                Team Insights
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">
                    💪 Team Strengths
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>
                      • Elite trio (Jason, Jadon, Raphaell) averaging under 34s
                      per 50m - championship level
                    </li>
                    <li>
                      • Majority of swimmers completed all 12 x 50m reps -
                      excellent commitment
                    </li>
                    <li>
                      • Best team time improved from Rep 1 to Rep 12 - shows
                      pacing intelligence
                    </li>
                    <li>
                      • Several swimmers showed negative split capability
                      (faster finishes)
                    </li>
                    <li>
                      • Jadon set the overall best time of 29.38s on the final
                      rep - remarkable endurance
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-red-50 to-rose-50 p-5 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-800 mb-3">
                    ⚠️ Team Concerns
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>
                      • Wide performance gap (29s to 84s) - need differentiated
                      training groups
                    </li>
                    <li>
                      • 6 swimmers did not complete full 12 x 50m set (DNS) -
                      conditioning issue
                    </li>
                    <li>
                      • Several swimmers show {">"}10% fatigue in final third of
                      set
                    </li>
                    <li>
                      • Stroke counts vary wildly (14-55 strokes per 50m) -
                      technique inconsistency
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Individual Analysis Tab */}
        {activeTab === "individual" && (
          <div className="space-y-6">
            {/* Swimmer Selection */}
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
                    {s === "NanaAma" ? "Nana Ama" : s}
                  </option>
                ))}
              </select>
            </div>

            {/* Performance Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-5 rounded-lg shadow-lg">
                <p className="text-sm opacity-90 mb-1">Average Time</p>
                <p className="text-3xl font-bold">{metrics.avg}s</p>
                <p className="text-xs opacity-80 mt-1">
                  Over {selectedData.times.length} reps
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-5 rounded-lg shadow-lg">
                <p className="text-sm opacity-90 mb-1">Best Time</p>
                <p className="text-3xl font-bold">{metrics.best}s</p>
                <p className="text-xs opacity-80 mt-1">Peak performance</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-5 rounded-lg shadow-lg">
                <p className="text-sm opacity-90 mb-1">Consistency</p>
                <p className="text-3xl font-bold">{metrics.consistency}</p>
                <p className="text-xs opacity-80 mt-1">σ = {metrics.stdDev}s</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-5 rounded-lg shadow-lg">
                <p className="text-sm opacity-90 mb-1">Fatigue Index</p>
                <p className="text-3xl font-bold">{metrics.fatigueIndex}%</p>
                <p className="text-xs opacity-80 mt-1">
                  {parseFloat(metrics.fatigueIndex) < 0
                    ? "Negative split!"
                    : "Last vs First third"}
                </p>
              </div>
            </div>

            {/* Time Performance Chart */}
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                {selectedSwimmer === "NanaAma" ? "Nana Ama" : selectedSwimmer} -
                Time Performance
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="rep"
                    label={{
                      value: "Rep Number",
                      position: "insideBottom",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    label={{
                      value: "Time (seconds)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="time"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name="Time"
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Average line would be at {metrics.avg}s.</strong>{" "}
                  Times below this show above-average performance.
                </p>
              </div>
            </div>

            {/* Stroke Count Chart */}
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                {selectedSwimmer === "NanaAma" ? "Nana Ama" : selectedSwimmer} -
                Stroke Count Analysis
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="rep"
                    label={{
                      value: "Rep Number",
                      position: "insideBottom",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    label={{
                      value: "Stroke Count per 50m",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="stroke" fill="#f59e0b" name="Strokes per 50m" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>
                    Target: Under 50 strokes per 50m (25 per 25m).
                  </strong>{" "}
                  Lower stroke count with good time = better efficiency.
                </p>
              </div>
            </div>

            {/* Efficiency Chart */}
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                {selectedSwimmer === "NanaAma" ? "Nana Ama" : selectedSwimmer} -
                Stroke Efficiency (Time/Stroke)
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="rep"
                    label={{
                      value: "Rep Number",
                      position: "insideBottom",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    label={{
                      value: "Seconds per Stroke",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="efficiency"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="Time/Stroke Ratio"
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>
                    Average efficiency: {metrics.avgStrokeEff}s per stroke.
                  </strong>{" "}
                  Higher values mean more power per stroke, but balance with
                  total time.
                </p>
              </div>
            </div>

            {/* Key Metrics Analysis */}
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                Detailed Performance Metrics
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="text-sm text-gray-600">Initial Time (T1)</p>
                    <p className="text-2xl font-bold text-blue-700">
                      {metrics.t1}s
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <p className="text-sm text-gray-600">
                      Final Time (T{selectedData.times.length})
                    </p>
                    <p className="text-2xl font-bold text-green-700">
                      {metrics.tFinal}s
                    </p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <p className="text-sm text-gray-600">Performance Range</p>
                    <p className="text-2xl font-bold text-purple-700">
                      {metrics.range}s
                    </p>
                    <p className="text-xs text-gray-500">
                      {metrics.worst}s (worst) - {metrics.best}s (best)
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">
                      Average vs Initial Time
                    </p>
                    <p className="text-xl font-bold text-blue-700">
                      {parseFloat(metrics.avgVsT1) > 0 ? "+" : ""}
                      {metrics.avgVsT1}%
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {parseFloat(metrics.avgVsT1) > 0
                        ? "Started faster than sustainable pace"
                        : "Started slower, warmed into pace"}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">
                      Average vs Final Time
                    </p>
                    <p className="text-xl font-bold text-green-700">
                      {parseFloat(metrics.avgVsTFinal) > 0 ? "+" : ""}
                      {metrics.avgVsTFinal}%
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {parseFloat(metrics.avgVsTFinal) > 0
                        ? "Finished faster than average - strong closer!"
                        : "Finished slower than average - fatigue factor"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Closest to Average Analysis */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg shadow-xl p-6">
              <h2 className="text-2xl font-bold text-indigo-900 mb-4">
                When You Swam Your "Average Best"
              </h2>
              <p className="text-gray-700 mb-4">
                These 3 reps were closest to your {metrics.avg}s average time,
                showing when you hit your typical pace:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {metrics.closestToAvg.map((item, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-lg shadow-md">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-indigo-600">
                        Rep {item.rep}
                      </p>
                      <p className="text-xl text-gray-700 mt-2">
                        {item.time.toFixed(2)}s
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Only {item.diff.toFixed(2)}s from average
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Pattern:</strong>{" "}
                  {metrics.closestToAvg.reduce((sum, x) => sum + x.rep, 0) /
                    3 <=
                  4
                    ? "Your best average times came EARLY in the set - struggled to maintain pace later."
                    : metrics.closestToAvg.reduce((sum, x) => sum + x.rep, 0) /
                        3 >=
                      9
                    ? "Your best average times came LATE in the set - excellent endurance and pacing!"
                    : "Your average times were spread throughout - consistent pacing strategy."}
                </p>
              </div>
            </div>

            {/* Insights Section */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg shadow-xl p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">
                Performance Analysis for{" "}
                {selectedSwimmer === "NanaAma" ? "Nana Ama" : selectedSwimmer}
              </h2>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-green-700 mb-3">
                  ✓ Strengths
                </h3>
                <ul className="space-y-2">
                  {insights.strengths.map((strength, idx) => (
                    <li
                      key={idx}
                      className="flex items-start bg-white p-3 rounded-lg shadow-sm"
                    >
                      <span className="text-green-500 mr-3 text-xl flex-shrink-0">
                        ✓
                      </span>
                      <span className="text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-red-700 mb-3">
                  ⚠ Areas for Improvement
                </h3>
                <ul className="space-y-2">
                  {insights.weaknesses.map((weakness, idx) => (
                    <li
                      key={idx}
                      className="flex items-start bg-white p-3 rounded-lg shadow-sm"
                    >
                      <span className="text-red-500 mr-3 text-xl flex-shrink-0">
                        ⚠
                      </span>
                      <span className="text-gray-700">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-3">
                  🎯 Training Recommendations
                </h3>
                <div className="space-y-3">
                  {insights.recommendations.map((rec, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500"
                    >
                      <p className="text-gray-800">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Key & Guide Tab */}
        {activeTab === "key" && (
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              Dashboard Key & Guide
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-blue-800 mb-3">
                  Session Information
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-2">
                    <strong>Workout:</strong> 12 x 50m Freestyle - Long
                    Endurance Set
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Goal:</strong> Test pacing consistency, endurance,
                    and technique maintenance under fatigue
                  </p>
                  <p className="text-gray-700">
                    <strong>Format:</strong> Continuous repetitions with minimal
                    rest to assess conditioning over 600m total distance
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-800 mb-3">
                  Key Metrics Explained
                </h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <p className="font-semibold text-gray-800">
                      Time (T1, T2, ... T12)
                    </p>
                    <p className="text-sm text-gray-600">
                      Seconds taken to complete each 50m rep. Lower is faster.
                    </p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4 py-2">
                    <p className="font-semibold text-gray-800">
                      Stroke Count (Sc)
                    </p>
                    <p className="text-sm text-gray-600">
                      Number of strokes per 50m. Lower count = better
                      efficiency. Target: under 50 strokes (equivalent to 25 per
                      25m).
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4 py-2">
                    <p className="font-semibold text-gray-800">Average Time</p>
                    <p className="text-sm text-gray-600">
                      Mean of all completed rep times. Your "typical" pace for
                      this set.
                    </p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4 py-2">
                    <p className="font-semibold text-gray-800">
                      Consistency (Standard Deviation)
                    </p>
                    <p className="text-sm text-gray-600">
                      How much your times vary. Lower σ = more consistent.
                      Excellent: &lt;2s, Good: 2-4s, Moderate: 4-6s, Poor:
                      &gt;6s
                    </p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4 py-2">
                    <p className="font-semibold text-gray-800">Fatigue Index</p>
                    <p className="text-sm text-gray-600">
                      % change between first 3 reps average and last 3 reps
                      average. Shows endurance. Negative = faster finish!
                    </p>
                  </div>
                  <div className="border-l-4 border-indigo-500 pl-4 py-2">
                    <p className="font-semibold text-gray-800">
                      Stroke Efficiency
                    </p>
                    <p className="text-sm text-gray-600">
                      Time per stroke (seconds/stroke). Higher = more power per
                      stroke, but balance with total time.
                    </p>
                  </div>
                  <div className="border-l-4 border-pink-500 pl-4 py-2">
                    <p className="font-semibold text-gray-800">
                      DNS (Did Not Start)
                    </p>
                    <p className="text-sm text-gray-600">
                      Swimmer did not complete remaining reps. Indicates fatigue
                      or other limitation.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-800 mb-3">
                  Abbreviations
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-bold text-blue-600">T</p>
                    <p className="text-sm text-gray-600">Time</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-bold text-blue-600">Sc</p>
                    <p className="text-sm text-gray-600">Stroke Count</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-bold text-blue-600">s</p>
                    <p className="text-sm text-gray-600">Seconds</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-bold text-blue-600">m</p>
                    <p className="text-sm text-gray-600">Meters</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-bold text-blue-600">Rep</p>
                    <p className="text-sm text-gray-600">Repetition</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-bold text-blue-600">σ</p>
                    <p className="text-sm text-gray-600">Standard Deviation</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-bold text-blue-600">DNS</p>
                    <p className="text-sm text-gray-600">
                      Did Not Start/Finish
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-bold text-blue-600">avg</p>
                    <p className="text-sm text-gray-600">Average</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-800 mb-3">
                  Understanding Your Results
                </h3>
                <div className="space-y-3">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-800 mb-2">
                      Average vs T1 (Initial Time)
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Positive %:</strong> You started too fast and
                      couldn't maintain it. <br />
                      <strong>Negative %:</strong> You warmed up well and found
                      your rhythm after starting conservative.
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-800 mb-2">
                      Average vs T12 (Final Time)
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Positive %:</strong> You finished faster than
                      average - excellent endurance! <br />
                      <strong>Negative %:</strong> You faded at the end -
                      conditioning needs work.
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-800 mb-2">
                      Closest to Average Reps
                    </p>
                    <p className="text-sm text-gray-600">
                      Shows when you swam your "typical" pace. If all 3 are
                      early (Reps 1-4), you couldn't maintain. If mid-set (5-8),
                      good pacing. If late (9-12), excellent endurance.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">
                  How to Use This Dashboard
                </h3>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="font-bold text-blue-600 mr-2">1.</span>
                    <span>
                      <strong>Team Performance:</strong> See how the whole team
                      performed. Compare yourself to best and average times.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-blue-600 mr-2">2.</span>
                    <span>
                      <strong>Select Your Name:</strong> In Individual Analysis,
                      choose yourself from the dropdown.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-blue-600 mr-2">3.</span>
                    <span>
                      <strong>Review Your Graphs:</strong> Look for patterns -
                      getting faster or slower? Strokes consistent?
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-blue-600 mr-2">4.</span>
                    <span>
                      <strong>Read Your Analysis:</strong> Strengths,
                      weaknesses, and specific training recommendations for YOU.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-blue-600 mr-2">5.</span>
                    <span>
                      <strong>Set Goals:</strong> Use this data to target
                      specific improvements for next session.
                    </span>
                  </li>
                </ol>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
                <p className="font-semibold text-yellow-800 mb-2">💡 Pro Tip</p>
                <p className="text-sm text-gray-700">
                  Focus on consistency before speed. It's better to swim 12 reps
                  at 40s each than to swim one rep at 30s and the rest at 50s.
                  Consistent times show you're ready to level up!
                </p>
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

export default WednesdayDashboard;
