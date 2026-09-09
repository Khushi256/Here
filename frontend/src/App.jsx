import React, { useState } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import Footer from './components/Footer'
import ChatPage from './pages/Chat/ChatPage'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  if (currentPage === 'chat') {
    return <ChatPage onNavigateHome={() => setCurrentPage('home')} />
  }

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-[#D5E5DC] selection:text-[#2A3B34]">
      <div>
        <Navbar onStartTalking={() => setCurrentPage('chat')} />
        <main>
          <HeroSection onStartTalking={() => setCurrentPage('chat')} />
          <FeaturesSection />
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default App
