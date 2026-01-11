import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import SkeletonCard from "../../Component/Skeleton/SkeletonCard";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  
  // 🔹 Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  const itemsPerPage = 8;
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("https://local-chef-bazar-server-theta.vercel.app/meals/all")
      .then(res => res.json())
      .then(data => {
        setMeals(data);
        setFilteredMeals(data); // শুরুতে সব ডাটা দেখাবে
        setLoading(false);
      });
  }, []);

  // 🔥 Filtering Logic (Search + Category + Area)
  useEffect(() => {
    let result = [...meals];

    // Search by Name
    if (searchTerm) {
      result = result.filter(meal =>
        meal.foodName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by Category 
    if (selectedCategory) {
      result = result.filter(meal => meal.category === selectedCategory);
    }

    // Filter by Area
    if (selectedArea) {
      result = result.filter(meal => meal.deliveryArea === selectedArea);
    }

    setFilteredMeals(result);
    setCurrentPage(1); 
  }, [searchTerm, selectedCategory, selectedArea, meals]);

  // 🔹 Sort by price
  const handleSort = () => {
    const sorted = [...filteredMeals].sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
    setFilteredMeals(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // 🔹 Pagination Calculation
  const totalPages = Math.ceil(filteredMeals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMeals = filteredMeals.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <Helmet>
        <title>Explore Meals | Local Chef Bazar</title>
      </Helmet>

      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Explore Our Meals</h2>

        {/* 🛠 Search & Filter Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by food name..."
            className="input input-bordered w-full p-2 border rounded"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Category Filter (Example) */}
          <select 
            className="select select-bordered p-2 border rounded"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>

          {/* Area Filter */}
          <select 
            className="select select-bordered p-2 border rounded"
            onChange={(e) => setSelectedArea(e.target.value)}
          >
            <option value="">All Areas</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chittagong">Chittagong</option>
            
          </select>

          {/* Sort Button */}
          <button
            onClick={handleSort}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Price: {sortOrder === "asc" ? "Low to High" : "High to Low"}
          </button>
        </div>

        {/* 🔥 Meals Grid */}
        {currentMeals.length === 0 && !loading ? (
          <p className="text-center text-gray-500">No meals found matching your criteria.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))
              : currentMeals.map(meal => (
                  <div key={meal._id} className="border rounded-xl shadow p-4 hover:shadow-lg transition">
                    <img
                      src={meal.foodImage}
                      alt={meal.foodName}
                      className="w-full h-48 object-cover rounded"
                    />
                    <h3 className="text-xl font-bold mt-3">{meal.foodName}</h3>
                    <p className="text-sm text-gray-600">Area: {meal.deliveryArea}</p>
                    <p className="font-semibold text-lg text-green-600 mt-2">${meal.price}</p>
                    <button
                      onClick={() => navigate(`/meals/${meal._id}`)}
                      className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md"
                    >
                      See Details
                    </button>
                  </div>
                ))}
          </div>
        )}

        {/* 🔹 Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="flex items-center px-4 font-bold">Page {currentPage} of {totalPages}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Meals;