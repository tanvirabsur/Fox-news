"use client";
import React, { useState, useMemo } from 'react';
import { Search, Filter, MoreVertical, TrendingUp, Eye, MessageSquare, Share2 } from 'lucide-react';

interface SearchResult {
  id: number;
  title: string;
  category: string;
  author: string;
  date: string;
  views: number;
  engagement: number;
  shares: number;
  rating: number;
  excerpt: string;
  tags: string[];
}

export default function AdvancedSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSortBy, setSelectedSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFilters, setSelectedFilters] = useState<{
    minViews?: number;
    maxViews?: number;
    minRating?: number;
    dateRange?: string;
  }>({});

  const searchResults: SearchResult[] = [
    {
      id: 1,
      title: 'How AI is Revolutionizing Global News',
      category: 'Technology',
      author: 'Sarah Chen',
      date: '2026-05-10',
      views: 45230,
      engagement: 8920,
      shares: 2340,
      rating: 4.8,
      excerpt: 'Exploring the impact of artificial intelligence on journalism and news distribution...',
      tags: ['AI', 'Technology', 'Journalism'],
    },
    {
      id: 2,
      title: 'Market Insights: 5 Trends to Watch',
      category: 'Business',
      author: 'John Smith',
      date: '2026-05-09',
      views: 38450,
      engagement: 6540,
      shares: 1890,
      rating: 4.5,
      excerpt: 'Analyzing the top 5 market trends that could shape the economy...',
      tags: ['Markets', 'Finance', 'Analysis'],
    },
    {
      id: 3,
      title: 'Climate Action: Global Progress Report',
      category: 'Environment',
      author: 'Emma Wilson',
      date: '2026-05-08',
      views: 32890,
      engagement: 5230,
      shares: 1560,
      rating: 4.6,
      excerpt: 'A comprehensive review of global climate initiatives and their effectiveness...',
      tags: ['Climate', 'Environment', 'Sustainability'],
    },
    {
      id: 4,
      title: 'Tech Giants Report Q2 Earnings',
      category: 'Finance',
      author: 'Michael Brown',
      date: '2026-05-07',
      views: 28450,
      engagement: 4120,
      shares: 980,
      rating: 4.3,
      excerpt: 'Major technology companies reveal their Q2 earnings and future outlook...',
      tags: ['Tech', 'Finance', 'Earnings'],
    },
    {
      id: 5,
      title: 'Innovation in Healthcare Sector',
      category: 'Science',
      author: 'Dr. Lisa Anderson',
      date: '2026-05-06',
      views: 25670,
      engagement: 3890,
      shares: 750,
      rating: 4.7,
      excerpt: 'Breakthrough innovations changing the future of healthcare and medicine...',
      tags: ['Healthcare', 'Science', 'Innovation'],
    },
  ];

  const categories = ['all', 'Technology', 'Business', 'Finance', 'Environment', 'Science', 'Politics'];
  const sortOptions = [
    { value: 'latest', label: 'Latest' },
    { value: 'views', label: 'Most Viewed' },
    { value: 'engagement', label: 'Most Engaged' },
    { value: 'rating', label: 'Highest Rated' },
  ];

  const filteredResults = useMemo(() => {
    let results = [...searchResults];

    // Text search
    if (searchTerm) {
      results = results.filter((r) =>
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      results = results.filter((r) => r.category === selectedCategory);
    }

    // Views filter
    if (selectedFilters.minViews) {
      results = results.filter((r) => r.views >= selectedFilters.minViews!);
    }

    // Rating filter
    if (selectedFilters.minRating) {
      results = results.filter((r) => r.rating >= selectedFilters.minRating!);
    }

    // Sort
    if (selectedSortBy === 'views') {
      results.sort((a, b) => b.views - a.views);
    } else if (selectedSortBy === 'engagement') {
      results.sort((a, b) => b.engagement - a.engagement);
    } else if (selectedSortBy === 'rating') {
      results.sort((a, b) => b.rating - a.rating);
    } else {
      results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    return results;
  }, [searchTerm, selectedCategory, selectedSortBy, selectedFilters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg text-white">
              <Search size={24} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Advanced Search</h1>
          </div>
          <p className="text-gray-600">Search and discover news with advanced filtering</p>
        </div>

        {/* Main Search Bar */}
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-indigo-600 w-6 h-6" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles, keywords, authors..."
              className="w-full pl-16 pr-6 py-4 text-lg rounded-2xl border-2 border-indigo-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none transition-all bg-white shadow-lg"
            />
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 font-semibold text-sm"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-md border border-indigo-100 p-6 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="text-indigo-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">Sort By</label>
              <select
                value={selectedSortBy}
                onChange={(e) => setSelectedSortBy(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Views */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">Min Views</label>
              <input
                type="number"
                value={selectedFilters.minViews || ''}
                onChange={(e) =>
                  setSelectedFilters({
                    ...selectedFilters,
                    minViews: e.target.value ? parseInt(e.target.value) : undefined,
                  })
                }
                placeholder="Any"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
              />
            </div>

            {/* Min Rating */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">Min Rating</label>
              <select
                value={selectedFilters.minRating || ''}
                onChange={(e) =>
                  setSelectedFilters({
                    ...selectedFilters,
                    minRating: e.target.value ? parseFloat(e.target.value) : undefined,
                  })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
              >
                <option value="">Any Rating</option>
                <option value="4">4+</option>
                <option value="4.5">4.5+</option>
                <option value="4.7">4.7+</option>
              </select>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 font-medium">
              Found <span className="font-bold text-indigo-600">{filteredResults.length}</span> results
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  viewMode === 'list'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredResults.length > 0 ? (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }
          >
            {filteredResults.map((result) => (
              <div
                key={result.id}
                className={`bg-white rounded-xl shadow-md border border-indigo-100 hover:shadow-lg transition-all ${
                  viewMode === 'list' ? 'p-6' : 'overflow-hidden'
                }`}
              >
                {viewMode === 'grid' && (
                  <div className="h-48 bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center">
                    <TrendingUp size={48} className="text-white opacity-20" />
                  </div>
                )}

                <div className={viewMode === 'grid' ? 'p-4' : ''}>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                        {result.category}
                      </span>
                      <p className="text-xs text-gray-500 mt-2">{new Date(result.date).toLocaleDateString()}</p>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                      <MoreVertical size={18} />
                    </button>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{result.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{result.excerpt}</p>

                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100 text-xs">
                    <span className="font-semibold text-gray-900">{result.author}</span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < Math.floor(result.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                          ★
                        </span>
                      ))}
                      <span className="ml-1 text-gray-600">{result.rating}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <Eye size={16} className="mx-auto text-indigo-600 mb-1" />
                      <p className="text-xs font-bold text-gray-900">{(result.views / 1000).toFixed(1)}K</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <MessageSquare size={16} className="mx-auto text-indigo-600 mb-1" />
                      <p className="text-xs font-bold text-gray-900">{(result.engagement / 1000).toFixed(1)}K</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <Share2 size={16} className="mx-auto text-indigo-600 mb-1" />
                      <p className="text-xs font-bold text-gray-900">{(result.shares / 1000).toFixed(1)}K</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {result.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-md border border-indigo-100">
            <Search size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600 text-lg font-medium">No articles found matching your criteria</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}
