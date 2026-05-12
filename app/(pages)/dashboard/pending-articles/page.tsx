'use client';

import { useState, useMemo } from 'react';
import { Clock, AlertCircle, CheckCircle, MessageSquare, Send, Search, Filter, MoreVertical, Eye, Edit, Trash2, User, Check, X } from 'lucide-react';

interface PendingArticle {
  id: string;
  title: string;
  author: string;
  submittedDate: string;
  status: 'review' | 'editing' | 'fact-check';
  priority: 'high' | 'medium' | 'low';
  category: string;
  reviewCount: number;
  comments: number;
}

const mockArticles: PendingArticle[] = [
  {
    id: '1',
    title: 'Breaking: New Climate Policy Announced',
    author: 'Sarah Johnson',
    submittedDate: '2026-05-12T10:30:00',
    status: 'review',
    priority: 'high',
    category: 'Politics',
    reviewCount: 2,
    comments: 5
  },
  {
    id: '2',
    title: 'Tech Giant Launches New AI Product',
    author: 'Michael Chen',
    submittedDate: '2026-05-12T09:15:00',
    status: 'fact-check',
    priority: 'high',
    category: 'Technology',
    reviewCount: 1,
    comments: 3
  },
  {
    id: '3',
    title: 'Market Recovery Signals Growth',
    author: 'Emma Davis',
    submittedDate: '2026-05-11T14:45:00',
    status: 'editing',
    priority: 'medium',
    category: 'Business',
    reviewCount: 3,
    comments: 8
  },
  {
    id: '4',
    title: 'Sports: Championship Finals Preview',
    author: 'James Wilson',
    submittedDate: '2026-05-11T11:20:00',
    status: 'review',
    priority: 'medium',
    category: 'Sports',
    reviewCount: 1,
    comments: 2
  },
  {
    id: '5',
    title: 'Entertainment: Award Winners Announced',
    author: 'Lisa Anderson',
    submittedDate: '2026-05-10T16:00:00',
    status: 'editing',
    priority: 'low',
    category: 'Entertainment',
    reviewCount: 2,
    comments: 4
  }
];

export default function PendingArticlesPage() {
  const [articles, setArticles] = useState(mockArticles);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | PendingArticle['status']>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | PendingArticle['priority']>('all');
  const [selectedArticles, setSelectedArticles] = useState<Set<string>>(new Set());
  const [selectedArticle, setSelectedArticle] = useState<PendingArticle | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
  const [comment, setComment] = useState('');

  const filteredArticles = useMemo(() => {
    return mockArticles.filter(article => {
      const matchesSearch = 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || article.status === filterStatus;
      const matchesPriority = filterPriority === 'all' || article.priority === filterPriority;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [searchTerm, filterStatus, filterPriority]);

  const statusConfig = {
    'review': { label: 'Under Review', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300', icon: Clock },
    'editing': { label: 'Editing', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300', icon: Edit },
    'fact-check': { label: 'Fact-Check', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300', icon: AlertCircle }
  };

  const priorityConfig = {
    'high': 'text-red-600 bg-red-50',
    'medium': 'text-yellow-600 bg-yellow-50',
    'low': 'text-green-600 bg-green-50'
  };

  const toggleArticleSelect = (id: string) => {
    const newSelected = new Set(selectedArticles);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedArticles(newSelected);
  };

  const toggleAllSelect = () => {
    if (selectedArticles.size === filteredArticles.length) {
      setSelectedArticles(new Set());
    } else {
      setSelectedArticles(new Set(filteredArticles.map(a => a.id)));
    }
  };

  const handleApprove = (article: PendingArticle) => {
    setSelectedArticle(article);
    setActionType('approve');
    setComment('');
  };

  const handleReject = (article: PendingArticle) => {
    setSelectedArticle(article);
    setActionType('reject');
    setComment('');
  };

  const confirmAction = () => {
    if (!selectedArticle || !actionType) return;

    // Log action to localStorage for tracking
    const trackingEntry = {
      id: Date.now().toString(),
      articleId: selectedArticle.id,
      articleTitle: selectedArticle.title,
      action: actionType,
      actionBy: 'Admin User',
      timestamp: new Date().toISOString(),
      comment: comment,
      previousStatus: selectedArticle.status,
      newStatus: actionType === 'approve' ? 'published' : 'rejected'
    };

    const existingTracks = JSON.parse(localStorage.getItem('articleTracks') || '[]');
    localStorage.setItem('articleTracks', JSON.stringify([trackingEntry, ...existingTracks]));

    // Update article
    if (actionType === 'approve') {
      setArticles(articles.map(a => a.id === selectedArticle.id ? { ...a, status: 'published' as const } : a).filter(a => a.status !== 'published'));
    } else {
      setArticles(articles.filter(a => a.id !== selectedArticle.id));
    }

    // Reset modal
    setSelectedArticle(null);
    setActionType(null);
    setComment('');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Pending Articles</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Review and manage articles awaiting approval</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Pending</div>
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{articles.length}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">Under Review</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
            {articles.filter(a => a.status === 'review').length}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">High Priority</div>
          <div className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">
            {articles.filter(a => a.priority === 'high').length}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">Avg Comments</div>
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">
            {(articles.reduce((sum, a) => sum + a.comments, 0) / articles.length).toFixed(1)}
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
              placeholder="Search by title or author..."
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
            <option value="review">Under Review</option>
            <option value="editing">Editing</option>
            <option value="fact-check">Fact-Check</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          {selectedArticles.size > 0 && (
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              Bulk Action ({selectedArticles.size})
            </button>
          )}
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700">
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedArticles.size === filteredArticles.length && filteredArticles.length > 0}
                    onChange={toggleAllSelect}
                    className="w-4 h-4 cursor-pointer"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Title</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Author</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Priority</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Reviews</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Comments</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Submitted</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.map((article) => {
                const StatusIcon = statusConfig[article.status].icon;
                return (
                  <tr key={article.id} className="border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedArticles.has(article.id)}
                        onChange={() => toggleArticleSelect(article.id)}
                        className="w-4 h-4 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white truncate max-w-xs">{article.title}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3" />
                        {article.author}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${statusConfig[article.status].color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig[article.status].label}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorityConfig[article.priority]}`}>
                        {article.priority.charAt(0).toUpperCase() + article.priority.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 text-center">{article.reviewCount}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                        <MessageSquare className="w-4 h-4" />
                        {article.comments}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{formatDate(article.submittedDate)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleApprove(article)}
                          className="p-2 hover:bg-green-100 dark:hover:bg-green-900 text-green-600 dark:text-green-400 rounded transition" 
                          title="Approve">
                          <Check className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleReject(article)}
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400 rounded transition" 
                          title="Reject">
                          <X className="w-4 h-4" />
                        </button>
                        <button className="p-1 hover:bg-gray-200 dark:hover:bg-slate-600 rounded transition">
                          <MoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Modal */}
      {actionType && selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                {actionType === 'approve' ? (
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-green-600 dark:text-green-300" />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                    <X className="w-6 h-6 text-red-600 dark:text-red-300" />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {actionType === 'approve' ? 'Approve Article' : 'Reject Article'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {actionType === 'approve' ? 'This will publish the article' : 'This will reject and remove the article'}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-slate-700 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedArticle.title}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">by {selectedArticle.author}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  {actionType === 'approve' ? 'Approval Note (optional)' : 'Rejection Reason (optional)'}
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={actionType === 'approve' ? 'Add any notes...' : 'Why are you rejecting this article?'}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none resize-none"
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setSelectedArticle(null);
                    setActionType(null);
                    setComment('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-500 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAction}
                  className={`flex-1 px-4 py-2 rounded-lg text-white transition ${
                    actionType === 'approve'
                      ? 'bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600'
                      : 'bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600'
                  }`}
                >
                  {actionType === 'approve' ? 'Approve & Publish' : 'Reject'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

