import { Link } from 'react-router-dom';
import Button from '../components/Button';
import articles from '../assets/article-content.js';

const ArticleListPage = () => {
  return (
    <div className="flex w-full flex-col gap-8 bg-zinc-50">
      {/* Hero Section */}
      <section className="border-b-2 border-zinc-900 bg-white px-6 py-12 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400">
            Centaim Insights
          </p>
          <h1 className="max-w-2xl text-4xl font-black leading-none text-zinc-900 md:text-6xl text-balance">
            Engineering the <span className="text-zinc-500">Next Standard.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">
            Expert analysis on scaling systems, optimizing business operations, 
            and the future of enterprise engineering.
          </p>
          <div className="mt-10">
            <Button to="/">Back to Dashboard</Button>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-24">
        <div className="mb-10 flex items-end justify-between border-b border-zinc-200 pb-6">
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link 
              key={article.name} 
              to={`/articles/${article.name}`}
              className="group block overflow-hidden rounded-2xl border-2 border-zinc-900 bg-white transition hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(24,24,27,1)]"
            >
              {/* Image Container */}
              <div className="aspect-video w-full border-b-2 border-zinc-900 overflow-hidden bg-zinc-100">
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Text Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold leading-tight text-zinc-900 group-hover:underline">
                  {article.title}
                </h3>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-zinc-600">
                  {article.content[0]}
                </p>
                <div className="mt-6 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-zinc-900">
                  Read Article
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ArticleListPage;