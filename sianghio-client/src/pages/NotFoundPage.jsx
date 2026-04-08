import React from 'react'
import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
            
            {/* Resized Tenor Cat GIF */}
            <div className="mb-8 overflow-hidden rounded-2xl border-4 border-zinc-900 bg-white p-2 shadow-[8px_8px_0px_0px_rgba(24,24,27,1)]">
                <img 
                    src="https://media.tenor.com/FXNev31KQnIAAAAj/trackhonsool-cat.gif" 
                    alt="Dancing Cat"
                    className="h-32 w-32 object-contain md:h-48 md:w-48"
                />
            </div>

            <div className="space-y-4">
                <h1 className="text-5xl font-black tracking-tighter text-zinc-900 md:text-7xl">
                    404
                </h1>
                <p className="mx-auto max-w-xs text-sm font-medium uppercase tracking-[0.3em] text-zinc-500">
                    The link is broken, but the cat is vibing.
                </p>
            </div>

            <Link 
                to="/" 
                className="mt-10 rounded-full border-2 border-zinc-900 bg-zinc-900 px-8 py-3 text-[11px] font-bold uppercase tracking-[0.24em] text-zinc-50 transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
                Return to Centaim
            </Link>
        </div>
    )
}

export default NotFoundPage;