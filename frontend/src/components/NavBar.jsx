import React, { useState } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
        <div className="text-xl font-bold">Cheerio</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li className="cursor-pointer hover:text-gray-300 transition">Login</li>
          <li className="cursor-pointer hover:text-gray-300 transition">Signup</li>
          {/* <li className="cursor-pointer hover:text-gray-300 transition">Sounds</li>
          <li className="cursor-pointer hover:text-gray-300 transition">Chat</li> */}
        </ul>

      </div>

    </nav>
  );
}
