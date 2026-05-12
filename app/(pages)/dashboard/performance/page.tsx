"use client";
import React, { useState } from 'react';
import { Gauge, Zap, RefreshCw, Database, Network, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  description: string;
  trend: 'up' | 'down';
}

interface PagePerformance {
  page: string;
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  timeToInteractive: number;
  cumulativeLayoutShift: number;
}

export default function Performance() {
  const [selectedMetric, setSelectedMetric] = useState<string>('all');

  const metrics: PerformanceMetric[] = [
    {
      name: 'Page Load Time',
      value: 2.34,
      unit: 's',
      status: 'good',
      description: 'Average time to load entire page',
      trend: 'down',
    },
    {
      name: 'First Contentful Paint',
      value: 0.89,
      unit: 's',
      status: 'good',
      description: 'Time until first content appears',
      trend: 'down',
    },
    {
      name: 'Largest Contentful Paint',
      value: 1.45,
      unit: 's',
      status: 'good',
      description: 'Time until largest content element renders',
      trend: 'down',
    },
    {
      name: 'Time to Interactive',
      value: 3.12,
      unit: 's',
      status: 'warning',
      description: 'Time until page becomes interactive',
      trend: 'up',
    },
    {
      name: 'Cumulative Layout Shift',
      value: 0.05,
      unit: '',
      status: 'good',
      description: 'Visual stability score',
      trend: 'down',
    },
    {
      name: 'API Response Time',
      value: 145,
      unit: 'ms',
      status: 'good',
      description: 'Average backend response time',
      trend: 'down',
    },
    {
      name: 'Database Query Time',
      value: 52,
      unit: 'ms',
      status: 'good',
      description: 'Average database query duration',
      trend: 'down',
    },
    {
      name: 'Cache Hit Ratio',
      value: 94.2,
      unit: '%',
      status: 'good',
      description: 'Percentage of cached requests',
      trend: 'up',
    },
  ];

  const pagePerformance: PagePerformance[] = [
    {
      page: 'Dashboard',
      loadTime: 1.89,
      firstContentfulPaint: 0.65,
      largestContentfulPaint: 1.12,
      timeToInteractive: 2.45,
      cumulativeLayoutShift: 0.03,
    },
    {
      page: 'Analytics',
      loadTime: 2.67,
      firstContentfulPaint: 1.05,
      largestContentfulPaint: 1.82,
      timeToInteractive: 3.21,
      cumulativeLayoutShift: 0.08,
    },
    {
      page: 'News Feed',
      loadTime: 2.12,
      firstContentfulPaint: 0.78,
      largestContentfulPaint: 1.45,
      timeToInteractive: 2.89,
      cumulativeLayoutShift: 0.04,
    },
    {
      page: 'Article Detail',
      loadTime: 1.65,
      firstContentfulPaint: 0.52,
      largestContentfulPaint: 0.98,
      timeToInteractive: 2.15,
      cumulativeLayoutShift: 0.02,
    },
    {
      page: 'User Management',
      loadTime: 3.45,
      firstContentfulPaint: 1.32,
      largestContentfulPaint: 2.15,
      timeToInteractive: 4.01,
      cumulativeLayoutShift: 0.12,
    },
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      good: 'bg-green-100 text-green-800 border-green-200',
      warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      critical: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[status as keyof typeof colors];
  };

  const getStatusIcon = (status: string) => {
    if (status === 'good') return <CheckCircle size={20} />;
    if (status === 'warning') return <AlertTriangle size={20} />;
    return <AlertTriangle size={20} />;
  };

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg text-white">
            <Gauge size={24} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Performance Metrics</h1>
        </div>
        <p className="text-gray-600">Monitor web vitals, API performance, and system health</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className={`rounded-xl shadow-md border p-6 cursor-pointer transition-all hover:shadow-lg ${getStatusColor(metric.status)}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm font-semibold opacity-80 mb-1">{metric.name}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{metric.value}</span>
                  <span className="text-sm opacity-70">{metric.unit}</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                {getStatusIcon(metric.status)}
                <span className={`flex items-center gap-0.5 text-xs font-semibold ${
                  metric.trend === 'down' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp size={12} className={metric.trend === 'down' ? 'rotate-180' : ''} />
                  {metric.trend === 'down' ? '-2.3%' : '+1.8%'}
                </span>
              </div>
            </div>
            <p className="text-xs opacity-75">{metric.description}</p>
          </div>
        ))}
      </div>

      {/* Page Performance */}
      <div className="bg-white rounded-xl shadow-md border border-indigo-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Network className="text-indigo-600" size={24} />
          <h3 className="text-2xl font-bold text-gray-900">Page Performance Details</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Page</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Load Time</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">FCP</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">LCP</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">TTI</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">CLS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pagePerformance.map((page, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">{page.page}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold">
                      {page.loadTime}s
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-mono">{page.firstContentfulPaint}s</td>
                  <td className="px-6 py-4 text-gray-600 font-mono">{page.largestContentfulPaint}s</td>
                  <td className="px-6 py-4 text-gray-600 font-mono">{page.timeToInteractive}s</td>
                  <td className="px-6 py-4 text-gray-600 font-mono">{page.cumulativeLayoutShift}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-md border border-green-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">System Health</h3>
            <CheckCircle className="text-green-600" size={24} />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">CPU Usage</span>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-600 rounded-full" style={{ width: '35%' }}></div>
              </div>
              <span className="text-sm font-bold text-gray-900 ml-2">35%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Memory</span>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-600 rounded-full" style={{ width: '52%' }}></div>
              </div>
              <span className="text-sm font-bold text-gray-900 ml-2">52%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Disk</span>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-600 rounded-full" style={{ width: '68%' }}></div>
              </div>
              <span className="text-sm font-bold text-gray-900 ml-2">68%</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md border border-blue-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Uptime</h3>
            <Zap className="text-blue-600" size={24} />
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-4xl font-bold text-blue-700">99.98%</p>
              <p className="text-sm text-gray-700 mt-1">Last 30 days</p>
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              <p>✓ Last incident: 45 days ago</p>
              <p>✓ Avg downtime: 0.5 mins/month</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-md border border-purple-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Database</h3>
            <Database className="text-purple-600" size={24} />
          </div>
          <div className="space-y-3">
            <div className="text-sm">
              <p className="font-semibold text-gray-900">Query Performance</p>
              <p className="text-xs text-gray-600 mt-1">Avg: 52ms | P95: 145ms</p>
            </div>
            <div className="text-sm">
              <p className="font-semibold text-gray-900">Replication Lag</p>
              <p className="text-xs text-gray-600 mt-1">Primary: 0ms | Replica: 2ms</p>
            </div>
            <div className="text-sm">
              <p className="font-semibold text-gray-900">Connections</p>
              <p className="text-xs text-gray-600 mt-1">Active: 34/100 (34%)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Recommendations */}
      <div className="bg-white rounded-xl shadow-md border border-indigo-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Optimization Recommendations</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <CheckCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="font-semibold text-gray-900">Implement Service Worker Caching</p>
              <p className="text-sm text-gray-600 mt-1">Could reduce load time by ~15% for returning visitors</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <AlertTriangle className="text-yellow-600 flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="font-semibold text-gray-900">Optimize Image Delivery</p>
              <p className="text-sm text-gray-600 mt-1">User Management page has high CLS. Consider lazy loading images</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="font-semibold text-gray-900">Database Queries Optimized</p>
              <p className="text-sm text-gray-600 mt-1">Average query time is within acceptable range. Good work!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
