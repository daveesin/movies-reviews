import { Link } from 'react-router-dom';
import { Clapperboard } from 'lucide-react';

function Navbar() {
    return(
        <div className='flex justify-between items-center gap-3 p-6 w-full h-full max-h-80 shadow bg-movies-card text-movies-text'>

            <Link to='/' className='flex gap-3 items-center font-bold text-3xl'>
                <Clapperboard />
                <span>Movies Reviews</span>
            </Link>

            <div>
                <span>List</span>
            </div>

            <div>
                <span>Login/Settings (?)</span>
            </div>

        </div>
    );
}

export default Navbar;