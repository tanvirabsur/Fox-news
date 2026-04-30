'use client';

import { usePathname } from "next/navigation";

const Footer = () => {
  const location = usePathname(); 

    if(location === '/login' || location === '/register' || location === '/dashboard') {
      return null;
    }
  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-700">
      <div className="max-w-7xl mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="space-y-4">
            <p className="text-2xl font-serif font-black tracking-tight text-slate-900">THE<span className="text-indigo-600">INSIGHT</span></p>
            <p className="max-w-lg text-sm leading-7 text-slate-600">
              Trusted journalism and smart analysis on the stories shaping business, politics, technology, and culture.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900 mb-4">Explore</p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#" className="transition-colors hover:text-indigo-600">Latest</a></li>
              <li><a href="#" className="transition-colors hover:text-indigo-600">Politics</a></li>
              <li><a href="#" className="transition-colors hover:text-indigo-600">Business</a></li>
              <li><a href="#" className="transition-colors hover:text-indigo-600">Technology</a></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900 mb-4">Stay informed</p>
            <p className="text-sm text-slate-600 mb-4">Subscribe for daily briefs, exclusive stories, and premium insights.</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
              />
              <button className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <span>© 2026 The Insight. All rights reserved.</span>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="transition-colors hover:text-indigo-600">Privacy</a>
            <a href="#" className="transition-colors hover:text-indigo-600">Terms</a>
            <a href="#" className="transition-colors hover:text-indigo-600">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
