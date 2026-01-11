import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";
import useRole from "../../../Hooks/useRole/useRole";
import { Helmet } from "react-helmet-async";

const MyProfile = () => {
  const { user } = useAuth();
  const { role } = useRole(user?.email);

  const handleRoleRequest = async (type) => {
    const requestData = {
      userName: user.displayName,
      userEmail: user.email,
      requestType: type,
    };

    const res = await fetch(
      "https://local-chef-bazar-server-theta.vercel.app/request-role",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      }
    );

    const data = await res.json();
    if (data.success) {
      toast.success("Request Sent Successfully!");
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg mt-10">
      <Helmet>
        <title>MyProfile | Local Chef Bazar</title>
      </Helmet>

      <div className="flex flex-col items-center text-center">
        <img
          src={user.photoURL}
          alt="User"
          className="w-24 h-24 rounded-full object-cover border dark:border-gray-700"
        />

        <h2 className="text-2xl font-bold mt-3 text-gray-800 dark:text-gray-100">
          {user.displayName}
        </h2>

        <p className="text-gray-500 dark:text-gray-400">{user.email}</p>

        <p className="mt-3 text-gray-700 dark:text-gray-300">
          Address: Dhaka, Bangladesh
        </p>

        <p className="text-gray-700 dark:text-gray-300">
          Role: {role || "user"}
        </p>

        <p className="text-gray-700 dark:text-gray-300">
          Status: active
        </p>

        {/* Buttons */}
        <div className="mt-5 space-y-3 w-full">
          {role === "user" && (
            <button
              onClick={() => handleRoleRequest("chef")}
              className="btn btn-primary w-full"
            >
              Be a Chef
            </button>
          )}

          {role !== "admin" && (
            <button
              onClick={() => handleRoleRequest("admin")}
              className="btn btn-secondary w-full"
            >
              Be an Admin
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
