'use client';
import { useTheme } from 'next-themes';

export default function Page() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';


  return (
     
      <main className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Featured Article */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest rounded">Global Crisis</span>
              <h1 className={`text-4xl md:text-6xl font-serif font-black leading-[1.1] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                The Future of Decentralized Intelligence in Modern Governance
              </h1>
              <p className={`text-xl leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-slate-600 font-light'}`}>
                As systems evolve, the intersection of ethics and efficiency becomes the new frontier for global leadership.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <div className="w-12 h-12 rounded-full bg-linear-to-tr from-indigo-600 to-rose-400"></div>
                <div>
                  <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Alexander Thorne</p>
                  <p className="text-xs text-slate-500 uppercase tracking-tighter">Senior Investigative Journalist</p>
                </div>
              </div>
            </div>
            <div className={`aspect-video rounded-3xl overflow-hidden shadow-2xl ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-200'}`}>
              <div className="w-full h-full flex items-center justify-center text-slate-400 italic">
                [High-Resolution Featured Visual]
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-10">
            <section className="space-y-6">
              <h3 className={`text-xs font-black uppercase tracking-[0.2em] border-b pb-4 ${isDarkMode ? 'text-white border-zinc-800' : 'text-slate-900 border-slate-200'}`}>
                Must Read
              </h3>
              {[1, 2, 3].map(i => (
                <div key={i} className="group cursor-pointer space-y-2">
                  <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Business</p>
                  <h4 className={`text-lg font-bold leading-snug group-hover:text-indigo-600 transition-colors ${isDarkMode ? 'text-zinc-200' : 'text-slate-800'}`}>
                    Market shifts indicate a paradigm change in venture capital for 2026.
                  </h4>
                  <p className="text-xs text-slate-500">4 min read • Updated 2h ago</p>
                </div>
              ))}
            </section>

            {/* Newsletter Card */}
            <div className={`p-8 rounded-3xl shadow-xl ${isDarkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-indigo-50'}`}>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">The Morning Brief</h3>
              <p className="text-sm text-slate-600 dark:text-zinc-400 mb-6">Get the days most important stories delivered to your inbox.</p>
              <input 
                type="email" 
                placeholder="email@example.com" 
                className={`w-full px-4 py-3 rounded-xl text-sm mb-3 border focus:ring-2 focus:ring-indigo-600 focus:outline-none ${
                  isDarkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              />
              <button className="w-full bg-slate-900 dark:bg-indigo-600 text-white py-3 rounded-xl font-bold text-sm">Join 50k+ readers</button>
            </div>
          </div>

        </div>
      </main>
  )
}
