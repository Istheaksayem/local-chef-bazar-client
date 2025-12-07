import React from 'react';
import { Link } from 'react-router';

const Login = () => {
    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <h3 className="text-3xl  font-bold">Welcome Back</h3>
            <p className="font-semibold">Login with chef Bazar</p>
            <form  className="card-body">
                <fieldset className="fieldset">
                    {/* email  field */}
                    <label className="label">Email</label>
                    <input type="email" className="input" placeholder="Email" />
                    {/* password field */}
                    <label className="label">Password</label>
                    <input type="password" className="input" placeholder="Password" />
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                    <p className="">New to chef Bazar? <Link state={location.state} to="/register" className='text-blue-400'>Register</Link></p>
                </fieldset>
            </form>
        
        </div>
    );
};
    


export default Login;