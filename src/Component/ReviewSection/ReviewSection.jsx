/* eslint-disable */
import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";



const ReviewSection = () => {
    const { id } = useParams(); // foodId
    const [reviews, setReviews] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const navigate =useNavigate()
    const {user} =useAuth()

    

    useEffect(() => {
        fetch(`https://local-chef-bazar-server-theta.vercel.app/reviews/${id}`)
            .then(res => res.json())
            .then(data => setReviews(data));
    }, [id]);

    const handleSubmitReview = async (e) => {
        e.preventDefault();

        const review = {
            foodId: id,
            reviewerName: e.target.name.value,
            reviewerImage: e.target.image.value,
            rating: parseInt(e.target.rating.value),
            comment: e.target.comment.value,
            userEmail:user.email
        };
        console.log(review)
        const res = await fetch("https://local-chef-bazar-server-theta.vercel.app/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(review)
        });

        const result = await res.json();
        console.log(result)

        if (result.insertedId) {
            toast("Review submitted successfully!");
            setReviews([...reviews, review]);
            setIsOpen(false);
            navigate('/dashboard/my-review')
        }
    };

    return (
        <div className="my-12">
            <h2 className="text-3xl font-bold mb-6"> Reviews</h2>

            <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
            >
                Give Review
            </button>

            {/* Review List */}
            <div className="grid md:grid-cols-3 gap-4">
                {reviews.map((review, index) => (
                    <div key={index} className="p-4 bg-white shadow rounded-xl border">
                        <div className="flex items-center gap-3">
                            <img
                                src={review.reviewerImage}
                                className="w-12 h-12 rounded-full"
                                alt=""
                            />
                            <div>
                                <h3 className="font-bold">{review.reviewerName}</h3>
                                <p className="text-yellow-500">⭐ {review.rating}</p>
                            </div>
                        </div>

                        <p className="mt-3">{review.comment}</p>

                        <p className="text-xs text-gray-400 mt-2">
                            {new Date(review.date).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>

            {/* Review Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
                        <h3 className="text-xl font-bold mb-4">Write a Review</h3>

                        <form onSubmit={handleSubmitReview} className="space-y-3">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                required
                                className="w-full border p-2"
                            />

                            <input
                                type="text"
                                name="image"
                                placeholder="Your Image URL"
                                required
                                className="w-full border p-2"
                            />
                          

                            <input
                                type="number"
                                name="rating"
                                min="1"
                                max="5"
                                required
                                placeholder="Rating (1-5)"
                                className="w-full border p-2"
                            />

                            <textarea
                                name="comment"
                                required
                                placeholder="Write your review..."
                                className="w-full border p-2"
                            ></textarea>

                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                            >
                                Submit Review
                            </button>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="bg-gray-300 text-black px-4 py-2 rounded w-full mt-2"
                                type="button"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewSection;
