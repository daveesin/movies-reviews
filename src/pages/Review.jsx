import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../services/moviesApi';
import { CRITERIA } from '../constants/reviewForm';

function Review() {

    //Declare the states and variables
    const { movieId } = useParams();
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const [comment, setComment] = useState('');
    const [ratings, setRatings] = useState({
        acting: 0,
        screenplay: 0,
        plot: 0,
        direction: 0,
        cinematography: 0,
        soundtrack: 0,
        climax: 0,
        rewatchability: 0
    });

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

    //Return main component jsx code
    return(
        <h1>Review</h1>
    );
}

export default Review;