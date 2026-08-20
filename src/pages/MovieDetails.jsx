import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/moviesApi";
import { useEffect, useState } from "react";

function MovieDetails() {

    const { movieId } = useParams()

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

    if(loading) return (<h1>Loading...</h1>);

    return(
        <h1>{selectedMovie.title}</h1>
    );
}

export default MovieDetails;