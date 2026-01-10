import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Contact Details */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
          <p>📍 Mirpur, Dhaka, Bangladesh</p>

          <p>
            📞{" "}
            <a
              href="tel:+8801234567890"
              className="hover:text-white"
            >
              +880 1234-567890
            </a>
          </p>

          <p>
            ✉️{" "}
            <a
              href="mailto:info@yourcompany.com"
              className="hover:text-white"
            >
              info@yourcompany.com
            </a>
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-5 text-2xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <FaFacebook />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
            >
              <FaInstagram />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Working Hours */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Working Hours</h3>
          <p>Mon – Fri: 9 AM – 8 PM</p>
          <p>Saturday: 10 AM – 6 PM</p>
          <p>Sunday: Closed</p>
        </div>
      </div>

      <hr className="border-gray-700 my-6" />

      {/* Copyright */}
      <div className="text-center text-gray-500">
        © 2025 Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
