'use client';

import { useState, useMemo } from 'react';
import { Image, Video, Music, FileText, Upload, Check, X, Clock, AlertCircle, MoreVertical, Search, Filter, Download, Trash2, Eye } from 'lucide-react';

interface MediaAsset {
  id: string;
  filename: string;
  type: 'image' | 'video' | 'audio' | 'document';
  size: number;
  uploadedDate: string;
  status: 'processing' | 'ready' | 'failed' | 'archived';
  uploadedBy: string;
  dimensions?: string;
  duration?: string;
  tags: string[];
}

const mockAssets: MediaAsset[] = [
  {
    id: '1',
    filename: 'breaking-news-cover.jpg',
    type: 'image',
    size: 2.4,
    uploadedDate: '2026-05-12T14:30:00',
    status: 'ready',
    uploadedBy: 'John Doe',
    dimensions: '1920x1080',
    tags: ['breaking', 'featured']
  },
  {
    id: '2',
    filename: 'interview-segment.mp4',
    type: 'video',
    size: 145.8,
    uploadedDate: '2026-05-12T13:15:00',
    status: 'processing',
    uploadedBy: 'Sarah Johnson',
    duration: '5:32',
    tags: ['interview', 'politics']
  },
  {
    id: '3',
    filename: 'market-data-chart.png',
    type: 'image',
    size: 1.2,
    uploadedDate: '2026-05-12T11:45:00',
    status: 'ready',
    uploadedBy: 'Mike Chen',
    dimensions: '1280x720',
    tags: ['business', 'data']
  },
  {
    id: '4',
    filename: 'podcast-episode-47.mp3',
    type: 'audio',
    size: 34.5,
    uploadedDate: '2026-05-12T10:00:00',
    status: 'ready',
    uploadedBy: 'Emma Davis',
    duration: '42:15',
    tags: ['podcast', 'analysis']
  },
  {
    id: '5',
    filename: 'technical-report.pdf',
    type: 'document',
    size: 5.8,
    uploadedDate: '2026-05-11T16:20:00',
    status: 'failed',
    uploadedBy: 'Lisa Anderson',
    tags: ['report', 'tech']
  },
  {
    id: '6',
    filename: 'live-event-stream.mp4',
    type: 'video',
    size: 256.3,
    uploadedDate: '2026-05-11T12:00:00',
    status: 'ready',
    uploadedBy: 'John Doe',
    duration: '1:15:30',
    tags: ['live', 'event', 'featured']
  }
];

export default function MediaAssetsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | MediaAsset['type']>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | MediaAsset['status']>('all');

  const filteredAssets = useMemo(() => {
    return mockAssets.filter(asset => {
      const matchesSearch = 
        asset.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesType = filterType === 'all' || asset.type === filterType;
      const matchesStatus = filterStatus === 'all' || asset.status === filterStatus;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchTerm, filterType, filterStatus]);

  const typeConfig = {
    'image': { icon: Image, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900' },
    'video': { icon: Video, color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900' },
    'audio': { icon: Music, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900' },
    'document': { icon: FileText, color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900' }
  };

  const statusConfig = {
    'processing': { label: 'Processing', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300', icon: Clock },
    'ready': { label: 'Ready', color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300', icon: Check },
    'failed': { label: 'Failed', color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300', icon: X },
    'archived': { label: 'Archived', color: 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300', icon: FileText }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const formatSize = (sizeInMB: number) => {
    if (sizeInMB > 1000) {
      return (sizeInMB / 1024).toFixed(1) + ' GB';
    }
    return sizeInMB.toFixed(1) + ' MB';
  };

  const stats = {
    total: mockAssets.length,
    processing: mockAssets.filter(a => a.status === 'processing').length,
    ready: mockAssets.filter(a => a.status === 'ready').length,
    failed: mockAssets.filter(a => a.status === 'failed').length,
    totalSize: mockAssets.reduce((sum, a) => sum + a.size, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Media Assets</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage images, videos, and other media files</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition">
          <Upload className="w-4 h-4" />
          Upload Media
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-indigo-100 dark:border-indigo-900">
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Assets</div>
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{stats.total}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-indigo-100 dark:border-slate-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">Processing</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{stats.processing}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-indigo-100 dark:border-slate-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">Ready</div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{stats.ready}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-indigo-100 dark:border-slate-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">Failed</div>
          <div className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">{stats.failed}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-indigo-100 dark:border-slate-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Size</div>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">{formatSize(stats.totalSize)}</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-indigo-100 dark:border-indigo-900 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by filename or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
          >
            <option value="all">All Types</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="audio">Audio</option>
            <option value="document">Documents</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
          >
            <option value="all">All Status</option>
            <option value="processing">Processing</option>
            <option value="ready">Ready</option>
            <option value="failed">Failed</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssets.map((asset) => {
          const TypeIcon = typeConfig[asset.type].icon;
          const StatusIcon = statusConfig[asset.status].icon;
          return (
            <div key={asset.id} className="bg-white dark:bg-slate-800 rounded-lg border border-indigo-100 dark:border-indigo-900 overflow-hidden hover:bg-indigo-50 dark:hover:bg-slate-700 transition">
              {/* Card Header with Type and Status */}
              <div className={`${typeConfig[asset.type].bg} p-4 flex items-start justify-between`}>
                <TypeIcon className={`w-6 h-6 ${typeConfig[asset.type].color}`} />
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig[asset.status].color}`}>
                  <StatusIcon className="w-3 h-3" />
                  {statusConfig[asset.status].label}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{asset.filename}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">by {asset.uploadedBy}</p>
                </div>

                {/* Metadata */}
                <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                  <div>📦 Size: <span className="font-medium">{formatSize(asset.size)}</span></div>
                  {asset.dimensions && <div>📐 Dimensions: <span className="font-medium">{asset.dimensions}</span></div>}
                  {asset.duration && <div>⏱️ Duration: <span className="font-medium">{asset.duration}</span></div>}
                  <div>📅 Uploaded: <span className="font-medium">{formatDate(asset.uploadedDate)}</span></div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {asset.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-3 border-t border-gray-200 dark:border-slate-700">
                  <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900 rounded-lg transition">
                    <Eye className="w-3 h-3" />
                    View
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition">
                    <Download className="w-3 h-3" />
                    Download
                  </button>
                  <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredAssets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">No assets found matching your filters</p>
        </div>
      )}
    </div>
  );
}
