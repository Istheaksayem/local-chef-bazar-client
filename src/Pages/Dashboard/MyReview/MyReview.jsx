/* MyReviews.jsx */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../../Hooks/useAuth";

const MyReviews = () => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [selectedReview, setSelectedReview] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch user reviews
    useEffect(() => {
        if (!user?.email) return;

        fetch(`http://localhost:5000/reviews/user/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setReviews(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [user.email]);

    // Delete Review
    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;

        fetch(`http://localhost:5000/reviews/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success("Review deleted successfully!");
                    setReviews(reviews.filter(r => r._id !== id));
                }
            })
            .catch(err => console.error(err));
    };




    // Update Review
    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedData = {
            rating: parseInt(e.target.rating.value),
            comment: e.target.comment.value
        };

        fetch(`http://localhost:5000/reviews/${selectedReview._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success("Review updated successfully!");
                    setReviews(reviews.map(r =>
                        r._id === selectedReview._id
                            ? { ...r, ...updatedData }
                            : r
                    ));
                    setSelectedReview(null);
                }
            })
            .catch(err => console.error(err));
    };

    if (loading) return <p className="text-center mt-6">Loading your reviews...</p>;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">My Reviews</h2>

            {reviews.length === 0 ? (
                <p className="text-center text-gray-500">You have not added any reviews yet.</p>
            ) : (
                <div className="grid md:grid-cols-3 gap-4">
                    {reviews.map(review => (
                        <div key={review._id} className="bg-white/80 backdrop-blur-md border border-gray-200 
rounded-2xl p-5 shadow-md hover:shadow-xl 
hover:-translate-y-1 transition-all duration-300">
                            <h3 className="font-bold text-lg">{review.mealName}</h3>
                            <p className="text-yellow-500 font-semibold">⭐ {review.rating}</p>
                            <p className="my-2">{review.comment}</p>
                            <p className="text-xs text-gray-400">
                                {new Date(review.date).toLocaleDateString()}
                            </p>

                            <div className="flex gap-2 mt-3">
                                <button
                                    onClick={() => handleDelete(review._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => setSelectedReview(review)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Update Modal */}
            {selectedReview && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl w-96 relative">
                        <h3 className="font-bold text-xl mb-4">Update Review</h3>
                        <form onSubmit={handleUpdate} className="space-y-3">
                            <input
                                type="number"
                                name="rating"
                                defaultValue={selectedReview.rating}
                                min="1"
                                max="5"
                                className="w-full border p-2 rounded"
                                required
                            />
                            <textarea
                                name="comment"
                                defaultValue={selectedReview.comment}
                                className="w-full border p-2 rounded"
                                required
                            />
                            <button type="submit" className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 transition">
                                Update
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedReview(null)}
                                className="bg-gray-300 w-full py-2 rounded hover:bg-gray-400 transition"
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

export default MyReviews;
