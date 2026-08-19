import { useState, useEffect } from 'react';
import { getMovies } from '../services/moviesApi';
import { useSearchParams } from 'react-router-dom';

function Catalog() {
    
    const [searchParams, setSearchParams] = useSearchParams();
    const pageFromUrl = Number(searchParams.get('page')) || 1;

    const [catalog, setCatalog] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchInitialMovies() {
            setLoading(true);
            try {
                const moviesList = await getMovies(pageFromUrl);
                setCatalog(moviesList.movies);
                setTotalPages(moviesList.totalPages);
            } catch(err) {
                console.log(`Error: ${err}`);
            } finally {
                setLoading(false);
            }
        }

        fetchInitialMovies();

    }, [pageFromUrl]);

    function handleNewPage(newPage) {
        setSearchParams({ page: newPage });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    

    if (loading) {
        return (
            <div className="flex-1 flex flex-col justify-center items-center min-h-[60vh] gap-3">
                <div className="w-10 h-10 border-4 border-movies-accent border-t-transparent rounded-full animate-spin"></div>
                <span className="text-movies-muted font-medium text-sm">Carregando catálogo...</span>
            </div>
        );
    }

    return (
        <div className="flex-1 max-w-7xl w-full mx-auto p-6 flex flex-col justify-between text-movies-text">
        
            <div className="mb-6 flex justify-between items-center border-b border-movies-border pb-4">
                <h1 className="text-2xl font-bold text-movies-border tracking-wide">Catálogo de Filmes</h1>
                <span className="text-sm text-movies-muted font-medium">Página {pageFromUrl} de {totalPages}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {catalog.map((movie) => {
                    const posterUrl = movie.poster_path 
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : 'https://via.placeholder.com/500x750?text=Sem+Imagem';
                        
                    const releaseYear = movie.release_date 
                        ? new Date(movie.release_date).getFullYear() 
                        : 'N/A';

                    return (
                        <div 
                        key={movie.id} 
                        className="bg-movies-card border border-movies-border rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:border-movies-accent/50 flex flex-col justify-between group cursor-pointer"
                        >
                            <div className="relative overflow-hidden">
                                <img 
                                src={posterUrl} 
                                alt={movie.title} 
                                className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <span className="absolute top-2 right-2 bg-movies-bg/80 backdrop-blur-md text-movies-accent font-bold text-xs px-2 py-1 rounded-md border border-movies-border flex items-center gap-1 shadow-md">
                                    ★ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                                </span>
                            </div>

                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-movies-text font-semibold text-base line-clamp-1 group-hover:text-movies-accent transition-colors" title={movie.title}>
                                        {movie.title}
                                    </h3>
                                    <p className="text-movies-muted text-xs mt-1">{releaseYear}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>


            <div className="flex justify-center items-center gap-4 mt-10">
                    <button 
                    onClick={() => handleNewPage(pageFromUrl - 1)}
                    disabled={pageFromUrl <= 1}
                    className="px-5 py-2.5 bg-movies-card border border-movies-border text-movies-text font-medium rounded-lg 
                                hover:bg-movies-accent hover:text-movies-bg hover:border-movies-accent 
                                active:scale-95 transition-all duration-200 cursor-pointer 
                                disabled:opacity-30 disabled:hover:bg-movies-card disabled:hover:text-movies-text disabled:hover:border-movies-border disabled:cursor-not-allowed disabled:active:scale-100 shadow-md"
                    >
                        ← Anterior
                    </button>

                    <span className="text-movies-muted font-semibold text-sm px-2">
                        {pageFromUrl} / {totalPages}
                    </span>

                    <button 
                    onClick={() => handleNewPage(pageFromUrl + 1)}
                    disabled={pageFromUrl >= totalPages}
                    className="px-5 py-2.5 bg-movies-card border border-movies-border text-movies-text font-medium rounded-lg 
                                hover:bg-movies-accent hover:text-movies-bg hover:border-movies-accent 
                                active:scale-95 transition-all duration-200 cursor-pointer 
                                disabled:opacity-30 disabled:hover:bg-movies-card disabled:hover:text-movies-text disabled:hover:border-movies-border disabled:cursor-not-allowed disabled:active:scale-100 shadow-md"
                    >
                        Próxima →
                    </button>
            </div>

        </div>
    );
}

export default Catalog;