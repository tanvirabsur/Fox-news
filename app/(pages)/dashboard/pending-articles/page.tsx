
'use client';

import { useState, useMemo } from 'react';
import {
  Clock,
  AlertCircle,
  CheckCircle,
  MessageSquare,
  Search,
  MoreVertical,
  Edit,
  User,
  Check,
  X
} from 'lucide-react';

interface PendingArticle {
  id: string;
  title: string;
  author: string;
  submittedDate: string;
  status: 'review' | 'editing' | 'fact-check' | 'published';
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
  const [filterStatus, setFilterStatus] = useState<
    'all' | PendingArticle['status']
  >('all');

  const [filterPriority, setFilterPriority] = useState<
    'all' | PendingArticle['priority']
  >('all');

  const [selectedArticles, setSelectedArticles] = useState<Set<string>>(
    new Set()
  );

  const [selectedArticle, setSelectedArticle] =
    useState<PendingArticle | null>(null);

  const [actionType, setActionType] = useState<
    'approve' | 'reject' | null
  >(null);

  const [comment, setComment] = useState('');

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === 'all' || article.status === filterStatus;

      const matchesPriority =
        filterPriority === 'all' || article.priority === filterPriority;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [articles, searchTerm, filterStatus, filterPriority]);

  const statusConfig = {
    review: {
      label: 'Under Review',
      color:
        'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      icon: Clock
    },
    editing: {
      label: 'Editing',
      color:
        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
      icon: Edit
    },
    'fact-check': {
      label: 'Fact-Check',
      color:
        'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
      icon: AlertCircle
    },
    published: {
      label: 'Published',
      color:
        'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      icon: CheckCircle
    }
  };

  const priorityConfig = {
    high: 'text-red-600 bg-red-50',
    medium: 'text-yellow-600 bg-yellow-50',
    low: 'text-green-600 bg-green-50'
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
      setSelectedArticles(
        new Set(filteredArticles.map((article) => article.id))
      );
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

    const trackingEntry = {
      id: Date.now().toString(),
      articleId: selectedArticle.id,
      articleTitle: selectedArticle.title,
      action: actionType,
      actionBy: 'Admin User',
      timestamp: new Date().toISOString(),
      comment,
      previousStatus: selectedArticle.status,
      newStatus:
        actionType === 'approve' ? 'published' : 'rejected'
    };

    const existingTracks = JSON.parse(
      localStorage.getItem('articleTracks') || '[]'
    );

    localStorage.setItem(
      'articleTracks',
      JSON.stringify([trackingEntry, ...existingTracks])
    );

    if (actionType === 'approve') {
      setArticles((prev) =>
        prev.map((article) =>
          article.id === selectedArticle.id
            ? { ...article, status: 'published' }
            : article
        )
      );
    } else {
      setArticles((prev) =>
        prev.filter((article) => article.id !== selectedArticle.id)
      );
    }

    setSelectedArticle(null);
    setActionType(null);
    setComment('');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Pending Articles
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Review and manage articles awaiting approval
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border">
              <div className="text-sm text-gray-500">
                Total Pending
              </div>

              <div className="text-2xl font-bold text-indigo-600 mt-1">
                {articles.length}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border">
              <div className="text-sm text-gray-500">
                Under Review
              </div>

              <div className="text-2xl font-bold text-blue-600 mt-1">
                {
                  articles.filter(
                    (a) => a.status === 'review'
                  ).length
                }
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border">
              <div className="text-sm text-gray-500">
                High Priority
              </div>

              <div className="text-2xl font-bold text-red-600 mt-1">
                {
                  articles.filter(
                    (a) => a.priority === 'high'
                  ).length
                }
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border">
              <div className="text-sm text-gray-500">
                Avg Comments
              </div>

              <div className="text-2xl font-bold text-indigo-600 mt-1">
                {articles.length > 0
                  ? (
                      articles.reduce(
                        (sum, a) => sum + a.comments,
                        0
                      ) / articles.length
                    ).toFixed(1)
                  : 0}
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />

                <input
                  type="text"
                  placeholder="Search by title or author..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-slate-700"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(e.target.value as any)
                }
                className="px-3 py-2 border rounded-lg bg-white dark:bg-slate-700"
              >
                <option value="all">All Status</option>
                <option value="review">Under Review</option>
                <option value="editing">Editing</option>
                <option value="fact-check">
                  Fact-Check
                </option>
                <option value="published">
                  Published
                </option>
              </select>

              <select
                value={filterPriority}
                onChange={(e) =>
                  setFilterPriority(e.target.value as any)
                }
                className="px-3 py-2 border rounded-lg bg-white dark:bg-slate-700"
              >
                <option value="all">All Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              {selectedArticles.size > 0 && (
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
                  Bulk Action ({selectedArticles.size})
                </button>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-slate-800 rounded-lg border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50 dark:bg-slate-700">
                    <th className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={
                          selectedArticles.size ===
                            filteredArticles.length &&
                          filteredArticles.length > 0
                        }
                        onChange={toggleAllSelect}
                      />
                    </th>

                    <th className="px-4 py-3 text-left">
                      Title
                    </th>

                    <th className="px-4 py-3 text-left">
                      Author
                    </th>

                    <th className="px-4 py-3 text-left">
                      Status
                    </th>

                    <th className="px-4 py-3 text-left">
                      Priority
                    </th>

                    <th className="px-4 py-3 text-left">
                      Reviews
                    </th>

                    <th className="px-4 py-3 text-left">
                      Comments
                    </th>

                    <th className="px-4 py-3 text-left">
                      Submitted
                    </th>

                    <th className="px-4 py-3 text-left">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredArticles.map((article) => {
                    const StatusIcon =
                      statusConfig[article.status].icon;

                    return (
                      <tr
                        key={article.id}
                        className="border-b hover:bg-gray-50 dark:hover:bg-slate-700"
                      >
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedArticles.has(
                              article.id
                            )}
                            onChange={() =>
                              toggleArticleSelect(
                                article.id
                              )
                            }
                          />
                        </td>

                        <td className="px-4 py-3 font-medium">
                          {article.title}
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {article.author}
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <div
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                              statusConfig[article.status]
                                .color
                            }`}
                          >
                            <StatusIcon className="w-3 h-3" />

                            {
                              statusConfig[article.status]
                                .label
                            }
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              priorityConfig[
                                article.priority
                              ]
                            }`}
                          >
                            {article.priority}
                          </span>
                        </td>

                        <td className="px-4 py-3">
                          {article.reviewCount}
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            {article.comments}
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          {formatDate(
                            article.submittedDate
                          )}
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                handleApprove(article)
                              }
                              className="p-2 text-green-600 hover:bg-green-100 rounded"
                            >
                              <Check className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() =>
                                handleReject(article)
                              }
                              className="p-2 text-red-600 hover:bg-red-100 rounded"
                            >
                              <X className="w-4 h-4" />
                            </button>

                            <button className="p-2 hover:bg-gray-100 rounded">
                              <MoreVertical className="w-4 h-4" />
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
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-4">
          <div className="bg-indigo-600 text-white rounded-xl p-6">
            <h3 className="text-lg font-bold mb-4">
              Approval Workflow
            </h3>

            <ol className="space-y-3 text-sm">
              <li>1. Review submitted articles</li>
              <li>2. Check for fact accuracy</li>
              <li>3. Request edits if needed</li>
              <li>4. Final review & approval</li>
              <li>5. Publish to platform</li>
            </ol>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl border p-6">
            <h3 className="font-bold mb-4">Quick Tips</h3>

            <ul className="space-y-3 text-sm">
              <li>• High priority articles appear first</li>
              <li>• Use bulk actions for multiple articles</li>
              <li>• Add comments for feedback</li>
              <li>• Track all changes in history</li>
            </ul>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {actionType && selectedArticle && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                {actionType === 'approve' ? (
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <X className="w-5 h-5 text-red-600" />
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold">
                    {actionType === 'approve'
                      ? 'Approve Article'
                      : 'Reject Article'}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {selectedArticle.title}
                  </p>
                </div>
              </div>

              <textarea
                value={comment}
                onChange={(e) =>
                  setComment(e.target.value)
                }
                placeholder="Add comment..."
                rows={3}
                className="w-full px-3 py-2 border rounded-lg"
              />

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedArticle(null);
                    setActionType(null);
                    setComment('');
                  }}
                  className="flex-1 px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmAction}
                  className={`flex-1 px-4 py-2 rounded-lg text-white ${
                    actionType === 'approve'
                      ? 'bg-green-600'
                      : 'bg-red-600'
                  }`}
                >
                  {actionType === 'approve'
                    ? 'Approve'
                    : 'Reject'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

