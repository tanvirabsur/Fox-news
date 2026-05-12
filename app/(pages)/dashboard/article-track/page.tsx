'use client';

import { useState, useEffect, useMemo } from 'react';
import { Check, X, User, Clock, FileText, Search, Filter, MoreVertical, Download } from 'lucide-react';

interface TrackEntry {
  id: string;
  articleId: string;
  articleTitle: string;
  action: 'approve' | 'reject';
  actionBy: string;
  timestamp: string;
  comment: string;
  previousStatus: string;
  newStatus: string;
}

export default function ArticleTrackPage() {
  const [tracks, setTracks] = useState<TrackEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState<'all' | 'approve' | 'reject'>('all');
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'all'>('all');

  useEffect(() => {
    // Load tracks from localStorage
    const storedTracks = JSON.parse(localStorage.getItem('articleTracks') || '[]');
    setTracks(storedTracks);
  }, []);

  const filteredTracks = useMemo(() => {
    let filtered = tracks.filter(track => {
      const matchesSearch = 
        track.articleTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        track.actionBy.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesAction = filterAction === 'all' || track.action === filterAction;
      
      if (dateRange !== 'all') {
        const trackDate = new Date(track.timestamp);
        const now = new Date();
        const daysDiff = (now.getTime() - trackDate.getTime()) / (1000 * 60 * 60 * 24);
        
        if (dateRange === 'today' && daysDiff > 1) return false;
        if (dateRange === 'week' && daysDiff > 7) return false;
        if (dateRange === 'month' && daysDiff > 30) return false;
      }
      
      return matchesSearch && matchesAction;
    });

    return filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [tracks, searchTerm, filterAction, dateRange]);

  const stats = {
    total: tracks.length,
    approved: tracks.filter(t => t.action === 'approve').length,
    rejected: tracks.filter(t => t.action === 'reject').length,
    today: tracks.filter(t => {
      const trackDate = new Date(t.timestamp);
      const now = new Date();
      return trackDate.toDateString() === now.toDateString();
    }).length
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return formatDate(dateString);
  };

  const exportToCSV = () => {
    const csv = [
      ['Article Title', 'Action', 'Action By', 'Timestamp', 'Previous Status', 'New Status', 'Comment'].join(','),
      ...filteredTracks.map(t => [
        `"${t.articleTitle}"`,
        t.action,
        t.actionBy,
        formatDate(t.timestamp),
        t.previousStatus,
        t.newStatus,
        `"${t.comment}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `article-track-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Article Tracking</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Monitor all article approvals, rejections and status changes</p>
        </div>
        <button 
          onClick={exportToCSV}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Actions</div>
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{stats.total}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">Approved</div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{stats.approved}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">Rejected</div>
          <div className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">{stats.rejected}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">Today</div>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">{stats.today}</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by article title or reviewer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
          >
            <option value="all">All Actions</option>
            <option value="approve">Approvals</option>
            <option value="reject">Rejections</option>
          </select>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

      {/* Tracking Timeline */}
      <div className="space-y-3">
        {filteredTracks.length > 0 ? (
          filteredTracks.map((track) => (
            <div key={track.id} className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 transition">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  track.action === 'approve' 
                    ? 'bg-green-100 dark:bg-green-900' 
                    : 'bg-red-100 dark:bg-red-900'
                }`}>
                  {track.action === 'approve' ? (
                    <Check className="w-6 h-6 text-green-600 dark:text-green-300" />
                  ) : (
                    <X className="w-6 h-6 text-red-600 dark:text-red-300" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Article {track.action === 'approve' ? 'Approved' : 'Rejected'}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{track.articleTitle}</p>
                    </div>
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                      track.action === 'approve'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                        : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {track.action === 'approve' ? 'Approved' : 'Rejected'}
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <User className="w-4 h-4" />
                      {track.actionBy}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      {formatDate(track.timestamp)}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      {getTimeAgo(track.timestamp)}
                    </div>
                  </div>

                  {/* Status Change */}
                  <div className="flex items-center gap-2 mt-3 text-sm">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-slate-600 text-gray-700 dark:text-gray-300 rounded">
                      {track.previousStatus}
                    </span>
                    <span className="text-gray-400 dark:text-gray-500">→</span>
                    <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded">
                      {track.newStatus}
                    </span>
                  </div>

                  {/* Comment */}
                  {track.comment && (
                    <div className="mt-3 p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Note:</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{track.comment}</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <button className="flex-shrink-0 p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition">
                  <MoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
            <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-gray-400">No tracking records yet</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Approve or reject articles to see the history</p>
          </div>
        )}
      </div>
    </div>
  );
}
