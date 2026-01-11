import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import useAuth from '../../../Hooks/useAuth';
import { auth } from '../../../Firebase/Firebase.init';
import { Link, useNavigate } from 'react-router';

const googleProvider = new GoogleAuthProvider();

const Login = () => {
    const [showPassword, setShowPassword] = useState(false); 
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
        <div className="relative min-h-screen overflow-hidden bg-[#0f0f0f] flex items-center justify-center px-4">
            <Helmet>
                <title>Login | Local Chef Bazar</title>
            </Helmet>

            {/* Gradient Blobs for background design */}
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

                    {/* Email Field */}
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            📧
                        </span>
                        <input
                            type="email"
                            {...register('email', { required: "Email is required" })}
                            placeholder="Email address"
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-orange-400 transition-all"
                        />
                        {errors.email && (
                            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Field with Show/Hide Toggle */}
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            🔒
                        </span>
                        <input
                            type={showPassword ? "text" : "password"} // Dynamic type
                            {...register('password', { 
                                required: "Password is required", 
                                minLength: { value: 6, message: "Minimum 6 characters" } 
                            })}
                            placeholder="Password"
                            className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-orange-400 transition-all"
                        />
                        
                        {/* Toggle Icon Button */}
                        <button
                            type="button" // Important: jate form submit na hoye jay
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors focus:outline-none"
                        >
                            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </button>

                        {errors.password && (
                            <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Forgot Password */}
                    <div className="flex justify-end">
                        <button type="button" className="text-sm text-white hover:underline hover:text-orange-400 transition-colors">
                            Forgot password?
                        </button>
                    </div>

                    {/* Login Button */}
                    <button className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-orange-500/20">
                        Login
                    </button>

                    {/* Divider */}
                    <div className="text-center text-gray-400 text-sm">
                        ── or continue with ──
                    </div>

                    {/* Google Login Button */}
                    <button 
                        type="button"
                        onClick={handleGoogleSign}
                        className="flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-white text-black font-medium hover:bg-gray-100 transition-colors shadow-md"
                    >
                        <svg width="20" height="20" viewBox="0 0 48 48">
                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                        </svg>
                        Login with Google
                    </button>

                    {/* Registration Link */}
                    <p className="text-center text-gray-300 text-sm">
                        New here?{' '}
                        <Link to="/register" className="text-orange-400 font-semibold hover:underline">
                            Create account
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;