/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
    // 1. Image Slider Data
    const images = [
        "https://i.ibb.co.com/pvHX5NXC/enjoying-street-food-fest.jpg",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop"  
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // 2. Slider Logic (Auto change every 5s)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative w-full h-[65vh] overflow-hidden">
            {/* Background Slider with AnimatePresence for smooth fade */}
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${images[currentIndex]})` }}
                />
            </AnimatePresence>

            {/* Dark Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content Container */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
                        Welcome to{" "}
                        <span className="text-blue-400">LocalChefBazaar</span> 🍽️
                    </h1>

                    <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl mx-auto drop-shadow-md">
                        Order fresh, hygienic, and delicious homemade meals directly from your favorite local chefs.
                    </p>

                    {/* 3. Interactive CTA Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300"
                    >
                        Explore Menu
                    </motion.button>
                </motion.div>
            </div>

            {/* 4. Visual Flow (Scroll Indicator) */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 1, duration: 1.5, repeat: Infinity }}
                className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-white cursor-pointer"
            >
                <div className="flex flex-col items-center gap-1">
                    <span className="text-xs uppercase tracking-widest text-gray-300">Scroll</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;