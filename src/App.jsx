import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './common/Navbar';
import Footer from './common/Footer';

import { getMovies } from './services/moviesApi';

function App() {

  const [catalog, setCatalog] = useState([]);

  useEffect(() => {
    async function fetchInitialMovies() {

      const moviesList = await getMovies();
      setCatalog(moviesList);
    }

    fetchInitialMovies();

  }, []);

  return(
    <div className='w-full h-full flex flex-col '>

      <Navbar />
      <Outlet context={{ catalog }} />
      <Footer />
    
    </div>
  );
}

export default App;