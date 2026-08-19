const BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_TOKEN}`
  }
};


export async function getMovies() {

    const response = await fetch(`${BASE_URL}/discover/movie`, options);
    if(!response.ok){
        throw new Error('Fail loading movies from the TMDB API.')
    }
    
    const data = await response.json();
    return data.results;
}
  