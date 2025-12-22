import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

const ChefOrderRequests = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chefId,setChefId] =useState("")

  // 🔹 Fetch orders for logged-in chef
  useEffect(() => {
    if (!user) return;
    fetch(`https://local-chef-bazar-server-theta.vercel.app/users/${user.email}`)
      .then(res => res.json())
      .then(data => {
       setChefId(data.chefId);
        // setLoading(false);
      });

   
  }, [user]);
  console.log(chefId)
   useEffect(() => {
    if (!user.email) return;
   

    fetch(`https://local-chef-bazar-server-theta.vercel.app/chef-orders/${user.email}`)
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      });
  }, [user]);

  //  Update order status
  const handleStatusChange = (orderId, status) => {
    fetch(`https://local-chef-bazar-server-theta.vercel.app/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    })
      .then(res => res.json())
      .then(() => {
        toast.success(`Order ${status}`);

        //  Live UI update without reload
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order._id === orderId
              ? { ...order, orderStatus: status }
              : order
          )
        );
      });
  };

  if (loading) {
    return <p className="text-center mt-10 text-xl">Loading Orders...</p>;
  }

  return (
    <div className="p-6">
       <Helmet><title>ChefRequest | local chef Bazar</title></Helmet>
      <h2 className="text-3xl font-bold mb-6"> Order Requests</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {orders.map(order => (
            <div
              key={order._id}
              className="border rounded-xl p-5 shadow"
            >
              <h3 className="text-xl font-semibold mb-2">
                {order.foodName}
              </h3>

              <p><strong>Price:</strong> ${order.price}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>User Email:</strong> {order.userEmail}</p>
              <p><strong>Address:</strong> {order.userAddress}</p>
              <p><strong>Payment:</strong> {order.paymentStatus}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="capitalize text-blue-600">
                  {order.orderStatus}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Ordered at: {new Date(order.orderTime).toLocaleString()}
              </p>

              {/*  Action Buttons */}
              <div className="flex gap-3 mt-4">

                {/* Cancel */}
                <button
                  disabled={order.orderStatus !== "pending"}
                  onClick={() =>
                    handleStatusChange(order._id, "cancelled")
                  }
                  className={`px-4 py-2 rounded text-white
                    ${order.orderStatus !== "pending"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"}`}
                >
                  Cancel
                </button>

                {/* Accept */}
                <button
                  disabled={order.orderStatus !== "pending"}
                  onClick={() =>
                    handleStatusChange(order._id, "accepted")
                  }
                  className={`px-4 py-2 rounded text-white
                    ${order.orderStatus !== "pending"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"}`}
                >
                  Accept
                </button>

                {/* Deliver */}
                <button
                  disabled={order.orderStatus !== "accepted"}
                  onClick={() =>
                    handleStatusChange(order._id, "delivered")
                  }
                  className={`px-4 py-2 rounded text-white
                    ${order.orderStatus !== "accepted"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"}`}
                >
                  Deliver
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChefOrderRequests;