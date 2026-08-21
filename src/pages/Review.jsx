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


    //Return (loading case)
    if(loading) return(<h1>Loading...</h1>);

    //Return main component jsx code
    return(
        <div className='flex flex-col gap-5 p-6'>

            {CRITERIA.map((topic) => (
                <div key={topic.id} className='flex flex-col gap-4 p-2'>

                    <span>{topic.label}</span>

                    <div className='flex items-center gap-2 p-2'>
                        {[1,2,3,4,5].map((starValue) => {
                            
                            const currentRating = ratings[topic.id];
                            const isFilled = starValue <= currentRating;

                            return(
                                <button
                                key={starValue}
                                className='text-movies-card hover:text-movies-accent hover:cursor-pointer'
                                onClick={() => handleSelectRating(topic.id, starValue)}
                                >
                                    <Star className={`${isFilled ? 'text-movies-accent-dark fill-movies-accent-dark' : 'text-movies-card'} hover:text-movies-accent`} />
                                </button>
                            );
                        })}
                    </div>

                </div>
            ))}

            <textarea 
            rows="6"
            cols="60"
            type="text"
            placeholder='Insert your comments here...'
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            className='p-2'
            />

        </div>
    );
}

export default Review;