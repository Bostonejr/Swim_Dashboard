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
} from "recharts";
import { Users, TrendingDown, Award, AlertCircle } from "lucide-react";

const SwimDashboard = () => {
  const [activeTab, setActiveTab] = useState("team");
  const [selectedSwimmer, setSelectedSwimmer] = useState("Kobby");

  // Performance data organized by swimmer
  const swimmerData = {
    Kobby: {
      starts: [
        { attempt: "T1", time: 9.77, breakout: "AT" },
        { attempt: "T2", time: 6.95, breakout: "AT" },
        { attempt: "T3", time: 6.82, breakout: "AT" },
        { attempt: "T4", time: 5.96, breakout: "AT" },
      ],
      frontPush: [
        { attempt: "T1", time: 16.91, strokes: 10 },
        { attempt: "T3", time: 17.53, strokes: 10 },
        { attempt: "T4", time: 18.1, strokes: 11 },
      ],
      backDead: [
        { attempt: "T1", time: 20.71, strokes: 21 },
        { attempt: "T2", time: 20.21, strokes: 18 },
        { attempt: "T3", time: 19.94, strokes: 10 },
        { attempt: "T4", time: 19.56, strokes: 10 },
      ],
      frontDive: [
        { attempt: "T1", time: 16.96, strokes: 10 },
        { attempt: "T2", time: 16.07, strokes: 10 },
        { attempt: "T3", time: 14.75, strokes: 10 },
        { attempt: "T4", time: 14.83, strokes: 10 },
      ],
      strengths: [
        "Powerful underwater (always breaks out after 10m)",
        "Exceptional stroke consistency (10 strokes)",
        "Elite improvement: 12.5% faster by T4 in Front End Dive",
      ],
      weaknesses: [
        "Back End 4+ seconds slower than Front End",
        "Fatigue affecting endurance sets",
        "Starts time inconsistent (9.77s → 5.96s shows technique variation)",
      ],
      recommendations: [
        "Add 3x weekly aerobic conditioning sets (400m-800m at moderate pace) to improve Back End times",
        "Practice race-pace 50m repeats with emphasis on second 25m speed maintenance",
        "Work on consistent start technique - your T4 start (5.96s) shows your potential. Focus on explosive drive off the wall",
      ],
    },
    Ronell: {
      starts: [
        { attempt: "T1", time: 5.88, breakout: "BT" },
        { attempt: "T2", time: 5.51, breakout: "BT" },
        { attempt: "T3", time: 5.87, breakout: "BT" },
        { attempt: "T4", time: 7.33, breakout: "BT" },
      ],
      frontPush: [
        { attempt: "T1", time: 27.62, strokes: 12 },
        { attempt: "T2", time: 28.28, strokes: 14 },
        { attempt: "T3", time: 26.76, strokes: 13 },
        { attempt: "T4", time: 24.77, strokes: 16 },
      ],
      backDead: [
        { attempt: "T1", time: 29.01, strokes: 16 },
        { attempt: "T3", time: 24.62, strokes: 13 },
        { attempt: "T4", time: 28.32, strokes: 20 },
      ],
      frontDive: [
        { attempt: "T1", time: 26.03, strokes: 20 },
        { attempt: "T2", time: 28.37, strokes: 18 },
        { attempt: "T3", time: 23.83, strokes: 20 },
        { attempt: "T4", time: 26.31, strokes: 19 },
      ],
      strengths: [
        "Fast breakout times (5.5-5.8s range)",
        "Shows improvement potential (T4 Front Push: 24.77s)",
      ],
      weaknesses: [
        "CRITICAL: Always breaking out before 10m (losing 1-2 seconds per lap)",
        "Stroke count volatility (12→16 strokes indicates technique breakdown)",
        "Slowest overall 25m times (26-29s)",
        "Inconsistent execution across attempts",
      ],
      recommendations: [
        "PRIORITY: Underwater training - aim to break out AT or AFTER 10m. Practice streamline holds and dolphin kicks",
        "Technique overhaul needed: Work with coach on stroke fundamentals. Your stroke count should stabilize at 12-14",
        "Video analysis recommended to identify stroke breakdown causes",
        "Build aerobic base with 3-4 weekly easy 400m swims focusing on consistent stroke pattern",
      ],
    },
    Jadon: {
      starts: [
        { attempt: "T1", time: 6.84, breakout: "BT" },
        { attempt: "T2", time: 10.12, breakout: "AT" },
        { attempt: "T3", time: 8.33, breakout: "AT" },
        { attempt: "T4", time: 9.47, breakout: "AT" },
      ],
      frontPush: [
        { attempt: "T1", time: 20.69, strokes: 7 },
        { attempt: "T3", time: 21.23, strokes: 8 },
        { attempt: "T4", time: 20.42, strokes: 10 },
      ],
      backDead: [
        { attempt: "T1", time: 22.64, strokes: 16 },
        { attempt: "T2", time: 23.85, strokes: 17 },
        { attempt: "T3", time: 24.18, strokes: 17 },
        { attempt: "T4", time: 23.48, strokes: 17 },
      ],
      frontDive: [
        { attempt: "T1", time: 20.38, strokes: 10 },
        { attempt: "T2", time: 18.35, strokes: 11 },
        { attempt: "T3", time: 18.66, strokes: 12 },
        { attempt: "T4", time: 18.63, strokes: 12 },
      ],
      strengths: [
        "Very low stroke count (7-10 strokes = powerful long strokes)",
        "Strong improvement: Front End Dive 8.6% faster (20.38→18.63s)",
        "Learning underwater skills (BT→AT progression)",
      ],
      weaknesses: [
        "Back End deterioration (22.64→24.18s = losing 1.5+ seconds)",
        "Endurance issue - cannot maintain speed",
        "Inconsistent start times (6.84→10.12s)",
      ],
      recommendations: [
        "Endurance training critical: Add 2-3 weekly sets of 6x50m at 70% effort with 15s rest to build aerobic capacity",
        "Pace management: Practice negative splits (second 25m faster than first) in training",
        "Your long strokes are a strength - maintain this while building stamina",
        "Consider tempo training: 8x25m holding 7-8 strokes per 25m at moderate pace",
      ],
    },
    Raphaell: {
      starts: [
        { attempt: "T1", time: 10.51, breakout: "AT" },
        { attempt: "T2", time: 7.59, breakout: "BT" },
        { attempt: "T3", time: 6.61, breakout: "BT" },
        { attempt: "T4", time: 6.97, breakout: "BT" },
      ],
      frontPush: [
        { attempt: "T1", time: 26.09, strokes: 13 },
        { attempt: "T2", time: 24.03, strokes: 25 },
        { attempt: "T3", time: 23.42, strokes: 20 },
        { attempt: "T4", time: 23.04, strokes: 21 },
      ],
      backDead: [
        { attempt: "T1", time: 25.98, strokes: 25 },
        { attempt: "T2", time: 24.98, strokes: 24 },
        { attempt: "T3", time: 23.86, strokes: 22 },
        { attempt: "T4", time: 25.7, strokes: 22 },
      ],
      frontDive: [
        { attempt: "T1", time: 23.38, strokes: 20 },
        { attempt: "T2", time: 20.89, strokes: 18 },
        { attempt: "T3", time: 20.65, strokes: 15 },
        { attempt: "T4", time: 21.35, strokes: 17 },
      ],
      strengths: [
        "Shows learning ability (Front Dive: 23.38→20.65s improvement)",
        "Reduced stroke count T3 (20→15 strokes shows efficiency gains)",
      ],
      weaknesses: [
        "CRITICAL: Stroke count crisis - 20-25 strokes (nearly DOUBLE efficient swimmers)",
        "Taking 25 strokes in T2 Front Push = severe technique breakdown",
        "Minimal time improvement despite high effort",
        "Breakout inconsistency (AT→BT regression)",
      ],
      recommendations: [
        "URGENT: Complete technique rebuild needed. Your 25-stroke attempts show fundamental issues",
        "Work exclusively with coach on: arm pull pattern, kick timing, and breathing technique",
        "Target stroke count: Reduce to 13-15 strokes through distance-per-stroke drills",
        "Practice: 10x25m at easy pace counting strokes, aim to reduce by 1 stroke every 2 weeks",
        "Strength training: Focus on pull power to reduce stroke count while maintaining speed",
      ],
    },
    Nyamede: {
      starts: [
        { attempt: "T1", time: 9.37, breakout: "OT" },
        { attempt: "T2", time: 6.15, breakout: "BT" },
        { attempt: "T3", time: 6.36, breakout: "BT" },
        { attempt: "T4", time: 8.78, breakout: "BT" },
      ],
      frontPush: [
        { attempt: "T1", time: 23.19, strokes: 27 },
        { attempt: "T2", time: 24.53, strokes: 14 },
        { attempt: "T3", time: 23.28, strokes: 16 },
        { attempt: "T4", time: 24.41, strokes: 18 },
      ],
      backDead: [
        { attempt: "T1", time: 25.95, strokes: 15 },
        { attempt: "T2", time: 24.38, strokes: 14 },
        { attempt: "T3", time: 24.62, strokes: 16 },
        { attempt: "T4", time: 22.76, strokes: 14 },
      ],
      frontDive: [
        { attempt: "T1", time: 22.35, strokes: 18 },
        { attempt: "T2", time: 22.52, strokes: 14 },
        { attempt: "T3", time: 20.41, strokes: 24 },
        { attempt: "T4", time: 20.61, strokes: 15 },
      ],
      strengths: [
        "Strong finisher: Back End improvement 12.3% (25.95→22.76s)",
        "Can execute with low strokes (14-16 when focused)",
        "Shows good endurance",
      ],
      weaknesses: [
        "Stroke count chaos: 27→14→16→18 strokes (massive inconsistency)",
        "Breakout regression: ON 10m → BEFORE 10m (losing underwater advantage)",
        "Pacing confusion evident in erratic stroke patterns",
        "T3 Front Dive: 24 strokes shows concentration lapses",
      ],
      recommendations: [
        "Consistency training: Every set, count your strokes and record them. Target 14-16 strokes per 25m",
        "Mental game: Your 27-stroke T1 vs 14-stroke T2 shows you can be efficient. Focus on maintaining T2 execution",
        "Underwater work: Rebuild to break out AT or AFTER 10m consistently",
        "Pre-race routine: Develop a mental checklist (streamline, kick count, stroke rhythm) to maintain focus",
      ],
    },
    Jesse: {
      starts: [
        { attempt: "T1", time: 7.39, breakout: "OT" },
        { attempt: "T2", time: 7.78, breakout: "BT" },
        { attempt: "T3", time: 6.41, breakout: "BT" },
        { attempt: "T4", time: 8.29, breakout: "AT" },
      ],
      frontPush: [
        { attempt: "T1", time: 25.3, strokes: 15 },
        { attempt: "T2", time: 25.78, strokes: 17 },
        { attempt: "T3", time: 25.58, strokes: 17 },
        { attempt: "T4", time: 25.3, strokes: 17 },
      ],
      backDead: [
        { attempt: "T1", time: 29.33, strokes: 25 },
        { attempt: "T3", time: 25.57, strokes: 26 },
        { attempt: "T4", time: 29.97, strokes: 24 },
      ],
      frontDive: [
        { attempt: "T1", time: 23.97, strokes: 20 },
        { attempt: "T2", time: 21.91, strokes: 20 },
        { attempt: "T3", time: 22.27, strokes: 22 },
        { attempt: "T4", time: 22.47, strokes: 17 },
      ],
      strengths: [
        "Consistent times (25-26s Front Push across all attempts)",
        "Shows improvement potential (Front Dive: 23.97→21.91s)",
      ],
      weaknesses: [
        "Severe fatigue issues: Back End 4+ seconds slower than Front End",
        "Very high stroke counts (24-26 strokes Back End = exhaustion)",
        "No improvement over attempts (stuck at 25s)",
        "Missing T2 Back End data suggests incomplete set",
      ],
      recommendations: [
        "PRIORITY: Aerobic conditioning. Your fatigue is limiting everything. Add 3x weekly 800m easy swims",
        "Reduce stroke count from 17 to 13-15 through efficiency drills",
        "Practice sustainable pace: 8x50m at 80% effort holding same time on both 25m splits",
        "Strength endurance: Add dryland exercises (planks, pull-ups) to maintain form when tired",
      ],
    },
    Abena: {
      starts: [
        { attempt: "T1", time: 9.87, breakout: "BT" },
        { attempt: "T2", time: 8.58, breakout: "AT" },
        { attempt: "T3", time: 8.36, breakout: "OT" },
        { attempt: "T4", time: 9.77, breakout: "AT" },
      ],
      frontPush: [
        { attempt: "T1", time: 23.99, strokes: 9 },
        { attempt: "T2", time: 25.03, strokes: 10 },
        { attempt: "T3", time: 24.13, strokes: 9 },
        { attempt: "T4", time: 23.99, strokes: 9 },
      ],
      backDead: [
        { attempt: "T1", time: 24.97, strokes: 13 },
        { attempt: "T2", time: 24.81, strokes: 13 },
        { attempt: "T3", time: 25.57, strokes: 13 },
        { attempt: "T4", time: 23.78, strokes: 13 },
      ],
      frontDive: [
        { attempt: "T1", time: 23.32, strokes: 16 },
        { attempt: "T2", time: 21.37, strokes: 16 },
        { attempt: "T3", time: 21.02, strokes: 17 },
        { attempt: "T4", time: 20.31, strokes: 17 },
      ],
      strengths: [
        "Elite stroke efficiency: 9 strokes (among lowest in team)",
        "Remarkable consistency across all sets",
        "Stable performance (no major breakdowns)",
        "Best Front Dive progression: 23.32→20.31s (13% improvement)",
      ],
      weaknesses: [
        "Minimal speed improvement (already optimized?)",
        "Breaking out mostly before 10m despite efficiency (untapped speed potential)",
        "Times plateauing around 23-25s range",
      ],
      recommendations: [
        "You have excellent technique. Time to add POWER: Include sprint sets 6x15m all-out effort",
        "Underwater opportunity: Train to break out consistently AFTER 10m to gain 0.5-1s per lap",
        "Strength training: Gym work 2x weekly (squats, deadlifts) to add power without losing efficiency",
        "Race strategy: Practice negative splits - your consistency means you can pace perfectly",
      ],
    },
    Aseda: {
      starts: [
        { attempt: "T1", time: 7.69, breakout: "BT" },
        { attempt: "T2", time: 8.32, breakout: "BT" },
        { attempt: "T3", time: 7.92, breakout: "BT" },
        { attempt: "T4", time: 7.65, breakout: "BT" },
      ],
      frontPush: [
        { attempt: "T1", time: 29.99, strokes: 16 },
        { attempt: "T2", time: 30.14, strokes: 17 },
        { attempt: "T3", time: 28.16, strokes: 15 },
        { attempt: "T4", time: 27.08, strokes: 16 },
      ],
      backDead: [
        { attempt: "T1", time: 28.86, strokes: 21 },
        { attempt: "T2", time: 30.58, strokes: 21 },
        { attempt: "T3", time: 29.42, strokes: 21 },
        { attempt: "T4", time: 30.42, strokes: 22 },
      ],
      frontDive: [
        { attempt: "T1", time: 28.35, strokes: 22 },
        { attempt: "T2", time: 26.52, strokes: 23 },
        { attempt: "T3", time: 24.64, strokes: 21 },
        { attempt: "T4", time: 26.5, strokes: 17 },
      ],
      strengths: [
        "Shows improvement capability: Front Dive 28.35→24.64s (13% improvement in T3)",
        "Consistent effort across attempts",
      ],
      weaknesses: [
        "Slowest overall times in team (28-30s consistently)",
        "High stroke counts (21-23 strokes) with poor speed conversion",
        "Back End shows no improvement (getting slower)",
        "Fundamental technique issues evident",
      ],
      recommendations: [
        "FOUNDATION REBUILD: Work 1-on-1 with coach on basic breaststroke mechanics",
        "Drills focus: Pullouts, kick timing, and arm recovery. Do these EVERY session before main sets",
        "Target: Reduce stroke count to 15-17 through distance-per-stroke training",
        "Volume reduction: Focus on QUALITY over quantity. 5 perfect strokes better than 20 rushed ones",
        "Video yourself: Compare your stroke to elite swimmers, identify 1 thing to fix each week",
      ],
    },
    Kofi: {
      starts: [
        { attempt: "T1", time: 9.19, breakout: "OT" },
        { attempt: "T2", time: 5.5, breakout: "BT" },
        { attempt: "T3", time: 10.79, breakout: "BT" },
        { attempt: "T4", time: 4.61, breakout: "BT" },
      ],
      frontPush: [
        { attempt: "T1", time: 24.02, strokes: 21 },
        { attempt: "T2", time: 24.56, strokes: 21 },
        { attempt: "T3", time: 24.19, strokes: 19 },
        { attempt: "T4", time: 22.53, strokes: 19 },
      ],
      backDead: [
        { attempt: "T1", time: 23.43, strokes: 21 },
        { attempt: "T2", time: 24.36, strokes: 22 },
        { attempt: "T3", time: 23.97, strokes: 21 },
        { attempt: "T4", time: 24.78, strokes: 17 },
      ],
      frontDive: [
        { attempt: "T1", time: 22.8, strokes: 17 },
        { attempt: "T2", time: 21.4, strokes: 14 },
        { attempt: "T3", time: 20.98, strokes: 14 },
        { attempt: "T4", time: 22.67, strokes: 14 },
      ],
      strengths: [
        "Shows flashes of excellence: T4 start (4.61s) and T4 Front Push (22.53s)",
        "Can execute with 14 strokes when focused",
        "Good Front Dive times (20-22s)",
      ],
      weaknesses: [
        "Extremely erratic: Start times range 4.61-10.79s (6-second variance!)",
        "High stroke counts (19-22) most attempts",
        "Inconsistent breakout technique",
        "Cannot replicate good performances",
      ],
      recommendations: [
        "Consistency is your biggest opportunity: Your T4 performances show you CAN be elite",
        "Mental training: Develop pre-swim routine. Visualize each attempt identically",
        "Technical drill: Practice starts 3x weekly focusing on identical entry every time",
        "Stroke count discipline: Set a target of 14-16 strokes and hit it EVERY lap",
        "Your 4.61s start and 22.53s swim prove you have talent - now make it repeatable!",
      ],
    },
    Jada: {
      starts: [
        { attempt: "T1", time: 7.99, breakout: "BT" },
        { attempt: "T2", time: 6.72, breakout: "BT" },
        { attempt: "T3", time: 6.61, breakout: "BT" },
        { attempt: "T4", time: 6.84, breakout: "BT" },
      ],
      frontPush: [
        { attempt: "T1", time: 31.15, strokes: 15 },
        { attempt: "T2", time: 32.77, strokes: 19 },
        { attempt: "T3", time: 32.01, strokes: 18 },
        { attempt: "T4", time: 29.91, strokes: 17 },
      ],
      backDead: [
        { attempt: "T1", time: 29.19, strokes: 19 },
        { attempt: "T2", time: 30.76, strokes: 17 },
        { attempt: "T3", time: 29.9, strokes: 18 },
        { attempt: "T4", time: 31.11, strokes: 20 },
      ],
      frontDive: [
        { attempt: "T1", time: 29.28, strokes: 19 },
        { attempt: "T2", time: 27.31, strokes: 15 },
        { attempt: "T3", time: 25.11, strokes: 14 },
        { attempt: "T4", time: 28.5, strokes: 17 },
      ],
      strengths: [
        "Shows improvement: Front Dive 29.28→25.11s (14% faster)",
        "Can achieve efficient strokes (14-15) in some attempts",
      ],
      weaknesses: [
        "Slowest in group: 29-32s Front End times",
        "Severe endurance deficit: Back End 30+ seconds",
        "Cannot maintain improvements (T3: 25.11s → T4: 28.5s regression)",
        "Stroke efficiency collapses under fatigue (15→19 strokes)",
      ],
      recommendations: [
        "AEROBIC BASE CRITICAL: You need 4-5 weekly easy 600-1000m swims to build endurance",
        "Pacing practice: Your T3 Front Dive (25.11s, 14 strokes) shows your potential. Learn to sustain it",
        "Reduce training intensity, increase volume: More easy swimming, less all-out efforts",
        "Technique when tired: Practice maintaining form during last 25m of every swim",
        "Consider working with coach on breathing pattern - may be limiting your endurance",
      ],
    },
  };

  // Team aggregate data
  const teamStartsData = [
    { attempt: "T1", best: 5.88, mean: 8.05 },
    { attempt: "T2", best: 5.5, mean: 7.26 },
    { attempt: "T3", best: 6.36, mean: 7.39 },
    { attempt: "T4", best: 4.61, mean: 7.5 },
  ];

  const teamFrontPushData = [
    { attempt: "T1", best: 16.91, mean: 24.86 },
    { attempt: "T2", best: 24.03, mean: 27.08 },
    { attempt: "T3", best: 17.53, mean: 24.29 },
    { attempt: "T4", best: 18.1, mean: 23.33 },
  ];

  const teamBackDeadData = [
    { attempt: "T1", best: 20.71, mean: 25.93 },
    { attempt: "T2", best: 20.21, mean: 25.71 },
    { attempt: "T3", best: 19.94, mean: 24.73 },
    { attempt: "T4", best: 19.56, mean: 25.82 },
  ];

  const teamFrontDiveData = [
    { attempt: "T1", best: 16.96, mean: 24.04 },
    { attempt: "T2", best: 16.07, mean: 22.52 },
    { attempt: "T3", best: 14.75, mean: 21.41 },
    { attempt: "T4", best: 14.83, mean: 22.79 },
  ];

  const currentSwimmer = swimmerData[selectedSwimmer];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            African Sharks Performance Dashboard
          </h1>
          <p className="text-gray-600">
            Sunday, September 28, 2025 - Breaststroke Analysis
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("team")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "team"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Users className="inline mr-2" size={20} />
            Team Performance
          </button>
          <button
            onClick={() => setActiveTab("individual")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "individual"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Award className="inline mr-2" size={20} />
            Individual Analysis
          </button>
          <button
            onClick={() => setActiveTab("key")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "key"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Key & Terms
          </button>
        </div>

        {/* Team Performance Tab */}
        {activeTab === "team" && (
          <div className="space-y-6">
            {/* Starts */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Starts (15m Breakout)
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={teamStartsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="attempt" />
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
                  />
                  <Line
                    type="monotone"
                    dataKey="mean"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name="Team Average"
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-800 font-semibold">
                    Best Performance (AT)
                  </p>
                  <p className="text-2xl font-bold text-green-900">
                    5.96s (Kobby, T4)
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800 font-semibold">
                    Team Insight
                  </p>
                  <p className="text-sm text-blue-900">
                    Most swimmers breaking out before 10m - losing speed
                    potential
                  </p>
                </div>
              </div>
            </div>

            {/* Front End Push */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Front End 25m (From Push)
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={teamFrontPushData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="attempt" />
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
                  />
                  <Line
                    type="monotone"
                    dataKey="mean"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name="Team Average"
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-800 font-semibold">
                    Best Performance
                  </p>
                  <p className="text-2xl font-bold text-green-900">
                    16.91s (Kobby, T1)
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800 font-semibold">
                    Team Insight
                  </p>
                  <p className="text-sm text-blue-900">
                    Team improving across attempts - good workout progression
                  </p>
                </div>
              </div>
            </div>

            {/* Back End Dead Start */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Back End 25m (Dead Start)
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={teamBackDeadData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="attempt" />
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
                  />
                  <Line
                    type="monotone"
                    dataKey="mean"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name="Team Average"
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-800 font-semibold">
                    Best Performance
                  </p>
                  <p className="text-2xl font-bold text-green-900">
                    19.56s (Kobby, T4)
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800 font-semibold">
                    Team Challenge
                  </p>
                  <p className="text-sm text-yellow-900">
                    Back End slower than Front End - fatigue management needed
                  </p>
                </div>
              </div>
            </div>

            {/* Front End Dive */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Front End 25m (From Dive)
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={teamFrontDiveData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="attempt" />
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
                  />
                  <Line
                    type="monotone"
                    dataKey="mean"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name="Team Average"
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-800 font-semibold">
                    Best Performance
                  </p>
                  <p className="text-2xl font-bold text-green-900">
                    14.75s (Kobby, T3)
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800 font-semibold">
                    Team Insight
                  </p>
                  <p className="text-sm text-blue-900">
                    Strong T3 performance - team peaked mid-workout
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Individual Analysis Tab */}
        {activeTab === "individual" && (
          <div className="space-y-6">
            {/* Swimmer Selector */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Select Swimmer
              </label>
              <select
                value={selectedSwimmer}
                onChange={(e) => setSelectedSwimmer(e.target.value)}
                className="w-full p-3 border-2 border-blue-300 rounded-lg text-lg focus:border-blue-500 focus:outline-none"
              >
                {Object.keys(swimmerData).map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            {/* Starts Performance */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Starts (15m Breakout)
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={currentSwimmer.starts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="attempt" />
                  <YAxis
                    label={{
                      value: "Time (seconds)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 border-2 border-blue-400 rounded shadow-lg">
                            <p className="font-semibold">
                              {payload[0].payload.attempt}
                            </p>
                            <p className="text-blue-600">
                              Time: {payload[0].value}s
                            </p>
                            <p className="text-gray-600">
                              Breakout: {payload[0].payload.breakout}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="time"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    name="Time (s)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Front End Push */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Front End 25m (From Push)
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={currentSwimmer.frontPush}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="attempt" />
                  <YAxis
                    yAxisId="left"
                    orientation="left"
                    label={{
                      value: "Time (s)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    label={{
                      value: "Strokes",
                      angle: 90,
                      position: "insideRight",
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="time"
                    fill="#3b82f6"
                    name="Time (s)"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="strokes"
                    fill="#f59e0b"
                    name="Stroke Count"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Back End Dead Start */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Back End 25m (Dead Start)
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={currentSwimmer.backDead}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="attempt" />
                  <YAxis
                    yAxisId="left"
                    orientation="left"
                    label={{
                      value: "Time (s)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    label={{
                      value: "Strokes",
                      angle: 90,
                      position: "insideRight",
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="time"
                    fill="#ef4444"
                    name="Time (s)"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="strokes"
                    fill="#f59e0b"
                    name="Stroke Count"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Front End Dive */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Front End 25m (From Dive)
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={currentSwimmer.frontDive}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="attempt" />
                  <YAxis
                    yAxisId="left"
                    orientation="left"
                    label={{
                      value: "Time (s)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    label={{
                      value: "Strokes",
                      angle: 90,
                      position: "insideRight",
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="time"
                    fill="#10b981"
                    name="Time (s)"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="strokes"
                    fill="#f59e0b"
                    name="Stroke Count"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Strengths */}
            <div className="bg-green-50 rounded-lg shadow-lg p-6 border-2 border-green-200">
              <h3 className="text-xl font-bold text-green-900 mb-3 flex items-center">
                <Award className="mr-2" size={24} />
                Strengths
              </h3>
              <ul className="space-y-2">
                {currentSwimmer.strengths.map((strength, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-600 mr-2 mt-1">✓</span>
                    <span className="text-green-900">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="bg-orange-50 rounded-lg shadow-lg p-6 border-2 border-orange-200">
              <h3 className="text-xl font-bold text-orange-900 mb-3 flex items-center">
                <TrendingDown className="mr-2" size={24} />
                Areas for Improvement
              </h3>
              <ul className="space-y-2">
                {currentSwimmer.weaknesses.map((weakness, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-orange-600 mr-2 mt-1">!</span>
                    <span className="text-orange-900">{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommendations */}
            <div className="bg-blue-50 rounded-lg shadow-lg p-6 border-2 border-blue-200">
              <h3 className="text-xl font-bold text-blue-900 mb-3 flex items-center">
                <AlertCircle className="mr-2" size={24} />
                Action Plan
              </h3>
              <ol className="space-y-3">
                {currentSwimmer.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 font-semibold text-sm">
                      {idx + 1}
                    </span>
                    <span className="text-blue-900">{rec}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {/* Key & Terms Tab */}
        {activeTab === "key" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Understanding the Data
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-3">
                    Breakout Distance Key
                  </h3>
                  <div className="grid gap-4">
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border-l-4 border-blue-500">
                      <div className="flex items-center mb-2">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded font-bold mr-3">
                          BT
                        </span>
                        <span className="font-semibold text-gray-800">
                          Before 10m
                        </span>
                      </div>
                      <p className="text-gray-600 ml-12">
                        Swimmer breaks the surface before reaching the 10-meter
                        mark
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border-l-4 border-yellow-500">
                      <div className="flex items-center mb-2">
                        <span className="bg-yellow-600 text-white px-3 py-1 rounded font-bold mr-3">
                          OT
                        </span>
                        <span className="font-semibold text-gray-800">
                          On 10m
                        </span>
                      </div>
                      <p className="text-gray-600 ml-12">
                        Swimmer breaks the surface right at the 10-meter mark
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border-l-4 border-green-500">
                      <div className="flex items-center mb-2">
                        <span className="bg-green-600 text-white px-3 py-1 rounded font-bold mr-3">
                          AT
                        </span>
                        <span className="font-semibold text-gray-800">
                          After 10m
                        </span>
                      </div>
                      <p className="text-gray-600 ml-12">
                        Swimmer breaks the surface after passing the 10-meter
                        mark
                      </p>
                      <p className="text-sm text-green-700 ml-12 mt-2 font-semibold">
                        ✓ Best for breaststroke - maximizes underwater speed
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-3">
                    Workout Sets Explained
                  </h3>
                  <div className="grid gap-4">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-bold text-purple-900 mb-2">
                        Starts (15m) - Breakout Speed Test
                      </h4>
                      <p className="text-gray-700">
                        Measures how fast you travel 15m underwater and break
                        the surface. Lower time = better underwater work.
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-bold text-green-900 mb-2">
                        Front End 25m (From Push) - Speed & Efficiency
                      </h4>
                      <p className="text-gray-700">
                        Tests your maximum speed over 25m with a wall push
                        start. Shows your stroke efficiency through stroke
                        count.
                      </p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-bold text-red-900 mb-2">
                        Back End 25m (Dead Start) - Endurance Test
                      </h4>
                      <p className="text-gray-700">
                        Simulates the second half of a 50m race when you're
                        tired. Tests ability to maintain speed under fatigue.
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-bold text-blue-900 mb-2">
                        Front End 25m (From Dive) - Race Simulation
                      </h4>
                      <p className="text-gray-700">
                        Most realistic race scenario. Combines dive entry,
                        underwater work, and sprint speed.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-3">
                    Performance Metrics
                  </h3>
                  <div className="grid gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                      <span className="font-semibold text-gray-800">
                        Stroke Count
                      </span>
                      <span className="text-gray-600">
                        Number of arm pulls per 25m. Lower is usually more
                        efficient.
                      </span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                      <span className="font-semibold text-gray-800">
                        Time Progression
                      </span>
                      <span className="text-gray-600">
                        Improvement from T1 to T4. Shows learning and
                        adaptation.
                      </span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                      <span className="font-semibold text-gray-800">
                        Front vs Back End Gap
                      </span>
                      <span className="text-gray-600">
                        Difference between fresh and fatigued swimming. Smaller
                        is better.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-300">
                  <h3 className="text-lg font-bold text-yellow-900 mb-2">
                    💡 Coach's Note
                  </h3>
                  <p className="text-yellow-900">
                    This dashboard shows YOUR data from Sunday's workout. Use it
                    to track progress, identify what to work on, and celebrate
                    your improvements. Remember: every elite swimmer was once a
                    beginner. Keep working hard!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SwimDashboard;
