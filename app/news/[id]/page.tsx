import Image from "next/image";
import Link from "next/link";
import fakenewsData from "../../../public/fakenews.json";

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

interface Props {
  params: {
    id: string;
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const data: FakeNewsResponse = fakenewsData;

  const articleId = Number.parseInt(resolvedParams.id, 10);
  const article = data.articles.find(
    (item) => item.id === articleId || String(item.id) === resolvedParams.id
  );
  const availableIds = data.articles.map((item) => String(item.id)).join(", ");

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 md:py-20">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-indigo-600">News Detail</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            {article?.title ?? `Article not found for ${resolvedParams.id}`}
          </h1>
        </div>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100"
        >
          Back to home
        </Link>
      </div>

      {!article && (
        <div className="rounded-4xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
          <p>We couldn’t find this article.</p>
          <p>Requested ID: <strong>{resolvedParams.id}</strong></p>
          <p>Parsed ID: <strong>{Number.isNaN(articleId) ? "invalid" : articleId}</strong></p>
          <p>Available IDs: <strong>{availableIds}</strong></p>
          <p className="mt-4">Please go back and choose another story.</p>
        </div>
      )}

      {article && (
        <article className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-xl">
          <div className="relative h-96 overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/20" />
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
            <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              {article.title}
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              {article.description}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-slate-900">{article.author}</p>
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500">{article.authorRole}</p>
              </div>
              <span className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
                Article ID: {article.id}
              </span>
            </div>
          </div>
        </article>
      )}
    </main>
  );
}
