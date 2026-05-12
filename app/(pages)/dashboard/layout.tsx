"use client";
import { BarChart3, LayoutDashboard, Menu, Newspaper, PlusCircle, Settings, Users, X, Zap, Activity, Gauge } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function layout({ children }: { children: React.ReactNode }) {

    const pathname = usePathname();
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
        { name: 'All News', icon: <Newspaper size={20} />, path: '/dashboard/all-news' },
        { name: 'Add News', icon: <PlusCircle size={20} />, path: '/dashboard/add-news' },
        { name: 'AI News Generate', icon: <Zap size={20} />, path: '/dashboard/ai-news-generate' },
        { name: 'Analytics', icon: <BarChart3 size={20} />, path: '/dashboard/analytics' },
        { name: 'Activity Log', icon: <Activity size={20} />, path: '/dashboard/activity-logger' },
        { name: 'Performance', icon: <Gauge size={20} />, path: '/dashboard/performance' },
        { name: 'User Management', icon: <Users size={20} />, path: '/dashboard/user-management' },
        { name: 'Settings', icon: <Settings size={20} />, path: '/dashboard/settings' },
    ];

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 text-gray-800 font-sans">
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
        bg-indigo-950 text-white transition-all duration-300 ease-in-out flex flex-col z-30
      `}>
                <div className="p-6 flex items-center justify-between">
                    {isSidebarOpen ? (
                        <h1 className="text-xl font-bold tracking-wider text-indigo-400">NEWS PORTAL</h1>
                    ) : (
                        <div className="bg-indigo-600 w-8 h-8 rounded flex items-center justify-center font-bold">N</div>
                    )}
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-indigo-900 rounded">
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav className="flex-1 px-4 py-4">
                    <ul className="space-y-2">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.path || (item.path === '/dashboard' && pathname === '/dashboard');
                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.path}
                                        className={`
                    w-full flex items-center p-3 rounded-lg transition-colors
                    ${isActive ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-900 text-gray-400 hover:text-white'}
                  `}
                                    >
                                        <span className="mr-3">{item.icon}</span>
                                        {isSidebarOpen && <span className="font-medium text-sm">{item.name}</span>}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="p-4 border-t border-indigo-800">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-400" />
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
            <main className="flex-1 min-w-0 overflow-hidden">
                <div className="h-full overflow-y-auto overflow-x-hidden">
                    {children}
                </div>
            </main>

        </div>
    )
}
