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


    async function handleDeleteReview(reviewId) {
        const newReviews = reviews.filter((r) => r.id !== reviewId);
        setReviews(newReviews);
        localStorage.setItem('reviews', JSON.stringify(newReviews));
    }


    return(
        <div>

            <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            />

            <div className='grid-cols-3'>
                {filteredReviews.map((rev) => (
                    <div key={rev.id} className='flex gap-2 p-2 items-center'>
                        <span>{rev.title}</span>
                        <button className="text-movies-accent hover:text-movies-accent-dark hover:cursor-pointer">
                            <Edit />
                        </button>
                        <button className="text-movies-danger hover:text-movies-danger-dark hover:cursor-pointer"
                        onClick={() => handleDeleteReview(rev.id)}
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