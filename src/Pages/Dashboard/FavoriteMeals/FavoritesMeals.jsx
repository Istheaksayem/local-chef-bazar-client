import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

const FavoriteMeals = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 get favorite meals
  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:5000/favorites/${user.email}`)
      .then(res => res.json())
      .then(data => {
        setFavorites(data);
        setLoading(false);
      });
  }, [user]);

  // 🔹 delete favorite
  const handleDelete = (id) => {
    if (!window.confirm("Remove this meal from favorites?")) return;

    fetch(`http://localhost:5000/favorites/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          toast.success("Meal removed from favorites successfully ❤️");
          setFavorites(favorites.filter(item => item._id !== id));
        }
      });
  };

  if (loading) {
    return <p className="text-center mt-10">Loading favorites...</p>;
  }

  return (
    <div className="container mx-auto p-6">
       <Helmet><title>FavoritesMeals | local chef Bazar</title></Helmet>
      <h2 className="text-3xl font-bold mb-6">My Favorite Meals</h2>

      {favorites.length === 0 ? (
        <p>No favorite meals found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th>SL NO</th>
                <th>Meal Name</th>
                <th>Chef Name</th>
                <th>Price</th>
                <th>Date Added</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {favorites.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.mealName}</td>
                  <td>{item.chefName}</td>
                  <td>${item.price || "N/A"}</td>
                  <td>
                    {new Date(item.addedTime).toLocaleDateString()}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-sm bg-red-500 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default FavoriteMeals;
