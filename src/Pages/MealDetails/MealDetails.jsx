import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import ReviewSection from "../../Component/ReviewSection/ReviewSection";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";

const MealDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [meal, setMeal] = useState(null);
  const {user}=useAuth()

  useEffect(() => {
    fetch(`http://localhost:5000/meals/${id}`)
      .then(res => res.json())
      .then(data => setMeal(data));
  }, [id]);

  if (!meal) {
    return <p className="text-center mt-10 text-xl">Loading Meal Details...</p>;
  }

  const handleOrder = () => {
    navigate(`/order/${meal._id}`);
  };

   // ⭐ ADD TO FAVORITE FUNCTION
  const handleFavorite = () => {
    if (!user) {
      return alert("Please login to add to favorite!");
    }

    const favoriteData = {
      userEmail: user.email,
      mealId: meal._id,
      mealName: meal.foodName,
      chefId: meal.chefId,
      chefName: meal.chefName,
      price: meal.price
    };

    fetch("http://localhost:5000/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(favoriteData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          toast("❤️ Added to favorites!");
        } else {
          toast(data.message);
        }
      });
  };


  return (
    <div className="container mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        
        {/* Image */}
        <img 
          src={meal.foodImage}
          alt={meal.foodName}
          className="w-full h-80 object-cover rounded-xl shadow"
        />

        {/* Text Info */}
        <div>
          <h2 className="text-4xl font-bold mb-4">{meal.foodName}</h2>
          <p className="text-lg"><strong>Chef Name:</strong> {meal.chefName}</p>
          <p className="text-lg"><strong>Chef ID:</strong> {meal.chefId}</p>
          <p className="text-lg"><strong>Experience:</strong> {meal.chefExperience} </p>

          <p className="text-lg mt-3 text-green-600 font-bold text-2xl">
            Price: ${meal.price}
          </p>

          <p className="text-lg"><strong>Rating:</strong> ⭐ {meal.rating}</p>

          <p><strong>Delivery Area:</strong> {meal.deliveryArea}</p>
          <p><strong>Estimated Delivery Time:</strong> {meal.estimatedDeliveryTime} </p>

          <p className="mt-2">
            <strong>Ingredients:</strong> {meal.ingredients?.join(", ")}
          </p>

          <button
            onClick={handleOrder}
            className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg w-full"
          >
            Order Now
          </button>
          {/*  Favorite Button */}
          <button
           onClick={handleFavorite}
            className="mt-3 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg w-full"
          >
            ❤️ Add to Favorite
          </button>
        </div>
      </div>
      {/* reviw se */}
      <ReviewSection></ReviewSection>
    </div>
  );
};

export default MealDetails;
