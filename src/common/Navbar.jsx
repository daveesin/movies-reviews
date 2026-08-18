import { Link } from 'react-router-dom';
import { Clapperboard } from 'lucide-react';

function Navbar() {
    return(
        <div className='flex justify-between items-center gap-3 px-8 py-8 shadow bg-movies-card text-movies-text'>

            <Link to='/' className='flex gap-3 items-center font-bold text-3xl'>
                <Clapperboard className='w-8 h-8 text-movies-accent' />
                <span>Movies Reviews</span>
            </Link>

            <nav className='flex gap-16 font-semibold'>
                <Link to='/media' className='transition-colors hover:text-movies-muted'>
                    Media
                </Link>
                <Link to='/reviews' className='transition-colors hover:text-movies-muted'>
                    Reviews
                </Link>
                <Link to='/top10' className='transition-colors hover:text-movies-muted'>
                    Top 10
                </Link>
            </nav>

            <div>
                <span>Login/Settings (?)</span>
            </div>

        </div>
    );
}

export default Navbar;