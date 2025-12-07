/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const Hero = () => {
    const bgUrl = "https://i.ibb.co.com/pvHX5NXC/enjoying-street-food-fest.jpg";

    return (
        <section
            className="bg-cover bg-center bg-no-repeat py-20"
            style={{
                backgroundImage: `url(${bgUrl})`
            }}
        >
            <div className="container mx-auto text-center bg-black/40 p-10 rounded-xl">
                <motion.h1
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5 }}
                    className="text-4xl font-bold mb-4 text-white"
                >
                    Welcome to{" "}
                    <span className="text-blue-400">LocalChefBazaar</span> 🍽️
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="text-lg text-gray-200"
                >
                    Order fresh homemade meals from your favorite local chefs.
                </motion.p>
            </div>
        </section>
    );
};

export default Hero;
