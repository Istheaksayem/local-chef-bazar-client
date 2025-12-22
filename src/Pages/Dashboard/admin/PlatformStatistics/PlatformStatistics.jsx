import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

const PlatformStatistics = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/admin/platform-stats")
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  if (!stats) {
    return <div className="p-6">Loading statistics...</div>;
  }

  const orderData = [
    { name: "Pending", value: stats.pendingOrders },
    { name: "Delivered", value: stats.deliveredOrders },
  ];

  const paymentData = [
    { name: "Payments", value: stats.totalPaymentAmount },
  ];

  const COLORS = ["#FFBB28", "#00C49F"];

  return (
    <div className="p-6 space-y-6">
       <Helmet><title>Platform Statistics | local chef Bazar</title></Helmet>
      <h2 className="text-2xl font-bold">Platform Statistics</h2>

      {/* ===== Summary Cards ===== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-base-100 shadow p-4">
          <h3 className="text-sm">Total Users</h3>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="card bg-base-100 shadow p-4">
          <h3 className="text-sm">Pending Orders</h3>
          <p className="text-2xl font-bold">{stats.pendingOrders}</p>
        </div>
        <div className="card bg-base-100 shadow p-4">
          <h3 className="text-sm">Delivered Orders</h3>
          <p className="text-2xl font-bold">{stats.deliveredOrders}</p>
        </div>
        <div className="card bg-base-100 shadow p-4">
          <h3 className="text-sm">Total Payments ($)</h3>
          <p className="text-2xl font-bold">
            {stats.totalPaymentAmount.toFixed(2)}
          </p>
        </div>
      </div>

      {/* ===== Charts ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Orders Pie Chart */}
        <div className="card bg-base-100 shadow p-4">
          <h3 className="font-semibold mb-4">Orders Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {orderData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Bar Chart */}
        <div className="card bg-base-100 shadow p-4">
          <h3 className="font-semibold mb-4">Total Payments</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={paymentData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PlatformStatistics;
