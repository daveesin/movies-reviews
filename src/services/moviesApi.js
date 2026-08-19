const BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_TOKEN}`
  }
};


export async function getMovies(page=1) {

    const response = await fetch(`${BASE_URL}/discover/movie?page=${page}`, options);
    if(!response.ok) {
        throw new Error('Fail loading movies from the TMDB API.')
    }
    
    const data = await response.json();
    return {
        movies: data.results,
        currentPage: data.page,
        totalPages: data.total_pages,
    }
}

export async function searchMovies(searchTerm, page=1) {

    if(!searchTerm) return getMovies(page);
    
    const response = await fetch(`${BASE_URL}/search/movie?query=${encodeURIComponent(searchTerm)}&page=${page}`, options);
    if(!response.ok) {
        throw new Error('Fail loading seached movies from the MDB API.')
    }

    const data = await response.json();
    return {
        movies: data.results,
        currentPage: data.page,
        totalPages: data.total_pages,
    }
}