import { Link } from 'react-router-dom';
import { Clapperboard, DatabaseBackup } from 'lucide-react';

function Navbar() {
    return(
        <div className='flex justify-between items-center gap-3 px-10 py-8 shadow bg-movies-card text-movies-text'>

            <Link to='/' className='flex gap-3 items-center font-bold text-3xl'>
                <Clapperboard className='w-8 h-8 text-movies-accent' />
                <span>Movies Reviews</span>
            </Link>

            <nav className='flex gap-16 font-semibold'>
                <Link to='/media' className='transition-colors hover:text-movies-muted'>
                    Media
                </Link>
                <Link to='/reviews' className='transition-colors hover:text-movies-muted'>
                    My Reviews
                </Link>
                <Link to='/mylists' className='transition-colors hover:text-movies-muted'>
                    My Lists
                </Link>
            </nav>

            <div className='relative'>
                <button className='hover:cursor-pointer'>
                    <DatabaseBackup className='w-8 h-8 text-movies-accent transition-colors hover:text-movies-accent-dark' />
                </button>
            </div>

        </div>
    );
}

export default Navbar;