import { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../../Hooks/useAuth";

const CreateMeal = () => {
  const { user } = useAuth();
  const imageKey = import.meta.env.VITE_IMGBB_KEY;

  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    // 1️⃣ collect data
    const foodName = form.foodName.value;
    const chefName = form.chefName.value;
    const price = parseFloat(form.price.value);
    const ingredients = form.ingredients.value.split(",");
    const estimatedDeliveryTime = form.estimatedDeliveryTime.value;
    const chefExperience = form.chefExperience.value;
    const chefId = form.chefId.value;

    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    try {
      // 2️⃣ upload image (fetch)
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
      const imageUrl = imgResult.data.url;

      // 3️⃣ meal object
      const mealData = {
        foodName,
        chefName,
        foodImage: imageUrl,
        price,
        rating: 0,
        ingredients,
        estimatedDeliveryTime,
        chefExperience,
        chefId,
        userEmail: user.email,
        createdAt: new Date(),
      };

      // 4️⃣ save to MongoDB
      const res = await fetch("http://localhost:5000/meals", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(mealData),
      });

      const data = await res.json();

      if (data.insertedId) {
        toast.success("Meal added successfully 🍽️");
        form.reset();
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Create Meal</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="foodName" placeholder="Food Name" required className="input input-bordered w-full" />
        <input name="chefName" placeholder="Chef Name" required className="input input-bordered w-full" />

        <input type="file" accept="image/*" required className="file-input file-input-bordered w-full"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <input name="price" type="number" placeholder="Price" required className="input input-bordered w-full" />
        <textarea name="ingredients" placeholder="Ingredients (comma separated)" required className="textarea textarea-bordered w-full"></textarea>

        <input name="estimatedDeliveryTime" placeholder="Estimated Delivery Time" required className="input input-bordered w-full" />
        <input name="chefExperience" placeholder="Chef Experience" required className="input input-bordered w-full" />
        <input name="chefId" placeholder="Chef ID" required className="input input-bordered w-full" />

        {/* Read-only email */}
        <input value={user?.email} readOnly className="input input-bordered w-full bg-gray-100" />

        <button className="btn btn-primary w-full">Add Meal</button>
      </form>
    </div>
  );
};

export default CreateMeal;
