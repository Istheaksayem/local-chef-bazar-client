import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import useAuth from '../../../Hooks/useAuth';

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const { registerUser, updateUserProfile, setUser } = useAuth();
    const navigate = useNavigate();

    // backend e user save
    const saveUserToDB = async (user) => {
        await fetch("https://local-chef-bazar-server-theta.vercel.app/users", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        });
    };

    const handleRegistration = async (data) => {
        if (data.password !== data.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            // 1️ Firebase register
            await registerUser(data.email, data.password);

            //  Firebase profile update
            const userProfile = {
                displayName: data.name,
                photoURL: data.photo,
            };

            await updateUserProfile(userProfile);

            // 3️ Backend user save 
            const userInfo = {
                name: data.name,
                email: data.email,
                photo: data.photo,
                role: "user" // default role
            };

            await saveUserToDB(userInfo);

            // 4️⃣ Local state update
            setUser((prev) => ({ ...prev, ...userProfile }));

            toast.success("Registration Successful!", {
                position: "top-center"
            });

            navigate('/');

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shadow-2xl">
            <h3 className="text-3xl text-center font-bold mt-4">Create An Account</h3>
            <p className="font-semibold text-center">Register with Chef Bazar</p>

            <form
                onSubmit={handleSubmit(handleRegistration)}
                className="card-body"
            >
                <fieldset className="fieldset">

                    {/* Email */}
                    <label className="label">Email</label>
                    <input
                        type="email"
                        {...register('email', { required: "Email is required" })}
                        className="input"
                        placeholder="Email"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}

                    {/* Name */}
                    <label className="label">Name</label>
                    <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        className="input"
                        placeholder="Your name"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name.message}</p>
                    )}

                    {/* Photo */}
                    <label className="label">Photo URL</label>
                    <input
                        type="text"
                        {...register("photo", {
                            required: "Photo URL is required",
                            minLength: {
                                value: 6,
                                message: "URL must be at least 6 characters"
                            }
                        })}
                        className="input"
                        placeholder="Photo URL"
                    />
                    {errors.photo && (
                        <p className="text-red-500 text-sm">{errors.photo.message}</p>
                    )}

                    {/* Password */}
                    <label className="label">Password</label>
                    <input
                        type="password"
                        {...register('password', {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            }
                        })}
                        className="input"
                        placeholder="Password"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}

                    {/* Confirm Password */}
                    <label className="label">Confirm Password</label>
                    <input
                        type="password"
                        {...register("confirmPassword", { required: "Confirm password required" })}
                        className="input"
                        placeholder="Confirm Password"
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm">
                            {errors.confirmPassword.message}
                        </p>
                    )}

                    <button className="btn btn-neutral mt-4">
                        Register
                    </button>

                    <p className="text-center mt-2">
                        Already have an account?
                        <Link to="/login" className="text-blue-500 ml-1">
                            Login
                        </Link>
                    </p>

                </fieldset>
            </form>
        </div>
    );
};

export default Register;
