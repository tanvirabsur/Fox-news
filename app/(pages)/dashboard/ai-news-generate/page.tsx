"use client";
import React, { useState } from 'react';
import { Link as LinkIcon, Zap, Clock, Copy, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface GeneratedArticle {
  id: string;
  title: string;
  slug: string;
  link: string;
  thumbnail: string;
  content: string;
  excerpt: string;
  category: string;
  readingTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
  meta: {
    views: number;
    status: string;
    tags: string[];
  };
  published_at: string;
  scraped_at: string;
}

export default function AINewsGenerate() {
  const [rssUrl, setRssUrl] = useState('');
  const [articleCount, setArticleCount] = useState(5);
  const [scheduleTime, setScheduleTime] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedArticles, setGeneratedArticles] = useState<GeneratedArticle[]>([]);
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rssUrl.trim()) {
      alert('Please enter an RSS URL');
      return;
    }

    if (!scheduleDate || !scheduleTime) {
      alert('Please set a schedule date and time');
      return;
    }

    setIsGenerating(true);

    // Simulate API call - Replace with actual backend call
    setTimeout(() => {
      const mockArticles: GeneratedArticle[] = Array.from({ length: articleCount }, (_, idx) => ({
        id: `https://example.com/articles/article-${idx + 1}`,
        title: `AI Generated News: Breaking Update ${idx + 1} - Market Trends Show Positive Growth`,
        slug: `ai-generated-news-breaking-update-${idx + 1}`,
        link: `https://example.com/articles/article-${idx + 1}?source=rss&ref=ai`,
        thumbnail: `https://images.unsplash.com/photo-162${idx + 1000}?w=1024&q=80`,
        content: `This is an AI-generated comprehensive news article covering the latest developments in the industry. The analysis includes market insights, expert commentary, and forward-looking statements. ${idx + 1}. Breaking developments suggest significant changes ahead.`,
        excerpt: `AI-generated news article providing in-depth analysis of the latest market trends and industry updates...`,
        category: ['Technology', 'Business', 'Finance', 'World News', 'Science'][idx % 5],
        readingTime: `${2 + (idx % 3)} min read`,
        author: {
          name: 'Tanvir AI Bot',
          role: 'AI Journalist',
          avatar: 'https://i.pravatar.cc/150?u=tanvir-ai',
          bio: 'An automated AI agent specializing in real-time news analysis and content generation.',
        },
        meta: {
          views: 0,
          status: 'published',
          tags: ['AI Generated', 'Breaking', 'Trending'],
        },
        published_at: new Date(`${scheduleDate}T${scheduleTime}`).toUTCString(),
        scraped_at: new Date().toISOString(),
      }));

      setGeneratedArticles(mockArticles);
      setIsGenerating(false);
      setActiveTab('preview');
    }, 2000);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(type);
    setTimeout(() => setCopySuccess(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg text-white">
            <Zap size={24} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">AI News Generator</h1>
        </div>
        <p className="text-gray-600">Automatically generate high-quality news articles from RSS feeds using AI</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('form')}
          className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
            activeTab === 'form'
              ? 'text-indigo-600 border-indigo-600'
              : 'text-gray-600 border-transparent hover:text-gray-900'
          }`}
        >
          Configuration
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
            activeTab === 'preview'
              ? 'text-indigo-600 border-indigo-600'
              : 'text-gray-600 border-transparent hover:text-gray-900'
          }`}
          disabled={generatedArticles.length === 0}
        >
          Preview {generatedArticles.length > 0 && `(${generatedArticles.length})`}
        </button>
      </div>

      {/* Form Section */}
      {activeTab === 'form' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Panel */}
          <div className="lg:col-span-2">
            <form onSubmit={handleGenerate} className="bg-white rounded-xl shadow-md border border-indigo-100 p-8 space-y-6">
              {/* RSS URL Input */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-900">RSS Feed URL</label>
                <div className="relative">
                  <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="url"
                    value={rssUrl}
                    onChange={(e) => setRssUrl(e.target.value)}
                    placeholder="https://example.com/feed.xml"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-colors bg-gray-50"
                  />
                </div>
                <p className="text-xs text-gray-500">Enter the RSS feed URL from which articles will be generated</p>
              </div>

              {/* Article Count */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-900">Number of Articles to Generate</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={articleCount}
                    onChange={(e) => setArticleCount(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg font-bold text-lg min-w-16 text-center">
                    {articleCount}
                  </div>
                </div>
                <p className="text-xs text-gray-500">Select how many articles you want to generate (1-20)</p>
              </div>

              {/* Schedule Date */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-900">Schedule Date</label>
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-colors bg-gray-50"
                  />
                </div>

                {/* Schedule Time */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <Clock size={16} /> Schedule Time
                  </label>
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-colors bg-gray-50"
                  />
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 flex gap-3">
                <AlertCircle className="text-indigo-600 flex-shrink-0 mt-0.5" size={20} />
                <div className="text-sm text-indigo-900">
                  <p className="font-semibold mb-1">Pro Tip:</p>
                  <p>Articles will be generated with AI-enhanced content and automatically scheduled for the specified date and time. Each article includes metadata, reading time estimation, and category classification.</p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-indigo-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader size={20} className="animate-spin" />
                    Generating Articles...
                  </>
                ) : (
                  <>
                    <Zap size={20} />
                    Generate AI Articles
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Info Card */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-xl shadow-lg p-6 space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Zap size={20} />
                How It Works
              </h3>
              <ol className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <span className="bg-white text-indigo-600 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">1</span>
                  <span>Paste your RSS feed URL</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-white text-indigo-600 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">2</span>
                  <span>Select number of articles</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-white text-indigo-600 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">3</span>
                  <span>Set publication schedule</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-white text-indigo-600 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">4</span>
                  <span>AI generates & previews</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-white text-indigo-600 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">5</span>
                  <span>Auto-publish on schedule</span>
                </li>
              </ol>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-indigo-100 p-6 space-y-4">
              <h3 className="font-bold text-gray-900">Features</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-indigo-600" />
                  Automated content generation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-indigo-600" />
                  Smart scheduling
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-indigo-600" />
                  SEO-optimized articles
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-indigo-600" />
                  Category auto-tagging
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-indigo-600" />
                  Reading time estimation
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Preview Section */}
      {activeTab === 'preview' && generatedArticles.length > 0 && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md border border-indigo-100 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Generated Articles Preview ({generatedArticles.length})</h2>

            {/* Articles Grid */}
            <div className="space-y-4">
              {generatedArticles.map((article, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  {/* Article Header */}
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{article.category}</span>
                        <span className="text-xs text-gray-500">{article.readingTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{article.title}</h3>
                    </div>
                  </div>

                  {/* Article Content Preview */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>

                  {/* Article Metadata */}
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <img src={article.author.avatar} alt={article.author.name} className="w-8 h-8 rounded-full" />
                      <div className="text-sm">
                        <p className="font-semibold text-gray-900">{article.author.name}</p>
                        <p className="text-gray-500 text-xs">{article.author.role}</p>
                      </div>
                    </div>
                    <div className="text-right text-xs text-gray-500">
                      <p className="font-semibold text-gray-900">Publish: {new Date(article.published_at).toLocaleDateString()}</p>
                      <p>{new Date(article.published_at).toLocaleTimeString()}</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.meta.tags.map((tag, tagIdx) => (
                      <span key={tagIdx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(JSON.stringify(article, null, 2), `article-${idx}`)}
                      className="text-sm px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors flex items-center gap-2 font-semibold"
                    >
                      <Copy size={16} />
                      {copySuccess === `article-${idx}` ? 'Copied!' : 'Copy JSON'}
                    </button>
                    <button className="text-sm px-4 py-2 border border-indigo-300 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-semibold">
                      Preview Full
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Copy All Button */}
            <div className="mt-6 pt-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => copyToClipboard(JSON.stringify(generatedArticles, null, 2), 'all')}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold flex items-center gap-2"
              >
                <Copy size={18} />
                {copySuccess === 'all' ? 'All Copied!' : 'Copy All as JSON'}
              </button>
              <button
                onClick={() => setActiveTab('form')}
                className="px-6 py-3 border border-indigo-300 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-semibold"
              >
                Generate More
              </button>
            </div>
          </div>

          {/* JSON Format Example */}
          <div className="bg-white rounded-xl shadow-md border border-indigo-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Data Format Reference</h3>
            <div className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto font-mono text-xs">
              <pre>{`{
  "id": "unique-article-id",
  "title": "Article Title",
  "slug": "article-slug",
  "link": "https://source.com/article",
  "thumbnail": "https://image-url.jpg",
  "content": "Full article content",
  "excerpt": "Article excerpt...",
  "category": "Category Name",
  "readingTime": "X min read",
  "author": {
    "name": "Author Name",
    "role": "Role",
    "avatar": "https://avatar-url.jpg",
    "bio": "Author bio"
  },
  "meta": {
    "views": 0,
    "status": "published",
    "tags": ["tag1", "tag2"]
  },
  "published_at": "ISO8601 date",
  "scraped_at": "ISO8601 date"
}`}</pre>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {activeTab === 'preview' && generatedArticles.length === 0 && (
        <div className="bg-white rounded-xl shadow-md border border-indigo-100 p-12 text-center space-y-4">
          <Zap size={48} className="mx-auto text-indigo-400" />
          <h3 className="text-xl font-bold text-gray-900">No articles generated yet</h3>
          <p className="text-gray-600">Generate articles from an RSS feed to see the preview here</p>
          <button
            onClick={() => setActiveTab('form')}
            className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
          >
            Get Started
          </button>
        </div>
      )}
    </div>
  );
}
