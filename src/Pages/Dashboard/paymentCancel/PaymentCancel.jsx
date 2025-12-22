import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router';

const PaymentCancel = () => {
    return (
        <div className="text-center mt-20">
             <Helmet><title>PaymentCancel | local chef Bazar</title></Helmet>
            <h2 className="text-3xl font-bold text-green-600">Payment is Cancel.Please Try Again</h2>
            <Link
            to="/dashboard/my-orders"
            ><button className='btn btn-primary text-white'>Try Again</button></Link>
        </div>
    );
};

export default PaymentCancel;