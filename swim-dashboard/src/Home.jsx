import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Users, Activity, ChevronRight } from "lucide-react";

const Home = () => {
  const sessions = [
    {
      id: "24-12-2025",
      route: "/dashboard/24-12-2025",
      title: "Wednesday Session",
      date: "Wednesday, December 24, 2025",
      type: "12 x 50m Freestyle",
      description: "Long endurance set with sprint analysis",
      swimmers: 18,
      highlight: true,
    },
    {
      id: "21-12-2025",
      route: "/dashboard/21-12-2025",
      title: "4x400m Freestyle",
      date: "Sunday, December 21, 2025",
      type: "Distance Freestyle",
      description: "Stroke efficiency and endurance analysis",
      swimmers: 11,
      highlight: false,
    },
    {
      id: "05-10-2025",
      route: "/dashboard/05-10-2025",
      title: "IM Analysis",
      date: "Sunday, October 5, 2025",
      type: "Individual Medley",
      description: "4 repetitions of IM with pace analysis",
      swimmers: null,
      highlight: false,
    },
    {
      id: "original",
      route: "/dashboard/original",
      title: "Start Techniques",
      date: "Generic Analysis",
      type: "Technique Focus",
      description: "Start techniques, turns, and dive variations",
      swimmers: null,
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-3">
            African Sharks Performance Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Select a swim session to view detailed performance analytics
          </p>
        </div>

        {/* Session Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {sessions.map((session) => (
            <Link
              key={session.id}
              to={session.route}
              className={`block bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden ${
                session.highlight ? "ring-2 ring-cyan-400" : ""
              }`}
            >
              {session.highlight && (
                <div className="bg-cyan-500 text-white text-sm font-semibold px-4 py-1 text-center">
                  Latest Session
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-bold text-blue-900 mb-2 flex items-center justify-between">
                  {session.title}
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </h2>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">{session.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Activity className="w-4 h-4 mr-2" />
                    <span className="text-sm">{session.type}</span>
                  </div>
                  {session.swimmers && (
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="text-sm">{session.swimmers} swimmers</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-500 text-sm">{session.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-cyan-200 text-sm">
          <p>African Sharks Swim Team - Performance Analytics</p>
          <p className="mt-2 text-cyan-300/70">Developed by Emmanuel-Paul</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
