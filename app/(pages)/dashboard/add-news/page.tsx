"use client";

import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  CheckCircle2,
  Globe2,
  ImagePlus,
  LayoutTemplate,
  Lightbulb,
  PenLine,
  Rocket,
  ShieldCheck,
  Sparkles,
  Tag,
  Target,
  TimerReset,
  Wand2,
  type LucideIcon,
} from 'lucide-react';

type StoryAngle = 'breaking' | 'explainer' | 'human' | 'data' | 'local';

const angleOptions: Array<{
  id: StoryAngle;
  label: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    id: 'breaking',
    label: 'Breaking First',
    description: 'High urgency, immediate impact, fast scroll-stopping read',
    icon: Rocket,
  },
  {
    id: 'explainer',
    label: 'Explainer',
    description: 'Clear context with background, causes, and what happens next',
    icon: Lightbulb,
  },
  {
    id: 'human',
    label: 'Human Angle',
    description: 'Focus on people, reactions, and emotional connection',
    icon: Sparkles,
  },
  {
    id: 'data',
    label: 'Data-Led',
    description: 'Stats, trends, and chart-friendly newsroom presentation',
    icon: LayoutTemplate,
  },
  {
    id: 'local',
    label: 'Local Impact',
    description: 'How this affects communities, readers, and nearby regions',
    icon: Globe2,
  },
];

const categoryOptions = [
  'Politics',
  'World',
  'Business',
  'Technology',
  'Science',
  'Sports',
  'Health',
  'Entertainment',
];

const toneOptions = ['Neutral', 'Analytical', 'Urgent', 'Conversational', 'Authoritative'];

const sourceSuggestions = [
  'https://www.reuters.com/world/',
  'https://www.apnews.com/',
  'https://www.bbc.com/news',
  'https://www.theguardian.com/world',
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function scoreHeadline(headline: string) {
  const trimmed = headline.trim();
  const wordCount = trimmed ? trimmed.split(/\s+/).length : 0;
  const lengthScore = clamp(Math.round((wordCount / 12) * 40), 0, 40);
  const powerWords = ['breaking', 'exclusive', 'update', 'shock', 'major', 'urgent', 'new'];
  const powerScore = powerWords.reduce(
    (score, word) => score + (trimmed.toLowerCase().includes(word) ? 8 : 0),
    0
  );
  const punctuationScore = /[:?!]/.test(trimmed) ? 10 : 0;
  const balanceScore = clamp(100 - Math.abs(12 - wordCount) * 5, 0, 20);

  return clamp(lengthScore + powerScore + punctuationScore + balanceScore, 12, 100);
}

function estimateTrust(source: string) {
  const value = source.toLowerCase();
  if (!value) return 38;
  if (value.includes('reuters') || value.includes('apnews')) return 96;
  if (value.includes('bbc') || value.includes('guardian')) return 88;
  if (value.startsWith('https://')) return 72;
  return 48;
}

export default function AddNewsPage() {
  const [headline, setHeadline] = useState('Global Market Update: Investors Watch Inflation Signals');
  const [deck, setDeck] = useState('A newsroom-ready summary that keeps the article sharp, useful, and easy to publish.');
  const [sourceUrl, setSourceUrl] = useState(sourceSuggestions[0]);
  const [authorName, setAuthorName] = useState('Tanvir Rahman');
  const [category, setCategory] = useState('Business');
  const [storyAngle, setStoryAngle] = useState<StoryAngle>('data');
  const [tone, setTone] = useState('Analytical');
  const [priority, setPriority] = useState(76);
  const [publishDate, setPublishDate] = useState('');
  const [publishTime, setPublishTime] = useState('');
  const [featured, setFeatured] = useState(true);
  const [allowComments, setAllowComments] = useState(true);
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80');
  const [keywords, setKeywords] = useState('inflation, markets, economics');
  const [submitted, setSubmitted] = useState(false);

  const headlineScore = useMemo(() => scoreHeadline(headline), [headline]);
  const trustScore = useMemo(() => estimateTrust(sourceUrl), [sourceUrl]);

  const readinessScore = useMemo(() => {
    const pieces = [headlineScore, trustScore, priority];
    return Math.round(pieces.reduce((sum, value) => sum + value, 0) / pieces.length);
  }, [headlineScore, trustScore, priority]);

  const angleData = angleOptions.find((option) => option.id === storyAngle) ?? angleOptions[0];

  const tags = keywords
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 6);

  const publishLabel = publishDate && publishTime ? `${publishDate} at ${publishTime}` : 'Pick a schedule';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full space-y-8">
      <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_0.95fr] gap-8 items-start">
        <section className="space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-semibold text-sm border border-indigo-100">
              <PenLine size={16} />
              Add News
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900">Create a newsroom-ready story</h1>
              <p className="text-gray-600 mt-3 max-w-2xl">
                Build a story with a strong headline, source confidence, editorial angle, and a live preview before publishing.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-2xl border border-indigo-100 shadow-lg p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3 lg:col-span-2">
                  <label className="text-sm font-semibold text-gray-900">Headline</label>
                  <input
                    value={headline}
                    onChange={(event) => setHeadline(event.target.value)}
                    placeholder="Write a strong, publish-ready headline"
                    className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{headline.split(/\s+/).filter(Boolean).length} words</span>
                    <span className="flex items-center gap-1 text-indigo-600 font-semibold">
                      <Wand2 size={14} />
                      Headline strength {headlineScore}%
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 transition-all"
                      style={{ width: `${headlineScore}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-3 lg:col-span-2">
                  <label className="text-sm font-semibold text-gray-900">Summary / Deck</label>
                  <textarea
                    value={deck}
                    onChange={(event) => setDeck(event.target.value)}
                    rows={4}
                    placeholder="One or two lines that explain why the story matters"
                    className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent resize-none"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-900">Source URL</label>
                  <input
                    value={sourceUrl}
                    onChange={(event) => setSourceUrl(event.target.value)}
                    list="source-suggestions"
                    placeholder="https://source.example/news-story"
                    className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                  <datalist id="source-suggestions">
                    {sourceSuggestions.map((suggestion) => (
                      <option key={suggestion} value={suggestion} />
                    ))}
                  </datalist>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-900">Author</label>
                  <input
                    value={authorName}
                    onChange={(event) => setAuthorName(event.target.value)}
                    placeholder="Assigned author"
                    className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-900">Category</label>
                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  >
                    {categoryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-900">Tone</label>
                  <select
                    value={tone}
                    onChange={(event) => setTone(event.target.value)}
                    className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  >
                    {toneOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3 lg:col-span-2">
                  <label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <Target size={16} className="text-indigo-600" />
                    Story Angle
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
                    {angleOptions.map((option) => {
                      const Icon = option.icon;
                      const active = storyAngle === option.id;

                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setStoryAngle(option.id)}
                          className={`text-left rounded-xl border p-4 transition-all ${
                            active
                              ? 'border-indigo-600 bg-indigo-50 shadow-md ring-2 ring-indigo-100'
                              : 'border-gray-200 bg-white hover:border-indigo-200 hover:shadow-sm'
                          }`}
                        >
                          <Icon size={18} className={active ? 'text-indigo-600' : 'text-gray-500'} />
                          <p className="mt-3 font-bold text-gray-900">{option.label}</p>
                          <p className="mt-1 text-xs text-gray-600 leading-5">{option.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-900">Priority</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priority}
                    onChange={(event) => setPriority(parseInt(event.target.value))}
                    className="w-full accent-indigo-600"
                  />
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Editorial priority</span>
                    <span className="font-semibold text-gray-900">{priority}%</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-900">Tags</label>
                  <input
                    value={keywords}
                    onChange={(event) => setKeywords(event.target.value)}
                    placeholder="breaking, markets, politics"
                    className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500">Separate tags with commas. These appear in the story metadata.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:col-span-2">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <CalendarClock size={16} className="text-indigo-600" />
                      Publish Date
                    </label>
                    <input
                      type="date"
                      value={publishDate}
                      onChange={(event) => setPublishDate(event.target.value)}
                      className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <TimerReset size={16} className="text-indigo-600" />
                      Publish Time
                    </label>
                    <input
                      type="time"
                      value={publishTime}
                      onChange={(event) => setPublishTime(event.target.value)}
                      className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:col-span-2">
                  <label className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                    <div>
                      <p className="font-semibold text-gray-900">Featured on homepage</p>
                      <p className="text-xs text-gray-500">Push this story to the top slot</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(event) => setFeatured(event.target.checked)}
                      className="h-5 w-5 accent-indigo-600"
                    />
                  </label>
                  <label className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                    <div>
                      <p className="font-semibold text-gray-900">Allow comments</p>
                      <p className="text-xs text-gray-500">Open reader discussion under the article</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={allowComments}
                      onChange={(event) => setAllowComments(event.target.checked)}
                      className="h-5 w-5 accent-indigo-600"
                    />
                  </label>
                </div>

                <div className="space-y-3 lg:col-span-2">
                  <label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <ImagePlus size={16} className="text-indigo-600" />
                    Hero Image URL
                  </label>
                  <input
                    value={imageUrl}
                    onChange={(event) => setImageUrl(event.target.value)}
                    placeholder="https://..."
                    className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 p-4">
                  <div className="flex items-center gap-2 text-indigo-700 font-semibold text-sm">
                    <ShieldCheck size={16} />
                    Source trust
                  </div>
                  <p className="text-3xl font-black text-gray-900 mt-3">{trustScore}%</p>
                  <p className="text-xs text-gray-500 mt-1">Confidence based on source selection</p>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 p-4">
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold text-sm">
                    <BadgeCheck size={16} />
                    Readiness
                  </div>
                  <p className="text-3xl font-black text-gray-900 mt-3">{readinessScore}%</p>
                  <p className="text-xs text-gray-500 mt-1">Combined editorial score</p>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-white border border-amber-100 p-4">
                  <div className="flex items-center gap-2 text-amber-700 font-semibold text-sm">
                    <Sparkles size={16} />
                    Story angle
                  </div>
                  <p className="text-3xl font-black text-gray-900 mt-3">{angleData.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{tone} tone, {category.toLowerCase()} category</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-700"
                >
                  Publish Draft
                  <ArrowRight size={18} />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-white px-6 py-3 font-semibold text-indigo-700 transition-colors hover:bg-indigo-50"
                >
                  Save as Template
                </button>
              </div>
            </div>

            {submitted && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900 shadow-sm flex items-start gap-3">
                <CheckCircle2 size={20} className="mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold">Draft saved successfully</p>
                  <p className="text-sm mt-1">
                    Your news draft is ready for review. The publication window is set for {publishLabel}.
                  </p>
                </div>
              </div>
            )}
          </form>
        </section>

        <aside className="space-y-6 sticky top-8">
          <div className="rounded-2xl border border-indigo-100 bg-white shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-5 text-white">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-indigo-100">
                <LayoutTemplate size={16} />
                Live Preview
              </div>
              <h2 className="mt-2 text-2xl font-black leading-tight">{headline || 'Your headline preview appears here'}</h2>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="rounded-full bg-indigo-50 px-3 py-1 font-semibold text-indigo-700">{category}</span>
                <span className="inline-flex items-center gap-1 font-semibold text-gray-700">
                  <Tag size={14} />
                  Priority {priority}%
                </span>
              </div>

              <img
                src={imageUrl}
                alt={headline}
                className="h-48 w-full rounded-2xl object-cover"
              />

              <p className="text-sm leading-6 text-gray-600">{deck}</p>

              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Author</span>
                  <span className="font-semibold text-gray-900">{authorName}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Tone</span>
                  <span className="font-semibold text-gray-900">{tone}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Publish</span>
                  <span className="font-semibold text-gray-900">{publishLabel}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Featured</span>
                  <span className="font-semibold text-gray-900">{featured ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Comments</span>
                  <span className="font-semibold text-gray-900">{allowComments ? 'Enabled' : 'Disabled'}</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-semibold text-gray-900">Editorial readiness</span>
                  <span className="font-black text-indigo-700">{readinessScore}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-600 via-emerald-500 to-emerald-400 transition-all"
                    style={{ width: `${readinessScore}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-gray-900">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.length > 0 ? (
                    tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                        #{tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">No tags added yet</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white shadow-md p-6 space-y-4">
            <div className="flex items-center gap-2 text-indigo-700 font-semibold text-sm uppercase tracking-wide">
              <ShieldCheck size={16} />
              Unique Feature Set
            </div>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex gap-3">
                <CheckCircle2 size={16} className="mt-0.5 text-emerald-600 flex-shrink-0" />
                Headline strength meter for editorial polish
              </li>
              <li className="flex gap-3">
                <CheckCircle2 size={16} className="mt-0.5 text-emerald-600 flex-shrink-0" />
                Source trust scoring for newsroom confidence
              </li>
              <li className="flex gap-3">
                <CheckCircle2 size={16} className="mt-0.5 text-emerald-600 flex-shrink-0" />
                Story angle cards for faster editorial decisions
              </li>
              <li className="flex gap-3">
                <CheckCircle2 size={16} className="mt-0.5 text-emerald-600 flex-shrink-0" />
                Live preview with publish metadata and tags
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}