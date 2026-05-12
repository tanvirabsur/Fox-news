"use client";
import { useState } from 'react';
import {
  Newspaper,  Search, Bell, TrendingUp, MessageSquare, Eye
} from 'lucide-react';
import Link from 'next/link';
import ArticleTable from '@/Components/ArticleTable';



const Dashboard = () => {

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Dashboard');

  // Mock data for the dashboard
  const stats = [
    { title: 'Total Views', value: '1.2M', icon: <Eye className="w-6 h-6" />, color: 'bg-indigo-600' },
    { title: 'Articles', value: '450', icon: <Newspaper className="w-6 h-6" />, color: 'bg-indigo-500' },
    { title: 'Comments', value: '2.8K', icon: <MessageSquare className="w-6 h-6" />, color: 'bg-indigo-400' },
    { title: 'Engagement', value: '+12%', icon: <TrendingUp className="w-6 h-6" />, color: 'bg-indigo-700' },
  ];





  return (

    <main className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
        <div className="relative w-96 max-w-full">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Search news, authors..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="h-8 w-px bg-gray-200 mx-2"></div>
          <Link
            href="/dashboard/add-news"
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded hover:bg-indigo-700 transition-colors"
          >
            Add News
          </Link>
        </div>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-indigo-50 to-white">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-600 mt-2">Welcome back, Admin. Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-md border border-indigo-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</h3>
                </div>
                <div className={`${stat.color} p-4 rounded-lg text-white shadow-md`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Two Column Layout for Articles and Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Articles Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md border border-indigo-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Newspaper className="text-indigo-600 w-5 h-5" />
                  Recent Articles
                </h3>
                <button className="text-indigo-600 hover:text-indigo-700 text-sm font-semibold transition-colors">
                  View All →
                </button>
              </div>
              <ArticleTable />
            </div>
          </div>

          {/* Summary Panel */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-md border border-indigo-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Avg. Views/Article</span>
                  <span className="font-bold text-indigo-600">2.7K</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{width: '68%'}}></div>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <span className="text-gray-600">Reader Growth</span>
                  <span className="font-bold text-indigo-600">+23%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <span className="text-gray-600">Content Quality</span>
                  <span className="font-bold text-indigo-600">9.2/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{width: '92%'}}></div>
                </div>
              </div>
            </div>

            {/* Activity Summary */}
            <div className="bg-white rounded-xl shadow-md border border-indigo-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Activity Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  <span className="text-gray-700">8 new articles published</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-gray-700">342 new comments</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                  <span className="text-gray-700">1.2K new followers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-700 rounded-full"></div>
                  <span className="text-gray-700">45 user registrations</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Dashboard;