import React, { useState } from 'react'
import { BusFront, CircleUserRound, X, Menu } from 'lucide-react'
import { useNavigate } from 'react-router'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <header className="w-full bg-gradient-to-r from-blue-900 via-blue-800 to-amber-600 shadow-lg backdrop-blur-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo Section */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-400 blur-md opacity-50 group-hover:opacity-70 transition-all"></div>
            <BusFront className="relative w-9 h-9 text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-amber-400 via-yellow-300 to-white bg-clip-text text-transparent tracking-wide drop-shadow-md group-hover:tracking-wider transition-all duration-300">
            SmartBus System
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-10 text-gray-200 font-medium">
          {["Home", "Routes", "About Us", "Queries"].map((item, i) => (
            <a
              key={i}
              href={`/${item === 'About Us' ? 'about' : item.replace(" ", "")}`}
              className="relative group transition-all duration-300"
            >
              <span className="group-hover:text-amber-400">{item}</span>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Icons (User + Menu) */}
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/login')} className="bg-gradient-to-r from-amber-400 to-yellow-500 p-2 rounded-full hover:scale-110 hover:shadow-lg transition-all duration-300">
            <CircleUserRound className="w-6 h-6 text-black" />
          </button>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="w-7 h-7 text-white" />
            ) : (
              <Menu className="w-7 h-7 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-gradient-to-b from-blue-800/90 to-amber-700/80 backdrop-blur-lg text-white border-t border-white/20 shadow-lg transition-all duration-500 ${
          isOpen ? "max-h-64 opacity-100 p-4" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <a href="/Home" className="block py-2 hover:text-amber-400 transition-all duration-300">Home</a>
        <a href="/Routes" className="block py-2 hover:text-amber-400 transition-all duration-300">Routes</a>
        <a href="/about" className="block py-2 hover:text-amber-400 transition-all duration-300">About Us</a>
        <a href="/Queries" className="block py-2 hover:text-amber-400 transition-all duration-300">Queries</a>
      </div>
    </header>
  )
}

export default Header
