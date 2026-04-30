"use client";
import { BarChart3, LayoutDashboard, Menu, Newspaper, PlusCircle, Settings, Users, X } from 'lucide-react';
import { useState } from 'react';

export default function layout({ children }: { children: React.ReactNode }) {

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('Dashboard');
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

            {children}

        </div>
    )
}
