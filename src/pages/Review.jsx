import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../services/moviesApi';
import { CRITERIA } from '../constants/reviewForm';
import { Star } from 'lucide-react';

function Review() {

    //Declare the states and variables
    const { movieId } = useParams();
    const navigate = useNavigate();

    const [selectedMovie, setSelectedMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const [comment, setComment] = useState('');
    const [ratings, setRatings] = useState(() => 
        CRITERIA.reduce((acc, current) => {
        acc[current.id] = 0;
        return acc;
        }, {})
    );

    //useEffect to load movie data
    useEffect(() => {
        async function fetchMovieDetails() {
            setLoading(true);

            try{
                const movieDetails = await getMovieDetails(movieId);
                setSelectedMovie(movieDetails);
            } catch(err) {
                console.log(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchMovieDetails();
    }, [movieId])

    //Define functions to handle some functionalities:
    function handleSelectRating(topicId, ratingValue) {
        setRatings((prev) => ({
            ...prev,
            [topicId]: ratingValue
        }));
    };

    function handleSaveReview(movie, ratings, comments) {

        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        const ratingValues = Object.values(ratings);
        const totalScore = ratingValues.reduce((acc, curr) => acc + curr, 0);
        const overallRating = Number((totalScore / ratingValues.length).toFixed(1));

        const newReview = {
            id: movie.id,
            title: movie.title,
            backdropPath: movie.backdrop_path,
            posterPath: movie.poster_path,
            overallRating,
            ratings,
            comments,
            createdAt: new Date().toISOString()
        };

        const updatedReviews = [
            ...reviews.filter((r) => r.id !== movie.id),
            newReview
        ];

        localStorage.setItem('reviews', JSON.stringify(updatedReviews));
        navigate(`/movie/${movie.id}`);
    }


    //Return (loading case)
    if(loading) return(
        <div className="min-h-screen bg-movies-bg flex items-center justify-center">
            <h1 className="text-2xl font-semibold text-movies-muted animate-pulse">Loading...</h1>
        </div>
    );

    //Return main component jsx code
    return(
        <div className='min-h-screen bg-movies-bg text-movies-text flex justify-center p-4 sm:p-8'>
            <div className='w-full max-w-2xl bg-movies-card border border-movies-border rounded-xl p-6 sm:p-8 shadow-xl flex flex-col gap-6 self-start'>
                
                <button 
                    onClick={() => navigate(-1)}
                    className="mb-6 px-4 py-2 bg-movies-card border border-movies-border text-movies-text rounded-lg 
                            hover:bg-movies-accent hover:text-movies-bg hover:border-movies-accent 
                            transition cursor-pointer font-medium shadow-md flex items-center gap-2"
                >
                    ← Back
                </button>

                <div className='flex items-center gap-3 p-2'>
                    <img 
                        src={selectedMovie.poster_path 
                            ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`
                            : 'https://via.placeholder.com/500x750?text=Sem+Imagem'} 
                        alt={selectedMovie.title}
                        className="w-32 rounded-xl border border-movies-border shadow-2xl self-center md:self-start object-cover"
                    />
                    <div className='border-b border-movies-border pb-4'>
                        <h1 className='text-2xl font-bold text-movies-text'>
                            {selectedMovie ? `Review: ${selectedMovie.title}` : 'Write a Review'}
                        </h1>
                        <p className='text-sm text-movies-muted mt-1'>
                            Rate each criterion from 1 to 5 stars
                        </p>
                    </div>
                </div>

                <div className='flex flex-col gap-4'>
                    {CRITERIA.map((topic) => (
                        <div key={topic.id} className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 bg-movies-bg/60 border border-movies-border/60 rounded-lg'>

                            <span className='font-medium text-movies-text text-sm sm:text-base'>
                                {topic.label}
                            </span>

                            <div className='flex items-center gap-1.5'>
                                {[1,2,3,4,5].map((starValue) => {
                                    
                                    const currentRating = ratings[topic.id];
                                    const isFilled = starValue <= currentRating;

                                    return(
                                        <button
                                        key={starValue}
                                        type="button"
                                        className='p-1 transition-transform hover:scale-110 hover:cursor-pointer focus:outline-none'
                                        onClick={() => handleSelectRating(topic.id, starValue)}
                                        >
                                            <Star className={`w-6 h-6 transition-colors ${isFilled ? 'text-movies-accent fill-movies-accent' : 'text-movies-muted/40'} hover:text-movies-accent`} />
                                        </button>
                                    );
                                })}
                            </div>

                        </div>
                    ))}
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-medium text-movies-muted'>
                        Additional Comments
                    </label>
                    <textarea 
                    rows="5"
                    placeholder='Insert your comments here...'
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    className='w-full bg-movies-bg border border-movies-border text-movies-text placeholder:text-movies-muted/60 p-3.5 rounded-lg shadow-inner focus:outline-none focus:border-movies-accent transition resize-none text-sm'
                    />
                </div>

                <button
                className='w-full py-3 bg-movies-accent text-movies-bg font-bold rounded-lg hover:bg-movies-accent-dark hover:text-movies-text hover:cursor-pointer transition shadow-md active:scale-[0.99]'
                onClick={() => handleSaveReview(selectedMovie, ratings, comment)}
                >
                    Save Review
                </button>

            </div>
        </div>
    );
}

export default Review;