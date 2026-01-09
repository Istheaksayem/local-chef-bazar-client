import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import {  GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import useAuth from '../../../Hooks/useAuth';
import { auth } from '../../../Firebase/Firebase.init';

// const auth =getAuth();
const googleProvider = new GoogleAuthProvider();

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then(() => {
                toast.success('Welcome back');
                navigate('/');
            })
            .catch(err => toast.error(err.message));
    };

    const handleGoogleSign = (e) => {
        e.preventDefault();
        signInWithPopup(auth, googleProvider)
            .then(() => {
                toast.success('Logged in with Google 🚀');
                navigate('/');
            })
            .catch(err => toast.error(err.message));
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#0f0f0f] flex items-center justify-center">
            <Helmet>
                <title>Login | Local Chef Bazar</title>
            </Helmet>

            {/* Gradient Blobs */}
            <div className="absolute w-96 h-96 bg-orange-500/40 rounded-full blur-3xl top-[-80px] left-[-80px] animate-pulse"></div>
            <div className="absolute w-96 h-96 bg-pink-500/30 rounded-full blur-3xl bottom-[-80px] right-[-80px] animate-pulse"></div>

            {/* Glass Card */}
            <div className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">

                <h2 className="text-3xl font-bold text-white text-center mb-1">
                    Welcome Back 👨‍🍳
                </h2>
                <p className="text-center text-gray-300 mb-6">
                    Login to Local Chef Bazar
                </p>

                <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">

                    {/* Email */}
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            📧
                        </span>
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            placeholder="Email address"
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-orange-400"
                        />
                        {errors.email && (
                            <p className="text-red-400 text-sm mt-1">
                                Email is required
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            🔒
                        </span>
                        <input
                            type="password"
                            {...register('password', { required: true, minLength: 6 })}
                            placeholder="Password"
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-orange-400"
                        />
                        {errors.password && (
                            <p className="text-red-400 text-sm mt-1">
                                Minimum 6 characters
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <a className="text-sm text-orange-400 hover:underline">
                            Forgot password?
                        </a>
                    </div>

                    {/* Login Button */}
                    <button className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:scale-[1.02] transition">
                        Login
                    </button>

                    {/* Divider */}
                    <div className="text-center text-gray-400 text-sm">
                        ── or continue with ──
                    </div>

                    {/* Google */}
                    <button 
                    onClick={handleGoogleSign}
                    className="btn bg-white text-black border-[#e5e5e5] w-full">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>

                    <p className="text-center text-gray-300 text-sm">
                        New here?{' '}
                        <Link to="/register" className="text-orange-400 font-semibold">
                            Create account
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
