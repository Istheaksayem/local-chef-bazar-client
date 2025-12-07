/* eslint-disable no-unused-vars */
import React from 'react';
import img from '../../assets/front-view-fresh-vegetables-composition-sliced-whole-vegetables-white-background-color-ripe-healthy-life-diet-salad.jpg'
import img2 from '../../assets/download.jpg'
import img3 from '../../assets/best-price-offer-promotion-commerce-marketing-concept.jpg'
import { motion } from "framer-motion";
const ExtraSection = () => {
    return (
        <section className="py-16">
            <motion.h2
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    duration: 1.2,
                    ease: "easeOut"
                }}
                className="text-3xl font-bold text-center mb-10 text-blue-500"
            >
                Why Choose LocalChefBazaar?
            </motion.h2>

            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 shadow rounded-xl text-center">
                    <img className='rounded-lg' src={img} alt="" />
                    <h3 className="font-bold text-xl mb-3">Fresh Homemade Food</h3>
                    <p className="text-gray-600">All meals cooked by verified home chefs.</p>
                </div>

                <div className="p-6 shadow rounded-xl text-center">
                    <img className='rounded-lg' src={img2} alt="" />
                    <h3 className="font-bold text-xl mb-3">Fast Delivery</h3>
                    <p className="text-gray-600">Delivered hot & fresh to your doorstep.</p>
                </div>

                <div className="p-6 shadow rounded-xl text-center">
                    <img className='w-full h-48 object-cover rounded-xl shadow-sm' src={img3} alt="" />
                    <h3 className="font-bold text-xl mb-3">Affordable Prices</h3>
                    <p className="text-gray-600">Healthy food at pocket-friendly prices.</p>
                </div>
            </div>
        </section>
    );
};

export default ExtraSection;
