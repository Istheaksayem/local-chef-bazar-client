import React, { useState } from 'react'; // useState add kora hoyeche
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useAuth from '../../../Hooks/useAuth';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { Link, useNavigate } from 'react-router-dom'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Icons import
import { Link, useNavigate } from 'react-router';

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

const Register = () => {
    // State for toggling password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const { registerUser, updateUserProfile, setUser } = useAuth();
    const navigate = useNavigate();

    const saveUserToDB = async (user) => {
        await fetch("https://local-chef-bazar-server-theta.vercel.app/users", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(user)
        });
    };

    const handleRegistration = async (data) => {
        if (data.password !== data.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            await registerUser(data.email, data.password);
            const userProfile = {
                displayName: data.name,
                photoURL: data.photo,
            };
            await updateUserProfile(userProfile);

            const userInfo = {
                name: data.name,
                email: data.email,
                photo: data.photo,
                role: "user"
            };

            await saveUserToDB(userInfo);
            setUser((prev) => ({ ...prev, ...userProfile }));
            toast.success("Registration Successful!", { position: "top-center" });
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleGoogleSign = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            const userInfo = {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
                role: "user"
            };
            await saveUserToDB(userInfo);
            setUser(user);
            toast.success('Login successful with Google');
            navigate("/");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-purple-900 p-4 font-sans">
            <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden relative min-h-[600px]">

                {/* --- LEFT SIDE: FORM --- */}
                <div className="w-full md:w-1/2 p-8 md:p-12 z-10 bg-white flex flex-col justify-center">
                    <h3 className="text-3xl font-bold text-purple-700 mb-2">Sign Up</h3>
                    <p className="text-gray-500 mb-6">Create your account to start your journey</p>

                    <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">

                        {/* Name Input */}
                        <div className="relative">
                            <span className="absolute bottom-3 left-0 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                            </span>
                            <input
                                type="text"
                                {...register("name", { required: "Name is required" })}
                                className="w-full py-2 pl-8 border-b-2 border-gray-300 focus:border-purple-600 outline-none transition-colors placeholder-gray-400 text-gray-700"
                                placeholder="Your Name"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>

                        {/* Email Input */}
                        <div className="relative">
                            <span className="absolute bottom-3 left-0 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                            </span>
                            <input
                                type="email"
                                {...register('email', { required: "Email is required" })}
                                className="w-full py-2 pl-8 border-b-2 border-gray-300 focus:border-purple-600 outline-none transition-colors placeholder-gray-400 text-gray-700"
                                placeholder="Email Address"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Photo URL Input */}
                        <div className="relative">
                            <span className="absolute bottom-3 left-0 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>
                            </span>
                            <input
                                type="text"
                                {...register("photo", { required: "Photo URL is required" })}
                                className="w-full py-2 pl-8 border-b-2 border-gray-300 focus:border-purple-600 outline-none transition-colors placeholder-gray-400 text-gray-700"
                                placeholder="Photo URL"
                            />
                            {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo.message}</p>}
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <span className="absolute bottom-3 left-0 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register('password', { required: "Password required", minLength: { value: 6, message: "Min 6 chars" } })}
                                className="w-full py-2 pl-8 pr-10 border-b-2 border-gray-300 focus:border-purple-600 outline-none transition-colors placeholder-gray-400 text-gray-700"
                                placeholder="Password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute bottom-3 right-0 text-gray-400 hover:text-purple-600 focus:outline-none"
                            >
                                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                            </button>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <span className="absolute bottom-3 left-0 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                            </span>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                {...register("confirmPassword", { required: "Confirm required" })}
                                className="w-full py-2 pl-8 pr-10 border-b-2 border-gray-300 focus:border-purple-600 outline-none transition-colors placeholder-gray-400 text-gray-700"
                                placeholder="Confirm Password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute bottom-3 right-0 text-gray-400 hover:text-purple-600 focus:outline-none"
                            >
                                {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                            </button>
                            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                        </div>

                        {/* Register Button */}
                        <div className="pt-4">
                            <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-full shadow-lg hover:from-purple-700 hover:to-indigo-700 transition transform hover:scale-105">
                                SIGN UP
                            </button>
                        </div>

                        {/* Social Login */}
                        <div className="flex flex-col items-center mt-4">
                            <p className="text-sm text-gray-500 mb-2">Or sign up with</p>
                            <button type="button" onClick={handleGoogleSign} className="btn btn-circle bg-white border border-gray-200 hover:bg-gray-50 shadow-md">
                                <svg className="w-6 h-6" viewBox="0 0 48 48">
                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>

                {/* --- RIGHT SIDE: DECORATION --- */}
                <div className="w-full md:w-1/2 bg-gradient-to-br from-purple-800 to-indigo-900 text-white flex flex-col justify-center items-center p-12 relative overflow-hidden">
                    <div className="absolute top-10 right-10 w-24 h-24 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                    <div className="absolute bottom-10 left-10 w-24 h-24 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

                    <div className="z-10 text-center">
                        <h2 className="text-4xl font-bold mb-4">Glad to see you!</h2>
                        <p className="mb-8 text-purple-200">Already have an account? Login now to access your chef dashboard.</p>
                        <Link to="/login">
                            <button className="border-2 border-white text-white font-bold py-2 px-8 rounded-full hover:bg-white hover:text-purple-800 transition duration-300">
                                SIGN IN
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;