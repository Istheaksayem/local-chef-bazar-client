/* eslint-disable */
import { useEffect, useState } from "react";

import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useParams } from "react-router";
import { Helmet } from "react-helmet-async";

const OrderPage = () => {
    const { id } = useParams(); 
    const { user } = useAuth();

    const [meal, setMeal] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [address, setAddress] = useState("");

    useEffect(() => {
        fetch(`http://localhost:5000/meals-details/${id}`)
            .then(res => res.json())
            .then(data => setMeal(data));
    }, [id]);

    if (!meal) {
        return <p className="text-center mt-10 text-xl">Loading Order Details...</p>;
    }

    const totalPrice = meal.price * quantity;

    const handleConfirmOrder = () => {

        Swal.fire({
            title: `Your total price is $${totalPrice}`,
            text: "Do you want to confirm the order?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Confirm",
            cancelButtonText: "Cancel"
        }).then((result) => {

            if (result.isConfirmed) {

                const orderData = {
                    foodId: meal._id,
                    mealName: meal.foodName,
                    price: meal.price,
                    quantity: quantity,
                    chefId: meal.chefId,
                    paymentStatus: "Pending",
                    userEmail: user.email,
                    userAddress: address,
                    orderStatus: "pending",
                    orderTime: new Date().toISOString(),
                };

                fetch("http://localhost:5000/orders", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(orderData)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            Swal.fire("Success", "Order placed successfully!", "success");
                        }
                    });
            }
        });
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 shadow-lg rounded-lg border">
            <Helmet><title>OrderPage | local chef bazar</title></Helmet>
            <h2 className="text-3xl font-bold mb-4 text-center">Confirm Your Order</h2>

            <div className="space-y-3">
                <p><strong>Meal Name:</strong> {meal.foodName}</p>
                <p><strong>Price:</strong> ${meal.price}</p>
                <p><strong>Chef ID:</strong> {meal.chefId}</p>
                <p><strong>User Email:</strong> {user.email}</p>

                {/* Quantity */}
                <div>
                    <label className="block font-semibold">Quantity</label>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="border p-2 rounded w-full"
                    />
                </div>

                {/* Address */}
                <div>
                    <label className="block font-semibold">Delivery Address</label>
                    <input
                        type="text"
                        placeholder="Enter full address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>

                <p className="mt-2 text-xl font-bold text-green-700">
                    Total Price: ${totalPrice}
                </p>

                <button
                    onClick={handleConfirmOrder}
                    className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-bold"
                >
                    Confirm Order
                </button>
            </div>
        </div>
    );
};

export default OrderPage;
