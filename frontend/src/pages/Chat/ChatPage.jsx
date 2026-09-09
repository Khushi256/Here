import React, { useState, useRef, useEffect } from 'react'
import logo from '../../assets/logo.svg'
import avatarCompanion from '../../assets/avatar-companion.svg'
import sidebarDecor from '../../assets/sidebar-decor.svg'
import quoteCardDecor from '../../assets/quote-card-decor.svg'

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'ai',
    text: "Hi there, Khushi 💚\nI'm really glad you're here. How are you feeling today? You can share anything — no judgment, just a safe space.",
    time: '10:24 AM'
  },
  {
    id: 2,
    sender: 'user',
    text: "I've been feeling really overwhelmed lately... just a lot on my mind.",
    time: '10:26 AM'
  },
  {
    id: 3,
    sender: 'ai',
    text: "I'm sorry you're feeling this way. 💚\nIt sounds like a lot to carry. Would you like to tell me more about what's been on your mind? I'm here, and you don't have to go through it alone.",
    time: '10:26 AM'
  },
  {
    id: 4,
    sender: 'user',
    text: "It's just everything... studies, family, and I'm also feeling a bit lonely these days.",
    time: '10:28 AM'
  },
  {
    id: 5,
    sender: 'ai',
    text: "That sounds really heavy, Khushi. 🌿\nIt's completely okay to feel this way. Would you like to tell me more about what's been bothering you — one thing at a time, or all of it?",
    time: '10:28 AM'
  }
]

const AI_RESPONSES = {
  anxious: "Take a gentle, deep breath with me. Breathe in for 4 seconds, hold, and let it out slowly. You are safe here, and we can take everything one small step at a time. What is creating the most anxiety right now?",
  sad: "I'm wrapping you in a quiet, warm hug. It's completely valid to feel sad, and you don't need to hide it. I'm right here listening whenever you want to express anything.",
  motivation: "Remember how far you've already come, even on days when it felt hard. Be gentle with yourself today — even small progress is something to celebrate! ✨ What's one little thing we can focus on together?",
  talk: "I'd love to talk! Tell me about your day, a thought on your mind, or anything you'd like to vent about. I'm all ears.",
  default: "Thank you for sharing that with me. Your feelings are completely valid, and I'm right here with you. Take your time, and tell me whatever feels comfortable."
}

export default function ChatPage({ onNavigateHome }) {
  const [activeTab, setActiveTab] = useState('chat')
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [themeDark, setThemeDark] = useState(false)
  const chatEndRef = useRef(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSendMessage = (textToSend = inputText, responseType = 'default') => {
    const text = textToSend.trim()
    if (!text) return

    const now = new Date()
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text,
      time: timeStr
    }

    setMessages((prev) => [...prev, userMsg])
    if (textToSend === inputText) setInputText('')
    setIsTyping(true)

    setTimeout(() => {
      let aiText = AI_RESPONSES[responseType] || AI_RESPONSES.default
      if (text.toLowerCase().includes('anxious')) aiText = AI_RESPONSES.anxious
      else if (text.toLowerCase().includes('sad')) aiText = AI_RESPONSES.sad
      else if (text.toLowerCase().includes('motivation')) aiText = AI_RESPONSES.motivation

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages((prev) => [...prev, aiMsg])
      setIsTyping(false)
    }, 1200)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className={`min-h-screen w-full flex bg-[#FBF8F3] font-sans text-[#2B3933] ${themeDark ? 'dark bg-[#1A2320] text-[#E4EDE8]' : ''}`}>
      
      {/* ================= 1. LEFT SIDEBAR ================= */}
      <aside className="w-64 shrink-0 bg-[#F4F0E7] dark:bg-[#222E29] border-r border-[#E8E1D5] dark:border-[#2C3B35] flex flex-col justify-between p-6 select-none relative overflow-hidden">
        <div>
          {/* Brand Header */}
          <button 
            onClick={onNavigateHome}
            className="flex items-center gap-3 mb-10 group cursor-pointer text-left w-full"
          >
            <img src={logo} alt="Here Logo" className="w-9 h-9 transition-transform group-hover:rotate-6" />
            <span className="font-brand font-bold text-3xl text-[#46665B] dark:text-[#8BB3A4] tracking-tight">Here</span>
          </button>

          {/* Navigation Menu */}
          <nav className="space-y-1.5 font-medium">
            <button
              onClick={() => setActiveTab('chat')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm transition-all cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-[#E5EFE9] dark:bg-[#2F443C] text-[#3D5B4F] dark:text-[#A7D1C1] font-semibold shadow-xs'
                  : 'text-[#61736B] dark:text-[#8F9E97] hover:bg-[#EAE4DA] dark:hover:bg-[#283832]'
              }`}
            >
              {/* Chat Bubble Icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span>Chat</span>
            </button>

            <button
              onClick={() => setActiveTab('journal')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm transition-all cursor-pointer ${
                activeTab === 'journal'
                  ? 'bg-[#E5EFE9] dark:bg-[#2F443C] text-[#3D5B4F] dark:text-[#A7D1C1] font-semibold'
                  : 'text-[#61736B] dark:text-[#8F9E97] hover:bg-[#EAE4DA] dark:hover:bg-[#283832]'
              }`}
            >
              {/* Book Icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              <span>Journal</span>
            </button>

            <button
              onClick={() => setActiveTab('mood')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm transition-all cursor-pointer ${
                activeTab === 'mood'
                  ? 'bg-[#E5EFE9] dark:bg-[#2F443C] text-[#3D5B4F] dark:text-[#A7D1C1] font-semibold'
                  : 'text-[#61736B] dark:text-[#8F9E97] hover:bg-[#EAE4DA] dark:hover:bg-[#283832]'
              }`}
            >
              {/* Smiley Icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                <line x1="9" y1="9" x2="9.01" y2="9"/>
                <line x1="15" y1="9" x2="15.01" y2="9"/>
              </svg>
              <span>Mood Tracker</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-[#E5EFE9] dark:bg-[#2F443C] text-[#3D5B4F] dark:text-[#A7D1C1] font-semibold'
                  : 'text-[#61736B] dark:text-[#8F9E97] hover:bg-[#EAE4DA] dark:hover:bg-[#283832]'
              }`}
            >
              {/* Gear Icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Bottom Decorative Illustration */}
        <div className="pt-6 relative -mx-6 -mb-6 pointer-events-none">
          <img src={sidebarDecor} alt="Organic watercolor decorative leaf" className="w-full h-auto opacity-90" />
        </div>
      </aside>

      {/* ================= 2. MAIN CENTER CHAT STREAM ================= */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#FAF7F2] dark:bg-[#1A2320]">
        
        {/* Header Bar */}
        <header className="h-16 px-8 border-b border-[#EDE7DC] dark:border-[#2C3B35] flex items-center justify-between bg-[#FAF7F2]/90 dark:bg-[#1A2320]/90 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3.5">
            <img src={avatarCompanion} alt="Here Companion Avatar" className="w-10 h-10 rounded-full shrink-0" />
            <div>
              <h2 className="font-bold text-base text-[#2B3933] dark:text-[#E2EBE6] leading-tight">Here</h2>
              <p className="text-xs text-[#6B7E75] dark:text-[#8E9F97]">Your safe space, always</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setThemeDark(!themeDark)}
              className="p-2.5 rounded-full text-[#5E7369] dark:text-[#9EC4B5] hover:bg-[#EAE4DA] dark:hover:bg-[#293A33] transition-colors cursor-pointer"
              title="Toggle theme"
            >
              {themeDark ? (
                /* Moon Icon */
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              ) : (
                /* Sun Icon */
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              )}
            </button>

            {/* Profile Avatar Icon */}
            <div className="w-9 h-9 rounded-full bg-[#E5E0D5] dark:bg-[#32453D] flex items-center justify-center text-[#556960] dark:text-[#A8C8BC] font-semibold text-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
          </div>
        </header>

        {/* Message Stream Scroll Area */}
        <div className="flex-1 overflow-y-auto px-6 md:px-12 py-8 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className="space-y-1">
              {msg.sender === 'ai' ? (
                /* AI Message Bubble */
                <div className="flex items-start gap-3 max-w-xl">
                  <img src={avatarCompanion} alt="AI" className="w-9 h-9 rounded-full shrink-0 mt-0.5" />
                  <div>
                    <div className="bg-[#EBF2ED] dark:bg-[#283B33] text-[#2C3B34] dark:text-[#E0EBE5] px-5 py-4 rounded-3xl rounded-tl-sm text-sm sm:text-[15px] leading-relaxed shadow-xs whitespace-pre-line border border-[#E0E9E3] dark:border-[#334A40]">
                      {msg.text}
                    </div>
                    <span className="text-[11px] text-[#8C9E95] dark:text-[#7A8E85] pl-2 pt-1 block">
                      {msg.time}
                    </span>
                  </div>
                </div>
              ) : (
                /* User Message Bubble */
                <div className="flex items-start justify-end gap-3 max-w-xl ml-auto">
                  <div className="text-right">
                    <div className="bg-[#EFE7F5] dark:bg-[#3D314A] text-[#342744] dark:text-[#F0E6F7] px-5 py-3.5 rounded-3xl rounded-tr-sm text-sm sm:text-[15px] leading-relaxed shadow-xs inline-block text-left border border-[#E5DBED] dark:border-[#4B3C5B]">
                      {msg.text}
                    </div>
                    <span className="text-[11px] text-[#8C9E95] dark:text-[#7A8E85] pr-2 pt-1 block">
                      {msg.time}
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#E5DDF0] dark:bg-[#4E3F5E] flex items-center justify-center text-[#58446E] dark:text-[#D5C2E8] shrink-0 mt-0.5">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-3">
              <img src={avatarCompanion} alt="AI" className="w-9 h-9 rounded-full shrink-0" />
              <div className="bg-[#EBF2ED] dark:bg-[#283B33] px-5 py-3.5 rounded-3xl rounded-tl-sm flex items-center gap-1.5 border border-[#E0E9E3] dark:border-[#334A40]">
                <span className="w-2 h-2 rounded-full bg-[#628577] animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-[#628577] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-[#628577] animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar Area */}
        <div className="p-6 md:px-12 bg-[#FAF7F2]/90 dark:bg-[#1A2320]/90 shrink-0">
          <div className="max-w-4xl mx-auto bg-white dark:bg-[#24332D] rounded-full p-2 pl-6 pr-3 shadow-md border border-[#ECE5DA] dark:border-[#2F423B] flex items-center gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 bg-transparent text-sm sm:text-base text-[#2B3933] dark:text-[#E2EBE6] placeholder-[#8A9C94] dark:placeholder-[#6C8077] focus:outline-none"
            />

            {/* Icon Actions */}
            <div className="flex items-center gap-1.5">
              {/* Emoji Icon */}
              <button 
                onClick={() => setInputText((prev) => prev + ' 💚')}
                className="p-2 text-[#788B82] hover:text-[#456357] dark:text-[#8E9F97] dark:hover:text-[#A8D1C2] transition-colors cursor-pointer"
                title="Add emoji"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                  <line x1="9" y1="9" x2="9.01" y2="9"/>
                  <line x1="15" y1="9" x2="15.01" y2="9"/>
                </svg>
              </button>

              {/* Attachment Icon */}
              <button 
                className="p-2 text-[#788B82] hover:text-[#456357] dark:text-[#8E9F97] dark:hover:text-[#A8D1C2] transition-colors cursor-pointer"
                title="Attach file"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                </svg>
              </button>

              {/* Send Button */}
              <button
                onClick={() => handleSendMessage()}
                className="w-10 h-10 rounded-full bg-[#527869] hover:bg-[#436457] text-white flex items-center justify-center transition-all shadow-sm cursor-pointer active:scale-95 ml-1"
                title="Send message"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="translate-x-0.5">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ================= 3. RIGHT SIDEBAR WIDGETS ================= */}
      <aside className="w-80 shrink-0 bg-[#F4F0E7] dark:bg-[#222E29] border-l border-[#E8E1D5] dark:border-[#2C3B35] p-6 hidden lg:flex flex-col space-y-6 overflow-y-auto select-none">
        
        {/* Top Quote Card Widget */}
        <div className="rounded-2xl overflow-hidden shadow-xs border border-[#E5DFD4] dark:border-[#2F423B]">
          <img src={quoteCardDecor} alt="It's okay to feel what you feel" className="w-full h-auto object-cover" />
        </div>

        {/* Quick Support Section */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#687D74] dark:text-[#8EA39A] mb-3">
            Quick Support
          </h3>
          <div className="space-y-2.5">
            {/* Pill 1: Anxious */}
            <button
              onClick={() => handleSendMessage("I'm feeling anxious", 'anxious')}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#E8F1EC] hover:bg-[#DFECE6] dark:bg-[#283A33] dark:hover:bg-[#30453D] text-[#2D4D40] dark:text-[#A7D3C3] transition-all cursor-pointer group text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-base">🌿</span>
                <span className="text-xs sm:text-sm font-medium">I'm feeling anxious</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1 opacity-70">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>

            {/* Pill 2: Sad */}
            <button
              onClick={() => handleSendMessage("I'm feeling sad", 'sad')}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#EFE9F5] hover:bg-[#E6DDF0] dark:bg-[#342A42] dark:hover:bg-[#3D314E] text-[#3D2C4D] dark:text-[#D4C4E8] transition-all cursor-pointer group text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-base">💜</span>
                <span className="text-xs sm:text-sm font-medium">I'm feeling sad</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1 opacity-70">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>

            {/* Pill 3: Motivation */}
            <button
              onClick={() => handleSendMessage("I need motivation", 'motivation')}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#FBF0EB] hover:bg-[#F6E4DC] dark:bg-[#3D2F2A] dark:hover:bg-[#4A3933] text-[#54382D] dark:text-[#F3CDBF] transition-all cursor-pointer group text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-base">🔆</span>
                <span className="text-xs sm:text-sm font-medium">I need motivation</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1 opacity-70">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>

            {/* Pill 4: Talk */}
            <button
              onClick={() => handleSendMessage("I just want to talk", 'talk')}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#EFEFEF] hover:bg-[#E4E4E4] dark:bg-[#2C3733] dark:hover:bg-[#34423D] text-[#3B423F] dark:text-[#C5D6CF] transition-all cursor-pointer group text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-base">💬</span>
                <span className="text-xs sm:text-sm font-medium">I just want to talk</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1 opacity-70">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Recent Conversations Section */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#687D74] dark:text-[#8EA39A] mb-3">
            Recent Conversations
          </h3>
          <div className="space-y-2.5">
            {/* Conversation Item 1 */}
            <button className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#24332D] border border-[#EAE3D7] dark:border-[#2F423B] hover:border-[#D5CBC0] transition-all cursor-pointer group text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E5EFE9] dark:bg-[#2E4239] flex items-center justify-center text-[#426658] dark:text-[#9ECBBA] text-sm">
                  🌿
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#2C3B34] dark:text-[#E0EBE5]">Feeling Overwhelmed</h4>
                  <p className="text-[11px] text-[#80948A] dark:text-[#7C9086]">Today, 10:24 AM</p>
                </div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:translate-x-0.5 transition-transform">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>

            {/* Conversation Item 2 */}
            <button className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#24332D] border border-[#EAE3D7] dark:border-[#2F423B] hover:border-[#D5CBC0] transition-all cursor-pointer group text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#EFE9F5] dark:bg-[#3B2D4A] flex items-center justify-center text-[#5C4573] dark:text-[#CBB5E3] text-sm">
                  💜
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#2C3B34] dark:text-[#E0EBE5]">Just Talking</h4>
                  <p className="text-[11px] text-[#80948A] dark:text-[#7C9086]">Yesterday, 8:12 PM</p>
                </div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:translate-x-0.5 transition-transform">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>

            {/* Conversation Item 3 */}
            <button className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#24332D] border border-[#EAE3D7] dark:border-[#2F423B] hover:border-[#D5CBC0] transition-all cursor-pointer group text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FBF0EB] dark:bg-[#45342E] flex items-center justify-center text-[#735348] dark:text-[#E8BDAD] text-sm">
                  🔆
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#2C3B34] dark:text-[#E0EBE5]">Mood Check-in</h4>
                  <p className="text-[11px] text-[#80948A] dark:text-[#7C9086]">Aug 25, 2025</p>
                </div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:translate-x-0.5 transition-transform">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        </div>
      </aside>

    </div>
  )
}
