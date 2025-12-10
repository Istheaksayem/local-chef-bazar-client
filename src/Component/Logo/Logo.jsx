import React from 'react';
import logo from '../../assets/WhatsApp Image 2025-12-06 at 09.50.21_485912b1.jpg'

const Logo = () => {
    return (
        <div>
            <img
            className='w-12 h-12 object-cover rounded-full border border-gray-300 shadow-md '
             src={logo} alt="" />
        </div>
    );
};

export default Logo;