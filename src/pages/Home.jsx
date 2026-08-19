import { Link } from 'react-router-dom';
import { Star, Film, Bookmark, Sparkles } from 'lucide-react';

function Home() {
    return (
        <div className="flex flex-col gap-16 pb-16">
            
            <section className="relative w-full py-20 px-6 flex flex-col items-center text-center bg-linear-to-b from-movies-card/60 to-transparent border-b border-movies-border/40">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-movies-accent/10 border border-movies-accent/30 text-movies-accent text-xs font-semibold mb-6">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Your Personal Media Workspace</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black max-w-3xl leading-tight text-movies-text mb-4">
                    Track, Review & Build Your Ultimate Collection
                </h1>

                <p className="text-movies-muted max-w-xl text-base md:text-lg mb-8">
                    Discover trending movies, log your personal reviews with pros & cons, and curate custom lists directly in your browser.
                </p>

                <div className="flex items-center gap-4">
                    <Link to="/media" className="px-6 py-3 rounded-xl bg-movies-accent text-movies-bg font-bold text-sm hover:opacity-90 transition-opacity">
                        Explore Catalog
                    </Link>
                    <Link to="/reviews" className="px-6 py-3 rounded-xl bg-movies-border/40 border border-movies-border text-movies-text font-bold text-sm hover:bg-movies-border/70 transition-colors">
                        View My Reviews
                    </Link>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-10 w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-movies-card border border-movies-border flex flex-col gap-3">
                    <div className="p-3 rounded-xl bg-movies-accent/10 w-fit text-movies-accent">
                        <Star className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg text-movies-text">Personal Reviews</h3>
                    <p className="text-sm text-movies-muted">
                        Write detailed logs with ratings, custom notes, pros, and cons for any title.
                    </p>
                </div>

                <div className="p-6 rounded-2xl bg-movies-card border border-movies-border flex flex-col gap-3">
                    <div className="p-3 rounded-xl bg-movies-accent/10 w-fit text-movies-accent">
                        <Bookmark className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg text-movies-text">Custom Lists</h3>
                    <p className="text-sm text-movies-muted">
                        Group movies into themes like "Weekend Marathon" or "All-Time Top 10".
                    </p>
                </div>

                <div className="p-6 rounded-2xl bg-movies-card border border-movies-border flex flex-col gap-3">
                    <div className="p-3 rounded-xl bg-movies-accent/10 w-fit text-movies-accent">
                        <Film className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg text-movies-text">TMDB Integration</h3>
                    <p className="text-sm text-movies-muted">
                        Access official posters, release dates, genres, and overview details in real-time.
                    </p>
                </div>
            </section>

        </div>
    );
}

export default Home;