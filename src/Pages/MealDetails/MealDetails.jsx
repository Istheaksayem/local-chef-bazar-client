import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

const MealDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [meal, setMeal] = useState(null);

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
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
