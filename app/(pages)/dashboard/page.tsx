"use client";
import  { useState } from 'react';
import { 
  LayoutDashboard, 
  Newspaper, 
  PlusCircle, 
  BarChart3, 
  Users, 
  Settings, 
  Search, 
  Bell, 
  Menu, 
  X, 
  TrendingUp,
  MessageSquare,
  Eye,
  MoreVertical
} from 'lucide-react';

// Types for our News Data
interface Article {
  id: string;
  title: string;
  category: string;
  author: string;
  status: 'Published' | 'Draft' | 'Pending';
  views: number;
  date: string;
}

const dashboard = () => {

  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('Dashboard');

  // Mock data for the dashboard
  const stats = [
    { title: 'Total Views', value: '1.2M', icon: <Eye className="w-6 h-6" />, color: 'bg-blue-500' },
    { title: 'Articles', value: '450', icon: <Newspaper className="w-6 h-6" />, color: 'bg-green-500' },
    { title: 'Comments', value: '2.8K', icon: <MessageSquare className="w-6 h-6" />, color: 'bg-purple-500' },
    { title: 'Engagement', value: '+12%', icon: <TrendingUp className="w-6 h-6" />, color: 'bg-orange-500' },
  ];

  const recentArticles: Article[] = [
    { id: '1', title: 'Budget 2024: Ki thakche amader jonno?', category: 'Economy', author: 'Arif Ahmed', status: 'Published', views: 12500, date: '2024-05-10' },
    { id: '2', title: 'T20 World Cup er prostuti', category: 'Sports', author: 'Sakib Khan', status: 'Pending', views: 0, date: '2024-05-12' },
    { id: '3', title: 'AI er bhabishyat o Bangladesh', category: 'Tech', author: 'Nadia Islam', status: 'Published', views: 8900, date: '2024-05-11' },
    { id: '4', title: 'Dhakar rasta-ghater obostha', category: 'Local', author: 'Rahim Uddin', status: 'Draft', views: 0, date: '2024-05-12' },
  ];

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'All News', icon: <Newspaper size={20} /> },
    { name: 'Add News', icon: <PlusCircle size={20} /> },
    { name: 'Analytics', icon: <BarChart3 size={20} /> },
    { name: 'User Management', icon: <Users size={20} /> },
    { name: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Sidebar Overlay for Mobile */}
      {!isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(true)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        ${isSidebarOpen ? 'w-64' : 'w-20'} 
        bg-slate-900 text-white transition-all duration-300 ease-in-out flex flex-col z-30
      `}>
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen ? (
            <h1 className="text-xl font-bold tracking-wider text-blue-400">NEWS PORTAL</h1>
          ) : (
            <div className="bg-blue-400 w-8 h-8 rounded flex items-center justify-center font-bold">N</div>
          )}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-slate-800 rounded">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 py-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => setActiveTab(item.name)}
                  className={`
                    w-full flex items-center p-3 rounded-lg transition-colors
                    ${activeTab === item.name ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-gray-400 hover:text-white'}
                  `}
                >
                  <span className="mr-3">{item.icon}</span>
                  {isSidebarOpen && <span className="font-medium text-sm">{item.name}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-teal-400" />
            {isSidebarOpen && (
              <div className="ml-3 overflow-hidden">
                <p className="text-xs font-semibold">Admin User</p>
                <p className="text-[10px] text-gray-500 truncate">admin@news.com</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
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
            <p className="text-gray-500">Welcome back, Admin. Here is what's happening today.</p>
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

          {/* Table Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Recent Articles</h3>
              <button className="text-blue-600 text-sm font-semibold hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Author</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Views</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentArticles.map((article) => (
                    <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-gray-900 line-clamp-1">{article.title}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase">
                          {article.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{article.author}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`
                          px-2 py-1 rounded-full text-[11px] font-semibold
                          ${article.status === 'Published' ? 'bg-green-100 text-green-700' : 
                            article.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                            'bg-gray-100 text-gray-700'}
                        `}>
                          {article.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-mono">{article.views.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{article.date}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default dashboard;