'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X, Search, Sun, Moon, Globe, TrendingUp } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/Providers/ThemeProvider';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = usePathname();
  const { isDark, toggleTheme } = useTheme();

  // Panag-monitor ti scroll para iti aesthetics (Scroll monitoring for aesthetics)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Latest', href: '#', active: true },
    { name: 'Politics', href: '#' },
    { name: 'Business', href: '#' },
    { name: 'Technology', href: '#' },
    { name: 'Science', href: '#' },
    { name: 'Health', href: '#' },
    { name: 'Opinion', href: '#' },
  ];

  if(location === '/login' || location === '/register' || location === '/dashboard') {
    return null; // Agsardeng ti panag-render no adda iti login wenno register a page
  }

  return (
    <div className={`${isDark ? 'bg-[#0f172a]' : 'bg-[#f8fafc]'} transition-colors duration-500 font-sans`}>
      
      {/* Baras iti ngato (Top Bar) */}
      <div className={`hidden md:flex transition-all duration-300 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-900 border-slate-800'} text-white py-2 px-6 justify-between items-center text-[11px] font-medium uppercase tracking-wider border-b`}>
        <div className="flex gap-6 items-center">
          <span className="flex items-center gap-1">
            <Globe size={12} className="text-indigo-400" />
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span className="flex items-center gap-1 opacity-80">
            <TrendingUp size={12} className="text-emerald-400" />
            Market Update: +1.24%
          </span>
        </div>
        <div className="flex gap-5 items-center">
          <button className="hover:text-indigo-400 transition-colors">E-Paper</button>
          <button className="hover:text-indigo-400 transition-colors">Newsletters</button>
          <div className="flex items-center gap-2 bg-rose-600/20 text-rose-500 px-2 py-0.5 rounded-full text-[10px] font-bold border border-rose-500/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            LIVE UPDATES
          </div>
        </div>
      </div>

      {/* Kangrunaan a Navbar (Main Navbar) */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? (isDark ? 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 shadow-2xl' : 'bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-lg') 
          : (isDark ? 'bg-zinc-950' : 'bg-white')
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-24">
            
            {/* Logo Section */}
            <div className="shrink-0 flex items-center group cursor-pointer">
              <div className="flex flex-col items-start">
                <span className={`text-3xl md:text-4xl font-serif font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  THE<span className="text-indigo-600">INSIGHT</span>
                </span>
                <div className="h-1 w-full bg-linear-to-r from-indigo-600 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-500 dark:text-zinc-500 mt-1">Premium Journalism</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-semibold tracking-wide transition-all duration-300 hover:text-indigo-600 group ${
                    link.active ? 'text-indigo-600' : (isDark ? 'text-zinc-400' : 'text-slate-600')
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 transform transition-transform duration-300 ${link.active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </a>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2.5 rounded-xl transition-all ${isDark ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-slate-100 text-slate-500'}`}
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              
              <button 
                onClick={toggleTheme}
                className={`p-2.5 rounded-xl transition-all ${isDark ? 'hover:bg-zinc-800 text-amber-400' : 'hover:bg-slate-100 text-slate-500'}`}
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button className={`hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm active:scale-95 ${
                isDark 
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/20' 
                  : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-200'
              }`}>
                Subscribe
              </button>

              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`p-2.5 rounded-xl transition-all ${isDark ? 'text-white hover:bg-zinc-800' : 'text-slate-900 hover:bg-slate-100'}`}
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Baras ti panagbirok (Search Bar) */}
        <div className={`absolute w-full border-b transition-all duration-300 overflow-hidden ${
          isSearchOpen ? 'max-h-24 opacity-100 py-4 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'
        } ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'}`}>
          <div className="max-w-4xl mx-auto px-4 flex items-center">
            <div className={`flex-1 flex items-center rounded-2xl px-6 py-3 ${isDark ? 'bg-zinc-800' : 'bg-slate-100'}`}>
              <Search size={18} className="text-slate-400 mr-3" />
              <input 
                type="text" 
                placeholder="Search headlines, topics, or authors..." 
                className="bg-transparent w-full focus:outline-none text-sm font-medium"
                autoFocus
              />
            </div>
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="ml-4 text-xs font-bold uppercase tracking-widest text-indigo-600"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-screen border-t' : 'max-h-0'
        } ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-100'}`}>
          <div className="px-6 pt-4 pb-12 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`block py-3 text-lg font-bold border-b transition-colors ${
                  isDark ? 'border-zinc-900 text-zinc-300 hover:text-indigo-400' : 'border-slate-50 text-slate-700 hover:text-indigo-600'
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-8 space-y-4">
              <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-600/20">Subscribe Now</button>
              <button className={`w-full py-4 rounded-2xl font-bold border transition-all ${
                isDarkMode ? 'border-zinc-800 text-white hover:bg-zinc-900' : 'border-slate-200 text-slate-900 hover:bg-slate-50'
              }`}>Sign In</button>
            </div>
          </div>
        </div>
      </nav>

    </div>
  );
};

export default Navbar;