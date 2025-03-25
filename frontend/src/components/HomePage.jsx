import React, { useState, useEffect } from "react";

export default function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      fetch(`http://127.0.0.1:8000/api/user/${storedUser.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.full_name) {
            setUser({ email: storedUser.email, full_name: data.full_name });
          }
        })
        .catch((error) => console.error("Error fetching user details:", error));
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-800 text-white p-6">
      {/* Hero Section */}
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-4">
          Your Personal Mental Health Companion
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Get personalized support with our AI-powered chatbot, designed to provide guidance and emotional support tailored to your needs.
        </p>

        {user ? (
          <h2 className="text-2xl font-semibold">Hello, {user.full_name} 👋</h2>
        ) : (
          <div className="flex space-x-4 justify-center">
            <a href="/login">
              <button className="px-10 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition ">
                Login
              </button>
            </a>
            <a href="/signup">
              <button className="px-10 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition">
                Sign Up
              </button>
            </a>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="mt-16 w-full max-w-6xl px-6">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Explore Our Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Chat Feature */}
          <div className="bg-slate-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 p-3 rounded-full">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 10h.01M12 10h.01M16 10h.01M21 12.75A9 9 0 1112 3a9 9 0 019 9.75z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold">AI-Powered Chat</h3>
            </div>
            <p className="text-gray-300 mt-4">
              Our chatbot provides personalized support, understanding your emotions and offering meaningful responses tailored to your mental health needs.
            </p>
          </div>

          {/* Sound Feature */}
          <div className="bg-slate-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <div className="flex items-center space-x-4">
              <div className="bg-green-500 p-3 rounded-full">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 19V6l-2 2m0 0l-2-2m2 2v10m6 0v-4a2 2 0 012-2h4a2 2 0 012 2v4m-2-4v4m0 0h-4"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Relaxing Sounds</h3>
            </div>
            <p className="text-gray-300 mt-4">
              Listen to calming sounds and guided meditations designed to help reduce stress, improve focus, and enhance relaxation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
