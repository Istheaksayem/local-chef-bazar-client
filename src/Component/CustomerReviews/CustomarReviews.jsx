import { useEffect, useState } from "react";

const CustomerReviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch("https://local-chef-bazar-server-theta.vercel.app/reviews/home?limit=3")
            .then(res => res.json())
            .then(data => setReviews(data));
    }, []);

    return (
        <div className="my-10">
            <h2 className="text-3xl font-bold mb-5 text-center">Customer Reviews</h2>

            <div className="grid md:grid-cols-3 gap-6">
                {reviews.map(review => (
                    <div key={review._id} className="p-5 border rounded-lg shadow">
                        <div className="flex items-center gap-3 mb-3">
                            <img
                                src={review.reviewerImage}
                                alt="User"
                                className="w-12 h-12 rounded-full"
                            />
                            <div>
                                <h3 className="font-semibold">{review.reviewerName}</h3>
                                <p className="text-sm text-yellow-500">
                                    ⭐ {review.rating}
                                </p>
                            </div>
                        </div>

                        <p className="text-gray-600">{review.comment}</p>
                        <p className="text-xs mt-3 text-gray-400">
                            {new Date(review.date).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomerReviews;
