import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../services/moviesApi';

function Review() {

    const { movieId } = useParams();
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const [comment, setComment] = useState('');
    const [overallRating, setOverallRating] = useState(0.0);
    const [ratings, setRatings] = useState(null);
    const [review, setReview] = useState(null);

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

    return(
        <h1>Review</h1>
    );
}

export default Review;