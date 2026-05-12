'use client';

import { useState, useMemo } from 'react';
import { Calendar, Clock, AlertCircle, CheckCircle, Pause, Play, Trash2, Eye, Edit, MoreVertical, Search, Filter } from 'lucide-react';

interface ScheduledArticle {
  id: string;
  title: string;
  author: string;
  category: string;
  scheduledTime: string;
  status: 'scheduled' | 'paused' | 'published' | 'failed';
  views: number;
  engagement: number;
  image: string;
}

const mockScheduled: ScheduledArticle[] = [
  {
    id: '1',
    title: 'Morning News Roundup',
    author: 'News Desk',
    category: 'Top Stories',
    scheduledTime: '2026-05-13T06:00:00',
    status: 'scheduled',
    views: 0,
    engagement: 0,
    image: '📰'
  },
  {
    id: '2',
    title: 'Market Opening Report',
    author: 'Financial Analyst',
    category: 'Business',
    scheduledTime: '2026-05-13T09:30:00',
    status: 'scheduled',
    views: 0,
    engagement: 0,
    image: '📈'
  },
  {
    id: '3',
    title: 'Midday Update',
    author: 'News Desk',
    category: 'Top Stories',
    scheduledTime: '2026-05-12T12:00:00',
    status: 'published',
    views: 4521,
    engagement: 342,
    image: '📻'
  },
  {
    id: '4',
    title: 'Evening News Special',
    author: 'Senior Reporter',
    category: 'Top Stories',
    scheduledTime: '2026-05-12T18:00:00',
    status: 'published',
    views: 8234,
    engagement: 567,
    image: '🎥'
  },
  {
    id: '5',
    title: 'Tech Trends Weekly',
    author: 'Tech Correspondent',
    category: 'Technology',
    scheduledTime: '2026-05-13T14:00:00',
    status: 'paused',
    views: 0,
    engagement: 0,
    image: '💻'
  }
];

export default function PublishingSchedulePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | ScheduledArticle['status']>('all');
  const [sortBy, setSortBy] = useState<'time' | 'views' | 'engagement'>('time');

  const filteredAndSorted = useMemo(() => {
    let filtered = mockScheduled.filter(article => {
      const matchesSearch = 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || article.status === filterStatus;
      return matchesSearch && matchesStatus;
    });

    if (sortBy === 'time') {
      filtered.sort((a, b) => new Date(a.scheduledTime).getTime() - new Date(b.scheduledTime).getTime());
    } else if (sortBy === 'views') {
      filtered.sort((a, b) => b.views - a.views);
    } else if (sortBy === 'engagement') {
      filtered.sort((a, b) => b.engagement - a.engagement);
    }

    return filtered;
  }, [searchTerm, filterStatus, sortBy]);

  const statusConfig = {
    'scheduled': { label: 'Scheduled', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300', icon: Calendar },
    'paused': { label: 'Paused', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300', icon: Pause },
    'published': { label: 'Published', color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300', icon: CheckCircle },
    'failed': { label: 'Failed', color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300', icon: AlertCircle }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 0) {
      return 'Published';
    } else if (diffHours === 0) {
      return 'In 1 hour';
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const scheduledCount = mockScheduled.filter(a => a.status === 'scheduled').length;
  const publishedCount = mockScheduled.filter(a => a.status === 'published').length;
  const totalViews = mockScheduled.reduce((sum, a) => sum + a.views, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Publishing Schedule</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage scheduled articles and publication timeline</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">Scheduled</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{scheduledCount}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">Published</div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{publishedCount}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Views</div>
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{(totalViews / 1000).toFixed(1)}K</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">Avg Engagement</div>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">
            {(mockScheduled.reduce((sum, a) => sum + a.engagement, 0) / mockScheduled.length).toFixed(0)}
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="published">Published</option>
            <option value="paused">Paused</option>
            <option value="failed">Failed</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
          >
            <option value="time">Sort by Time</option>
            <option value="views">Sort by Views</option>
            <option value="engagement">Sort by Engagement</option>
          </select>
        </div>
      </div>

      {/* Schedule Timeline */}
      <div className="space-y-3">
        {filteredAndSorted.map((article) => {
          const StatusIcon = statusConfig[article.status].icon;
          return (
            <div key={article.id} className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 transition">
              <div className="flex items-start gap-4">
                {/* Image */}
                <div className="text-4xl flex-shrink-0">{article.image}</div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{article.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">by {article.author}</p>
                    </div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${statusConfig[article.status].color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {statusConfig[article.status].label}
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">{article.category}</span>
                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                      <Calendar className="w-4 h-4" />
                      {formatDateTime(article.scheduledTime)}
                    </div>
                    {article.status === 'published' && (
                      <>
                        <span className="text-gray-600 dark:text-gray-400">Views: <strong>{article.views.toLocaleString()}</strong></span>
                        <span className="text-gray-600 dark:text-gray-400">Engagement: <strong>{article.engagement}</strong></span>
                      </>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                  {article.status === 'scheduled' && (
                    <>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition" title="Pause">
                        <Pause className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition" title="Edit">
                        <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                    </>
                  )}
                  {article.status === 'paused' && (
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition" title="Resume">
                      <Play className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                  )}
                  {article.status === 'published' && (
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition" title="View">
                      <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                  )}
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition" title="More">
                    <MoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
