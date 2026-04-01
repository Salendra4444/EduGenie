import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="flex justify-between items-center px-8 md:px-16 h-18 bg-[#0b0a1f]/95 border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 group">
        <img
          src="/images/logo2.png"
          alt="EduGenie Logo"
          className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />

        <span className="text-xl md:text-2xl font-bold tracking-tight text-white leading-none">
          Edu
          <span className="ml-0.5 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            Genie
          </span>
        </span>
      </Link>

      {/* Navigation */}
      <nav className="hidden md:flex items-center gap-7">
        <Link to="/" className="text-sm font-medium text-slate-400 hover:text-white transition">
          Home
        </Link>
        <Link to="/study" className="text-sm font-medium text-slate-400 hover:text-white transition">
          Study
        </Link>
        <Link to="/notes" className="text-sm font-medium text-slate-400 hover:text-white transition">
          My Notes
        </Link>
        <Link to="/about" className="text-sm font-medium text-slate-400 hover:text-white transition">
          About Us
        </Link>
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Link
          to="/login"
          className="text-sm font-medium text-slate-400 hover:text-white transition"
        >
          Sign In
        </Link>

        <Link
          to="/study"
          className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-5 py-1.5 rounded-full font-semibold transition shadow-sm"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}

export default Header;