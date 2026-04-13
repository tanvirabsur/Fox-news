"use client"
import React from 'react'

export default function FeedSlider() {
    return (
        <div className="lg:col-span-4 space-y-10">
            <section className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] border-b pb-4 text-slate-900 border-slate-200">
                    Must Read
                </h3>
                {[1, 2, 3].map(i => (
                    <div key={i} className="group cursor-pointer space-y-2">
                        <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Business</p>
                        <h4 className="text-lg font-bold leading-snug group-hover:text-indigo-600 transition-colors text-slate-800">
                            Market shifts indicate a paradigm change in venture capital for 2026.
                        </h4>
                        <p className="text-xs text-slate-500">4 min read • Updated 2h ago</p>
                    </div>
                ))}
            </section>

            {/* Newsletter Card */}
            <div className="p-8 rounded-3xl shadow-xl bg-indigo-50">
                <h3 className="text-xl font-bold text-slate-900 mb-2">The Morning Brief</h3>
                <p className="text-sm text-slate-600 mb-6">Get the days most important stories delivered to your inbox.</p>
                <input
                    type="email"
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 rounded-xl text-sm mb-3 border border-slate-200 focus:ring-2 focus:ring-indigo-600 focus:outline-none bg-white text-slate-900"
                />
                <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm">Join 50k+ readers</button>
            </div>
        </div>
    )
}
