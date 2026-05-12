import { ArrowDownRight, ArrowUpRight, Calendar, ChevronDown, Clock, Globe, Monitor, Phone, TrendingUp, UserPlus } from 'lucide-react'
import React from 'react'

export default function page() {
  return (
        <div className="w-[80vw] max-w-screen-xl mx-auto px-4 py-8 space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Report</h2>
          <p className="text-gray-500">Real-time performance data for your news portal.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-sm shadow-sm">
            <Calendar size={16} className="mr-2" /> Last 30 Days <ChevronDown size={14} className="ml-2" />
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm shadow-sm">
            Export PDF
          </button>
        </div>
      </div>

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Avg. Reading Time', value: '4m 32s', change: '+14%', up: true, icon: <Clock className="text-blue-600" /> },
          { label: 'Bounce Rate', value: '38.4%', change: '-2%', up: true, icon: <TrendingUp className="text-purple-600" /> },
          { label: 'New Visitors', value: '24,500', change: '+18%', up: true, icon: <UserPlus className="text-green-600" /> },
          { label: 'Global Rank', value: '#1,204', change: '-5', up: false, icon: <Globe className="text-orange-600" /> },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-50 rounded-lg">{item.icon}</div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full flex items-center ${item.up ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {item.up ? <ArrowUpRight size={12} className="mr-1" /> : <ArrowDownRight size={12} className="mr-1" />}
                {item.change}
              </span>
            </div>
            <p className="text-sm text-gray-500 font-medium">{item.label}</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{item.value}</h3>
          </div>
        ))}
      </div>

      {/* Traffic Chart Simulation */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h4 className="font-bold text-gray-900">Traffic Overview</h4>
          <div className="flex space-x-4">
            <div className="flex items-center text-xs font-medium text-gray-500">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span> Views
            </div>
            <div className="flex items-center text-xs font-medium text-gray-500">
              <span className="w-3 h-3 bg-indigo-200 rounded-full mr-2"></span> Visitors
            </div>
          </div>
        </div>
        <div className="relative h-64 w-full flex items-end justify-between space-x-2 pb-6 px-2">
          {/* Mock Line Chart Using SVG and Tailwind bars for easy preview */}
          {[65, 45, 75, 55, 90, 80, 70, 85, 60, 95, 80, 100].map((height, i) => (
            <div key={i} className="flex-1 flex flex-col items-center group relative">
              <div 
                style={{ height: `${height}%` }} 
                className="w-full bg-blue-100 rounded-t-lg hover:bg-blue-500 transition-all duration-300 relative"
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {height}K
                </div>
              </div>
              <span className="absolute -bottom-6 text-[10px] font-bold text-gray-400">May {i + 1}</span>
            </div>
          ))}
          {/* X-Axis line */}
          <div className="absolute bottom-6 left-0 right-0 h-px bg-gray-100"></div>
        </div>
      </div>

      {/* Bottom Grid: Categories and Devices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Categories */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-6">Engagement by Category</h4>
          <div className="space-y-5">
            {[
              { name: 'Politics', color: 'bg-red-500', percent: 85, views: '450K' },
              { name: 'Tech & Science', color: 'bg-blue-500', percent: 72, views: '320K' },
              { name: 'Entertainment', color: 'bg-purple-500', percent: 64, views: '280K' },
              { name: 'Sports', color: 'bg-green-500', percent: 48, views: '210K' },
              { name: 'Health', color: 'bg-orange-500', percent: 35, views: '150K' },
            ].map((cat, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700">{cat.name}</span>
                  <span className="text-xs font-bold text-gray-500">{cat.views}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${cat.color}`} style={{ width: `${cat.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-8">Traffic Source & Device</h4>
          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-slate-50 rounded-2xl flex flex-col items-center text-center">
                <Monitor className="text-blue-600 mb-3" size={32} />
                <h5 className="text-xl font-bold">62%</h5>
                <p className="text-xs text-gray-500 font-medium">Desktop Users</p>
             </div>
             <div className="p-6 bg-slate-50 rounded-2xl flex flex-col items-center text-center">
                <Phone className="text-purple-600 mb-3" size={32} />
                <h5 className="text-xl font-bold">38%</h5>
                <p className="text-xs text-gray-500 font-medium">Mobile Users</p>
             </div>
          </div>
          <div className="mt-8 border-t border-gray-100 pt-6">
             <h5 className="text-sm font-bold text-gray-900 mb-4">Referral Sources</h5>
             <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Direct Search</span>
                <span className="text-sm font-bold">45%</span>
             </div>
             <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Social Media</span>
                <span className="text-sm font-bold">32%</span>
             </div>
             <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Email Marketing</span>
                <span className="text-sm font-bold">12%</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
