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
            userEmail: user.email
        }
        const res = await fetch('http://localhost:5000/payment-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentInfo)
        });

        if (!res.ok) {
            throw new Error("Payment session failed");
        }

        const data = await res.json();
        window.location.href = data.url;

    }


    useEffect(() => {
        fetch(`http://localhost:5000/orders/${user.email}`)
            .then(res => res.json())
            .then(data => setOrders(data));
    }, [user.email]);

    return (
        <div className="max-w-4xl mx-auto mt-10 px-4">
            <Helmet><title>MyOrder | local chef Bazar</title></Helmet>
            <h2 className="text-3xl font-bold mb-5">My Orders</h2>

            {orders.length === 0 && (
                <p className="text-center text-gray-500">No Orders Found</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                {orders.map(order => (
                    <div key={order._id} className="shadow p-4 rounded-lg border space-y-2">

                        <p className="text-lg font-semibold text-gray-800">Food Name: {order.mealName}</p>

                        <p className="text-sm font-medium text-blue-600">Order Status: {order.orderStatus}</p>

                        <p className="text-base font-semibold text-green-700">Price: ${order.price}</p>

                        <p className="text-sm text-gray-700">Quantity: {order.quantity}</p>

                        <p className="text-sm text-gray-700">Delivery Time: {order.orderTime}</p>

                        <p className="text-sm font-medium text-purple-700">Chef Name: {order.chefName}</p>

                        <p className="text-sm text-gray-600">Chef ID: {order.chefId}</p>

                        <p className={`text-sm font-semibold 
    ${order.paymentStatus === "paid" ? "text-green-600" : "text-red-600"}`}>
                            Payment Status: {order.paymentStatus}
                        </p>

                        {/* Change the Pay Now button logic */}

                        {/* <Link to={`/dashboard/payment/${order._id}`} state={{ order }}>
                                <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                                    Pay Now
                                </button>
                            </Link> */}
                        <button
                            onClick={() => handlePayment(order)}
                            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                            Pay Now
                        </button>


                    </div>



                ))}

            </div>
        </div>
    );
};

export default MyOrders;

