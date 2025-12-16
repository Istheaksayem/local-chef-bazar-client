import React from "react";
import { Link } from "react-router";


const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center px-4">
      
      {/* Image */}
      <img
        src="https://i.ibb.co.com/zThn7jJ5/download-1.jpg"
        alt="404 Not Found"
        className="w-72 md:w-96 mb-6"
      />

      {/* Text */}
      <h1 className="text-4xl font-bold text-error mb-2">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 mb-6">
        The page you are looking for does not exist or has been moved.
      </p>

      {/* Button */}
      <Link to="/" className="btn btn-primary">
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
