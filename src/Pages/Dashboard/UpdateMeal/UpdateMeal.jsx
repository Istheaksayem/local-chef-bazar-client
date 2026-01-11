import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";

const UpdateMeal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    fetch(
      `https://local-chef-bazar-server-theta.vercel.app/meals-details/${id}`
    )
      .then((res) => res.json())
      .then((data) => setMeal(data));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedMeal = {
      foodName: form.foodName.value,
      price: parseFloat(form.price.value),
      estimatedDeliveryTime: form.estimatedDeliveryTime.value,
      ingredients: form.ingredients.value.split(","),
    };

    fetch(
      `https://local-chef-bazar-server-theta.vercel.app/meals/${id}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(updatedMeal),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Meal updated successfully ✅");
          navigate("/dashboard/my-meals");
        }
      });
  };

  if (!meal)
    return (
      <p className="text-center text-gray-600 dark:text-gray-300">
        Loading...
      </p>
    );

  const inputStyle =
    "input input-bordered w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-700";

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 shadow rounded mt-6">
      <Helmet>
        <title>UpdateMeal | Local Chef Bazar</title>
      </Helmet>

      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Update Meal
      </h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          defaultValue={meal?.foodName}
          name="foodName"
          placeholder="Food Name"
          className={inputStyle}
        />

        <input
          defaultValue={meal?.price}
          name="price"
          type="number"
          placeholder="Price"
          className={inputStyle}
        />

        <textarea
          defaultValue={meal?.ingredients?.join(",")}
          name="ingredients"
          placeholder="Ingredients"
          className="textarea textarea-bordered w-full
                     bg-white dark:bg-gray-800
                     text-gray-800 dark:text-gray-100
                     border-gray-300 dark:border-gray-700"
        />

        <input
          defaultValue={meal?.estimatedDeliveryTime}
          name="estimatedDeliveryTime"
          placeholder="Estimated Delivery Time"
          className={inputStyle}
        />

        <button className="btn btn-primary w-full">
          Update Meal
        </button>
      </form>
    </div>
  );
};

export default UpdateMeal;
