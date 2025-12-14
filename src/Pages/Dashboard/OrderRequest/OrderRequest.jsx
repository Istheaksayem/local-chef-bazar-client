import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";


const OrderRequests = () => {
  const { user } = useAuth(); // logged-in chef
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch chef orders
  useEffect(() => {
    if (!user?.uid) return;

    fetch(`http://localhost:5000/orders/chef/${user.uid}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  }, [user]);

  // Update order status
  const updateStatus = (id, status) => {
    fetch(`http://localhost:5000/orders/status/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then(() => {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === id ? { ...order, orderStatus: status } : order
          )
        );
      });
  };

  if (loading) return <p className="text-center">Loading orders...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Order Requests</h2>

      {orders.length === 0 && (
        <p className="text-gray-500">No orders found</p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-4 shadow"
          >
            <h3 className="text-lg font-semibold mb-2">
              {order.mealName}
            </h3>

            <p><b>Price:</b> ${order.price}</p>
            <p><b>Quantity:</b> {order.quantity}</p>
            <p><b>Status:</b> 
              <span className="ml-1 capitalize badge badge-outline">
                {order.orderStatus}
              </span>
            </p>
            <p><b>Payment:</b> {order.paymentStatus}</p>
            <p><b>User:</b> {order.userEmail}</p>
            <p><b>Address:</b> {order.userAddress}</p>
            <p className="text-sm text-gray-500">
              {new Date(order.orderTime).toLocaleString()}
            </p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => updateStatus(order._id, "cancelled")}
                disabled={order.orderStatus !== "pending"}
                className="btn btn-sm btn-error"
              >
                Cancel
              </button>

              <button
                onClick={() => updateStatus(order._id, "accepted")}
                disabled={order.orderStatus !== "pending"}
                className="btn btn-sm btn-info"
              >
                Accept
              </button>

              <button
                onClick={() => updateStatus(order._id, "delivered")}
                disabled={order.orderStatus !== "accepted"}
                className="btn btn-sm btn-success"
              >
                Deliver
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderRequests;
