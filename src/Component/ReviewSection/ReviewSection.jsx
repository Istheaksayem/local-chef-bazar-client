/* eslint-disable */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";

const ReviewSection = () => {
  const { id } = useParams(); // foodId
  const [reviews, setReviews] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetch(`https://local-chef-bazar-server-theta.vercel.app/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [id]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    const review = {
      foodId: id,
      reviewerName: e.target.name.value,
      reviewerImage: e.target.image.value,
      rating: parseInt(e.target.rating.value),
      comment: e.target.comment.value,
      userEmail: user.email,
      date: new Date(),
    };

    const res = await fetch(
      "https://local-chef-bazar-server-theta.vercel.app/reviews",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      }
    );

    const result = await res.json();

    if (result.insertedId) {
      toast.success("Review submitted successfully!");
      setReviews([...reviews, review]);
      setIsOpen(false);
      navigate("/dashboard/my-review");
    }
  };

  const inputStyle =
    "w-full border p-2 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-700";

  return (
    <div className="my-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-400">
        Reviews
      </h2>

      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-6"
      >
        Give Review
      </button>

      {/* Review List */}
      <div className="grid md:grid-cols-3 gap-4">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="p-4 bg-white dark:bg-gray-800 shadow rounded-xl border dark:border-gray-700"
          >
            <div className="flex items-center gap-3">
              <img
                src={review.reviewerImage}
                className="w-12 h-12 rounded-full"
                alt=""
              />
              <div>
                <h3 className="font-bold text-gray-800 dark:text-gray-100">
                  {review.reviewerName}
                </h3>
                <p className="text-yellow-500 dark:text-yellow-400">
                  ⭐ {review.rating}
                </p>
              </div>
            </div>

            <p className="mt-3 text-gray-700 dark:text-gray-300">
              {review.comment}
            </p>

            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              {new Date(review.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-96 shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Write a Review
            </h3>

            <form onSubmit={handleSubmitReview} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className={inputStyle}
              />

              <input
                type="text"
                name="image"
                placeholder="Your Image URL"
                required
                className={inputStyle}
              />

              <input
                type="number"
                name="rating"
                min="1"
                max="5"
                required
                placeholder="Rating (1-5)"
                className={inputStyle}
              />

              <textarea
                name="comment"
                required
                placeholder="Write your review..."
                className={`${inputStyle} h-24`}
              ></textarea>

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full">
                Submit Review
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded w-full"
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
