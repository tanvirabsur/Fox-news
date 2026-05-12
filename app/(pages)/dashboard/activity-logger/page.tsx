"use client";
import React, { useState } from 'react';
import { Activity, Download, Filter, Search, Trash2, Eye, Edit, LogOut, Plus, Clock } from 'lucide-react';

interface ActivityLog {
  id: number;
  user: string;
  action: string;
  description: string;
  category: 'create' | 'update' | 'delete' | 'login' | 'download' | 'view';
  timestamp: string;
  ip: string;
  status: 'success' | 'failed';
}

export default function ActivityLogger() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedLogs, setSelectedLogs] = useState<number[]>([]);

  const activityLogs: ActivityLog[] = [
    {
      id: 1,
      user: 'admin@news.com',
      action: 'Created Article',
      description: 'Published "Breaking News: Market Update"',
      category: 'create',
      timestamp: '2026-05-12 14:32:15',
      ip: '192.168.1.100',
      status: 'success',
    },
    {
      id: 2,
      user: 'editor@news.com',
      action: 'Updated Article',
      description: 'Modified "Technology Trends 2026"',
      category: 'update',
      timestamp: '2026-05-12 13:45:22',
      ip: '192.168.1.101',
      status: 'success',
    },
    {
      id: 3,
      user: 'admin@news.com',
      action: 'Deleted Article',
      description: 'Removed outdated article "Old News"',
      category: 'delete',
      timestamp: '2026-05-12 12:20:10',
      ip: '192.168.1.100',
      status: 'success',
    },
    {
      id: 4,
      user: 'author@news.com',
      action: 'Login',
      description: 'User logged in successfully',
      category: 'login',
      timestamp: '2026-05-12 11:55:30',
      ip: '192.168.1.105',
      status: 'success',
    },
    {
      id: 5,
      user: 'editor@news.com',
      action: 'Downloaded Report',
      description: 'Downloaded weekly analytics report',
      category: 'download',
      timestamp: '2026-05-12 10:30:45',
      ip: '192.168.1.101',
      status: 'success',
    },
    {
      id: 6,
      user: 'user@news.com',
      action: 'Failed Login',
      description: 'Invalid credentials attempted',
      category: 'login',
      timestamp: '2026-05-12 09:15:20',
      ip: '192.168.1.110',
      status: 'failed',
    },
    {
      id: 7,
      user: 'admin@news.com',
      action: 'Viewed Article',
      description: 'Accessed article details page',
      category: 'view',
      timestamp: '2026-05-12 08:45:10',
      ip: '192.168.1.100',
      status: 'success',
    },
    {
      id: 8,
      user: 'moderator@news.com',
      action: 'Updated Article',
      description: 'Moderated article content',
      category: 'update',
      timestamp: '2026-05-12 07:22:55',
      ip: '192.168.1.108',
      status: 'success',
    },
  ];

  const filteredLogs = activityLogs.filter((log) => {
    const matchesSearch = [log.user, log.action, log.description, log.ip].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesCategory = filterCategory === 'all' || log.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || log.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getCategoryIcon = (category: string) => {
    const icons = {
      create: <Plus size={18} className="text-green-600" />,
      update: <Edit size={18} className="text-blue-600" />,
      delete: <Trash2 size={18} className="text-red-600" />,
      login: <LogOut size={18} className="text-indigo-600" />,
      download: <Download size={18} className="text-purple-600" />,
      view: <Eye size={18} className="text-gray-600" />,
    };
    return icons[category as keyof typeof icons];
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      create: 'bg-green-100 text-green-800',
      update: 'bg-blue-100 text-blue-800',
      delete: 'bg-red-100 text-red-800',
      login: 'bg-indigo-100 text-indigo-800',
      download: 'bg-purple-100 text-purple-800',
      view: 'bg-gray-100 text-gray-800',
    };
    return colors[category as keyof typeof colors];
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg text-white">
            <Activity size={24} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Activity Logger</h1>
        </div>
        <p className="text-gray-600">Monitor and audit all admin and user activities in real-time</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md border border-indigo-100 p-6">
          <p className="text-gray-600 text-sm font-medium mb-2">Total Activities</p>
          <p className="text-3xl font-bold text-gray-900">{activityLogs.length}</p>
          <p className="text-xs text-gray-500 mt-2">Last 24 hours</p>
        </div>
        <div className="bg-white rounded-xl shadow-md border border-green-100 p-6">
          <p className="text-gray-600 text-sm font-medium mb-2">Successful</p>
          <p className="text-3xl font-bold text-green-600">{activityLogs.filter((l) => l.status === 'success').length}</p>
          <p className="text-xs text-gray-500 mt-2">100% success rate</p>
        </div>
        <div className="bg-white rounded-xl shadow-md border border-red-100 p-6">
          <p className="text-gray-600 text-sm font-medium mb-2">Failed</p>
          <p className="text-3xl font-bold text-red-600">{activityLogs.filter((l) => l.status === 'failed').length}</p>
          <p className="text-xs text-gray-500 mt-2">0% alert rate</p>
        </div>
        <div className="bg-white rounded-xl shadow-md border border-purple-100 p-6">
          <p className="text-gray-600 text-sm font-medium mb-2">Unique Users</p>
          <p className="text-3xl font-bold text-purple-600">{new Set(activityLogs.map((l) => l.user)).size}</p>
          <p className="text-xs text-gray-500 mt-2">Active today</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl shadow-md border border-indigo-100 p-6 space-y-4">
        <div className="flex gap-2 items-center mb-4">
          <Filter size={20} className="text-indigo-600" />
          <h3 className="text-lg font-bold text-gray-900">Search & Filter</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by user, action, IP..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-colors dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-colors dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            <option value="all">All Categories</option>
            <option value="create">Create</option>
            <option value="update">Update</option>
            <option value="delete">Delete</option>
            <option value="login">Login</option>
            <option value="download">Download</option>
            <option value="view">View</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-colors dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Activity Table */}
      <div className="bg-white rounded-xl shadow-md border border-indigo-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Time</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">IP Address</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-2">
                      <Clock size={16} className="text-gray-400" />
                      {log.timestamp}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-gray-900">{log.user}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(log.category)}
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${getCategoryColor(log.category)}`}>
                          {log.action}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{log.description}</td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-500">{log.ip}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          log.status === 'success'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {log.status === 'success' ? '✓ Success' : '✗ Failed'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-500">
                    No activities found matching your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Section */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl shadow-md border border-indigo-200 p-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Export Activity Logs</h3>
          <p className="text-sm text-gray-600">Download activity logs for audit and compliance purposes</p>
        </div>
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold flex items-center gap-2 flex-shrink-0">
          <Download size={18} />
          Export as CSV
        </button>
      </div>
    </div>
  );
}
