import React from 'react';
import { Link } from 'react-router';

const Contact = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* 1. Hero Section with Banner */}
      <div 
        className="relative h-64 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://your-image-link.com/banner.jpg')", backgroundColor: '#00334e' }}
      >
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold uppercase tracking-wider">Contact Us</h1>
          <Link to={"/"} className="mt-2 text-sm"> <span className="text-teal-400">Home</span></Link>
        </div>
        {/* Wavy shape divider (Bottom) */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16 fill-white">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,105,119.46,108.45,178.47,102.53A610.27,610.27,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>

      {/* 2. Information Section */}
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-slate-800">INFORMATION ABOUT US</h2>
        <p className="text-gray-500 mt-2">Find our locations and get directions to reach us easily.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {/* Office Location */}
          <div className="border border-gray-100 p-8 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="text-teal-500 text-3xl mb-4 flex justify-center">📍</div>
            <h3 className="font-bold text-lg">Office Location</h3>
            <p className="text-gray-500 text-sm mt-2">445 Mount Eden Road, Mt Eden Basundhara Chokrapath</p>
          </div>

          {/* Phone Number */}
          <div className="border border-gray-100 p-8 rounded-lg shadow-sm hover:shadow-md transition border-teal-500">
            <div className="text-teal-500 text-3xl mb-4 flex justify-center">📞</div>
            <h3 className="font-bold text-lg">Phone Number</h3>
            <p className="text-gray-500 text-sm mt-2">977-444-222-000<br/>977-444-222-000</p>
          </div>

          {/* Email Address */}
          <div className="border border-gray-100 p-8 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="text-teal-500 text-3xl mb-4 flex justify-center">✉️</div>
            <h3 className="font-bold text-lg">Email Address</h3>
            <p className="text-gray-500 text-sm mt-2">contact@traveler.com<br/>info@traveler.com</p>
          </div>
        </div>
      </div>

      {/* 3. Map and Form Section */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Leaflet Map (Placeholder) */}
        <div className="rounded-lg overflow-hidden h-80 bg-gray-200 border border-gray-100 shadow-sm">
            {/* Map implementation (Leaflet or Google Maps) goes here */}
            <iframe 
                title="map"
                width="100%" 
                height="100%" 
                frameBorder="0" 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14602.254272231177!2d90.34584281738281!3d23.7985508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0e96fce29dd%3A0x6ccd9e51abc3e11d!2sMirpur-1%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1625000000000!5m2!1sen!2sbd"
            ></iframe>
        </div>

        {/* Contact Form */}
        <div className="p-8 border border-gray-100 rounded-lg shadow-sm bg-white">
          <form className="space-y-4">
            <input type="text" placeholder="First Name" className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-teal-500" />
            <input type="text" placeholder="Last Name" className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-teal-500" />
            <input type="email" placeholder="Email" className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-teal-500" />
            <input type="text" placeholder="Phone" className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-teal-500" />
            <textarea placeholder="Enter your message..." rows="4" className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"></textarea>
            <div className="flex justify-end">
              <button className="bg-teal-600 text-white px-8 py-2 rounded hover:bg-teal-700 transition font-medium">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;