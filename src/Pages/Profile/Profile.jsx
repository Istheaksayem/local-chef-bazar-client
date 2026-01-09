import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { Helmet } from 'react-helmet-async';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Helmet>
        <title>My Profile</title>
      </Helmet>

      <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-8 text-center">
        <img
          referrerPolicy="no-referrer"
          src={user?.photoURL}
          alt="Profile"
          className="w-28 h-28 rounded-full mx-auto border-4 border-indigo-500 mb-4"
        />

        <h2 className="text-2xl font-bold mb-1">
          {user?.displayName || 'Anonymous User'}
        </h2>

        <p className="text-gray-500 mb-6">
          {user?.email}
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
          <div className="bg-gray-100 rounded-lg py-3">
            <p className="font-semibold">Role</p>
            <p>User</p>
          </div>
          <div className="bg-gray-100 rounded-lg py-3">
            <p className="font-semibold">Status</p>
            <p>Active</p>
          </div>
        </div>

        <button className="btn btn-primary w-full">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
