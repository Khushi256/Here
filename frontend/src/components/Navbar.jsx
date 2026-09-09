import React from 'react'
import logo from '../assets/logo.svg'

export default function Navbar({ onStartTalking }) {
  return (
    <header className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-6 flex items-center justify-between">
      {/* Brand Logo & Name */}
      <a href="#" onClick={(e) => { e.preventDefault(); onStartTalking?.(); }} className="flex items-center gap-2.5 group">
        <img src={logo} alt="Here Logo" className="w-10 h-10 transition-transform group-hover:rotate-6" />
        <span className="font-brand font-bold text-3xl text-[#46665B] tracking-tight">Here</span>
      </a>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-10 text-base font-medium">
        <a href="#home" className="text-[#3B544B] font-semibold relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#567A6F] after:rounded-full">
          Home
        </a>
        <a href="#about" className="text-[#64746D] hover:text-[#3B544B] transition-colors">
          About
        </a>
        <a href="#features" className="text-[#64746D] hover:text-[#3B544B] transition-colors">
          Features
        </a>
        <a href="#contact" className="text-[#64746D] hover:text-[#3B544B] transition-colors">
          Contact
        </a>
      </nav>

      {/* Start Talking Button */}
      <button 
        type="button" 
        onClick={onStartTalking}
        className="btn-primary px-6 py-2.5 rounded-full text-sm sm:text-base font-medium flex items-center gap-2 shadow-sm cursor-pointer"
      >
        <span>Start Talking</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.33334 8H12.6667" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 3.33334L12.6667 8L8 12.6667" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </header>
  )
}
