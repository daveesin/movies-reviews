import { useOutletContext } from 'react-router-dom';

function Catalog() {
    
    const { catalog } = useOutletContext();
    
    return(

        catalog.map((movie) => {
            return(
                <h1>{movie.original_title}</h1>
            );
        })
        
    );
}

export default Catalog;