import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 py-6 text-center">
      <p className="text-lg font-semibold">Cheerio</p>
      <p className="text-sm mt-2">Helping you prioritize your mental well-being.</p>
      <div className="flex justify-center space-x-6 mt-4">
        <a href="#" className="hover:text-white transition">Privacy Policy</a>
        <a href="#" className="hover:text-white transition">Terms of Service</a>
        <a href="#" className="hover:text-white transition">Contact</a>
      </div>
      <p className="text-xs mt-4">&copy; {new Date().getFullYear()} Cheerio. All rights reserved.</p>
    </footer>
  );
}
