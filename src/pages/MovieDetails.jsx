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
            <div className="flex-1 flex justify-center items-center min-h-[60vh]">
                <div className="w-10 h-10 border-4 border-movies-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!selectedMovie) return <div className="p-6 text-movies-text">Filme não encontrado.</div>;

    const backdropUrl = selectedMovie.backdrop_path 
        ? `https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}` 
        : null;

    return (
        <div className="flex-1 max-w-5xl w-full mx-auto p-6 text-movies-text">
        
            <button 
                onClick={() => navigate(-1)}
                className="mb-6 px-4 py-2 bg-movies-card border border-movies-border rounded-lg hover:bg-movies-accent hover:text-movies-bg transition cursor-pointer"
            >
                ← Voltar
            </button>

            {backdropUrl && (
                <div className="w-full h-80 rounded-2xl overflow-hidden mb-6 border border-movies-border relative">
                <img src={backdropUrl} alt={selectedMovie.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-movies-bg via-transparent to-transparent"></div>
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-8">
                <img 
                src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} 
                alt={selectedMovie.title}
                className="w-64 rounded-xl border border-movies-border shadow-xl self-center md:self-start"
                />

                <div className="flex-1 flex flex-col gap-4">
                    <h1 className="text-3xl font-bold text-movies-text">{selectedMovie.title}</h1>
                    
                    <div className="flex items-center gap-4 text-sm text-movies-muted">
                        <span className="text-movies-accent font-bold">★ {selectedMovie.vote_average?.toFixed(1)}</span>
                        <span>{selectedMovie.release_date?.split('-')[0]}</span>
                        <span>{selectedMovie.runtime} min</span>
                    </div>

                    <p className="text-movies-text/80 leading-relaxed">{selectedMovie.overview}</p>

                    <div className="flex gap-2 flex-wrap mt-2">
                        {selectedMovie.genres?.map((genre) => (
                        <span key={genre.id} className="px-3 py-1 bg-movies-card border border-movies-border text-xs rounded-full">
                            {genre.name}
                        </span>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default MovieDetails;