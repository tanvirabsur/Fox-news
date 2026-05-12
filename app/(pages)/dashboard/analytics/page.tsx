"use client";
import React, { useState, useMemo } from 'react';
import {
  BarChart3, TrendingUp, Users, Eye, MessageSquare, Share2, Download,
  Calendar, ArrowUp, ArrowDown, Award, Zap
} from 'lucide-react';

interface ChartData {
  date: string;
  views: number;
  engagement: number;
  revenue: number;
  shares: number;
}

interface TopArticle {
  id: number;
  title: string;
  views: number;
  engagement: number;
  shares: number;
  category: string;
  trend: 'up' | 'down';
}

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('7days');

  // Mock analytics data
  const generateChartData = (): ChartData[] => {
    const data: ChartData[] = [];
    const now = new Date();
    for (let i = 30; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        views: Math.floor(Math.random() * 5000) + 1000,
        engagement: Math.floor(Math.random() * 800) + 100,
        revenue: Math.floor(Math.random() * 2000) + 500,
        shares: Math.floor(Math.random() * 400) + 50,
      });
    }
    return data;
  };

  const chartData = generateChartData();

  const topArticles: TopArticle[] = [
    {
      id: 1,
      title: 'How AI is Revolutionizing Global News',
      views: 45230,
      engagement: 8920,
      shares: 2340,
      category: 'Technology',
      trend: 'up',
    },
    {
      id: 2,
      title: 'Market Insights: 5 Trends to Watch',
      views: 38450,
      engagement: 6540,
      shares: 1890,
      category: 'Business',
      trend: 'up',
    },
    {
      id: 3,
      title: 'Climate Action: Global Progress Report',
      views: 32890,
      engagement: 5230,
      shares: 1560,
      category: 'Environment',
      trend: 'up',
    },
    {
      id: 4,
      title: 'Tech Giants Report Q2 Earnings',
      views: 28450,
      engagement: 4120,
      shares: 980,
      category: 'Finance',
      trend: 'down',
    },
    {
      id: 5,
      title: 'Innovation in Healthcare Sector',
      views: 25670,
      engagement: 3890,
      shares: 750,
      category: 'Science',
      trend: 'up',
    },
  ];

  const stats = [
    {
      label: 'Total Views',
      value: '1.2M',
      change: '+12.5%',
      trend: 'up',
      icon: Eye,
      color: 'indigo',
    },
    {
      label: 'Total Engagement',
      value: '45K',
      change: '+8.3%',
      trend: 'up',
      icon: MessageSquare,
      color: 'blue',
    },
    {
      label: 'Active Users',
      value: '12.4K',
      change: '+5.2%',
      trend: 'up',
      icon: Users,
      color: 'purple',
    },
    {
      label: 'Total Shares',
      value: '18.9K',
      change: '-2.1%',
      trend: 'down',
      icon: Share2,
      color: 'pink',
    },
  ];

  // Calculate max values for charts
  const maxViews = Math.max(...chartData.map((d) => d.views));
  const maxEngagement = Math.max(...chartData.map((d) => d.engagement));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg text-white">
              <BarChart3 size={24} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Analytics Dashboard</h1>
          </div>
          <p className="text-gray-600">Real-time insights and performance metrics</p>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 bg-white rounded-lg shadow-md border border-gray-200 p-1">
          {['24hrs', '7days', '30days', '90days'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded transition-colors font-semibold text-sm ${
                timeRange === range
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {range === '24hrs' ? '24h' : range === '7days' ? '7d' : range === '30days' ? '30d' : '90d'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          const colorClasses = {
            indigo: 'bg-indigo-100 text-indigo-600',
            blue: 'bg-blue-100 text-blue-600',
            purple: 'bg-purple-100 text-purple-600',
            pink: 'bg-pink-100 text-pink-600',
          };

          return (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md border border-indigo-100 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <Icon size={24} />
                </div>
                <div
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                    stat.trend === 'up'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {stat.trend === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                  {stat.change}
                </div>
              </div>
              <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
              <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Views Chart */}
        <div className="bg-white rounded-xl shadow-md border border-indigo-100 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="text-indigo-600" size={20} />
            Views Trend
          </h3>
          <div className="h-64 relative">
            <div className="absolute inset-0 flex items-end justify-between gap-1 px-2">
              {chartData.map((data, idx) => (
                <div
                  key={idx}
                  className="flex-1 relative group"
                  style={{ height: `${(data.views / maxViews) * 100}%` }}
                >
                  <div className="w-full h-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t hover:opacity-80 transition-opacity cursor-pointer" />
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    {data.views.toLocaleString()} views
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">Average: <span className="font-bold text-gray-900">{Math.round(chartData.reduce((a, b) => a + b.views, 0) / chartData.length).toLocaleString()}</span> views/day</p>
          </div>
        </div>

        {/* Engagement Chart */}
        <div className="bg-white rounded-xl shadow-md border border-indigo-100 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <MessageSquare className="text-purple-600" size={20} />
            Engagement Trend
          </h3>
          <div className="h-64 relative">
            <div className="absolute inset-0 flex items-end justify-between gap-1 px-2">
              {chartData.map((data, idx) => (
                <div
                  key={idx}
                  className="flex-1 relative group"
                  style={{ height: `${(data.engagement / maxEngagement) * 100}%` }}
                >
                  <div className="w-full h-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t hover:opacity-80 transition-opacity cursor-pointer" />
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    {data.engagement.toLocaleString()} engagements
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">Average: <span className="font-bold text-gray-900">{Math.round(chartData.reduce((a, b) => a + b.engagement, 0) / chartData.length).toLocaleString()}</span> engagements/day</p>
          </div>
        </div>
      </div>

      {/* Top Performing Articles */}
      <div className="bg-white rounded-xl shadow-md border border-indigo-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Award className="text-indigo-600" size={24} />
            Top Performing Articles
          </h3>
          <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors font-semibold flex items-center gap-2">
            <Download size={18} />
            Export
          </button>
        </div>

        <div className="space-y-3">
          {topArticles.map((article, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                      #{idx + 1}
                    </span>
                    <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {article.category}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 line-clamp-2">{article.title}</h4>
                </div>
                <div
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                    article.trend === 'up'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {article.trend === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                  {article.trend === 'up' ? 'Rising' : 'Falling'}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Eye className="text-indigo-600" size={18} />
                  <div>
                    <p className="text-gray-600 text-xs">Views</p>
                    <p className="font-bold text-gray-900">{article.views.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MessageSquare className="text-purple-600" size={18} />
                  <div>
                    <p className="text-gray-600 text-xs">Engagement</p>
                    <p className="font-bold text-gray-900">{article.engagement.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Share2 className="text-pink-600" size={18} />
                  <div>
                    <p className="text-gray-600 text-xs">Shares</p>
                    <p className="font-bold text-gray-900">{article.shares.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-md border border-green-200 p-6">
          <h4 className="text-sm font-semibold text-gray-600 mb-2">Avg. Session Duration</h4>
          <p className="text-3xl font-bold text-green-700">4m 32s</p>
          <p className="text-xs text-green-600 mt-2">+2m from last period</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md border border-blue-200 p-6">
          <h4 className="text-sm font-semibold text-gray-600 mb-2">Bounce Rate</h4>
          <p className="text-3xl font-bold text-blue-700">24.5%</p>
          <p className="text-xs text-blue-600 mt-2">-3.2% improvement</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-md border border-purple-200 p-6">
          <h4 className="text-sm font-semibold text-gray-600 mb-2">Conversion Rate</h4>
          <p className="text-3xl font-bold text-purple-700">8.9%</p>
          <p className="text-xs text-purple-600 mt-2">+0.7% from last period</p>
        </div>
      </div>
    </div>
  );
}
