import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaBullseye, FaUsers, FaUtensils } from 'react-icons/fa';
import { Link } from 'react-router';

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>About Us</title>
      </Helmet>

      {/* HERO SECTION */}
      <div 
        className="relative h-64 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://your-image-link.com/banner.jpg')", backgroundColor: '#00334e' }}
      >
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold uppercase tracking-wider">About Us</h1>
          <Link to={"/"} className="mt-2 text-sm"> <span className="text-teal-400">Home</span></Link>
        </div>
        {/* Wavy shape divider (Bottom) */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16 fill-white">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,105,119.46,108.45,178.47,102.53A610.27,610.27,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>

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
