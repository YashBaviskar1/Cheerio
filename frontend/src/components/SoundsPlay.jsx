import React, { useState, useEffect } from "react";

export default function SoundsPlay({ selectedSound }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Toggle Play/Pause
  const togglePlay = () => setIsPlaying(!isPlaying);

  // Update elapsed time when playing
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex items-center justify-center h-screen bg-slate-900 text-white">
      {/* Glassmorphic Card UI */}
      <div className="bg-slate-800 bg-opacity-40 backdrop-blur-lg shadow-lg rounded-xl p-8 w-96 text-center">
        <h2 className="text-3xl font-bold mb-2">{selectedSound?.name || "White Noise"}</h2>
        <p className="text-sm text-gray-300 mb-6">{selectedSound?.description || "Relaxing ambient sound."}</p>

        {/* Time Elapsed */}
        <p className="text-lg font-medium text-gray-200 mb-4">⏳ {elapsedTime}s</p>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition"
        >
          {isPlaying ? "Pause ⏸️" : "Play ▶️"}
        </button>

        {/* Animated Ball Indicator */}
        <div className="relative w-full h-10 mt-6 flex justify-center items-center">
        <div className={`w-4 h-4 bg-white rounded-full absolute ${isPlaying ? "animate-bounce-horizontal" : ""}`} />
        </div>
      </div>
    </div>
  );
}



// <div className="relative w-32 h-10 mt-6 overflow-hidden">
// <div className={`w-4 h-4 bg-white rounded-full absolute ${isPlaying ? "animate-bounce-horizontal" : ""}`} />
// </div>