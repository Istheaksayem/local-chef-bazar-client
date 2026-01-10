import React from 'react';

const SkeletonCard = () => {
    return (
        <div className="border rounded-xl shadow p-4 animate-pulse">
            <div className="w-full h-48 bg-gray-300 rounded"></div>

            <div className="mt-3 h-5 bg-gray-300 rounded w-3/4"></div>
            <div className="mt-2 h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="mt-2 h-4 bg-gray-300 rounded w-2/3"></div>
            <div className="mt-2 h-5 bg-gray-300 rounded w-1/3"></div>

            <div className="mt-4 h-10 bg-gray-300 rounded"></div>
        </div>
    );
};

export default SkeletonCard;