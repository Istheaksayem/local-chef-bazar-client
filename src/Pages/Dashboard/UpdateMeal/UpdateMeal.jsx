import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";

const UpdateMeal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);

  // load meal
  useEffect(() => {
    fetch(`https://local-chef-bazar-server-theta.vercel.app/meals-details/${id}`)
      .then(res => res.json())
      .then(data => setMeal(data));
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

    fetch(`https://local-chef-bazar-server-theta.vercel.app/meals/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updatedMeal)
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          toast.success("Meal updated successfully ✅");
          navigate("/dashboard/my-meals");
        }
      });
  };

  if (!meal) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
       <Helmet><title>UpdateMeal | local chef Bazar</title></Helmet>
      <h2 className="text-xl font-bold mb-4">Update Meal</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          defaultValue={meal?.foodName}
          name="foodName"
          placeholder="FoodName"
          className="input input-bordered w-full"
        />

        <input
          defaultValue={meal?.price}
          name="price"
          type="number"
          placeholder="price"
          className="input input-bordered w-full"
        />

        <textarea
          defaultValue={meal?.ingredients?.join(",")}
          name="ingredients"
          placeholder="ingredients"
          className="textarea textarea-bordered w-full"
        />

        <input
          defaultValue={meal?.estimatedDeliveryTime}
          name="estimatedDeliveryTime"
          placeholder="estimatedDeliveryTime"
          className="input input-bordered w-full"
        />

        <button className="btn btn-primary w-full">Update Meal</button>
      </form>
    </div>
  );
};

export default UpdateMeal;
