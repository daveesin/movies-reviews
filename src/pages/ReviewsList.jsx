import { useState } from 'react';
import { Trash, Edit } from 'lucide-react';

function ReviewsList() {
    
    const [searchTerm, setSearchTerm] = useState('');

    const [reviews, setReviews] = useState(() => {
        const savedReviews = localStorage.getItem('reviews');
        return(savedReviews ? JSON.parse(savedReviews) : []);
    });

    const filteredReviews = 
        reviews.filter((r) => r.title.toLowerCase().includes(searchTerm.toLowerCase()));



    return(
        <div>

            <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            />

            <div className='grid-cols-3'>
                {filteredReviews.map((rev) => (
                    <div className='flex gap-2 p-2 items-center'>
                        <span key={rev.id}>{rev.title}</span>
                        <button className="text-movies-accent hover:text-movies-accent-dark hover:cursor-pointer">
                            <Edit />
                        </button>
                        <button className="text-movies-danger hover:text-movies-danger-dark hover:cursor-pointer"
                        >
                            <Trash />
                        </button>
                    </div>
                ))}
            </div>

        </div>
    );

}

export default ReviewsList;