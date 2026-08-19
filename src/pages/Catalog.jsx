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
                const moviesList = await getMovies();
                setCatalog(moviesList.movies);
                setTotalPages(moviesList.totalPages);
            } catch(err) {
                console.log(`Error: ${err}`);
            } finally {
                setLoading(false);
            }
        }

        fetchInitialMovies();

    }, []);

    function handleNewPage(newPage) {
        setSearchParams({ page: newPage });
    };
    

    if (loading) return <div>Carregando filmes...</div>;

    return (
        <div className="flex-1 p-6">

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {catalog.map((movie) => (
                    <div key={movie.id} className="p-2 border rounded">
                        <h3>{movie.title}</h3>
                    </div>
                ))}
            </div>

            <div className="flex justify-center items-center gap-4 mt-8">
                <button 
                onClick={() => handleNewPage(pageFromUrl - 1)}
                disabled={pageFromUrl <= 1}
                className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
                >
                    Anterior
                </button>

                <span>Página {pageFromUrl} de {totalPages}</span>

                <button 
                onClick={() => handleNewPage(pageFromUrl + 1)}
                disabled={pageFromUrl >= totalPages}
                className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
                >
                    Próxima
                </button>
            </div>
        </div>
    );
}

export default Catalog;