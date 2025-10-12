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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Award,
  Target,
} from "lucide-react";

const SundayDashboard = () => {
  const [activeTab, setActiveTab] = useState("team");
  const [selectedSwimmer, setSelectedSwimmer] = useState("Kobby");

  // Data
  const imData = {
    Kobby: [
      { rep: 1, time: 211.3, pace: 52.83 },
      { rep: 2, time: 186.02, pace: 46.51 },
      { rep: 3, time: 178.48, pace: 44.62 },
      { rep: 4, time: 176.11, pace: 44.03 },
    ],
    Jadon: [
      { rep: 1, time: 218.17, pace: 54.54 },
      { rep: 2, time: 207.31, pace: 51.83 },
      { rep: 3, time: 215.37, pace: 53.84 },
      { rep: 4, time: 187.1, pace: 46.78 },
    ],
    Ronell: [
      { rep: 1, time: 283.17, pace: 70.79 },
      { rep: 2, time: 285.01, pace: 71.25 },
      { rep: 3, time: 263.24, pace: 65.81 },
      { rep: 4, time: 241.02, pace: 60.26, freestyle: true },
    ],
    Raphaell: [
      { rep: 1, time: 281.24, pace: 70.31 },
      { rep: 2, time: 243.39, pace: 60.85 },
      { rep: 3, time: 220.11, pace: 55.03 },
      { rep: 4, time: 209.13, pace: 52.28 },
    ],
    Abena: [
      { rep: 1, time: 223.12, pace: 55.78 },
      { rep: 2, time: 235.1, pace: 58.78 },
      { rep: 3, time: 221.09, pace: 55.27 },
      { rep: 4, time: 207.22, pace: 51.81 },
    ],
    Kofi: [
      { rep: 1, time: 273.07, pace: 68.27 },
      { rep: 2, time: 269.22, pace: 67.31 },
      { rep: 3, time: 252.53, pace: 63.13 },
      { rep: 4, time: 204.1, pace: 51.03, freestyle: true },
    ],
    Jada: [
      { rep: 1, time: 286.26, pace: 71.57 },
      { rep: 2, time: 298.3, pace: 74.58 },
      { rep: 3, time: 258.32, pace: 64.58 },
      { rep: 4, time: 209.78, pace: 52.45, freestyle: true },
    ],
    "Nii Nortey": [
      { rep: 1, time: 250.19, pace: 62.55 },
      { rep: 2, time: 251.35, pace: 62.84 },
      { rep: 3, time: null, pace: null },
      { rep: 4, time: 201.04, pace: 50.26, freestyle: true },
    ],
    Jim: [
      { rep: 1, time: null, pace: null },
      { rep: 2, time: null, pace: null },
      { rep: 3, time: null, pace: null },
      { rep: 4, time: 205.15, pace: 51.29, freestyle: true },
    ],
    Jesse: [
      { rep: 1, time: null, pace: null },
      { rep: 2, time: null, pace: null },
      { rep: 3, time: null, pace: null },
      { rep: 4, time: 193.32, pace: 48.33 },
    ],
  };

  const frontEndData = {
    Kobby: [
      { rep: 1, time: 14.97 },
      { rep: 2, time: 16.76 },
      { rep: 3, time: 14.73 },
      { rep: 4, time: 14.06 },
    ],
    Jadon: [
      { rep: 1, time: 17.1 },
      { rep: 2, time: 16.74 },
      { rep: 3, time: 17.92 },
      { rep: 4, time: 17.65 },
    ],
    Ronell: [
      { rep: 1, time: 27.1 },
      { rep: 2, time: 25.91 },
      { rep: 3, time: 27.42 },
      { rep: 4, time: 24.55 },
    ],
    Raphaell: [
      { rep: 1, time: 24.56 },
      { rep: 2, time: 23.96 },
      { rep: 3, time: 22.52 },
      { rep: 4, time: 22.57 },
    ],
    Abena: [
      { rep: 1, time: 21.66 },
      { rep: 2, time: 19.79 },
      { rep: 3, time: 19.78 },
      { rep: 4, time: 19.5 },
    ],
    Kofi: [
      { rep: 1, time: 25.94 },
      { rep: 2, time: 25.28 },
      { rep: 3, time: 23.44 },
      { rep: 4, time: 23.22 },
    ],
    Jada: [
      { rep: 1, time: 28.11 },
      { rep: 2, time: 28.21 },
      { rep: 3, time: 28.11 },
      { rep: 4, time: 25.37 },
    ],
    "Nii Nortey": [
      { rep: 1, time: 18.16 },
      { rep: 2, time: 22.53 },
      { rep: 3, time: 17.61 },
      { rep: 4, time: 18.28 },
    ],
    Jim: [
      { rep: 1, time: 17.7 },
      { rep: 2, time: 20.14 },
      { rep: 3, time: 18.73 },
      { rep: 4, time: 17.79 },
    ],
    Jesse: [
      { rep: 1, time: 20.18 },
      { rep: 2, time: 20.14 },
      { rep: 3, time: 20.18 },
      { rep: 4, time: 21.88 },
    ],
  };

  const backEndData = {
    Kobby: [
      { rep: 1, time: 16.95 },
      { rep: 2, time: 16.52 },
      { rep: 3, time: 16.17 },
      { rep: 4, time: 16.51 },
    ],
    Jadon: [
      { rep: 1, time: 20.26 },
      { rep: 2, time: 20.28 },
      { rep: 3, time: 22.12 },
      { rep: 4, time: 20.46 },
    ],
    Ronell: [
      { rep: 1, time: 33.74 },
      { rep: 2, time: 27.7 },
      { rep: 3, time: 32.71 },
      { rep: 4, time: 31.26 },
    ],
    Raphaell: [
      { rep: 1, time: 28.63 },
      { rep: 2, time: 30.82 },
      { rep: 3, time: 31.15 },
      { rep: 4, time: 31.26 },
    ],
    Abena: [
      { rep: 1, time: 24.19 },
      { rep: 2, time: 21.93 },
      { rep: 3, time: 23.87 },
      { rep: 4, time: 22.58 },
    ],
    Kofi: [
      { rep: 1, time: 32.0 },
      { rep: 2, time: 25.47 },
      { rep: 3, time: 26.5 },
      { rep: 4, time: 29.78 },
    ],
    Jada: [
      { rep: 1, time: 29.89 },
      { rep: 2, time: 30.42 },
      { rep: 3, time: 30.16 },
      { rep: 4, time: 34.09 },
    ],
    "Nii Nortey": [
      { rep: 1, time: 23.11 },
      { rep: 2, time: 29.1 },
      { rep: 3, time: 22.75 },
      { rep: 4, time: 30.81 },
    ],
    Jim: [
      { rep: 1, time: 27.83 },
      { rep: 2, time: 23.16 },
      { rep: 3, time: null },
      { rep: 4, time: null },
    ],
    Jesse: [
      { rep: 1, time: 26.78 },
      { rep: 2, time: 30.17 },
      { rep: 3, time: 27.54 },
      { rep: 4, time: 30.12 },
    ],
  };

  const swimmers = [
    "Kobby",
    "Jadon",
    "Ronell",
    "Raphaell",
    "Abena",
    "Kofi",
    "Jada",
    "Nii Nortey",
    "Jim",
    "Jesse",
  ];

  const calculateTeamStats = (dataObj) => {
    const maxReps = Math.max(...Object.values(dataObj).map((d) => d.length));
    const bestTimes = [];
    const meanTimes = [];

    for (let i = 0; i < maxReps; i++) {
      const times = Object.values(dataObj)
        .map((d) => d[i]?.time)
        .filter((t) => t !== null && t !== undefined);

      if (times.length > 0) {
        bestTimes.push({ rep: i + 1, time: Math.min(...times) });
        meanTimes.push({
          rep: i + 1,
          time: times.reduce((a, b) => a + b, 0) / times.length,
        });
      }
    }
    return { bestTimes, meanTimes };
  };

  const teamIMStats = calculateTeamStats(imData);
  const teamFrontStats = calculateTeamStats(frontEndData);
  const teamBackStats = calculateTeamStats(backEndData);

  const getSwimmerAnalysis = (swimmer) => {
    const im = imData[swimmer] || [];
    const front = frontEndData[swimmer] || [];
    const back = backEndData[swimmer] || [];

    const imValid = im.filter((r) => r.time !== null);
    const frontValid = front.filter(
      (r) => r.time !== null && r.time !== undefined
    );
    const backValid = back.filter(
      (r) => r.time !== null && r.time !== undefined
    );

    const imImprovement =
      imValid.length >= 2
        ? ((imValid[0].time - imValid[imValid.length - 1].time) /
            imValid[0].time) *
          100
        : 0;

    const frontImprovement =
      frontValid.length >= 2
        ? ((frontValid[0].time - frontValid[frontValid.length - 1].time) /
            frontValid[0].time) *
          100
        : 0;

    const frontMean =
      frontValid.reduce((a, b) => a + b.time, 0) / frontValid.length;
    const backMean =
      backValid.reduce((a, b) => a + b.time, 0) / backValid.length;
    const diveAdvantage = backMean - frontMean;

    const switchedToFreestyle = im.some((r) => r.freestyle);

    const analyses = {
      Kobby: {
        strengths: [
          `Outstanding IM progression: 35.3s improvement (16.6% faster) - shows elite race intelligence`,
          `Final IM pace of 44.03s per 50m is competitive at national youth level`,
          `Exceptional consistency in butterfly sprints (14.06-16.76s, only 2.7s range)`,
          `Best front-end fly time in team (14.06s) demonstrates superior dive technique`,
          `Back-end fly times under 17s show excellent stroke power without momentum`,
          `Minimal variance across all sets indicates strong mental focus and pacing control`,
        ],
        weaknesses: [
          `Slight time increase from rep 3 to 4 in back-end fly (16.17s → 16.51s) suggests minor fatigue`,
          `Could potentially go faster on first IM rep - conservative start strategy may be limiting`,
        ],
        recommendations: [
          "Race Strategy: Your conservative first rep (3:31) leaves room for faster opening. Try negative splitting your first 100m of the IM",
          "Maintain Excellence: Your consistency is your superpower. Continue tempo training at race pace to lock in this reliability",
          "Dive Refinement: Already elite (14.06s), but analyze video for 0.2-0.5s gains through entry angle optimization",
          "Challenge Yourself: Ready for age-group competition times. Set target of sub-2:50 for 200m IM",
          "Stroke Rate Work: Experiment with slightly higher stroke rate in butterfly legs to see if you can gain 1-2s without efficiency loss",
        ],
        keyMetrics: {
          imImprovement: 16.6,
          flyAverage: 15.13,
          consistency: "Elite",
          diveAdvantage: (16.54 - 15.13).toFixed(2),
        },
      },
      Jadon: {
        strengths: [
          `Strong final IM rep (3:07.10) after difficult middle reps shows mental toughness`,
          `31-second IM improvement (14.2%) demonstrates ability to adapt and push through challenges`,
          `Consistent butterfly sprint times (16.74-17.92s) with good technical foundation`,
          `Front-end fly average of 17.35s is solid for development level`,
          `Back-end consistency (20.26-22.12s range) shows reliable stroke mechanics`,
        ],
        weaknesses: [
          `IM rep 3 was slowest (3:35.37) - suggests pacing breakdown or mental lapse mid-workout`,
          `Back-end fly times 3-4s slower than front-end (larger gap than elite swimmers)`,
          `Inconsistent performance between reps indicates pacing strategy needs development`,
        ],
        recommendations: [
          "Pacing Strategy: Your rep 3 collapse (3:35) then rep 4 recovery (3:07) shows you have the speed but need better energy distribution",
          "Mental Training: Practice visualization techniques - you showed you can recover mentally, now prevent the dip",
          "Wall Push-offs: 3-4s gap between dive and wall starts suggests technique opportunity. Focus on underwater streamline off walls",
          "Interval Training: Add 8x50m IM at 80% effort with 20s rest to build consistent pacing",
          "Stroke Count Tracking: Begin counting strokes in butterfly to identify efficiency patterns between good and bad reps",
        ],
        keyMetrics: {
          imImprovement: 14.2,
          flyAverage: 17.35,
          consistency: "Moderate",
          diveAdvantage: (20.78 - 17.35).toFixed(2),
        },
      },
      Ronell: {
        strengths: [
          `Completed 3 full IMs before switching to freestyle - shows determination`,
          `Front-end fly improvement visible (27.10s → 24.55s, 2.55s faster)`,
          `Freestyle-only final rep was significantly faster (4:01) showing freestyle competency`,
        ],
        weaknesses: [
          `CRITICAL: Slowest butterfly times in team - front average 26.25s (73% slower than Kobby)`,
          `CRITICAL: Back-end fly average 31.35s is 2x slower than elite swimmers - severe technique deficiency`,
          `Unable to complete 4th IM rep with all strokes - conditioning and stroke limitations`,
          `Massive variance in back-end times (27.70-33.74s, 6s range) indicates inconsistent technique`,
          `IM times 60+ seconds slower than top performers - fundamental stroke work needed`,
        ],
        recommendations: [
          "URGENT - Butterfly Reconstruction: Work with coach 1-on-1, 15 minutes per session on basic fly drills",
          "Drill Progression: Week 1-2: Body dolphin kicks on back, Week 3-4: Single-arm fly, Week 5-6: Full stroke with fins",
          "Strength Foundation: Add 3x/week dryland - focus on core, lats, and shoulder stability for fly power",
          "Reduce Volume: Stop attempting full 200m IMs until butterfly is functional. Focus on 4x50m IM instead",
          "Wall Technique: Your 6-second variance in back-end fly indicates poor push-off mechanics - essential to fix",
          "Small Wins: Track stroke count reduction in fly over 4 weeks. Aim to reduce from current range to 20 strokes per 25m",
          "Breathing Pattern: Ensure you're breathing forward (not lifting head up) every 2 strokes in fly",
        ],
        keyMetrics: {
          imImprovement: "Switched to Freestyle",
          flyAverage: 26.25,
          consistency: "Poor",
          diveAdvantage: (31.35 - 26.25).toFixed(2),
        },
      },
      Raphaell: {
        strengths: [
          `Phenomenal IM progression: 72-second improvement (25.5% faster) - largest team improvement`,
          `Completed all 4 IM reps successfully - excellent endurance and mental toughness`,
          `Front-end fly improvement (24.56s → 22.52s, 2.04s drop) shows quick technical adaptation`,
          `Final IM pace of 52.28s per 50m approaching competitive standards`,
          `Consistent downward trend across all sets demonstrates strong work ethic`,
        ],
        weaknesses: [
          `Slow initial IM rep (4:41.24) suggests insufficient warm-up or poor pacing judgment`,
          `Back-end fly times deteriorated across reps (28.63s → 31.26s) indicating fatigue accumulation`,
          `Front-to-back gap widened over the session (5s difference becoming 8-9s difference)`,
        ],
        recommendations: [
          "Warm-up Protocol: Add 400m mixed strokes before main set - your 72s improvement suggests you need more prep time",
          "Fatigue Management: Your back-end deterioration (28.63s → 31.26s) shows you're exceeding recovery capacity",
          "Recovery Work: Add 200m easy swim between hard efforts to maintain technique quality",
          "Stroke Endurance: Your fly mechanics break down with fatigue. Add 8x25m fly with 30s rest, focus on consistent form",
          "Celebrate Progress: 25.5% improvement is exceptional - you're implementing coaching well. Keep this trajectory",
          "Pacing Practice: Start your first IM rep at 80% effort next time. You have speed reserves - use them strategically",
        ],
        keyMetrics: {
          imImprovement: 25.5,
          flyAverage: 23.4,
          consistency: "Good",
          diveAdvantage: (30.47 - 23.4).toFixed(2),
        },
      },
      Abena: {
        strengths: [
          `Excellent front-end fly progression (21.66s → 19.50s, 10% improvement) - shows technical learning`,
          `Final front-end time of 19.50s is competitive and shows potential for speed work`,
          `Completed all IM reps successfully with reasonable consistency`,
          `Back-end fly average of 23.14s demonstrates solid stroke fundamentals`,
          `Best butterfly technique among female swimmers on team`,
        ],
        weaknesses: [
          `IM rep 2 was slower than rep 1 (3:55 vs 3:43) - pacing inconsistency`,
          `Front-to-back fly gap of 3.64s is acceptable but shows room for wall push-off improvement`,
          `IM times in 3:27-3:55 range put you in middle of pack - speed development needed`,
        ],
        recommendations: [
          "Build on Fly Success: Your 10% front-end improvement is excellent. Apply same focus to other strokes",
          "IM Stroke Balance: Your butterfly is strong - now focus equal attention on backstroke and breaststroke legs",
          "Speed Development: Add 6x50m descending sets (each one faster) twice per week to build race speed",
          "Wall Push-offs: Your 3.64s dive advantage is good but can improve. Practice underwater streamlines with 5-beat dolphin kicks",
          "Race Pace Training: You have technical foundation - now add 4x100m IM at 90% effort with 2min rest",
          "Consistency Goal: Aim to keep all IM reps within 10-second range. Your 28s range indicates pacing work needed",
        ],
        keyMetrics: {
          imImprovement: 7.1,
          flyAverage: 20.18,
          consistency: "Moderate",
          diveAdvantage: (23.14 - 20.18).toFixed(2),
        },
      },
      Kofi: {
        strengths: [
          `Consistent IM improvement for first 3 reps (4:33 → 4:12) showing good pacing`,
          `Front-end fly improvement visible (25.94s → 23.22s, 2.72s faster)`,
          `Freestyle final rep (3:24.10) much faster than IM reps, showing freestyle strength`,
        ],
        weaknesses: [
          `Unable to complete 4th IM rep - switched to freestyle indicating stroke breakdown`,
          `Back-end fly times highly variable (25.47-32.00s, 6.5s range) shows inconsistent technique`,
          `Front-end fly average of 24.47s indicates butterfly is a limiting stroke`,
          `Large gap between best and worst back-end times suggests fatigue causes technique collapse`,
        ],
        recommendations: [
          "Stroke Priority: Butterfly is your limiting factor. Dedicate first 20 minutes of each practice to fly drills",
          "Technique Stabilization: 6.5s variance in back-end fly is too high. Focus on 12x25m fly with perfect form, full rest",
          "Reduce IM Distance: Switch to 4x100m IM until butterfly stabilizes - quality over quantity",
          "Conditioning: Your switch to freestyle shows general fatigue. Add 2x400m aerobic swim per week at comfortable pace",
          "Streamline Work: Variable wall push-off times indicate inefficient underwater phase. Practice 10x underwater streamlines",
          "Drill Sequence: Single-arm fly → 3-stroke fly → full 25m fly, with 30s rest between each",
        ],
        keyMetrics: {
          imImprovement: "Switched to Freestyle",
          flyAverage: 24.47,
          consistency: "Poor",
          diveAdvantage: (28.44 - 24.47).toFixed(2),
        },
      },
      Jada: {
        strengths: [
          `Completed 3 full IM reps before switching to freestyle - persistence through difficulty`,
          `IM rep 3 showed significant improvement (4:18) from rep 2 (4:58) - 40s faster`,
          `Front-end fly final rep improved to 25.37s from initial 28.11s range`,
        ],
        weaknesses: [
          `Slowest IM times in team (4:46-4:58 range initially)`,
          `Unable to complete 4th full IM - conditioning and technical limitations`,
          `Front-end fly average of 27.45s indicates significant butterfly deficiency`,
          `Back-end fly deteriorated severely on final rep (30.16s → 34.09s, 13% slower)`,
          `Final rep collapse (34.09s) shows complete technique breakdown under fatigue`,
        ],
        recommendations: [
          "CRITICAL PRIORITY: Butterfly stroke from basics. You need foundational rebuild, not refinement",
          "Start Simple: 4 weeks of flutter kick on stomach with arms extended - build core body position",
          "Gradual Progression: Do not attempt full butterfly for 2 weeks. Focus on: Week 1-2: body dolphins, Week 3-4: single-arm fly",
          "Strength Building: Essential dryland work - plank holds, superman holds, lat pulls. 15min before each swim",
          "Reduce Distance: No 200m IMs until technique improves. Maximum 50m IM with long rest",
          "Form Over Speed: Every butterfly rep should be technically correct. Speed will come after form is established",
          "Video Analysis: Record your butterfly and compare to elite swimmers - identify specific mechanical errors",
          "Mental Approach: Your improvement (4:58 → 4:18) shows you can learn. Be patient with rebuild process",
        ],
        keyMetrics: {
          imImprovement: "Switched to Freestyle",
          flyAverage: 27.45,
          consistency: "Very Poor",
          diveAdvantage: (31.14 - 27.45).toFixed(2),
        },
      },
      "Nii Nortey": {
        strengths: [
          `Solid front-end fly times (17.61-22.53s range) with excellent best of 17.61s`,
          `Completed 2 full IM reps at reasonable pace (4:10-4:11)`,
          `Freestyle final rep at 3:21.04 shows good freestyle capability`,
          `When technique is on, butterfly sprint ability is strong (sub-18s)`,
        ],
        weaknesses: [
          `High variance in front-end fly (17.61s to 22.53s, 4.92s range) - inconsistent execution`,
          `Back-end fly extremely variable (22.75s to 30.81s, 8s range) - largest variance on team`,
          `Unable to complete IM rep 3, switched to freestyle for rep 4`,
          `Back-end times deteriorate significantly suggesting poor endurance or wall technique`,
        ],
        recommendations: [
          "Consistency Focus: Your 17.61s shows you have the technique - now make it repeatable every rep",
          "Video Every Rep: Record yourself to identify why some reps are 5s slower. Look for breathing pattern, entry angle, kick timing",
          "Wall Push-off Drills: 8s variance in back-end fly is unacceptable. Practice 20x streamline push-offs with 5-beat dolphin kick",
          "Endurance Building: Add 4x200m swim at comfortable pace twice per week to build aerobic base",
          "Mental Preparation: Before each rep, visualize perfect technique. Your variance suggests mental focus issues",
          "Reduce IM Volume: Drop to 100m IMs until you can complete 4 reps consistently with good form",
        ],
        keyMetrics: {
          imImprovement: "Incomplete Data",
          flyAverage: 19.15,
          consistency: "Very Poor",
          diveAdvantage: (26.44 - 19.15).toFixed(2),
        },
      },
      Jim: {
        strengths: [
          `Front-end fly times competitive (17.70-20.14s range) with good average of 18.59s`,
          `Best front-end time of 17.70s shows solid dive and sprint capability`,
          `Back-end fly rep 2 at 23.16s demonstrates potential for good wall technique`,
          `Freestyle final rep (3:25.15) is respectable`,
        ],
        weaknesses: [
          `No IM data for reps 1-3 - likely joined workout late or unable to complete IMs`,
          `Only 2 back-end fly reps recorded - incomplete data set`,
          `Front-to-back gap of 6.91s (larger than elite swimmers) indicates wall push-off weakness`,
          `Missing data makes comprehensive analysis difficult`,
        ],
        recommendations: [
          "Attendance Priority: Arrive on time for full warm-up and complete all workout components",
          "IM Development: Begin working on all four strokes. Your fly sprints are solid - build IM capability",
          "Wall Technique: 6.91s dive advantage is too large. Underwater streamlines and push-offs need significant work",
          "Complete Workouts: Partial data suggests inconsistent training. Commit to finishing entire prescribed workout",
          "Build Stroke Repertoire: Practice 8x50m of each stroke separately to develop comfort in backstroke and breaststroke",
          "Next Session Goal: Complete all 4 IM reps, even if slow. Completion builds mental toughness",
        ],
        keyMetrics: {
          imImprovement: "No Full IM Data",
          flyAverage: 18.59,
          consistency: "Insufficient Data",
          diveAdvantage: (25.5 - 18.59).toFixed(2),
        },
      },
      Jesse: {
        strengths: [
          `Only completed 1 IM rep but time of 3:13.32 (48.33s per 50m pace) is very competitive`,
          `This pace is 2nd fastest potential in team, suggesting high skill level`,
          `Front-end fly times remarkably consistent (20.14-21.88s range, only 1.74s variance)`,
          `Back-end fly average of 28.65s is reasonable for development level`,
          `Completed all 4 reps of both butterfly sprint sets showing good sprint endurance`,
        ],
        weaknesses: [
          `Only 1 IM rep recorded - unclear if this was intentional or conditioning issue`,
          `Front-end fly times in 20-21s range show room for improvement (4-6s slower than best)`,
          `Back-end slower than front by 8s indicates significant wall push-off deficiency`,
          `Lack of multiple IM reps prevents analysis of consistency and pacing ability`,
        ],
        recommendations: [
          "Maximize Your Potential: Your 3:13 IM suggests you could be competing for top spot. Need full data set to develop properly",
          "Complete Full Sets: Next session, commit to all 4 IM reps to give coach proper performance data",
          "Dive Technique: Your front-end fly has room for 2-3s improvement. Work on entry angle and breakout timing",
          "Wall Push-offs: 8s gap is too large. Focus on aggressive underwater dolphin kicks off every wall",
          "Conditioning Test: If you can do 3:13, you should be able to complete 4 reps. Build mental toughness to finish sets",
          "Speed Development: Add 6x25m fly at 95% effort with 45s rest to push your sprint times below 20s",
          "Race Strategy: Practice negative splitting - make rep 4 your fastest rep, not just complete it",
        ],
        keyMetrics: {
          imImprovement: "Only 1 Rep",
          flyAverage: 20.6,
          consistency: "Good (sprints only)",
          diveAdvantage: (28.65 - 20.6).toFixed(2),
        },
      },
    };

    return (
      analyses[swimmer] || {
        strengths: ["Data not available"],
        weaknesses: ["Data not available"],
        recommendations: ["Complete full workout next session"],
        keyMetrics: {
          imImprovement: 0,
          flyAverage: 0,
          consistency: "N/A",
          diveAdvantage: 0,
        },
      }
    );
  };

  const currentAnalysis = getSwimmerAnalysis(selectedSwimmer);

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">Rep {label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}:{" "}
              {typeof entry.value === "number"
                ? entry.value.toFixed(2)
                : entry.value}
              {entry.name.includes("Time") ? "s" : ""}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-2xl p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
                African Sharks Performance Dashboard
              </h1>
              <p className="text-gray-600 text-lg">
                Sunday Training Session - October 5, 2025
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Focus: 200m Individual Medley & Butterfly Technique
              </p>
            </div>
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-4 rounded-lg">
              <p className="text-sm font-medium">Total Athletes</p>
              <p className="text-3xl font-bold">{swimmers.length}</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <button
            onClick={() => setActiveTab("team")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === "team"
                ? "bg-cyan-500 text-white shadow-lg transform scale-105"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Team Overview
          </button>
          <button
            onClick={() => setActiveTab("individual")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === "individual"
                ? "bg-cyan-500 text-white shadow-lg transform scale-105"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Individual Analysis
          </button>
          <button
            onClick={() => setActiveTab("insights")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === "insights"
                ? "bg-cyan-500 text-white shadow-lg transform scale-105"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Session Insights
          </button>
          <button
            onClick={() => setActiveTab("key")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === "key"
                ? "bg-cyan-500 text-white shadow-lg transform scale-105"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Key & Definitions
          </button>
        </div>

        {/* Team Overview Tab */}
        {activeTab === "team" && (
          <div className="space-y-6">
            {/* 200m IM Overview */}
            <div className="bg-white rounded-xl shadow-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Award className="text-yellow-500" size={32} />
                <h2 className="text-2xl font-bold text-blue-900">
                  200m Individual Medley Performance
                </h2>
              </div>
              <p className="text-gray-600 mb-4">
                Complete analysis of all four strokes in sequence (Butterfly →
                Backstroke → Breaststroke → Freestyle)
              </p>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart>
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
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    data={teamIMStats.bestTimes}
                    dataKey="time"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="Best Time"
                    dot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    data={teamIMStats.meanTimes}
                    dataKey="time"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Team Average"
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                  <p className="text-sm text-gray-600 font-medium mb-1">
                    Best Time (Any Rep)
                  </p>
                  <p className="text-3xl font-bold text-green-700">
                    {Math.min(
                      ...teamIMStats.bestTimes.map((d) => d.time)
                    ).toFixed(2)}
                    s
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Kobby - Rep 4</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-600 font-medium mb-1">
                    Team Average (All Reps)
                  </p>
                  <p className="text-3xl font-bold text-blue-700">
                    {(
                      teamIMStats.meanTimes.reduce((a, b) => a + b.time, 0) /
                      teamIMStats.meanTimes.length
                    ).toFixed(2)}
                    s
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Across {teamIMStats.meanTimes.length} reps
                  </p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg border border-amber-200">
                  <p className="text-sm text-gray-600 font-medium mb-1">
                    Completion Rate
                  </p>
                  <p className="text-3xl font-bold text-amber-700">60%</p>
                  <p className="text-xs text-gray-500 mt-1">
                    4 swimmers switched to freestyle
                  </p>
                </div>
              </div>
            </div>

            {/* Front End Butterfly */}
            <div className="bg-white rounded-xl shadow-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingDown className="text-purple-500" size={32} />
                <h2 className="text-2xl font-bold text-blue-900">
                  25m Butterfly - Front End (With Dive)
                </h2>
              </div>
              <p className="text-gray-600 mb-4">
                Sprint butterfly from racing dive - tests explosive power and
                dive technique
              </p>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart>
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
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    data={teamFrontStats.bestTimes}
                    dataKey="time"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="Best Time"
                    dot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    data={teamFrontStats.meanTimes}
                    dataKey="time"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    name="Team Average"
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                  <p className="text-sm text-gray-600 font-medium mb-1">
                    Best Time
                  </p>
                  <p className="text-3xl font-bold text-green-700">
                    {Math.min(
                      ...teamFrontStats.bestTimes.map((d) => d.time)
                    ).toFixed(2)}
                    s
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Kobby - Rep 4</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                  <p className="text-sm text-gray-600 font-medium mb-1">
                    Team Average
                  </p>
                  <p className="text-3xl font-bold text-purple-700">
                    {(
                      teamFrontStats.meanTimes.reduce((a, b) => a + b.time, 0) /
                      teamFrontStats.meanTimes.length
                    ).toFixed(2)}
                    s
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Room for improvement
                  </p>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
                  <p className="text-sm text-gray-600 font-medium mb-1">
                    Slowest Time
                  </p>
                  <p className="text-3xl font-bold text-red-700">
                    {Math.max(
                      ...teamFrontStats.bestTimes.map((d) => d.time)
                    ).toFixed(2)}
                    s
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    12s range - technique gap
                  </p>
                </div>
              </div>
            </div>

            {/* Back End Butterfly */}
            <div className="bg-white rounded-xl shadow-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-pink-500" size={32} />
                <h2 className="text-2xl font-bold text-blue-900">
                  25m Butterfly - Back End (Dead Start)
                </h2>
              </div>
              <p className="text-gray-600 mb-4">
                Push-off from wall with no dive - tests pure stroke power and
                wall technique
              </p>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart>
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
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    data={teamBackStats.bestTimes}
                    dataKey="time"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="Best Time"
                    dot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    data={teamBackStats.meanTimes}
                    dataKey="time"
                    stroke="#ec4899"
                    strokeWidth={2}
                    name="Team Average"
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                  <p className="text-sm text-gray-600 font-medium mb-1">
                    Best Time
                  </p>
                  <p className="text-3xl font-bold text-green-700">
                    {Math.min(
                      ...teamBackStats.bestTimes.map((d) => d.time)
                    ).toFixed(2)}
                    s
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Kobby - Rep 3</p>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-lg border border-pink-200">
                  <p className="text-sm text-gray-600 font-medium mb-1">
                    Team Average
                  </p>
                  <p className="text-3xl font-bold text-pink-700">
                    {(
                      teamBackStats.meanTimes.reduce((a, b) => a + b.time, 0) /
                      teamBackStats.meanTimes.length
                    ).toFixed(2)}
                    s
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    5s slower than with dive
                  </p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                  <p className="text-sm text-gray-600 font-medium mb-1">
                    Dive Advantage
                  </p>
                  <p className="text-3xl font-bold text-orange-700">
                    {(
                      teamBackStats.meanTimes.reduce((a, b) => a + b.time, 0) /
                        teamBackStats.meanTimes.length -
                      teamFrontStats.meanTimes.reduce((a, b) => a + b.time, 0) /
                        teamFrontStats.meanTimes.length
                    ).toFixed(2)}
                    s
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Avg time added without dive
                  </p>
                </div>
              </div>
            </div>

            {/* Team Comparison Chart */}
            <div className="bg-white rounded-xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                Swimmer Comparison - Best Times
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={swimmers.map((s) => ({
                    name: s,
                    "IM Best": imData[s]
                      ? Math.min(
                          ...imData[s].filter((r) => r.time).map((r) => r.time)
                        )
                      : null,
                    "Fly Front": frontEndData[s]
                      ? Math.min(
                          ...frontEndData[s]
                            .filter((r) => r.time)
                            .map((r) => r.time)
                        )
                      : null,
                    "Fly Back": backEndData[s]
                      ? Math.min(
                          ...backEndData[s]
                            .filter((r) => r.time)
                            .map((r) => r.time)
                        )
                      : null,
                  }))}
                  margin={{ bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis
                    label={{
                      value: "Time (seconds)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="IM Best" fill="#3b82f6" name="200m IM Best" />
                  <Bar
                    dataKey="Fly Front"
                    fill="#8b5cf6"
                    name="25m Fly (Dive)"
                  />
                  <Bar
                    dataKey="Fly Back"
                    fill="#ec4899"
                    name="25m Fly (Wall)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Individual Analysis Tab */}
        {activeTab === "individual" && (
          <div className="space-y-6">
            {/* Swimmer Selection */}
            <div className="bg-white rounded-xl shadow-xl p-6">
              <label className="block text-lg font-semibold text-blue-900 mb-3">
                Select Swimmer for Detailed Analysis:
              </label>
              <select
                value={selectedSwimmer}
                onChange={(e) => setSelectedSwimmer(e.target.value)}
                className="w-full p-4 border-2 border-blue-300 rounded-lg text-lg font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                {swimmers.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Key Metrics Card */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                {selectedSwimmer} - Performance Metrics
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-sm text-gray-600">IM Improvement</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {typeof currentAnalysis.keyMetrics.imImprovement ===
                    "number"
                      ? `${currentAnalysis.keyMetrics.imImprovement.toFixed(
                          1
                        )}%`
                      : currentAnalysis.keyMetrics.imImprovement}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-sm text-gray-600">Fly Average</p>
                  <p className="text-2xl font-bold text-purple-700">
                    {currentAnalysis.keyMetrics.flyAverage.toFixed(2)}s
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-sm text-gray-600">Consistency</p>
                  <p className="text-2xl font-bold text-green-700">
                    {currentAnalysis.keyMetrics.consistency}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-sm text-gray-600">Dive Advantage</p>
                  <p className="text-2xl font-bold text-orange-700">
                    {currentAnalysis.keyMetrics.diveAdvantage}s
                  </p>
                </div>
              </div>
            </div>

            {/* 200m IM Performance */}
            <div className="bg-white rounded-xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                {selectedSwimmer} - 200m Individual Medley
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={imData[selectedSwimmer]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="rep"
                    label={{
                      value: "Rep",
                      position: "insideBottom",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    yAxisId="left"
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
                      value: "Pace (s/50m)",
                      angle: 90,
                      position: "insideRight",
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="time"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name="Total Time"
                    dot={{ r: 6 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="pace"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    name="Pace per 50m"
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              {imData[selectedSwimmer].some((r) => r.freestyle) && (
                <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="text-yellow-600" size={24} />
                    <p className="text-yellow-800 font-semibold">
                      Note: Rep 4 was completed as freestyle-only, not full IM
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Front End Butterfly */}
            <div className="bg-white rounded-xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                {selectedSwimmer} - 25m Butterfly Front End (With Dive)
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={frontEndData[selectedSwimmer]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="rep" />
                  <YAxis
                    label={{
                      value: "Time (s)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="time" fill="#8b5cf6" name="Time" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600">Best</p>
                  <p className="text-xl font-bold text-green-700">
                    {Math.min(
                      ...frontEndData[selectedSwimmer].map((r) => r.time)
                    ).toFixed(2)}
                    s
                  </p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600">Average</p>
                  <p className="text-xl font-bold text-blue-700">
                    {(
                      frontEndData[selectedSwimmer].reduce(
                        (a, b) => a + b.time,
                        0
                      ) / frontEndData[selectedSwimmer].length
                    ).toFixed(2)}
                    s
                  </p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600">Variance</p>
                  <p className="text-xl font-bold text-red-700">
                    {(
                      Math.max(
                        ...frontEndData[selectedSwimmer].map((r) => r.time)
                      ) -
                      Math.min(
                        ...frontEndData[selectedSwimmer].map((r) => r.time)
                      )
                    ).toFixed(2)}
                    s
                  </p>
                </div>
              </div>
            </div>

            {/* Back End Butterfly */}
            <div className="bg-white rounded-xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                {selectedSwimmer} - 25m Butterfly Back End (Dead Start)
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={backEndData[selectedSwimmer].filter(
                    (r) => r.time !== null
                  )}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="rep" />
                  <YAxis
                    label={{
                      value: "Time (s)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="time" fill="#ec4899" name="Time" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600">Best</p>
                  <p className="text-xl font-bold text-green-700">
                    {Math.min(
                      ...backEndData[selectedSwimmer]
                        .filter((r) => r.time !== null)
                        .map((r) => r.time)
                    ).toFixed(2)}
                    s
                  </p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600">Average</p>
                  <p className="text-xl font-bold text-blue-700">
                    {(
                      backEndData[selectedSwimmer]
                        .filter((r) => r.time !== null)
                        .reduce((a, b) => a + b.time, 0) /
                      backEndData[selectedSwimmer].filter(
                        (r) => r.time !== null
                      ).length
                    ).toFixed(2)}
                    s
                  </p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600">Variance</p>
                  <p className="text-xl font-bold text-red-700">
                    {(
                      Math.max(
                        ...backEndData[selectedSwimmer]
                          .filter((r) => r.time !== null)
                          .map((r) => r.time)
                      ) -
                      Math.min(
                        ...backEndData[selectedSwimmer]
                          .filter((r) => r.time !== null)
                          .map((r) => r.time)
                      )
                    ).toFixed(2)}
                    s
                  </p>
                </div>
              </div>
            </div>

            {/* Performance Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">
                Performance Analysis for {selectedSwimmer}
              </h2>

              {/* Strengths */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="text-green-600" size={28} />
                  <h3 className="text-xl font-semibold text-green-700">
                    Strengths
                  </h3>
                </div>
                <ul className="space-y-2">
                  {currentAnalysis.strengths.map((strength, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm"
                    >
                      <span className="text-green-500 text-xl mt-1">✓</span>
                      <span className="text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="text-red-600" size={28} />
                  <h3 className="text-xl font-semibold text-red-700">
                    Areas for Improvement
                  </h3>
                </div>
                <ul className="space-y-2">
                  {currentAnalysis.weaknesses.map((weakness, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm"
                    >
                      <span className="text-red-500 text-xl mt-1">⚠</span>
                      <span className="text-gray-700">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommendations */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Target className="text-blue-600" size={28} />
                  <h3 className="text-xl font-semibold text-blue-700">
                    Training Recommendations
                  </h3>
                </div>
                <ul className="space-y-3">
                  {currentAnalysis.recommendations.map((rec, idx) => (
                    <li
                      key={idx}
                      className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500"
                    >
                      <span className="text-gray-800">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Session Insights Tab */}
        {activeTab === "insights" && (
          <div className="space-y-6">
            {/* Critical Finding */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl shadow-xl p-6 border-l-4 border-red-500">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-red-600" size={36} />
                <h2 className="text-2xl font-bold text-red-900">
                  Critical Finding: IM Completion Issue
                </h2>
              </div>
              <p className="text-gray-800 text-lg mb-4">
                <strong>40% of swimmers (4 out of 10)</strong> were unable to
                complete the full 200m Individual Medley on their 4th repetition
                and switched to freestyle-only.
              </p>
              <div className="bg-white p-4 rounded-lg mb-4">
                <p className="font-semibold text-gray-800 mb-2">
                  Swimmers Who Switched to Freestyle:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Ronell (4:01.02)</li>
                  <li>Kofi (3:24.10)</li>
                  <li>Jada (3:29.78)</li>
                  <li>Nii Nortey (3:21.04)</li>
                </ul>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-300">
                <p className="font-semibold text-yellow-900 mb-2">
                  What This Means:
                </p>
                <ul className="space-y-2 text-yellow-800">
                  <li>
                    • <strong>Butterfly is the primary limiting stroke</strong>{" "}
                    - when fatigued, this stroke breaks down first
                  </li>
                  <li>
                    •{" "}
                    <strong>IM-specific conditioning needs development</strong>{" "}
                    - 4x200m IM exceeds current capacity
                  </li>
                  <li>
                    • <strong>Stroke versatility gap</strong> - non-freestyle
                    strokes require focused attention
                  </li>
                  <li>
                    • <strong>Mental fatigue factor</strong> - technical strokes
                    harder to maintain under pressure
                  </li>
                </ul>
              </div>
            </div>

            {/* Performance Distribution */}
            <div className="bg-white rounded-xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                Performance Distribution Analysis
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* IM Times */}
                <div className="border-2 border-blue-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">
                    200m IM - Best Times Breakdown
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-green-50 p-3 rounded">
                      <p className="text-sm font-medium text-gray-700">
                        Elite (Sub 3:00)
                      </p>
                      <p className="text-lg font-bold text-green-700">
                        Kobby (2:56.11)
                      </p>
                      <p className="text-xs text-gray-600">
                        National youth competitive level
                      </p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="text-sm font-medium text-gray-700">
                        Competitive (3:00-3:30)
                      </p>
                      <p className="text-lg font-bold text-blue-700">
                        Jadon (3:07), Jesse (3:13), Abena (3:27), Raphaell
                        (3:29)
                      </p>
                      <p className="text-xs text-gray-600">
                        Regional competitive potential
                      </p>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded">
                      <p className="text-sm font-medium text-gray-700">
                        Development (3:30-4:30)
                      </p>
                      <p className="text-lg font-bold text-yellow-700">
                        Kofi, Nii Nortey, Jada, Jim
                      </p>
                      <p className="text-xs text-gray-600">
                        Focused technique work needed
                      </p>
                    </div>
                    <div className="bg-red-50 p-3 rounded">
                      <p className="text-sm font-medium text-gray-700">
                        Foundational (4:30+)
                      </p>
                      <p className="text-lg font-bold text-red-700">Ronell</p>
                      <p className="text-xs text-gray-600">
                        Requires fundamental stroke rebuilding
                      </p>
                    </div>
                  </div>
                </div>

                {/* Butterfly Distribution */}
                <div className="border-2 border-purple-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">
                    25m Butterfly Front End Distribution
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-green-50 p-3 rounded">
                      <p className="text-sm font-medium text-gray-700">
                        Advanced (Sub 18s)
                      </p>
                      <p className="text-lg font-bold text-green-700">
                        Kobby (14.06), Jadon (16.74), Jim (17.70)
                      </p>
                      <p className="text-xs text-gray-600">
                        Strong technical foundation
                      </p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="text-sm font-medium text-gray-700">
                        Intermediate (18-22s)
                      </p>
                      <p className="text-lg font-bold text-blue-700">
                        Nii Nortey (17.61), Abena (19.50), Jesse (20.14)
                      </p>
                      <p className="text-xs text-gray-600">
                        Solid technique, needs refinement
                      </p>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded">
                      <p className="text-sm font-medium text-gray-700">
                        Development (22-25s)
                      </p>
                      <p className="text-lg font-bold text-yellow-700">
                        Raphaell (22.52), Kofi (23.22)
                      </p>
                      <p className="text-xs text-gray-600">
                        Technique work showing progress
                      </p>
                    </div>
                    <div className="bg-red-50 p-3 rounded">
                      <p className="text-sm font-medium text-gray-700">
                        Needs Focus (25s+)
                      </p>
                      <p className="text-lg font-bold text-red-700">
                        Ronell (24.55), Jada (25.37)
                      </p>
                      <p className="text-xs text-gray-600">
                        Fundamental technique issues
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Unique Session Notes */}
            <div className="bg-white rounded-xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                Unique Session Observations
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-cyan-500 bg-cyan-50 p-4 rounded-r-lg">
                  <h3 className="font-semibold text-cyan-900 mb-2">
                    1. The Dive Advantage Phenomenon
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Team average: Front end (with dive) is{" "}
                    <strong>5.1 seconds faster</strong> than back end. However,
                    individual variations are telling:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                    <li>
                      <strong>Small advantage (2-4s):</strong> Kobby, Jadon,
                      Abena
                    </li>
                    <li>
                      <strong>Medium advantage (5-7s):</strong> Raphaell, Kofi,
                      Jesse
                    </li>
                    <li>
                      <strong>Large advantage (8s+):</strong> Ronell, Nii Nortey
                    </li>
                  </ul>
                </div>

                <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">
                    2. Progressive Improvement vs. Fatigue Patterns
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Clear split in adaptation strategies:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                    <li>
                      <strong>Improvers:</strong> Kobby (-35s), Raphaell (-72s),
                      Jadon (-31s) got faster throughout workout
                    </li>
                    <li>
                      <strong>Maintainers:</strong> Abena, Jesse showed
                      consistency without major changes
                    </li>
                    <li>
                      <strong>Deteriorators:</strong> Most swimmers showed time
                      increases in back-end butterfly
                    </li>
                  </ul>
                  <p className="text-sm text-purple-800 mt-2 font-medium">
                    Insight: Top performers needed warm-up to reach peak, while
                    others showed fatigue accumulation
                  </p>
                </div>

                <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
                  <h3 className="font-semibold text-green-900 mb-2">
                    3. Butterfly Bimodal Distribution
                  </h3>
                  <p className="text-gray-700 mb-2">
                    No swimmers in the 18-20s range for front-end butterfly -
                    creates a clear gap between:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                    <li>
                      <strong>Proficient group:</strong> Sub-18s (Kobby, Jadon,
                      Jim) with solid technique
                    </li>
                    <li>
                      <strong>Struggling group:</strong> 20s+ with fundamental
                      issues needing different training approach
                    </li>
                  </ul>
                  <p className="text-sm text-green-800 mt-2 font-medium">
                    Recommendation: Split into two butterfly training groups
                    with different focuses
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-lg">
                  <h3 className="font-semibold text-orange-900 mb-2">
                    4. The Consistency Champions
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Kobby</strong> showed remarkable consistency across
                    all sets with variance under 3 seconds in butterfly sprints.
                    This level of technical control is elite and should be
                    studied by teammates.
                  </p>
                  <p className="text-gray-700 mb-2">
                    Compare to <strong>Nii Nortey's</strong> 8-second variance
                    in back-end butterfly - the difference between elite and
                    developing athletes often lies in consistency, not peak
                    performance.
                  </p>
                </div>

                <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg">
                  <h3 className="font-semibold text-red-900 mb-2">
                    5. Workout Design Mismatch
                  </h3>
                  <p className="text-gray-700 mb-2">
                    4x200m IM proved too challenging for 40% of the team. This
                    suggests:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                    <li>
                      Current conditioning level doesn't support this volume
                    </li>
                    <li>
                      Butterfly technique breaks down under extended fatigue
                    </li>
                    <li>
                      Need for graduated distances: 4x100m IM for developing
                      swimmers, 4x200m for advanced
                    </li>
                  </ul>
                  <p className="text-sm text-red-800 mt-2 font-medium">
                    Future sessions should tier workout difficulty based on
                    demonstrated capability
                  </p>
                </div>
              </div>
            </div>

            {/* Team Recommendations */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                Team-Wide Recommendations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-lg shadow border-l-4 border-blue-500">
                  <h3 className="font-bold text-blue-900 mb-2">
                    🦋 Butterfly Focus Sessions
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Dedicate entire practices to butterfly technique work. Split
                    team into proficient and developing groups with targeted
                    drills for each level.
                  </p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow border-l-4 border-purple-500">
                  <h3 className="font-bold text-purple-900 mb-2">
                    🏊 Wall Technique Clinics
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Weekly sessions focusing on push-offs, underwater
                    streamlines, and dolphin kicks. The 5s+ advantage from dives
                    shows this is undertrained.
                  </p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow border-l-4 border-green-500">
                  <h3 className="font-bold text-green-900 mb-2">
                    📊 Tiered Workout Design
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Create A/B groups: Advanced swimmers do 200m IMs, developing
                    swimmers do 100m IMs. Everyone trains at appropriate
                    intensity level.
                  </p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow border-l-4 border-orange-500">
                  <h3 className="font-bold text-orange-900 mb-2">
                    💪 Dryland Strength Program
                  </h3>
                  <p className="text-gray-700 text-sm">
                    15-20 minute pre-practice dryland focusing on
                    butterfly-specific muscles: core, lats, shoulders. Essential
                    for stroke development.
                  </p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow border-l-4 border-pink-500">
                  <h3 className="font-bold text-pink-900 mb-2">
                    🎥 Video Analysis Integration
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Record swimmers monthly to track technique evolution.
                    Compare struggling swimmers to proficient ones to identify
                    specific mechanical differences.
                  </p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow border-l-4 border-cyan-500">
                  <h3 className="font-bold text-cyan-900 mb-2">
                    ⏱️ Pacing Education
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Teach swimmers to use tempo trainers and understand pace.
                    Many time fluctuations stem from poor energy distribution
                    understanding.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Key & Definitions Tab */}
        {activeTab === "key" && (
          <div className="bg-white rounded-xl shadow-xl p-6">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">
              Dashboard Key & Definitions
            </h2>

            <div className="space-y-8">
              {/* Abbreviations */}
              <div>
                <h3 className="text-2xl font-semibold text-blue-800 mb-4 border-b-2 border-blue-200 pb-2">
                  Abbreviations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                    <span className="font-bold text-blue-600 text-lg">IM</span>
                    <span className="text-gray-700">Individual Medley</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                    <span className="font-bold text-blue-600 text-lg">Fly</span>
                    <span className="text-gray-700">Butterfly stroke</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                    <span className="font-bold text-blue-600 text-lg">Fr</span>
                    <span className="text-gray-700">Freestyle stroke</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                    <span className="font-bold text-blue-600 text-lg">s</span>
                    <span className="text-gray-700">Seconds</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                    <span className="font-bold text-blue-600 text-lg">m</span>
                    <span className="text-gray-700">Meters</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                    <span className="font-bold text-blue-600 text-lg">Rep</span>
                    <span className="text-gray-700">Repetition</span>
                  </div>
                </div>
              </div>

              {/* Set Definitions */}
              <div>
                <h3 className="text-2xl font-semibold text-blue-800 mb-4 border-b-2 border-blue-200 pb-2">
                  Set Definitions
                </h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-bold text-blue-900 text-lg mb-2">
                      200m Individual Medley (IM)
                    </h4>
                    <p className="text-gray-700 mb-2">
                      A race combining all four competitive swimming strokes in
                      this order:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                      <li>
                        <strong>50m Butterfly:</strong> Most technically
                        demanding, requires timing and power
                      </li>
                      <li>
                        <strong>50m Backstroke:</strong> Only stroke starting in
                        water, tests body position
                      </li>
                      <li>
                        <strong>50m Breaststroke:</strong> Slowest stroke,
                        requires patience and technique
                      </li>
                      <li>
                        <strong>50m Freestyle:</strong> Fastest stroke, tests
                        finishing speed
                      </li>
                    </ul>
                    <p className="text-sm text-blue-800 mt-2">
                      The IM is called "the ultimate test" because it requires
                      proficiency in all strokes plus strategic pacing.
                    </p>
                  </div>

                  <div className="bg-purple-50 p-5 rounded-lg border-l-4 border-purple-500">
                    <h4 className="font-bold text-purple-900 text-lg mb-2">
                      Front End 25m Butterfly (With Dive)
                    </h4>
                    <p className="text-gray-700 mb-2">
                      Sprint butterfly from a racing dive off the starting
                      blocks. Tests:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                      <li>
                        <strong>Explosive power:</strong> Ability to generate
                        maximum speed quickly
                      </li>
                      <li>
                        <strong>Dive technique:</strong> Entry angle,
                        streamline, breakout timing
                      </li>
                      <li>
                        <strong>Sprint butterfly mechanics:</strong> High stroke
                        rate with power
                      </li>
                    </ul>
                    <p className="text-sm text-purple-800 mt-2">
                      This simulates race start conditions and is crucial for
                      competitive swimming.
                    </p>
                  </div>

                  <div className="bg-pink-50 p-5 rounded-lg border-l-4 border-pink-500">
                    <h4 className="font-bold text-pink-900 text-lg mb-2">
                      Back End 25m Butterfly (Dead Start)
                    </h4>
                    <p className="text-gray-700 mb-2">
                      Sprint butterfly from a wall push-off with no dive. Tests:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                      <li>
                        <strong>Explosive power from a static position:</strong>{" "}
                        Leg drive and streamline position
                      </li>
                      <li>
                        <strong>Underwater technique:</strong> Dolphin kicks and
                        breakout
                      </li>
                      <li>
                        <strong>Pure stroke power:</strong> Speed without
                        momentum from dive
                      </li>
                    </ul>
                    <p className="text-sm text-pink-800 mt-2">
                      Times are typically 3-5s slower than front end. Larger
                      gaps indicate wall technique deficiency.
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Metrics Explained */}
              <div>
                <h3 className="text-2xl font-semibold text-blue-800 mb-4 border-b-2 border-blue-200 pb-2">
                  Key Metrics Explained
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Time</h4>
                    <p className="text-sm text-gray-700">
                      How long it takes to complete the distance. Lower is
                      better. Measured in seconds (e.g., 14.06s).
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Pace</h4>
                    <p className="text-sm text-gray-700">
                      Average time per 50m segment. Helps compare efforts of
                      different distances (e.g., 48.33s per 50m).
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Improvement %
                    </h4>
                    <p className="text-sm text-gray-700">
                      Percentage change from first to last rep. Positive means
                      getting faster (good). Shows adaptation ability.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Variance
                    </h4>
                    <p className="text-sm text-gray-700">
                      Difference between best and worst time. Lower variance =
                      better consistency and technique control.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Dive Advantage
                    </h4>
                    <p className="text-sm text-gray-700">
                      Time difference between front end (dive) and back end
                      (wall). Typical: 3-5s. Higher = wall technique needs work.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Consistency Rating
                    </h4>
                    <p className="text-sm text-gray-700">
                      Elite: &lt;3s variance. Good: 3-5s. Moderate: 5-7s. Poor:
                      7s+. Measures technical stability.
                    </p>
                  </div>
                </div>
              </div>

              {/* Understanding the Graphs */}
              <div>
                <h3 className="text-2xl font-semibold text-blue-800 mb-4 border-b-2 border-blue-200 pb-2">
                  How to Read the Graphs
                </h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-5 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      📈 Line Graphs (Time Over Reps)
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>
                        <strong>Downward slope = Getting faster (good!)</strong>{" "}
                        - Shows you're warming up or learning
                      </li>
                      <li>
                        <strong>Upward slope = Getting slower</strong> - Usually
                        means fatigue or technique breakdown
                      </li>
                      <li>
                        <strong>Flat line = Consistency</strong> - Good pacing
                        control and stable technique
                      </li>
                      <li>
                        <strong>Jagged/spiky = Inconsistency</strong> - Pacing
                        issues or unstable technique
                      </li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 p-5 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">
                      📊 Bar Charts (Individual Reps)
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>
                        <strong>Tall bars = Slower times</strong> - Areas
                        needing improvement
                      </li>
                      <li>
                        <strong>Short bars = Faster times</strong> - Your
                        strengths to build on
                      </li>
                      <li>
                        <strong>Similar height bars = Consistency</strong> -
                        Good technique control
                      </li>
                      <li>
                        <strong>Big differences = Variability</strong> - Focus
                        needed on consistency
                      </li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-5 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">
                      🎯 Best Time vs Average Lines
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>
                        <strong>Green line (Best Time):</strong> The fastest
                        swimmer in each rep - team goal to reach
                      </li>
                      <li>
                        <strong>Blue/Purple/Pink line (Average):</strong> Where
                        most of the team is performing
                      </li>
                      <li>
                        <strong>Gap between lines:</strong> Shows team
                        performance spread - smaller is better
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Color Legend */}
              <div>
                <h3 className="text-2xl font-semibold text-blue-800 mb-4 border-b-2 border-blue-200 pb-2">
                  Color Legend
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="flex items-center space-x-2 bg-green-50 p-3 rounded-lg border border-green-300">
                    <div className="w-6 h-6 bg-green-500 rounded"></div>
                    <span className="text-sm text-gray-700">
                      Best Time / Strengths
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 bg-blue-50 p-3 rounded-lg border border-blue-300">
                    <div className="w-6 h-6 bg-blue-500 rounded"></div>
                    <span className="text-sm text-gray-700">
                      IM Performance / Average
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 bg-purple-50 p-3 rounded-lg border border-purple-300">
                    <div className="w-6 h-6 bg-purple-500 rounded"></div>
                    <span className="text-sm text-gray-700">Fly Front End</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-pink-50 p-3 rounded-lg border border-pink-300">
                    <div className="w-6 h-6 bg-pink-500 rounded"></div>
                    <span className="text-sm text-gray-700">Fly Back End</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-yellow-50 p-3 rounded-lg border border-yellow-300">
                    <div className="w-6 h-6 bg-yellow-500 rounded"></div>
                    <span className="text-sm text-gray-700">
                      Pace / Warnings
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 bg-red-50 p-3 rounded-lg border border-red-300">
                    <div className="w-6 h-6 bg-red-500 rounded"></div>
                    <span className="text-sm text-gray-700">
                      Areas to Improve
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 bg-orange-50 p-3 rounded-lg border border-orange-300">
                    <div className="w-6 h-6 bg-orange-500 rounded"></div>
                    <span className="text-sm text-gray-700">
                      Dive Advantage
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 bg-cyan-50 p-3 rounded-lg border border-cyan-300">
                    <div className="w-6 h-6 bg-cyan-500 rounded"></div>
                    <span className="text-sm text-gray-700">
                      Active Selection
                    </span>
                  </div>
                </div>
              </div>

              {/* Technical Terms */}
              <div>
                <h3 className="text-2xl font-semibold text-blue-800 mb-4 border-b-2 border-blue-200 pb-2">
                  Important Swimming Terms
                </h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Streamline
                    </h4>
                    <p className="text-sm text-gray-700">
                      Body position with arms extended overhead, hands
                      overlapped, body straight and tight. Most hydrodynamic
                      position in swimming.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Breakout
                    </h4>
                    <p className="text-sm text-gray-700">
                      The moment when a swimmer surfaces and begins taking
                      strokes after being underwater (from dive or push-off).
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Dolphin Kick
                    </h4>
                    <p className="text-sm text-gray-700">
                      Underwater kick where both legs move together in a
                      wave-like motion. Used in butterfly and underwater phases.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Negative Split
                    </h4>
                    <p className="text-sm text-gray-700">
                      Swimming the second half of a race faster than the first
                      half. Shows good pacing and race strategy.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Stroke Count
                    </h4>
                    <p className="text-sm text-gray-700">
                      Number of strokes taken to complete a distance. Lower
                      count usually means better efficiency (longer, more
                      powerful strokes).
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Dead Start
                    </h4>
                    <p className="text-sm text-gray-700">
                      Starting in the water (no dive). Tests pure swimming
                      ability without dive momentum.
                    </p>
                  </div>
                </div>
              </div>

              {/* How to Use This Dashboard */}
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-lg border-2 border-cyan-300">
                <h3 className="text-2xl font-semibold text-blue-900 mb-4">
                  🏊 How to Use This Dashboard
                </h3>
                <ol className="space-y-3 text-gray-800">
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-cyan-600 text-xl">1.</span>
                    <div>
                      <strong>Start with Team Overview:</strong> See where you
                      stand compared to teammates. Look at best times (your
                      goal) and average times (typical performance).
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-cyan-600 text-xl">2.</span>
                    <div>
                      <strong>Check Your Individual Performance:</strong> Select
                      your name to see detailed graphs of your times. Look for
                      patterns - are you improving or slowing down?
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-cyan-600 text-xl">3.</span>
                    <div>
                      <strong>Read Your Analysis:</strong> Carefully review your
                      strengths, weaknesses, and recommendations. These are
                      personalized for YOU based on YOUR data.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-cyan-600 text-xl">4.</span>
                    <div>
                      <strong>Set Specific Goals:</strong> Pick 1-2
                      recommendations to focus on this week. Small, consistent
                      improvements lead to big results.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-cyan-600 text-xl">5.</span>
                    <div>
                      <strong>Track Your Progress:</strong> Compare your
                      performance to previous sessions. Celebrate improvements,
                      identify areas still needing work.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-cyan-600 text-xl">6.</span>
                    <div>
                      <strong>Review Session Insights:</strong> Understand
                      broader patterns across the whole team and why certain
                      workouts are designed the way they are.
                    </div>
                  </li>
                </ol>
              </div>

              {/* Performance Rating Scale */}
              <div>
                <h3 className="text-2xl font-semibold text-blue-800 mb-4 border-b-2 border-blue-200 pb-2">
                  Performance Rating Scales
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      200m IM Times
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 bg-green-50 p-2 rounded border-l-4 border-green-500">
                        <span className="text-sm font-medium text-gray-700 w-32">
                          Elite:
                        </span>
                        <span className="text-sm text-gray-600">
                          Under 3:00
                        </span>
                      </div>
                      <div className="flex items-center gap-3 bg-blue-50 p-2 rounded border-l-4 border-blue-500">
                        <span className="text-sm font-medium text-gray-700 w-32">
                          Competitive:
                        </span>
                        <span className="text-sm text-gray-600">
                          3:00 - 3:30
                        </span>
                      </div>
                      <div className="flex items-center gap-3 bg-yellow-50 p-2 rounded border-l-4 border-yellow-500">
                        <span className="text-sm font-medium text-gray-700 w-32">
                          Development:
                        </span>
                        <span className="text-sm text-gray-600">
                          3:30 - 4:30
                        </span>
                      </div>
                      <div className="flex items-center gap-3 bg-red-50 p-2 rounded border-l-4 border-red-500">
                        <span className="text-sm font-medium text-gray-700 w-32">
                          Foundational:
                        </span>
                        <span className="text-sm text-gray-600">Over 4:30</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      25m Butterfly Times
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 bg-green-50 p-2 rounded border-l-4 border-green-500">
                        <span className="text-sm font-medium text-gray-700 w-32">
                          Advanced:
                        </span>
                        <span className="text-sm text-gray-600">Under 18s</span>
                      </div>
                      <div className="flex items-center gap-3 bg-blue-50 p-2 rounded border-l-4 border-blue-500">
                        <span className="text-sm font-medium text-gray-700 w-32">
                          Intermediate:
                        </span>
                        <span className="text-sm text-gray-600">18s - 22s</span>
                      </div>
                      <div className="flex items-center gap-3 bg-yellow-50 p-2 rounded border-l-4 border-yellow-500">
                        <span className="text-sm font-medium text-gray-700 w-32">
                          Development:
                        </span>
                        <span className="text-sm text-gray-600">22s - 25s</span>
                      </div>
                      <div className="flex items-center gap-3 bg-red-50 p-2 rounded border-l-4 border-red-500">
                        <span className="text-sm font-medium text-gray-700 w-32">
                          Needs Focus:
                        </span>
                        <span className="text-sm text-gray-600">Over 25s</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Questions Section */}
              <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-300">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">
                  ❓ Questions About Your Data?
                </h3>
                <p className="text-gray-700 mb-3">
                  If you don't understand something on your dashboard or want to
                  discuss your recommendations:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    • <strong>Ask your coach</strong> during or after practice
                  </li>
                  <li>
                    • <strong>Watch the elite swimmers</strong> in your team to
                    learn technique
                  </li>
                  <li>
                    • <strong>Record yourself swimming</strong> and compare to
                    your data
                  </li>
                  <li>
                    • <strong>Set weekly goals</strong> based on your specific
                    recommendations
                  </li>
                  <li>
                    • <strong>Focus on consistency first</strong>, then speed
                    will follow
                  </li>
                </ul>
                <p className="text-sm text-blue-800 mt-4 font-medium">
                  Remember: Everyone improves at their own pace. Your only
                  competition is yesterday's version of yourself! 💪
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SundayDashboard;
