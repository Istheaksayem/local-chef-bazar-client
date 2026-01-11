/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion"; // Animation er jonno
import { FaStar, FaEdit, FaTrashAlt } from "react-icons/fa"; // Icons

const MyReviews = () => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [selectedReview, setSelectedReview] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;
        fetch(`https://local-chef-bazar-server-theta.vercel.app/reviews/user/${user.email}`)
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

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;
        fetch(`https://local-chef-bazar-server-theta.vercel.app/reviews/${id}`, { method: "DELETE" })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success("Review deleted successfully!");
                    setReviews(reviews.filter(r => r._id !== id));
                }
            });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedData = {
            rating: parseInt(e.target.rating.value),
            comment: e.target.comment.value
        };

        fetch(`https://local-chef-bazar-server-theta.vercel.app/reviews/${selectedReview._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success("Review updated successfully!");
                    setReviews(reviews.map(r => r._id === selectedReview._id ? { ...r, ...updatedData } : r));
                    setSelectedReview(null);
                }
            });
    };

    if (loading) return <div className="flex justify-center items-center h-64"><span className="loading loading-bars loading-lg text-orange-500"></span></div>;

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 min-h-screen">
            <Helmet><title>My Reviews | Local Chef Bazar</title></Helmet>
            
            <header className="mb-10 text-center">
                <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 inline-block">
                    Manage My Reviews
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2 italic">Sharing your taste with the community</p>
            </header>

            {reviews.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/30 rounded-3xl border-2 border-dashed border-gray-300 dark:border-gray-700">
                    <p className="text-xl text-gray-400">No reviews found. Start tasting and sharing!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    <AnimatePresence>
                        {reviews.map((review, index) => (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.1 }}
                                key={review._id}
                                className="group relative flex flex-col md:flex-row items-center justify-between bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex-1 w-full">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-orange-500 transition-colors">
                                            {review.mealName}
                                        </h3>
                                        <div className="flex items-center bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded-lg">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} className={i < review.rating ? "text-orange-500" : "text-gray-300 dark:text-gray-600"} size={12} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed italic">"{review.comment}"</p>
                                    <span className="text-xs text-gray-400 mt-4 block uppercase tracking-wider font-semibold">
                                        Posted on: {new Date(review.date).toLocaleDateString('en-GB')}
                                    </span>
                                </div>

                                <div className="flex gap-3 mt-4 md:mt-0 md:ml-6">
                                    <button 
                                        onClick={() => setSelectedReview(review)}
                                        className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300"
                                        title="Edit Review"
                                    >
                                        <FaEdit size={18} />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(review._id)}
                                        className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300"
                                        title="Delete Review"
                                    >
                                        <FaTrashAlt size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* Modal - Modern Dark/Light support */}
            <AnimatePresence>
                {selectedReview && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-white dark:bg-gray-900 p-8 rounded-3xl w-full max-w-md shadow-2xl relative"
                        >
                            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Edit Feedback</h3>
                            <form onSubmit={handleUpdate} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-500">Rating (1-5)</label>
                                    <input
                                        type="number"
                                        name="rating"
                                        defaultValue={selectedReview.rating}
                                        min="1" max="5"
                                        className="w-full border-2 border-gray-100 dark:border-gray-700 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 focus:border-orange-500 outline-none transition"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-500">Your Comment</label>
                                    <textarea
                                        name="comment"
                                        rows="4"
                                        defaultValue={selectedReview.comment}
                                        className="w-full border-2 border-gray-100 dark:border-gray-700 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 focus:border-orange-500 outline-none transition"
                                        required
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <button type="submit" className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-orange-500/30 transition shadow-lg">
                                        Save Changes
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={() => setSelectedReview(null)}
                                        className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-200 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MyReviews;