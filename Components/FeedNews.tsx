import React from 'react'

export default function FeedNews() {
    return (
        <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
                <span className="inline-block px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest rounded">Global Crisis</span>
                <h1 className="text-4xl md:text-6xl font-serif font-black leading-[1.1] text-slate-900">
                    The Future of Decentralized Intelligence in Modern Governance
                </h1>
                <p className="text-xl leading-relaxed text-slate-600 font-light">
                    As systems evolve, the intersection of ethics and efficiency becomes the new frontier for global leadership.
                </p>
                <div className="flex items-center gap-4 pt-4">
                    <div className="w-12 h-12 rounded-full bg-linear-to-tr from-indigo-600 to-rose-400"></div>
                    <div>
                        <p className="text-sm font-bold text-slate-900">Alexander Thorne</p>
                        <p className="text-xs text-slate-500 uppercase tracking-tighter">Senior Investigative Journalist</p>
                    </div>
                </div>
            </div>
            <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl bg-slate-200">
                <div className="w-full h-full flex items-center justify-center text-slate-400 italic">
                    [High-Resolution Featured Visual]
                </div>
            </div>
        </div>
    )
}
