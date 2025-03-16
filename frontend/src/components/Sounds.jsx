import React, { useState } from "react";

// Sound Data (Example Sounds)
const soundData = [
  {
    id: 1,
    name: "Rainfall",
    category: "Nature",
    description: "Calming rain sounds to help you relax and focus.",
    icon: "🌧️",
  },
  {
    id: 2,
    name: "Forest Ambience",
    category: "Nature",
    description: "Peaceful sounds of the forest with birds chirping.",
    icon: "🌲",
  },
  {
    id: 3,
    name: "Ocean Waves",
    category: "Water",
    description: "Soothing ocean waves for deep relaxation.",
    icon: "🌊",
  },
  {
    id: 4,
    name: "Crackling Fireplace",
    category: "Cozy",
    description: "Warm fireplace sounds to create a cozy atmosphere.",
    icon: "🔥",
  },
  {
    id: 5,
    name: "Wind Chimes",
    category: "Meditation",
    description: "Gentle wind chimes to help with mindfulness and meditation.",
    icon: "🎐",
  },
  {
    id: 6,
    name: "White Noise",
    category: "Meditation",
    description: "white noise help with mindfulness and meditation.",
    icon: "W",
  },
];

// Categories for Filtering
const categories = ["All", "Nature", "Water", "Cozy", "Meditation"];

export default function Sounds() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter sounds based on selected category
  const filteredSounds =
    selectedCategory === "All"
      ? soundData
      : soundData.filter((sound) => sound.category === selectedCategory);

  return (
    <div className="flex h-screen bg-slate-800 text-white">
      {/* Sidebar for Categories */}
      <aside className="w-1/4 bg-slate-900 p-6">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <ul>
          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer py-2 px-4 rounded-md hover:bg-slate-700 transition ${
                selectedCategory === category ? "bg-blue-500" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </aside>

      {/* Sound Cards Section */}
      <main className="flex-1 p-6">
        <h2 className="text-3xl font-semibold mb-6">Relaxing Sounds</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSounds.map((sound) => (
            <div
              key={sound.id}
              className="bg-slate-900 p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="text-5xl">{sound.icon}</div>
              <h3 className="text-xl font-semibold mt-2">{sound.name}</h3>
              <p className="text-gray-300">{sound.description}</p>
              <span className="text-sm text-gray-400">Category: {sound.category}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
