import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clapperboard, DatabaseBackup, Trash, FileDownload, FileUp } from 'lucide-react';

function Navbar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                <button 
                className='hover:cursor-pointer'
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <DatabaseBackup className='w-8 h-8 text-movies-accent transition-colors hover:text-movies-accent-dark' />
                </button>
                {isMenuOpen && (
                    <div className='absolute right-0 mt-3 w-52 bg-movies-card border border-movies-border rounded-xl shadow-2xl z-50 p-2 flex flex-col gap-1'>
                        <button 
                        className='flex gap-1 items-center px-2 py-3 rounded-md font-semibold text-movies-accent transition-colors hover:cursor-pointer hover:bg-movies-danger hover:text-movies-text'
                        >
                            <FileDownload />
                            <span>Export Backup</span>
                        </button>

                        <button 
                        className='flex gap-1 items-center px-2 py-3 rounded-md font-semibold text-movies-accent transition-colors hover:cursor-pointer hover:bg-movies-danger hover:text-movies-text'
                        >
                            <FileUp />
                            <span>Import Backup</span>
                        </button>

                        <button 
                        className='flex gap-1 items-center px-2 py-3 rounded-md font-semibold text-movies-accent transition-colors hover:cursor-pointer hover:bg-movies-danger hover:text-movies-text'
                        >
                            <Trash />
                            <span>Clean All Data</span>
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
}

export default Navbar;