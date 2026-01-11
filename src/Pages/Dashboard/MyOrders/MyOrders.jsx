/* eslint-disable */
import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  const handlePayment = async (order) => {
    const paymentInfo = {
      price: order.price,
      orderId: order._id,
      orderName: order.mealName,
      userEmail: user.email,
    };

    const res = await fetch(
      "https://local-chef-bazar-server-theta.vercel.app/payment-checkout-session",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentInfo),
      }
    );

    if (!res.ok) {
      throw new Error("Payment session failed");
    }

    const data = await res.json();
    window.location.href = data.url;
  };

  useEffect(() => {
    fetch(
      `https://local-chef-bazar-server-theta.vercel.app/orders/${user.email}`
    )
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [user.email]);

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 text-gray-800 dark:text-gray-100">
      <Helmet>
        <title>MyOrder | Local Chef Bazar</title>
      </Helmet>

      <h2 className="text-3xl font-bold mb-5">
        My Orders
      </h2>

      {orders.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No Orders Found
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white dark:bg-gray-800 shadow p-4 rounded-lg border dark:border-gray-700 space-y-2"
          >
            <p className="text-lg font-semibold">
              Food Name: {order.mealName}
            </p>

            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Order Status: {order.orderStatus}
            </p>

            <p className="text-base font-semibold text-green-700 dark:text-green-400">
              Price: ${order.price}
            </p>

            <p className="text-sm text-gray-700 dark:text-gray-300">
              Quantity: {order.quantity}
            </p>

            <p className="text-sm text-gray-700 dark:text-gray-300">
              Delivery Time: {order.orderTime}
            </p>

            <p className="text-sm font-medium text-purple-700 dark:text-purple-400">
              Chef Name: {order.chefName}
            </p>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              Chef ID: {order.chefId}
            </p>

            <p
              className={`text-sm font-semibold ${
                order.paymentStatus === "paid"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              Payment Status: {order.paymentStatus}
            </p>

            {order.paymentStatus !== "paid" && (
              <button
                onClick={() => handlePayment(order)}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
              >
                Pay Now
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
