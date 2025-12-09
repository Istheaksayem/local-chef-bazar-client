import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, } from 'react-router';
import { toast } from 'react-toastify';
import useAuth from '../../../Hooks/useAuth';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { registerUser, updateUserProfile, setUser } = useAuth()
    //  const location =useLocation()
    const navigate = useNavigate()

    const handleRegistration = (data) => {
        console.log("after register", data)
        if (data.password !== data.confirmPassword) {

            toast("Passwords do not match!");
            return
        }

        registerUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                // update user  profile to firebase
                const userProfile = {
                    displayName: data.name,
                    photoURL: data.photo,
                }
                updateUserProfile(userProfile)
                    .then(() => {
                        console.log("user profile updated done")
                        setUser((prev) => { return { ...prev, ...userProfile } })
                        toast.success("Registration Successful!", {
                            position: "top-center"
                        });
                        navigate('/')

                    })
                    .catch(error => {
                        console.log(error)
                    })
            })

        console.log(data.password, data.confirmPassword)



    }
    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <h3 className="text-3xl text-center font-bold">Create An Account</h3>
            <p className="font-semibold text-center">Register with chef bazar</p>
            <form
                onSubmit={handleSubmit(handleRegistration)}
                className="card-body">
                <fieldset className="fieldset">
                    {/* Email field */}
                    <label className="label">Email</label>
                    <input
                        type="email"
                        {...register('email', { required: true })}

                        className="input"
                        placeholder="Email"
                    />
                    {errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>}


                    {/* name field */}
                    <label className="label">name</label>
                    <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        className="input"
                        placeholder="Your name"
                    />
                    {/* Address field */}
                    <label className="label">Address</label>
                    <input
                        type="text"
                        className="input"
                        placeholder="Your Address"
                    />



                    <label className="label">Photo Url</label>

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

                    {/* Error Message Show */}
                    {errors.photo && (
                        <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>
                    )}


                    {/* password */}
                    <label className="label">Password</label>
                    <input
                        type="password"
                        className="input"
                        {...register('password', {
                            required: true,
                            minLength: 6
                        })}
                        placeholder="Password" />
                    {errors.password?.type === 'required' && <p className='text-red-500'>password is required</p>}
                    {errors.password?.type === 'minLength' && <p className='text-red-500'>password must be 6 character or longer</p>}
                    {/* confirm password */}
                    <label className="label"> Confirm Password</label>
                    <input
                        type=" password"
                        {...register("confirmPassword", { required: true })}
                        className="input"
                        placeholder=" Confirm Password" />

                    <button className="btn btn-neutral mt-4">Register</button>
                    <p>Already have an account? <Link to="/login" className='text-blue-400'>Login</Link></p>
                </fieldset>

            </form>

        </div>
    );
};


export default Register;