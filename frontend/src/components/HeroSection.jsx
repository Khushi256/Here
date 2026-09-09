import React, { useState } from 'react'
import heroIllustration from '../assets/hero-illustration.svg'
import avatarCompanion from '../assets/avatar-companion.svg'

const MOOD_RESPONSES = {
  Happy: "I'm so glad to hear that! ✨ What brought a smile to your face today?",
  Anxious: "Take a slow, gentle breath. You are safe here, and we can take things one step at a time.",
  Sad: "I'm wrapping you in a quiet hug. It's completely okay to feel this way — I'm here to listen.",
  Overwhelmed: "Pause for a moment. You don't have to figure it all out right now. Let's unburden together."
}

export default function HeroSection({ onStartTalking }) {
  const [selectedMood, setSelectedMood] = useState(null)

  return (
    <section id="home" className="w-full max-w-7xl mx-auto px-6 sm:px-12 pt-8 pb-16 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
      {/* Left Column Text & CTA */}
      <div className="lg:col-span-6 space-y-6 lg:pr-4">
        {/* Eyebrow Label */}
        <p className="text-xs sm:text-sm font-semibold tracking-widest text-[#72857B] uppercase">
          Your Safe Space, Always
        </p>

        {/* Main Headline */}
        <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#2B3933] leading-[1.15]">
          <span className="text-[#4D7567] underline decoration-[#A9C7BB]/40 decoration-wavy decoration-2">Here</span> for your <br className="hidden sm:inline" />
          every feeling
        </h1>

        {/* Subtitle / Paragraph */}
        <p className="text-base sm:text-lg text-[#5A6D65] leading-relaxed max-w-xl">
          An AI-powered emotional support companion designed to listen, understand and support you — judgment-free, always.
        </p>

        {/* Primary CTA Button */}
        <div className="pt-2">
          <button 
            type="button" 
            onClick={onStartTalking}
            className="btn-primary px-8 py-4 rounded-full text-base font-semibold flex items-center gap-3 shadow-md group cursor-pointer"
          >
            <span>Start Your Journey</span>
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 18 18" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="M3.75 9H14.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 3.75L14.25 9L9 14.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Right Column Illustration & Interactive Prompt */}
      <div className="lg:col-span-6 relative flex justify-center lg:justify-end items-center">
        {/* Illustration Container */}
        <div className="relative w-full max-w-xl">
          <img 
            src={heroIllustration} 
            alt="Warm peaceful emotional support illustration" 
            className="w-full h-auto object-contain drop-shadow-sm select-none" 
          />

          {/* Floating Interactive Chat Card */}
          <div className="absolute top-4 left-0 sm:left-4 sm:top-12 bg-white/95 backdrop-blur-md p-5 sm:p-6 rounded-3xl shadow-card border border-[#EDE5DA] max-w-[290px] sm:max-w-[330px] z-10 transition-all duration-300 hover:shadow-xl">
            {/* Header / Avatar + Prompt text */}
            <div className="flex items-start gap-3.5 mb-4">
              <img src={avatarCompanion} alt="Companion Avatar" className="w-10 h-10 shrink-0 rounded-full" />
              <div className="text-xs sm:text-sm text-[#384841] leading-snug">
                {selectedMood ? (
                  <div className="space-y-1">
                    <p className="font-semibold text-[#48685C]">Companion:</p>
                    <p className="text-[#3C4A44] italic">{MOOD_RESPONSES[selectedMood]}</p>
                    <button 
                      onClick={() => setSelectedMood(null)}
                      className="text-[11px] text-[#70857B] underline font-medium hover:text-[#48685C] pt-1 block cursor-pointer"
                    >
                      ← Pick another mood
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="font-semibold text-[#2D3934]">Hi there,</p>
                    <p>I'm here for you.</p>
                    <p className="font-medium text-[#4D675E] pt-0.5">How are you feeling today?</p>
                  </>
                )}
              </div>
            </div>

            {/* Mood Options Buttons Grid */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button 
                type="button" 
                onClick={() => setSelectedMood('Happy')}
                className={`py-2 px-3 rounded-full text-xs font-semibold text-center transition-all cursor-pointer ${
                  selectedMood === 'Happy' 
                    ? 'bg-[#A8CEB7] text-[#1F3D2C] ring-2 ring-[#709A80]' 
                    : 'bg-[#D6E5DC] text-[#3D5B4B] hover:bg-[#C8DAD0]'
                }`}
              >
                Happy
              </button>

              <button 
                type="button" 
                onClick={() => setSelectedMood('Anxious')}
                className={`py-2 px-3 rounded-full text-xs font-semibold text-center transition-all cursor-pointer ${
                  selectedMood === 'Anxious' 
                    ? 'bg-[#CBC4E0] text-[#33274D] ring-2 ring-[#8D7FA8]' 
                    : 'bg-[#E3DFED] text-[#4F4468] hover:bg-[#D5D0E3]'
                }`}
              >
                Anxious
              </button>

              <button 
                type="button" 
                onClick={() => setSelectedMood('Sad')}
                className={`py-2 px-3 rounded-full text-xs font-semibold text-center transition-all cursor-pointer ${
                  selectedMood === 'Sad' 
                    ? 'bg-[#F4BDAB] text-[#542B1F] ring-2 ring-[#D98770]' 
                    : 'bg-[#FADCD1] text-[#7B4D3F] hover:bg-[#F2CCC0]'
                }`}
              >
                Sad
              </button>

              <button 
                type="button" 
                onClick={() => setSelectedMood('Overwhelmed')}
                className={`py-2 px-3 rounded-full text-xs font-semibold text-center transition-all cursor-pointer ${
                  selectedMood === 'Overwhelmed' 
                    ? 'bg-[#E8D4C0] text-[#4A3727] ring-2 ring-[#B59679]' 
                    : 'bg-[#F4E8DD] text-[#6E5845] hover:bg-[#EBDBCF]'
                }`}
              >
                Overwhelmed
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
