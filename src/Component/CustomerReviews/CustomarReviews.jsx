/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomerReviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/reviews")
            .then(res => res.json())
            .then(data => setReviews(data));
    }, []);

    return (
        <div className="my-12">
            <h2 className="text-3xl font-bold text-center mb-10">
                Customer Reviews
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
                {reviews.map((review, index) => (
                    <motion.div
                        key={review._id || index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="p-6 bg-white rounded-xl shadow-lg border border-gray-100"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-lg">{review.name}</h3>
                            <p className="text-yellow-500 font-semibold">
                                ⭐ {review.rating}
                            </p>
                        </div>

                        <p className="mt-3 text-gray-600 leading-relaxed">
                            {review.comment}
                        </p>

                        <p className="mt-4 text-sm text-gray-400">
                            {review.date}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default CustomerReviews;
