import React, { useState, useEffect } from "react";

export default function NavBar() {
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

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user from localStorage
    setUser(null); // Update state
    window.location.reload(); // Refresh page to reflect logout
  };

  return (
    <nav className="bg-slate-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
        <div className="text-xl font-bold">Cheerio</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          {user ? (
            <>
              <li className="cursor-pointer font-semibold hover:text-gray-300 transition">
                Hello, {user.full_name} 👋
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="cursor-pointer hover:text-gray-300 transition">
                <a href="/login">Login</a>
              </li>
              <li className="cursor-pointer hover:text-gray-300 transition">
                <a href="/signup">Signup</a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
