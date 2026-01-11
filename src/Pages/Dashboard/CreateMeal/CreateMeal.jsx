import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

const CreateMeal = () => {
  const { user } = useAuth();
  const imageKey = import.meta.env.VITE_IMGBB_KEY;

  const { register, handleSubmit, reset } = useForm();
  const [image, setImage] = useState(null);

  const onSubmit = async (data) => {
    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    try {
      const imageData = new FormData();
      imageData.append("image", image);

      const imgRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${imageKey}`,
        {
          method: "POST",
          body: imageData,
        }
      );

      const imgResult = await imgRes.json();

      if (!imgResult.success) {
        toast.error("Image upload failed");
        return;
      }

      const mealData = {
        foodName: data.foodName,
        chefName: data.chefName,
        foodImage: imgResult.data.url,
        price: parseFloat(data.price),
        rating: 0,
        ingredients: data.ingredients.split(","),
        estimatedDeliveryTime: data.estimatedDeliveryTime,
        chefExperience: data.chefExperience,
        chefEmail: user.email,
        createdAt: new Date(),
      };

      const res = await fetch(
        "https://local-chef-bazar-server-theta.vercel.app/meals",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(mealData),
        }
      );

      if (res.status === 403) {
        const err = await res.json();
        toast.error(err.message || "You are blocked");
        return;
      }

      const result = await res.json();

      if (result.insertedId) {
        toast.success("Meal added successfully 🍽️");
        reset();
        setImage(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const inputStyle =
    "input input-bordered w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-700";

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow mt-6">
      <Helmet>
        <title>CreateMeal | Local Chef Bazar</title>
      </Helmet>

      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Create Meal
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("foodName", { required: true })}
          placeholder="Food Name"
          className={inputStyle}
        />

        <input
          {...register("chefName", { required: true })}
          placeholder="Chef Name"
          className={inputStyle}
        />

        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full
                     bg-white dark:bg-gray-800
                     text-gray-800 dark:text-gray-100
                     border-gray-300 dark:border-gray-700"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <input
          type="number"
          {...register("price", { required: true })}
          placeholder="Price"
          className={inputStyle}
        />

        <textarea
          {...register("ingredients", { required: true })}
          placeholder="Ingredients (comma separated)"
          className="textarea textarea-bordered w-full
                     bg-white dark:bg-gray-800
                     text-gray-800 dark:text-gray-100
                     border-gray-300 dark:border-gray-700"
        />

        <input
          {...register("estimatedDeliveryTime", { required: true })}
          placeholder="Estimated Delivery Time"
          className={inputStyle}
        />

        <input
          {...register("chefExperience", { required: true })}
          placeholder="Chef Experience"
          className={inputStyle}
        />

        {/* Read-only email */}
        <input
          value={user?.email}
          readOnly
          className="input input-bordered w-full
                     bg-gray-100 dark:bg-gray-700
                     text-gray-800 dark:text-gray-100
                     border-gray-300 dark:border-gray-700"
        />

        <button className="btn btn-primary w-full">
          Add Meal
        </button>
      </form>
    </div>
  );
};

export default CreateMeal;
