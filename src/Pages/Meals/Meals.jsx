import React, { useEffect, useState } from "react";

import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch all meals
  useEffect(() => {
    fetch("http://localhost:5000/meals/all")
      .then(res => res.json())
      .then(data => setMeals(data));
  }, []);

  // Sort by price
  const handleSort = () => {
    const sorted = [...meals].sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
    setMeals(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSeeDetails = (id) => {
    if (!user) return navigate("/login");
    navigate(`/meals/${id}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center"> Meals</h2>

      <div className="text-right mb-4">
        <button 
          onClick={handleSort} 
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Sort by Price ({sortOrder === "asc" ? "Low → High" : "High → Low"})
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {meals.map(meal => (
          <div key={meal._id} className="border rounded-xl shadow p-4">
            <img
              src={meal.foodImage}
              alt={meal.foodName}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-xl font-bold mt-3">{meal.foodName}</h3>
            <p><span className="font-semibold">Chef:</span> {meal.chefName}</p>
            <p><span className="font-semibold">Chef ID:</span> {meal.chefId}</p>
            <p className="font-semibold text-lg text-green-600">Price: ${meal.price}</p>
            <p>Rating: ⭐ {meal.rating}</p>
            <p>Area: {meal.deliveryArea}</p>

            <button 
              onClick={() => handleSeeDetails(meal._id)} 
              className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md"
            >
              See Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Meals;
