import { useEffect, useState } from "react";


const DailyMeals = () => {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/meals?limit=6")
            .then(res => res.json())
            .then(data => setMeals(data));
    }, []);

    return (
        <div className="my-16">
            <h2 className="text-3xl font-bold text-center mb-10">
                Daily Meals
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-5">
                {meals.map((meal) => (
                    <div
                        key={meal._id}
                        className="shadow-lg rounded-xl p-4 hover:shadow-2xl transition"
                    >
                        <img
                            src={meal.foodImage}
                            alt={meal.foodName}
                            className="w-full h-52 object-cover rounded-xl mb-4"
                        />

                        <h3 className="text-xl font-semibold">{meal.foodName}</h3>

                        <p className="text-gray-600">Chef: {meal.chefName}</p>

                        <p className="font-bold mt-2">${meal.price}</p>

                        <p className="text-yellow-500 font-medium">
                            ⭐ Rating: {meal.rating}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DailyMeals;
