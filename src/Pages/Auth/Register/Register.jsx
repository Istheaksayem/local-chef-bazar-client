import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import useAuth from '../../../Hooks/useAuth';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const auth = getAuth()
const googleProvider = new GoogleAuthProvider()

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

    const handleGoogleSign = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('login successful with Google')
                navigate("/")

            })
    }

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
                    <p className='text-xl font-bold text-center'>Or</p>
                    <button onClick={handleGoogleSign} className="btn bg-white text-black border-[#e5e5e5]">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>

                </fieldset>
            </form>
        </div>
    );
};

export default Register;
