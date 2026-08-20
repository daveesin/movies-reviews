import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../services/moviesApi";
import { useEffect, useState } from "react";

function MovieDetails() {

    const { movieId } = useParams();
    const navigate = useNavigate();

    const [selectedMovie, setSelectedMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSelectedMovie() {
            setLoading(true);

            try {
                const movieDetails = await getMovieDetails(movieId);
                setSelectedMovie(movieDetails);
            } catch(err){
                console.log(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchSelectedMovie();

    }, [movieId])

    if (loading) {
        return (
            <div className="flex-1 flex justify-center items-center min-h-[60vh] bg-movies-bg">
                <div className="w-10 h-10 border-4 border-movies-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!selectedMovie) {
        return (
            <div className="flex-1 min-h-screen bg-movies-bg p-6 text-movies-text flex justify-center items-center">
                Filme não encontrado.
            </div>
        );
    }

    const backdropUrl = selectedMovie.backdrop_path 
        ? `https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}` 
        : null;

    return (
        <div className="flex-1 min-h-screen bg-movies-bg text-movies-text">
            <div className="max-w-5xl w-full mx-auto p-6">
            
                <button 
                    onClick={() => navigate(-1)}
                    className="mb-6 px-4 py-2 bg-movies-card border border-movies-border text-movies-text rounded-lg 
                               hover:bg-movies-accent hover:text-movies-bg hover:border-movies-accent 
                               transition cursor-pointer font-medium shadow-md flex items-center gap-2"
                >
                    ← Voltar
                </button>

                {backdropUrl && (
                    <div className="w-full h-80 rounded-2xl overflow-hidden mb-8 border border-movies-border relative shadow-lg">
                        <img src={backdropUrl} alt={selectedMovie.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-linear-to-t from-movies-bg via-movies-bg/20 to-transparent"></div>
                    </div>
                )}

                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <img 
                        src={selectedMovie.poster_path 
                            ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`
                            : 'https://via.placeholder.com/500x750?text=Sem+Imagem'} 
                        alt={selectedMovie.title}
                        className="w-64 rounded-xl border border-movies-border shadow-2xl self-center md:self-start object-cover"
                    />

                    <div className="flex-1 flex flex-col gap-4">
                        <h1 className="text-3xl md:text-4xl font-bold text-movies-text tracking-wide">
                            {selectedMovie.title}
                        </h1>
                        
                        <div className="flex items-center gap-4 text-sm font-medium text-movies-muted">
                            <span className="text-movies-accent font-bold flex items-center gap-1">
                                ★ {selectedMovie.vote_average?.toFixed(1)}
                            </span>
                            <span>•</span>
                            <span>{selectedMovie.release_date?.split('-')[0]}</span>
                            <span>•</span>
                            <span>{selectedMovie.runtime} min</span>
                        </div>

                        <p className="text-movies-text/90 leading-relaxed text-base font-normal">
                            {selectedMovie.overview || "Nenhuma sinopse disponível."}
                        </p>

                        <div className="flex gap-2 flex-wrap mt-2">
                            {selectedMovie.genres?.map((genre) => (
                                <span 
                                    key={genre.id} 
                                    className="px-3 py-1 bg-movies-card border border-movies-border text-movies-muted text-xs font-semibold rounded-full shadow-sm"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default MovieDetails;