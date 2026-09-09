import React from 'react'
import talkIcon from '../assets/talk-icon.svg'
import heartIcon from '../assets/heart-icon.svg'
import sparkleIcon from '../assets/sparkle-icon.svg'
import shieldIcon from '../assets/shield-icon.svg'
import plantAccent from '../assets/plant-accent.svg'

const FEATURES = [
  {
    id: 1,
    title: 'Talk Freely',
    description: "Share what's on your mind, no judgment, ever.",
    icon: talkIcon,
  },
  {
    id: 2,
    title: 'Feel Understood',
    description: 'Get empathetic, personalized responses.',
    icon: heartIcon,
  },
  {
    id: 3,
    title: 'Build Better Habits',
    description: 'Track your mood and discover what helps you feel better.',
    icon: sparkleIcon,
  },
  {
    id: 4,
    title: 'Your Privacy Matters',
    description: 'Your feelings, your data, your space.',
    icon: shieldIcon,
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="w-full relative pt-12 pb-24 bg-gradient-to-b from-[#FAF7F2] via-[#F6F0E7] to-[#FAF7F2] overflow-hidden">
      {/* Gentle Wave Divider SVG at top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0 opacity-60 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12 text-[#FAF7F2] fill-current">
          <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,40 L1200,0 L0,0 Z"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Features 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 pt-6">
          {FEATURES.map((feature) => (
            <div 
              key={feature.id} 
              className="flex flex-col items-center text-center group p-6 rounded-2xl transition-all duration-300 hover:bg-white/60 hover:shadow-soft"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 mb-5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <img src={feature.icon} alt={feature.title} className="w-full h-full object-contain" />
              </div>

              {/* Title */}
              <h3 className="font-heading font-semibold text-xl text-[#2D3934] mb-2 group-hover:text-[#4A6D60] transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[#61726B] leading-relaxed max-w-xs">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Plant Accent (Bottom Right) */}
      <div className="absolute bottom-0 right-0 pointer-events-none select-none opacity-90 hidden sm:block">
        <img src={plantAccent} alt="Botanical vine accent" className="w-48 sm:w-56 h-auto" />
      </div>
    </section>
  )
}
