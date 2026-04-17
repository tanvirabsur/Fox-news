import Image from "next/image";
import React from 'react'

interface ArticleProps {
  title: string;
  description: string;
  category: string;
  author: string;
  authorRole: string;
  image: string;
  readTime: string;
  timestamp: string;
}

interface Props {
  article: ArticleProps;
}

export default function FeedNews({ article }: Props) {
  return (
    <div className="rounded-4xl border border-slate-200 bg-white shadow-xl overflow-hidden">
      <div className="relative h-80 overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-slate-950/20"></div>
        <div className="absolute bottom-6 left-6">
          <span className="inline-flex rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white">
            {article.category}
          </span>
        </div>
      </div>

      <div className="p-8 lg:p-10">
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span>{article.timestamp}</span>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>
        <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
          {article.title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          {article.description}
        </p>

        <div className="mt-8 flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-linear-to-tr from-indigo-600 to-rose-400 shadow-lg"></div>
          <div>
            <p className="font-semibold text-slate-900">{article.author}</p>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-500">{article.authorRole}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
