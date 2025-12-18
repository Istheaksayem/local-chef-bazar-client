import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../../Hooks/useAuth";

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
      // 🔹 Image upload
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

      // 🔹 Meal object
      const mealData = {
        foodName: data.foodName,
        chefName: data.chefName,
        foodImage: imgResult.data.url,
        price: parseFloat(data.price),
        rating: 0,
        ingredients: data.ingredients.split(","),
        estimatedDeliveryTime: data.estimatedDeliveryTime,
        chefExperience: data.chefExperience,
        chefId: data.chefId,
        chefEmail: user.email,
        createdAt: new Date(),
      };

      // 🔹 Save to DB
      const res = await fetch("http://localhost:5000/meals", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(mealData),
      });

      //  Fraud chef case
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

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Create Meal</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <input
          {...register("foodName", { required: true })}
          placeholder="Food Name"
          className="input input-bordered w-full"
        />

        <input
          {...register("chefName", { required: true })}
          placeholder="Chef Name"
          className="input input-bordered w-full"
        />

        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <input
          type="number"
          {...register("price", { required: true })}
          placeholder="Price"
          className="input input-bordered w-full"
        />

        <textarea
          {...register("ingredients", { required: true })}
          placeholder="Ingredients (comma separated)"
          className="textarea textarea-bordered w-full"
        />

        <input
          {...register("estimatedDeliveryTime", { required: true })}
          placeholder="Estimated Delivery Time"
          className="input input-bordered w-full"
        />

        <input
          {...register("chefExperience", { required: true })}
          placeholder="Chef Experience"
          className="input input-bordered w-full"
        />

        <input
          {...register("chefId", { required: true })}
          placeholder="Chef ID"
          className="input input-bordered w-full"
        />

        {/* Read-only email */}
        <input
          value={user?.email}
          readOnly
          className="input input-bordered w-full bg-gray-100"
        />

        <button className="btn btn-primary w-full">Add Meal</button>
      </form>
    </div>
  );
};

export default CreateMeal;
