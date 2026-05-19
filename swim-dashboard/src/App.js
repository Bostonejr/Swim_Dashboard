import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import SwimDashboard from "./SwimDashboard";
import SundayDashboard from "./swimdash_05_10_2025";
import SwimDashboard400m from "./swimdash_21_12_2025";
import WednesdayDashboard from "./swimdash_24_12_2025";
import BestAverageSet_Fly_Breast from "./swimdash_08_03_2026";
import BestAverageSet20by100m from "./swimdash_12_04_2026";
import Saturday_09_05_2026_TopEndSprintSet from "./swimdash_09_05_2026";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/original" element={<SwimDashboard />} />
        <Route path="/dashboard/05-10-2025" element={<SundayDashboard />} />
        <Route path="/dashboard/21-12-2025" element={<SwimDashboard400m />} />
        <Route path="/dashboard/24-12-2025" element={<WednesdayDashboard />} />
        <Route
          path="/dashboard/08-03-2026"
          element={<BestAverageSet_Fly_Breast />}
        />
        <Route
          path="/dashboard/12-04-2026"
          element={<BestAverageSet20by100m />}
        />
        <Route
          path="/dashboard/09-05-2026"
          element={<Saturday_09_05_2026_TopEndSprintSet />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
