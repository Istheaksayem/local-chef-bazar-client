import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { toast } from 'react-toastify';
import useRole from '../../../Hooks/useRole/useRole';
import { Helmet } from 'react-helmet-async';

const MyProfile = () => {
    const { user } = useAuth()
    const {role} =useRole(user?.email)
    const handleRoleRequest = async (type) => {
        const requestData = {
            userName: user.displayName,
            userEmail: user.email,
            requestType: type,
        };

        const res = await fetch("https://local-chef-bazar-server-theta.vercel.app/request-role", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData),
        });

        const data = await res.json();
        if (data.success) {
            toast.success("Request Sent Successfully!");
        } else {
            toast.error("Something went wrong!");
        }
    };
    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg mt-10">
            <Helmet><title>MyProfile | local chef Bazar</title></Helmet>
            <div className="flex flex-col items-center text-center">
                <img
                    src={user.photoURL}
                    alt="User"
                    className="w-24 h-24 rounded-full object-cover"
                />

                <h2 className="text-2xl font-bold mt-3">{user.displayName}</h2>
                <p className="text-gray-500">{user.email}</p>

                <p className="mt-3">Address: Dhaka, Bangladesh</p>
                <p>Role: user</p>
                <p>Status: active</p>

                {/* Buttons */}
                <div className="mt-5 space-y-3 w-full">

                    {/* Hide Be a Chef if already chef */}
                    {role === "user" && (
                        <button
                            onClick={() => handleRoleRequest("chef")}
                            className="btn btn-primary w-full"
                        >
                            Be a Chef
                        </button>
                    )}


                    {user.role !== "admin" && (
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
    );;
};

export default MyProfile;

{/* Hide Be a Chef if already chef */ }
// {
//     user.role !== "chef" && user.role !== "admin" && (
//         <button
//             onClick={() => handleRoleRequest("chef")}
//             className="btn btn-primary w-full"
//         >
//             Be a Chef
//         </button>
//     )
// }