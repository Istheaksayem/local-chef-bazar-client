import React from 'react';
import { Link } from 'react-router';

const PaymentCancel = () => {
    return (
        <div className="text-center mt-20">
            <h2 className="text-3xl font-bold text-green-600">Payment is Cancel.Please Try Again</h2>
            <Link
            to="/dashboard/my-orders"
            ><button className='btn btn-primary text-white'>Try Again</button></Link>
        </div>
    );
};

export default PaymentCancel;