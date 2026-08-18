import { Link } from 'react-router-dom';
import { Clapperboard, Heart, HardDrive } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="w-full bg-movies-card border-t border-movies-border text-movies-text mt-auto">
            <div className="max-w-7xl mx-auto px-10 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                
                <div className="flex flex-col gap-3 max-w-sm">
                    <Link to="/" className="flex items-center gap-2 font-bold text-xl">
                        <Clapperboard className="w-6 h-6 text-movies-accent" />
                        <span>Movies Reviews</span>
                    </Link>
                    <p className="text-sm text-movies-muted">
                        Your personal platform to review all of your favorite movies and series.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-movies-muted bg-movies-bg/50 px-3 py-1.5 rounded-lg border border-movies-border w-fit">
                        <HardDrive className="w-3.5 h-3.5 text-movies-accent" />
                        <span>Your data keep saved in the navigator.</span>
                    </div>
                </div>


                <div className="flex flex-col gap-2 max-w-xs text-xs text-movies-muted">
                    <span className="font-semibold text-movies-text uppercase tracking-wider">Data Source</span>
                    <p>
                        This product uses the <strong className="text-movies-accent">TMDB</strong> API, but it's not certified by TMDB.
                    </p>
                </div>


                <div className="flex flex-col gap-3">
                    <span className="font-semibold text-xs text-movies-text uppercase tracking-wider">Developer</span>
                    <div className="flex items-center gap-4">
                        <a 
                            href="https://github.com/daveesin" 
                            target="_blank" 
                            rel="noreferrer"
                            className="p-2 rounded-lg bg-movies-border/30 hover:bg-movies-border text-movies-text hover:text-movies-accent transition-colors"
                            title="GitHub Repo"
                        >
                            <FaGithub className="w-5 h-5" />
                        </a>
                        <a 
                            href="www.linkedin.com/in/davi-silva-gonçalves-ba3121250" 
                            target="_blank" 
                            rel="noreferrer"
                            className="p-2 rounded-lg bg-movies-border/30 hover:bg-movies-border text-movies-text hover:text-movies-accent transition-colors"
                            title="LinkedIn"
                        >
                            <FaLinkedin className="w-5 h-5" />
                        </a>
                    </div>
                </div>

            </div>


            <div className="border-t border-movies-border/50 py-4 px-10 text-center text-xs text-movies-muted flex items-center justify-center gap-1">
                <span>Made with</span>
                <Heart className="w-3.5 h-3.5 text-movies-danger fill-movies-danger" />
                <span>for my portfolio.</span>
            </div>
        </footer>
    );
}

export default Footer;