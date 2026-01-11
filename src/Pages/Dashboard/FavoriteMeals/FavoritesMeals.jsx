import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

const FavoriteMeals = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    fetch(`https://local-chef-bazar-server-theta.vercel.app/favorites/${user.email}`)
      .then(res => res.json())
      .then(data => {
        setFavorites(data);
        setLoading(false);
      });
  }, [user]);

  const handleDelete = (id) => {
    if (!window.confirm("Remove this meal from favorites?")) return;

    fetch(`https://local-chef-bazar-server-theta.vercel.app/favorites/${id}`, {
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
    return<div className="flex justify-center items-center h-64"><span className="loading loading-bars loading-lg text-orange-500"></span></div>;
  }

  return (
    <div className="container mx-auto p-6 dark:bg-gray-900 dark:text-gray-200">
      <Helmet>
        <title>FavoritesMeals | Local Chef Bazar</title>
      </Helmet>

      <h2 className="text-3xl font-bold mb-6">My Favorite Meals</h2>

      {favorites.length === 0 ? (
        <p>No favorite meals found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-200 dark:bg-gray-800">
              <tr>
                <th className="dark:text-white bg-green-600">SL NO</th>
                <th className="dark:text-white bg-green-600">Meal Name</th>
                <th className="dark:text-white bg-green-600">Chef Name</th>
                <th className="dark:text-white bg-green-600">Price</th>
                <th className="dark:text-white bg-green-600">Date Added</th>
                <th className="dark:text-white bg-green-600">Action</th>
              </tr>
            </thead>

            <tbody>
              {favorites.map((item, index) => (
                <tr key={item._id} className="border-b border-gray-300 dark:border-gray-700">
                  <td>{index + 1}</td>
                  <td>{item.mealName}</td>
                  <td>{item.chefName}</td>
                  <td>${item.price || "N/A"}</td>
                  <td>{new Date(item.addedTime).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
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
