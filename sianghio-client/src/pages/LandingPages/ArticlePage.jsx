import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticles } from '../../services/articleService'; // Using the unified service
import NotFoundPage from '../NotFoundPage.jsx';

const ArticlePage = () => {
    const { name } = useParams();
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchArticleData = async () => {
            try {
                const response = await getArticles();
                const foundArticle = response.data.data.find(a => a.name === name);
                setArticle(foundArticle);
            } catch (error) {
                console.error("Error loading article:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticleData();
    }, [name]);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-zinc-500 animate-pulse font-bold tracking-widest">LOADING CONTENT...</p>
            </div>
        );
    }

    if (!article) return <NotFoundPage />;

    return (
        <div className="mx-auto max-w-4xl px-6 py-12 lg:py-20">
            <div className="mb-12 flex items-center justify-between border-b border-zinc-200 pb-6">
                <Link 
                    to="/articles" 
                    className="group flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500 transition hover:text-zinc-900"
                >
                    <span className="transition-transform group-hover:-translate-x-1">←</span>
                    Back to Articles
                </Link>
                <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                    {/* Optional: Add a length-based read time if desired */}
                    {Math.ceil(article.content.join('').length / 1000)} min read
                </span>
            </div>

            <div className="mb-12 overflow-hidden rounded-3xl border-2 border-zinc-900 shadow-[12px_12px_0px_0px_rgba(24,24,27,1)]">
                {article.imageUrl ? (
                    <img 
                        src={article.imageUrl} 
                        alt={article.title} 
                        className="aspect-video w-full object-cover"
                    />
                ) : (
                    <div className="aspect-video w-full bg-zinc-200 flex items-center justify-center text-zinc-400">
                        No Image Available
                    </div>
                )}
            </div>

            {/* Article Content */}
            <article>
                <h1 className="text-4xl font-black tracking-tighter text-zinc-900 md:text-6xl text-balance mb-8">
                    {article.title}
                </h1>

                <div className="prose prose-zinc max-w-none">
                    {article.content && article.content.map((paragraph, i) => (
                        <p key={i} className="mb-6 text-lg leading-relaxed text-zinc-600">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </article>

            {/* Footer Action */}
            <div className="mt-20 border-t border-zinc-200 pt-10 text-center">
                <h3 className="text-xl font-bold text-zinc-900">Want more insights?</h3>
                <p className="mt-2 text-zinc-500">Subscribe to the Centaim Engineering newsletter.</p>
                <button className="mt-6 rounded-full bg-zinc-900 px-8 py-3 text-sm font-bold text-white transition hover:bg-zinc-800">
                    Subscribe
                </button>
            </div>
        </div>
    );
};

export default ArticlePage;