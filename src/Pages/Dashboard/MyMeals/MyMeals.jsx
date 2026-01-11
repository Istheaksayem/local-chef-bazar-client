import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";

const MyMeals = () => {
  const { user } = useAuth();
  const [meals, setMeals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;

    fetch(
      `https://local-chef-bazar-server-theta.vercel.app/meals?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => setMeals(data));
  }, [user]);

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this meal?"
    );
    if (!confirm) return;

    fetch(
      `https://local-chef-bazar-server-theta.vercel.app/meals/${id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Meal deleted successfully 🍽️");
          setMeals(meals.filter((meal) => meal._id !== id));
        }
      });
  };

  const handleUpdate = (id) => {
    navigate(`/dashboard/update-meal/${id}`);
  };

  return (
    <div className="p-6 text-gray-800 dark:text-gray-100">
      <Helmet>
        <title>MyMeals | Local Chef Bazar</title>
      </Helmet>

      <h2 className="text-2xl font-bold mb-6">
        My Meals
      </h2>

      {meals.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">
          No meals added yet.
        </p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div
            key={meal._id}
            className="card bg-white dark:bg-gray-800 shadow-xl border dark:border-gray-700"
          >
            <figure>
              <img
                src={meal.foodImage}
                alt={meal.foodName}
                className="h-48 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">
                {meal.foodName}
              </h2>

              <p><b>Chef:</b> {meal.chefName}</p>
              <p><b>Chef ID:</b> {meal.chefId || "N/A"}</p>
              <p><b>Price:</b> ৳{meal.price}</p>
              <p><b>Rating:</b> {meal.rating}</p>
              <p><b>Delivery:</b> {meal.estimatedDeliveryTime}</p>

              <p className="text-sm text-gray-700 dark:text-gray-300">
                <b>Ingredients:</b>{" "}
                {meal.ingredients.join(", ")}
              </p>

              <div className="flex gap-2 mt-4 justify-between">
                <button
                  onClick={() => handleUpdate(meal._id)}
                  className="btn btn-sm btn-info"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(meal._id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyMeals;
