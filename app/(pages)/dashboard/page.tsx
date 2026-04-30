"use client";
import { useState } from 'react';
import {
  Newspaper,  Search, Bell, TrendingUp, MessageSquare, Eye
} from 'lucide-react';
import ArticleTable from '@/Components/ArticleTable';



const Dashboard = () => {

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Dashboard');

  // Mock data for the dashboard
  const stats = [
    { title: 'Total Views', value: '1.2M', icon: <Eye className="w-6 h-6" />, color: 'bg-blue-500' },
    { title: 'Articles', value: '450', icon: <Newspaper className="w-6 h-6" />, color: 'bg-green-500' },
    { title: 'Comments', value: '2.8K', icon: <MessageSquare className="w-6 h-6" />, color: 'bg-purple-500' },
    { title: 'Engagement', value: '+12%', icon: <TrendingUp className="w-6 h-6" />, color: 'bg-orange-500' },
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
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="h-8 w-px bg-gray-200 mx-2"></div>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition-colors">
            Add News
          </button>
        </div>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-500">Welcome back, Admin. Here is what happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div className={`${stat.color} p-3 rounded-lg text-white`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>


        <ArticleTable />


      </div>
    </main>
  );
};

export default Dashboard;