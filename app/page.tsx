'use client';

import FeedNews from "@/Components/FeedNews";
import FeedSlider from "@/Components/FeedSlider";
import useFetch from "@/Hooks/usefetch";
import Link from "next/link";

interface Article {
  id: number;
  title: string;
  description: string;
  category: string;
  author: string;
  authorRole: string;
  image: string;
  readTime: string;
  timestamp: string;
}

interface FakeNewsResponse {
  articles: Article[];
}

export default function Home() {
  const { data, loading, error } = useFetch<FakeNewsResponse>({ url: "/fakenews.json" });
  const featuredArticle = data?.articles[0];
  const latestArticles = data?.articles.slice(1) ?? [];

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      <div className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-indigo-600">Daily Briefing</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Trusted reporting and curated stories for your day.
            </h2>
          </div>
          <div className="text-sm text-slate-500">{new Date().toLocaleDateString()}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-10">
          {loading && (
            <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
              Loading latest stories...
            </div>
          )}

          {error && (
            <div className="rounded-[2rem] border border-rose-200 bg-rose-50 p-10 text-center text-rose-700 shadow-sm">
              {error}
            </div>
          )}

          {featuredArticle && <FeedNews article={featuredArticle} />}

          {latestArticles.length > 0 && (
            <div className="grid gap-6 lg:grid-cols-2">
              {latestArticles.map((article) => (
                <article key={article.id} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-indigo-600">
                      {article.category}
                    </span>
                    <span className="text-xs text-slate-400">{article.readTime}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-900">
                    <Link href={`/news/${article.id}`} className="hover:text-indigo-600 transition-colors">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {article.description}
                  </p>
                  <div className="mt-6 flex items-center gap-3 text-sm text-slate-500">
                    <div className="h-10 w-10 rounded-full bg-linear-to-tr from-indigo-600 to-rose-400" />
                    <div>
                      <p className="font-semibold text-slate-900">{article.author}</p>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{article.authorRole}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <FeedSlider />
      </div>
    </main>
  );
}
