# African Sharks SwimDashboard - Project Guide

This guide explains how your SwimDashboard project works and how to make common changes.

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [How Routing Works](#how-routing-works)
3. [Adding a New Dashboard](#adding-a-new-dashboard)
4. [Editing Dashboard Names & Descriptions](#editing-dashboard-names--descriptions)
5. [Editing the Home Page](#editing-the-home-page)
6. [Development & Deployment](#development--deployment)
7. [Common Tasks Quick Reference](#common-tasks-quick-reference)

---

## Project Structure

```
swim-dashboard/
├── public/                    # Static files (don't edit often)
│   ├── index.html            # Main HTML template
│   └── favicon.ico           # Browser tab icon
│
├── src/                       # SOURCE CODE - where you work
│   ├── App.js                # ROUTER - connects URLs to dashboards
│   ├── Home.jsx              # LANDING PAGE - session selector cards
│   ├── index.js              # Entry point (don't edit)
│   ├── index.css             # Global styles (Tailwind imports)
│   ├── firebase.js           # Firebase configuration
│   │
│   └── DASHBOARDS:
│       ├── SwimDashboard.jsx           # Original - Start Techniques
│       ├── swimdash_05_10_2025.jsx     # Oct 5, 2025 - IM Analysis
│       ├── swimdash_21_12_2025.jsx     # Dec 21, 2025 - 4x400m Freestyle
│       └── swimdash_24_12_2025.jsx     # Dec 24, 2025 - Wednesday Sprint
│
├── build/                     # Production build (auto-generated)
├── firebase.json              # Firebase hosting config
├── .firebaserc               # Firebase project reference
├── package.json              # Dependencies & scripts
└── tailwind.config.js        # Tailwind CSS configuration
```

### Key Files You'll Edit Most Often

| File | Purpose | When to Edit |
|------|---------|--------------|
| `src/Home.jsx` | Session selector cards | Add/edit session cards shown on landing page |
| `src/App.js` | URL routing | Add routes for new dashboards |
| `src/swimdash_*.jsx` | Dashboard content | Edit swim data, charts, analysis |

---

## How Routing Works

Your app now uses **React Router** to show different dashboards based on the URL.

### URL Structure

```
https://your-site.web.app/                    → Home page (session selector)
https://your-site.web.app/dashboard/original  → SwimDashboard.jsx
https://your-site.web.app/dashboard/05-10-2025 → swimdash_05_10_2025.jsx
https://your-site.web.app/dashboard/21-12-2025 → swimdash_21_12_2025.jsx
https://your-site.web.app/dashboard/24-12-2025 → swimdash_24_12_2025.jsx
```

### How It Connects (App.js)

```jsx
// App.js connects URLs to components like this:
<Route path="/" element={<Home />} />                           // Landing page
<Route path="/dashboard/24-12-2025" element={<WednesdayDashboard />} />  // Dec 24 dashboard
```

When a user visits `/dashboard/24-12-2025`, React Router renders `<WednesdayDashboard />`.

---

## Adding a New Dashboard

Follow these steps when you have a new swim session to analyze:

### Step 1: Create the Dashboard File

1. **Copy an existing dashboard** as a template:
   ```
   Copy: swimdash_24_12_2025.jsx
   To:   swimdash_DD_MM_YYYY.jsx (use your session date)
   ```

2. **Edit the new file:**
   - Update the component name (line ~24):
     ```jsx
     // Change from:
     const WednesdayDashboard = () => {
     // To (example):
     const SaturdayDashboard = () => {
     ```

   - Update the `rawData` object with your new swimmers and times

   - Update the header text:
     ```jsx
     <h1>African Sharks - Saturday Session Analysis</h1>
     <p>Saturday, January 15, 2026 - Your Session Description</p>
     ```

   - Update the export at the bottom:
     ```jsx
     export default SaturdayDashboard;
     ```

### Step 2: Add the Route in App.js

Open `src/App.js` and add your new dashboard:

```jsx
// 1. Add the import at the top
import SaturdayDashboard from "./swimdash_15_01_2026";

// 2. Add the route inside <Routes>
<Route path="/dashboard/15-01-2026" element={<SaturdayDashboard />} />
```

**Full App.js example after adding:**

```jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import SwimDashboard from "./SwimDashboard";
import SundayDashboard from "./swimdash_05_10_2025";
import SwimDashboard400m from "./swimdash_21_12_2025";
import WednesdayDashboard from "./swimdash_24_12_2025";
import SaturdayDashboard from "./swimdash_15_01_2026";  // NEW

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/original" element={<SwimDashboard />} />
        <Route path="/dashboard/05-10-2025" element={<SundayDashboard />} />
        <Route path="/dashboard/21-12-2025" element={<SwimDashboard400m />} />
        <Route path="/dashboard/24-12-2025" element={<WednesdayDashboard />} />
        <Route path="/dashboard/15-01-2026" element={<SaturdayDashboard />} />  {/* NEW */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### Step 3: Add Session Card to Home Page

Open `src/Home.jsx` and add your session to the `sessions` array:

```jsx
const sessions = [
  // ADD NEW SESSION AT THE TOP (most recent first)
  {
    id: "15-01-2026",
    route: "/dashboard/15-01-2026",
    title: "Saturday Sprint Session",
    date: "Saturday, January 15, 2026",
    type: "Sprint Analysis",
    description: "Short description of the session focus",
    swimmers: 15,        // Number of swimmers (or null if unknown)
    highlight: true,     // Set to true for "Latest Session" badge
  },
  // ... existing sessions below
];
```

**Important:** Set `highlight: false` on the previous latest session.

### Step 4: Build and Deploy

```bash
npm run build
firebase deploy
```

---

## Editing Dashboard Names & Descriptions

### Change Session Title on Home Page

Open `src/Home.jsx` and find the session in the `sessions` array:

```jsx
{
  id: "24-12-2025",
  route: "/dashboard/24-12-2025",
  title: "Wednesday Session",              // ← Change this
  date: "Wednesday, December 24, 2025",    // ← Change this
  type: "12 x 50m Freestyle",              // ← Change this
  description: "Long endurance set...",    // ← Change this
  swimmers: 18,
  highlight: true,
}
```

### Change Dashboard Header (inside the dashboard)

Open the dashboard file (e.g., `swimdash_24_12_2025.jsx`) and find the header section:

```jsx
{/* Header */}
<div className="bg-white rounded-lg shadow-xl p-6 mb-6">
  <Link to="/" className="...">
    <ArrowLeft className="w-4 h-4 mr-2" />
    Back to Sessions
  </Link>
  <h1 className="text-3xl font-bold text-blue-900 mb-2">
    African Sharks - Wednesday Session Analysis   {/* ← Edit title here */}
  </h1>
  <p className="text-gray-600">
    Wednesday, December 24, 2025 - Long Endurance Set (12 x 50m Freestyle)  {/* ← Edit subtitle */}
  </p>
</div>
```

---

## Editing the Home Page

### File Location: `src/Home.jsx`

### Change the Main Title

```jsx
<h1 className="text-4xl font-bold text-blue-900 mb-3">
  African Sharks Performance Dashboard   {/* ← Change main title */}
</h1>
<p className="text-gray-600 text-lg">
  Select a swim session to view detailed performance analytics  {/* ← Change subtitle */}
</p>
```

### Change Session Card Order

Sessions display in the order they appear in the `sessions` array. Move items up/down in the array to reorder:

```jsx
const sessions = [
  { /* This appears first */ },
  { /* This appears second */ },
  { /* This appears third */ },
  // etc.
];
```

### Remove the "Latest Session" Badge

Find the session and set `highlight: false`:

```jsx
{
  id: "24-12-2025",
  // ...
  highlight: false,  // Remove the cyan "Latest Session" badge
}
```

### Remove a Session from Home Page

Simply delete the entire object from the `sessions` array. The route will still work if someone has the direct URL, but it won't appear on the home page.

---

## Development & Deployment

### Local Development

```bash
# Start development server (auto-refreshes on changes)
npm start

# Opens at http://localhost:3000
```

### Build for Production

```bash
# Creates optimized build in /build folder
npm run build
```

### Deploy to Firebase

```bash
# Deploy the /build folder to Firebase Hosting
firebase deploy

# Or deploy only hosting (faster if you have other Firebase services)
firebase deploy --only hosting
```

### View Your Live Site

After deploying, your site is live at:
- **URL**: `https://afs-performance-data-dashboard.web.app`

---

## Common Tasks Quick Reference

### Task: Add a new swim session dashboard

1. Copy existing dashboard file → rename with date
2. Edit data, title, component name in new file
3. Add import + route in `App.js`
4. Add session card in `Home.jsx`
5. `npm run build && firebase deploy`

### Task: Change which session shows "Latest" badge

1. Open `Home.jsx`
2. Find current `highlight: true` → change to `false`
3. Find new latest session → set `highlight: true`

### Task: Update swimmer data in a dashboard

1. Open the dashboard file (e.g., `swimdash_24_12_2025.jsx`)
2. Find the `rawData` object
3. Edit times, strokes, or add new swimmers:
   ```jsx
   const rawData = {
     NewSwimmer: {
       times: [33.5, 34.2, 33.8, ...],
       strokes: [19, 20, 19, ...],
     },
     // ... existing swimmers
   };
   ```

### Task: Change the URL of a dashboard

1. Edit the route path in `App.js`:
   ```jsx
   <Route path="/dashboard/new-url-here" element={<MyDashboard />} />
   ```
2. Update the `route` property in `Home.jsx`:
   ```jsx
   { route: "/dashboard/new-url-here", ... }
   ```

### Task: Hide a dashboard from the home page (but keep it accessible)

1. Delete the session object from `Home.jsx` sessions array
2. Keep the route in `App.js` (direct URL still works)

### Task: Completely remove a dashboard

1. Delete the session from `Home.jsx` sessions array
2. Delete the `<Route>` line from `App.js`
3. Delete the import line from `App.js`
4. (Optional) Delete the dashboard file

---

## File Templates

### Minimal Dashboard Template

Save this as a starting point for new dashboards:

```jsx
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
// Add chart imports as needed from "recharts"

const NewDashboard = () => {
  const [activeTab, setActiveTab] = useState("team");
  const [selectedSwimmer, setSelectedSwimmer] = useState("SwimmerName");

  // Your swim data here
  const rawData = {
    SwimmerName: {
      times: [30.5, 31.2, 30.8],
      strokes: [18, 19, 18],
    },
  };

  const swimmers = Object.keys(rawData);

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
            African Sharks - Session Title
          </h1>
          <p className="text-gray-600">
            Date - Session Description
          </p>
        </div>

        {/* Your content here */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p>Dashboard content goes here</p>
        </div>
      </div>
    </div>
  );
};

export default NewDashboard;
```

---

## Troubleshooting

### "Page not found" after deployment

- Make sure `firebase.json` has the rewrite rule (it should already):
  ```json
  "rewrites": [{ "source": "**", "destination": "/index.html" }]
  ```

### Changes not appearing after deploy

- Clear browser cache or open in incognito
- Make sure you ran `npm run build` before `firebase deploy`

### Import errors

- Check that the file name matches exactly (case-sensitive)
- Check that the component name matches the export

### "Module not found" error

- Run `npm install` to ensure all dependencies are installed
- Check import path is correct (should start with `./` for local files)

---

## Questions?

This documentation covers the main workflows. As you add more features, you can expand this guide. The key things to remember:

1. **App.js** = URL routing (which URL shows which dashboard)
2. **Home.jsx** = What users see first (session cards)
3. **Dashboard files** = The actual content and analysis

Happy coding! 🏊‍♂️
