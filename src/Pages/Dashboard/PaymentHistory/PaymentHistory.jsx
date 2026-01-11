import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

const PaymentHistory = () => {
    const { user } = useAuth();
    const [payments, setPayments] = useState([]);
    

    useEffect(() => {
        if (user?.email) {
            fetch(`https://local-chef-bazar-server-theta.vercel.app/payments/${user.email}`)
                .then(res => res.json())
                .then(data => setPayments(data));
        }
    }, [user?.email]);

    return (
        <div className="p-6">
             <Helmet><title>PaymentHistory | local chef Bazar</title></Helmet>
            <h2 className="text-3xl font-bold mb-6"> Payment History</h2>

            {payments.length === 0 ? (
                <p className="text-gray-500">No payment history found</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full ">
                        <thead className="bg-gray-100">
                            <tr className="bg-green-500 text-white">
                                <th>No</th>
                                <th>Order</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Transaction</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((p, index) => (
                                <tr key={p._id}>
                                    <td>{index + 1}</td>
                                    <td>{p.orderName}</td>
                                    <td>${p.amount}</td>
                                    <td className="text-green-600 font-semibold">
                                        {p.paymentStatus}
                                    </td>
                                    <td className="text-xs">
                                        {p.transactionId.slice(0, 12)}...
                                    </td>
                                    <td>
                                        {new Date(p.paidAt).toLocaleDateString()}
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

export default PaymentHistory;
