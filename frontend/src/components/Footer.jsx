import React from 'react'
import logo from '../assets/logo.svg'

export default function Footer() {
  return (
    <footer className="w-full bg-[#FAF7F2] border-t border-[#EDE5DA] py-8 text-center text-xs text-[#708279]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Here" className="w-6 h-6 opacity-90" />
          <span className="font-brand font-bold text-base text-[#46665B]">Here</span>
          <span className="text-[#9BB0A5]">|</span>
          <span>Your safe space, always.</span>
        </div>

        <p>© {new Date().getFullYear()} Here Companion Inc. All rights reserved.</p>
      </div>
    </footer>
  )
}
