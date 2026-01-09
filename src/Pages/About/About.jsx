import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaBullseye, FaUsers, FaUtensils } from 'react-icons/fa';

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>About Us</title>
      </Helmet>

      {/* HERO SECTION */}
      {/* <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">About Our Platform</h1>
          <p className="text-lg opacity-90">
            Making meal management simple, smart, and accessible for everyone.
          </p>
        </div>
      </div> */}

      {/* CONTENT SECTION */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">

          {/* CARD 1 */}
          <div className="bg-white rounded-2xl shadow p-6 text-center hover:shadow-lg transition">
            <FaBullseye className="text-4xl text-indigo-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p className="text-gray-600">
              To provide a smooth and reliable platform where users can easily
              explore meals, manage orders, and track their activities.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-white rounded-2xl shadow p-6 text-center hover:shadow-lg transition">
            <FaUtensils className="text-4xl text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">What We Offer</h3>
            <p className="text-gray-600">
              A user-friendly system with modern design, secure authentication,
              and personalized dashboards for better experience.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="bg-white rounded-2xl shadow p-6 text-center hover:shadow-lg transition">
            <FaUsers className="text-4xl text-pink-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Why Choose Us</h3>
            <p className="text-gray-600">
              We focus on simplicity, responsiveness, and performance to ensure
              users get value without complexity.
            </p>
          </div>

        </div>

        {/* EXTRA INFO */}
        <div className="mt-16 bg-white rounded-2xl shadow p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We aim to continuously improve and expand our platform with modern
            technologies, ensuring reliability and scalability for future needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
